import * as SQLite from 'expo-sqlite';

// Abrir conexão com o banco
const db = SQLite.openDatabase('cidade_sensorial.db');

// Função para executar queries e retornar promise
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Inicializar banco de dados
export const initDatabase = async () => {
  try {
    // Ler o schema SQL
    const fs = require('fs');
    const path = require('path');
    
    try {
      const schemaPath = path.join(__dirname, '../../database/schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Executar o schema
      await executeQuery(schema);
      console.log('✅ Database inicializado com sucesso');
    } catch (schemaError) {
      console.log('⚠️  Schema file não encontrado, criando tabelas manualmente...');
      await createTables();
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar database:', error);
    throw error;
  }
};

// Criar tabelas manualmente se o schema não existir
const createTables = async () => {
  const queries = [
    // Tabela usuários
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT,
      google_id TEXT UNIQUE,
      avatar_url TEXT,
      tipo_auth TEXT NOT NULL DEFAULT 'local',
      ativo BOOLEAN DEFAULT 1,
      verificado BOOLEAN DEFAULT 0,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Tabela tipos_deficiencia
    `CREATE TABLE IF NOT EXISTS tipos_deficiencia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL UNIQUE,
      descricao TEXT,
      icone TEXT
    )`,
    
    // Tabela usuarios_deficiencias
    `CREATE TABLE IF NOT EXISTS usuarios_deficiencias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      deficiencia_id INTEGER NOT NULL,
      grau TEXT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )`,
    
    // Tabela preferencias_acessibilidade
    `CREATE TABLE IF NOT EXISTS preferencias_acessibilidade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL UNIQUE,
      modo_escuro BOOLEAN DEFAULT 0,
      alto_contraste BOOLEAN DEFAULT 0,
      tipo_daltonismo TEXT DEFAULT 'nenhum',
      narracao_voz BOOLEAN DEFAULT 0,
      volume_voz INTEGER DEFAULT 50,
      velocidade_voz INTEGER DEFAULT 50,
      ativar_vibracao BOOLEAN DEFAULT 1,
      intensidade_vibracao INTEGER DEFAULT 50,
      alertas_visuais BOOLEAN DEFAULT 1,
      alertas_sonoros BOOLEAN DEFAULT 1,
      alertas_vibracao BOOLEAN DEFAULT 1,
      detalhes_rota BOOLEAN DEFAULT 1,
      preferir_rampas BOOLEAN DEFAULT 0,
      preferir_elevadores BOOLEAN DEFAULT 0,
      tamanho_fonte TEXT DEFAULT 'medio',
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )`,
    
    // Tabela pontos_acessibilidade
    `CREATE TABLE IF NOT EXISTS pontos_acessibilidade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      endereco TEXT,
      cidade TEXT,
      estado TEXT,
      tipo_ponto TEXT NOT NULL,
      acessivel BOOLEAN NOT NULL DEFAULT 1,
      descricao_problema TEXT,
      foto_url TEXT,
      validacoes_positivas INTEGER DEFAULT 0,
      validacoes_negativas INTEGER DEFAULT 0,
      pontuacao_acessibilidade INTEGER DEFAULT 50,
      criado_por INTEGER NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Tabela validacoes_pontos
    `CREATE TABLE IF NOT EXISTS validacoes_pontos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ponto_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      validacao BOOLEAN NOT NULL,
      comentario TEXT,
      foto_url TEXT,
      data_validacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ponto_id) REFERENCES pontos_acessibilidade(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      UNIQUE(ponto_id, usuario_id)
    )`,
    
    // Tabela obstaculos_reportados
    `CREATE TABLE IF NOT EXISTS obstaculos_reportados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      tipo_obstaculo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      foto_url TEXT,
      nivel_gravidade TEXT DEFAULT 'media',
      status TEXT DEFAULT 'pendente',
      reportado_por INTEGER NOT NULL,
      confirmacoes INTEGER DEFAULT 0,
      data_reportado DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_resolucao DATETIME,
      FOREIGN KEY (reportado_por) REFERENCES usuarios(id)
    )`,
  ];

  try {
    for (const query of queries) {
      await executeQuery(query);
    }
    
    // Inserir tipos de deficiência padrão
    await insertDefaultData();
    
    console.log('✅ Tabelas criadas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
    throw error;
  }
};

// Inserir dados padrão
const insertDefaultData = async () => {
  try {
    // Verificar se já existem tipos de deficiência
    const result = await executeQuery('SELECT COUNT(*) as count FROM tipos_deficiencia');
    const count = result.rows.item(0).count;
    
    if (count === 0) {
      const tiposDeficiencia = [
        ['visual', 'Deficiência visual', 'eye-outline'],
        ['auditiva', 'Deficiência auditiva', 'volume-mute-outline'],
        ['mobilidade', 'Mobilidade reduzida', 'wheelchair-outline'],
        ['intelectual', 'Deficiência intelectual', 'person-outline'],
        ['nenhuma', 'Sem deficiência', 'checkmark-outline'],
      ];
      
      for (const [tipo, descricao, icone] of tiposDeficiencia) {
        await executeQuery(
          'INSERT INTO tipos_deficiencia (tipo, descricao, icone) VALUES (?, ?, ?)',
          [tipo, descricao, icone]
        );
      }
      
      console.log('✅ Dados padrão inseridos');
    }
  } catch (error) {
    console.error('❌ Erro ao inserir dados padrão:', error);
  }
};

// =============================================
// FUNÇÕES DE USUÁRIO
// =============================================

export const createUser = async (nome, email, senha) => {
  const query = `
    INSERT INTO usuarios (nome, email, senha, tipo_auth)
    VALUES (?, ?, ?, 'local')
  `;
  
  try {
    const result = await executeQuery(query, [nome, email, senha]);
    const userId = result.insertId;
    
    // Criar preferências padrão
    await executeQuery(
      'INSERT INTO preferencias_acessibilidade (usuario_id) VALUES (?)',
      [userId]
    );
    
    return userId;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  const result = await executeQuery(query, [email]);
  
  if (result.rows.length > 0) {
    return result.rows.item(0);
  }
  return null;
};

export const getUserById = async (id) => {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  const result = await executeQuery(query, [id]);
  
  if (result.rows.length > 0) {
    return result.rows.item(0);
  }
  return null;
};

// =============================================
// FUNÇÕES DE PONTOS DE ACESSIBILIDADE
// =============================================

export const createAccessibilityPoint = async (data) => {
  const {
    latitude,
    longitude,
    endereco,
    cidade,
    tipo_ponto,
    acessivel,
    descricao_problema,
    foto_url,
    criado_por,
  } = data;
  
  const query = `
    INSERT INTO pontos_acessibilidade 
    (latitude, longitude, endereco, cidade, tipo_ponto, acessivel, descricao_problema, foto_url, criado_por)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  try {
    const result = await executeQuery(query, [
      latitude,
      longitude,
      endereco,
      cidade,
      tipo_ponto,
      acessivel ? 1 : 0,
      descricao_problema,
      foto_url,
      criado_por,
    ]);
    return result.insertId;
  } catch (error) {
    console.error('Erro ao criar ponto de acessibilidade:', error);
    throw error;
  }
};

export const getAccessibilityPointsNearby = async (latitude, longitude, radiusKm = 5) => {
  // Busca aproximada por raio (simplificada)
  const query = `
    SELECT * FROM pontos_acessibilidade
    WHERE latitude BETWEEN ? - 0.05 AND ? + 0.05
    AND longitude BETWEEN ? - 0.05 AND ? + 0.05
    ORDER BY ABS(latitude - ?) + ABS(longitude - ?)
    LIMIT 50
  `;
  
  try {
    const result = await executeQuery(query, [
      latitude, latitude,
      longitude, longitude,
      latitude, longitude,
    ]);
    
    const points = [];
    for (let i = 0; i < result.rows.length; i++) {
      points.push(result.rows.item(i));
    }
    return points;
  } catch (error) {
    console.error('Erro ao buscar pontos próximos:', error);
    throw error;
  }
};

// =============================================
// FUNÇÕES DE PREFERÊNCIAS
// =============================================

export const getUserPreferences = async (userId) => {
  const query = 'SELECT * FROM preferencias_acessibilidade WHERE usuario_id = ?';
  const result = await executeQuery(query, [userId]);
  
  if (result.rows.length > 0) {
    return result.rows.item(0);
  }
  return null;
};

export const updateUserPreferences = async (userId, preferences) => {
  const fields = Object.keys(preferences);
  const values = Object.values(preferences);
  values.push(userId);
  
  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const query = `UPDATE preferencias_acessibilidade SET ${setClause} WHERE usuario_id = ?`;
  
  try {
    await executeQuery(query, values);
  } catch (error) {
    console.error('Erro ao atualizar preferências:', error);
    throw error;
  }
};

export { executeQuery, db };

