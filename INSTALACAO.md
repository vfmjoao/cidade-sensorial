# 📱 Como Instalar e Testar o Cidade Sensorial

## ✅ Passo a Passo

### 1. Instalar o Expo Go no celular

**Android:**
- Baixe na [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

**iOS (iPhone):**
- Baixe na [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. Executar o Projeto

No terminal, dentro da pasta do projeto:

```bash
npm start
```

Você verá um QR Code no terminal.

### 3. Escanear o QR Code

**Android:**
- Abra o app **Expo Go**
- Toque em "Scan QR Code"
- Escaneie o código

**iOS:**
- Abra o app **Câmera** do iPhone
- Aponte para o QR Code
- Toque na notificação que aparecer

### 4. Esperar o App Carregar

O app vai compilar e abrir automaticamente no seu celular.

## 🎮 Testando as Funcionalidades

### Tela Inicial (Home)
- Você verá a tela com o título "Cidade Sensorial"
- Três botões de ação rápida
- Informações sobre o app

### Tela de Mapa
- Toque em "🗺️ Navegar" na tela inicial
- Você verá um mapa com sua localização
- Balizas simuladas aparecem como marcadores vermelhos
- Toque em "📍 Iniciar Navegação" para testar

### Tela de Perfil
- Toque em "👤 Configurar Perfil"
- Configure os tipos de deficiência que deseja simular
- Ajuste as preferências de acessibilidade
- Salve as configurações

## 🐛 Problemas Comuns

### App não carrega
1. Feche o Expo Go completamente
2. Abra novamente
3. Escaneie o QR Code de novo

### Tela branca aparecendo
1. Pare o servidor (Ctrl+C no terminal)
2. Limpe o cache: `npm start -- --clear`
3. Escaneie o QR Code novamente

### Erro de conexão
1. Verifique se o celular e computador estão na mesma rede Wi-Fi
2. Tente conectar via tunnel:
   ```bash
   npm start -- --tunnel
   ```

### Permissão de localização negada
1. Vá em Configurações do seu celular
2. Permissões de app → Expo Go
3. Ative a permissão de localização

## 📋 Checklist de Teste

- [ ] App abre sem tela branca
- [ ] Navegação entre telas funciona
- [ ] Mapa carrega com localização
- [ ] Perfil permite configurar deficiências
- [ ] Sem erros no console

## 🎯 Próximos Passos

1. Teste todas as telas
2. Verifique se a navegação funciona
3. Teste a configuração de perfil
4. Teste no emulador (opcional):
   - Android: `npm run android`
   - iOS (Mac): `npm run ios`

## 💡 Dicas

- Mantenha o terminal aberto enquanto usa o app
- Os erros aparecerão no terminal
- Use `R` no terminal para recarregar o app
- Use `Shift+R` para limpar e recarregar

---

**Boa sorte com os testes! 🚀**

