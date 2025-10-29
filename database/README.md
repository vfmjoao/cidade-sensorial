# Banco de Dados - Cidade Sensorial

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### 1. **usuarios**
Armazena informações dos usuários do aplicativo.
- Suporta autenticação local (email/senha)
- Suporta autenticação Google OAuth
- Campos de verificação e status

#### 2. **tipos_deficiencia**
Catálogo de tipos de deficiência suportados.
- Visual
- Auditiva
- Mobilidade reduzida
- Intelectual

#### 3. **usuarios_deficiencias**
Relação muitos-para-muitos entre usuários e deficiências.
- Permite múltiplas deficiências por usuário
- Inclui grau de severidade

#### 4. **preferencias_acessibilidade**
Preferências de acessibilidade de cada usuário.
- Modo escuro
- Alto contraste
- Tipos de daltonismo (protanopia, deuteranopia, tritanopia)
- Configurações de voz (volume, velocidade)
- Vibração (ativar, intensidade)
- Notificações (visuais, sonoras, vibração)
- Preferências de navegação

#### 5. **pontos_acessibilidade**
Pontos marcados no mapa pelo Google Maps.
- Localização (latitude/longitude)
- Tipo de ponto (rampa, elevador, semáforo sonoro, etc)
- Status de acessibilidade
- Validações da comunidade
- Pontuação de acessibilidade (0-100)

#### 6. **validacoes_pontos**
Validações dos usuários sobre pontos de acessibilidade.
- Permite comentários e fotos
- Cada usuário só pode validar um ponto uma vez

#### 7. **rotas_acessiveis**
Rotas calculadas com acessibilidade.
- Pontos de início e fim
- Distância e tempo estimado
- Requisitos de acessibilidade
- Pontuação geral

#### 8. **obstaculos_reportados**
Obstáculos reportados pelos usuários.
- Localização
- Tipo de obstáculo
- Nível de gravidade
- Status (pendente, em andamento, resolvido)
- Confirmações da comunidade

#### 9. **sessoes**
Sessões de autenticação dos usuários.
- Token de segurança
- Device info
- Data de expiração

## 🎨 Recursos de Acessibilidade

### Modo Escuro
Campo: `modo_escuro` (BOOLEAN)

### Alto Contraste
Campo: `alto_contraste` (BOOLEAN)

### Tipos de Daltonismo
Campo: `tipo_daltonismo` (TEXT)
- Valores: 'nenhum', 'protanopia', 'deuteranopia', 'tritanopia'

### Narração por Voz
- `narracao_voz` (BOOLEAN)
- `volume_voz` (INTEGER 0-100)
- `velocidade_voz` (INTEGER 0-100)

### Vibração
- `ativar_vibracao` (BOOLEAN)
- `intensidade_vibracao` (INTEGER 0-100)

### Alertas
- `alertas_visuais` (BOOLEAN)
- `alertas_sonoros` (BOOLEAN)
- `alertas_vibracao` (BOOLEAN)

### Navegação
- `preferir_rampas` (BOOLEAN)
- `preferir_elevadores` (BOOLEAN)
- `detalhes_rota` (BOOLEAN)

### Tamanho da Fonte
- `tamanho_fonte` (TEXT: 'pequeno', 'medio', 'grande', 'extra_grande')

## 🗺️ Pontos no Mapa

### Tipos de Pontos
- `rampa` - Rampa de acesso
- `elevador` - Elevador
- `semaforo_sonoro` - Semáforo com sinal sonoro
- `faixa_pedestre` - Faixa de pedestre acessível
- `calçada` - Calçada com piso tátil
- `sinalizacao` - Sinalização em braile ou outro formato

### Status de Acessibilidade
- `acessivel = true` - Local acessível
- `acessivel = false` - Local inacessível (com descrição do problema)

## 🚧 Obstáculos

### Tipos de Obstáculos
- `buraco` - Buraco na calçada
- `calçada_quebrada` - Calçada danificada
- `ausencia_rampa` - Falta de rampa de acesso
- `lixo` - Lixo obstruindo passagem
- `obra` - Obra no caminho
- `desnivel` - Desnível acentuado

### Níveis de Gravidade
- `baixa` - Obstáculo menor
- `media` - Obstáculo médio
- `alta` - Obstáculo grande
- `critica` - Obstáculo que impede passagem

### Status de Resolução
- `pendente` - Aguardando verificação
- `em_andamento` - Sendo resolvido
- `resolvido` - Problema resolvido
- `descartado` - Não é um problema real

## 📱 Como Usar

### Inicializar o Banco
```javascript
import { initDatabase } from './src/database/db';

// No App.tsx
useEffect(() => {
  const initializeDB = async () => {
    await initDatabase();
  };
  initializeDB();
}, []);
```

### Criar Usuário
```javascript
import { createUser } from './src/database/db';

const userId = await createUser(nome, email, senha);
```

### Buscar Pontos Próximos
```javascript
import { getAccessibilityPointsNearby } from './src/database/db';

const pontos = await getAccessibilityPointsNearby(latitude, longitude, 5); // 5km
```

## 🔒 Segurança

- Senhas serão criptografadas (implementar bcrypt)
- Tokens de sessão com expiração
- Validações de dados no frontend e backend
- SQL Injection prevenido com prepared statements

