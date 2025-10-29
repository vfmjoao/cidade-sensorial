# 🚀 Como Iniciar o Projeto Cidade Sensorial

## ⚠️ Problema de Diretório

Se você está tentando executar `npm start` e recebe o erro:
```
npm error path C:\Users\joaov\package.json
```

**Isso significa que você NÃO está no diretório correto do projeto.**

## ✅ Soluções

### Solução 1: Usar os scripts .bat (Windows)

1. **Navegue até a pasta do projeto:**
   ```
   cd "C:\Users\joaov\Documents\Trabalho\Cidade Sensorial"
   ```

2. **Execute um dos arquivos .bat:**
   - `INICIAR.bat` - Para iniciar o projeto
   - `LIMPAR.bat` - Para limpar cache se tiver problemas

### Solução 2: Via Terminal/CMD

1. **Abra o CMD ou PowerShell**

2. **Navegue até o diretório do projeto:**
   ```cmd
   cd "C:\Users\joaov\Documents\Trabalho\Cidade Sensorial"
   ```

3. **Verifique se está no lugar certo:**
   ```cmd
   dir
   ```
   Você deve ver arquivos como: `package.json`, `App.tsx`, `src/`, etc.

4. **Inicie o projeto:**
   ```cmd
   npm start
   ```

### Solução 3: Via PowerShell

1. **Abra o PowerShell**

2. **Navegue até o diretório:**
   ```powershell
   Set-Location "C:\Users\joaov\Documents\Trabalho\Cidade Sensorial"
   ```

3. **Verifique a localização:**
   ```powershell
   Get-Location
   Get-ChildItem
   ```

4. **Inicie o projeto:**
   ```powershell
   npm start
   ```

## 🐛 Se Ainda Tiver Erros

### Limpar Cache

```bash
# Limpar cache do Expo
npm start -- --clear

# OU limpar TUDO e reinstalar
Remove-Item -Recurse -Force node_modules, .expo
npm install
npm start
```

### Verificar Versões

```bash
node --version    # Deve ser 18 ou superior
npm --version     # Deve ser 8 ou superior
```

### Reinstalar Dependências

```bash
npm install
```

## 📱 Testar no Celular

1. Escaneie o QR Code que aparece no terminal
2. Use o app Expo Go
3. Ou digite `w` para testar na web

## 🌐 Testar na Web

No terminal, pressione `w` (sem aspas)

---

**Importante**: Sempre execute os comandos no diretório do projeto!

