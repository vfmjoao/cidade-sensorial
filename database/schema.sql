-- =============================================
-- Banco de Dados: Cidade Sensorial
-- Objetivo: Sistema de acessibilidade urbana
-- =============================================

-- =============================================
-- TABELA: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT,
    
    -- Autenticação OAuth (Google)
    google_id TEXT UNIQUE,
    avatar_url TEXT,
    
    -- Tipo de conta
    tipo_auth TEXT NOT NULL DEFAULT 'local', -- 'local' ou 'google'
    
    -- Status
    ativo BOOLEAN DEFAULT 1,
    verificado BOOLEAN DEFAULT 0,
    
    -- Datas
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA: tipos_deficiencia
-- =============================================
CREATE TABLE IF NOT EXISTS tipos_deficiencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL UNIQUE,
    descricao TEXT,
    icone TEXT
);

-- Inserir tipos de deficiência padrão
INSERT INTO tipos_deficiencia (tipo, descricao, icone) VALUES
('visual', 'Deficiência visual', 'eye-outline'),
('auditiva', 'Deficiência auditiva', 'volume-mute-outline'),
('mobilidade', 'Mobilidade reduzida', 'wheelchair-outline'),
('intelectual', 'Deficiência intelectual', 'person-outline'),
('nenhuma', 'Sem deficiência', 'checkmark-outline');

-- =============================================
-- TABELA: usuarios_deficiencias
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_deficiencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    deficiencia_id INTEGER NOT NULL,
    grau TEXT, -- 'leve', 'moderada', 'severa'
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (deficiencia_id) REFERENCES tipos_deficiencia(id)
);

-- =============================================
-- TABELA: preferencias_acessibilidade
-- =============================================
CREATE TABLE IF NOT EXISTS preferencias_acessibilidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL UNIQUE,
    
    -- Modo visual
    modo_escuro BOOLEAN DEFAULT 0,
    alto_contraste BOOLEAN DEFAULT 0,
    
    -- Daltonismo
    tipo_daltonismo TEXT DEFAULT 'nenhum', -- 'nenhum', 'protanopia', 'deuteranopia', 'tritanopia'
    
    -- Áudio
    narracao_voz BOOLEAN DEFAULT 0,
    volume_voz INTEGER DEFAULT 50, -- 0-100
    velocidade_voz INTEGER DEFAULT 50, -- 0-100
    
    -- Vibração
    ativar_vibracao BOOLEAN DEFAULT 1,
    intensidade_vibracao INTEGER DEFAULT 50, -- 0-100
    
    -- Notificações
    alertas_visuais BOOLEAN DEFAULT 1,
    alertas_sonoros BOOLEAN DEFAULT 1,
    alertas_vibracao BOOLEAN DEFAULT 1,
    
    -- Navegação
    detalhes_rota BOOLEAN DEFAULT 1, -- Descrições detalhadas das rotas
    preferir_rampas BOOLEAN DEFAULT 0,
    preferir_elevadores BOOLEAN DEFAULT 0,
    
    -- Tamanho da fonte
    tamanho_fonte TEXT DEFAULT 'medio', -- 'pequeno', 'medio', 'grande', 'extra_grande'
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
-- TABELA: pontos_acessibilidade
-- =============================================
CREATE TABLE IF NOT EXISTS pontos_acessibilidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Localização
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    
    -- Tipo de ponto
    tipo_ponto TEXT NOT NULL, -- 'rampa', 'elevador', 'semaforo_sonoro', 'faixa_pedestre', 'calçada', 'sinalizacao'
    
    -- Status de acessibilidade
    acessivel BOOLEAN NOT NULL DEFAULT 1, -- true = acessível, false = inacessível
    
    -- Descrição do problema (se inacessível)
    descricao_problema TEXT,
    foto_url TEXT,
    
    -- Validações da comunidade
    validacoes_positivas INTEGER DEFAULT 0,
    validacoes_negativas INTEGER DEFAULT 0,
    pontuacao_acessibilidade INTEGER DEFAULT 50, -- 0-100
    
    -- Dados do criador
    criado_por INTEGER NOT NULL,
    
    -- Datas
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

-- Índice para busca por localização
CREATE INDEX IF NOT EXISTS idx_pontos_localizacao ON pontos_acessibilidade(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_pontos_tipo ON pontos_acessibilidade(tipo_ponto);
CREATE INDEX IF NOT EXISTS idx_pontos_acessibilidade ON pontos_acessibilidade(acessivel);

-- =============================================
-- TABELA: validacoes_pontos
-- =============================================
CREATE TABLE IF NOT EXISTS validacoes_pontos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ponto_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    
    -- Validação: true = confirma acessibilidade, false = confirma inacessibilidade
    validacao BOOLEAN NOT NULL,
    
    -- Comentário opcional
    comentario TEXT,
    
    -- Foto opcional
    foto_url TEXT,
    
    -- Data
    data_validacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ponto_id) REFERENCES pontos_acessibilidade(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    
    -- Um usuário só pode validar um ponto uma vez
    UNIQUE(ponto_id, usuario_id)
);

-- =============================================
-- TABELA: rotas_acessiveis
-- =============================================
CREATE TABLE IF NOT EXISTS rotas_acessiveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_rota TEXT,
    
    -- Pontos da rota
    ponto_inicio INTEGER NOT NULL,
    ponto_fim INTEGER NOT NULL,
    
    -- Características da rota
    distancia_metros REAL,
    tempo_estimado_minutos INTEGER,
    nivel_dificuldade INTEGER, -- 1-5 (1 = muito fácil, 5 = difícil)
    
    -- Requisitos de acessibilidade
    tem_rampas BOOLEAN DEFAULT 0,
    tem_elevadores BOOLEAN DEFAULT 0,
    tem_semaforo_sonoro BOOLEAN DEFAULT 0,
    tem_calçadas_lisas BOOLEAN DEFAULT 0,
    
    -- Pontuação geral
    pontuacao_acessibilidade INTEGER DEFAULT 50, -- 0-100
    
    -- Criado por
    criado_por INTEGER NOT NULL,
    
    -- Datas
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (criado_por) REFERENCES usuarios(id),
    FOREIGN KEY (ponto_inicio) REFERENCES pontos_acessibilidade(id),
    FOREIGN KEY (ponto_fim) REFERENCES pontos_acessibilidade(id)
);

-- =============================================
-- TABELA: obstaculos_reportados
-- =============================================
CREATE TABLE IF NOT EXISTS obstaculos_reportados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Localização
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    
    -- Tipo de obstáculo
    tipo_obstaculo TEXT NOT NULL, -- 'buraco', 'calçada_quebrada', 'ausencia_rampa', 'lixo', 'obra', 'desnivel'
    
    -- Descrição
    descricao TEXT NOT NULL,
    foto_url TEXT,
    
    -- Gravidade
    nivel_gravidade TEXT DEFAULT 'media', -- 'baixa', 'media', 'alta', 'critica'
    
    -- Status
    status TEXT DEFAULT 'pendente', -- 'pendente', 'em_andamento', 'resolvido', 'descartado'
    
    -- Dados do reportador
    reportado_por INTEGER NOT NULL,
    
    -- Validações da comunidade
    confirmacoes INTEGER DEFAULT 0,
    
    -- Datas
    data_reportado DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_resolucao DATETIME,
    
    FOREIGN KEY (reportado_por) REFERENCES usuarios(id)
);

-- Índice para busca de obstáculos por localização
CREATE INDEX IF NOT EXISTS idx_obstaculos_localizacao ON obstaculos_reportados(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_obstaculos_status ON obstaculos_reportados(status);

-- =============================================
-- TABELA: sessoes (para autenticação)
-- =============================================
CREATE TABLE IF NOT EXISTS sessoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    
    -- Dados da sessão
    device_id TEXT,
    device_info TEXT,
    ip_address TEXT,
    
    -- Validade
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATETIME NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
-- VIEWS ÚTEIS
-- =============================================

-- View: Pontos acessíveis validados
CREATE VIEW IF NOT EXISTS vw_pontos_acessiveis AS
SELECT 
    p.*,
    COALESCE(SUM(CASE WHEN v.validacao = 1 THEN 1 ELSE 0 END), 0) as validacoes_positivas,
    COALESCE(SUM(CASE WHEN v.validacao = 0 THEN 1 ELSE 0 END), 0) as validacoes_negativas
FROM pontos_acessibilidade p
LEFT JOIN validacoes_pontos v ON p.id = v.ponto_id
GROUP BY p.id;

-- =============================================
-- TRIGGERS
-- =============================================

-- Atualizar data_atualizacao automaticamente
CREATE TRIGGER IF NOT EXISTS trg_usuarios_atualizar_data
AFTER UPDATE ON usuarios
BEGIN
    UPDATE usuarios SET data_atualizacao = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Atualizar pontuação de acessibilidade quando validado
CREATE TRIGGER IF NOT EXISTS trg_atualizar_pontuacao_ponto
AFTER INSERT ON validacoes_pontos
BEGIN
    UPDATE pontos_acessibilidade 
    SET pontuacao_acessibilidade = (
        SELECT 
            CASE 
                WHEN COUNT(*) > 0 THEN
                    CAST((SUM(CASE WHEN validacao = 1 THEN 100 ELSE 0 END) * 1.0 / COUNT(*)) AS INTEGER)
                ELSE 50
            END
        FROM validacoes_pontos
        WHERE ponto_id = NEW.ponto_id
    ),
    data_atualizacao = CURRENT_TIMESTAMP
    WHERE id = NEW.ponto_id;
END;

-- =============================================
-- ÍNDICES ADICIONAIS
-- =============================================

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_google_id ON usuarios(google_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_token ON sessoes(token);
CREATE INDEX IF NOT EXISTS idx_sessoes_usuario ON sessoes(usuario_id);

-- =============================================
-- FIM DO SCHEMA
-- =============================================

