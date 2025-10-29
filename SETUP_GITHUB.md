# 🚀 Configuração do Repositório GitHub

## Passo 1: Criar o Repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão **"New repository"** (ou o ícone +)
3. Configure o repositório:
   - **Nome**: `cidade-sensorial`
   - **Descrição**: `Aplicativo de navegação inclusiva para pessoas com deficiência`
   - Selecione **Public** ou **Private** (sua escolha)
   - **NÃO** inicialize com README, .gitignore ou license (já temos esses arquivos)
4. Clique em **"Create repository"**

## Passo 2: Conectar o Repositório Local ao GitHub

No terminal, execute os seguintes comandos (substitua `SEU_USUARIO` pelo seu usuário do GitHub):

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/cidade-sensorial.git

# Verificar se foi adicionado corretamente
git remote -v

# Renomear branch master para main (se necessário)
git branch -M main

# Fazer push do código inicial
git push -u origin main
```

## Passo 3: Atualizar o README

Após criar o repositório, volte aqui e atualize o arquivo `README.md` substituindo `seu-usuario` pelo seu nome de usuário do GitHub:

```bash
# Editar o README
# Substitua: https://github.com/seu-usuario/cidade-sensorial.git
# Por: https://github.com/SEU_USUARIO/cidade-sensorial.git
```

## Passo 4: Verificar o Repositório

Acesse o repositório no GitHub e verifique se todos os arquivos foram enviados corretamente.

## Próximos Passos

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

3. Escaneie o QR Code com o app Expo Go (Android) ou Camera (iOS)

## Estrutura do Repositório

O projeto já está estruturado com:

- ✅ Configuração inicial do React Native + Expo
- ✅ TypeScript configurado
- ✅ Navegação entre telas (React Navigation)
- ✅ Telas base: Home, Map, Profile
- ✅ Serviços de acessibilidade, balizas e navegação
- ✅ Utilitários de localização
- ✅ Tipos TypeScript definidos
- ✅ Sistema de cores consistente
- ✅ README completo
- ✅ Licença MIT
- ✅ Guia de contribuição

## Comandos Úteis

```bash
# Verificar status do Git
git status

# Fazer commit de mudanças
git add .
git commit -m "sua mensagem"

# Enviar para o GitHub
git push

# Ver histórico de commits
git log
```

## Troubleshooting

### Erro: "repository not found"
- Verifique se o nome do usuário está correto
- Confirme que o repositório foi criado no GitHub

### Erro: "permission denied"
- Verifique suas credenciais do GitHub
- Considere usar SSH em vez de HTTPS:
  ```bash
  git remote set-url origin git@github.com:SEU_USUARIO/cidade-sensorial.git
  ```

---

**Nota**: Este é apenas um projeto de demonstração. As balizas inteligentes são simuladas por enquanto.

