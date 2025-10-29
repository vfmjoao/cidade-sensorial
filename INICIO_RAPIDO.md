# 🚀 Guia de Início Rápido - Cidade Sensorial

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn**
- **Expo CLI** - Instalar globalmente:
  ```bash
  npm install -g expo-cli
  ```
- **Git** - [Download](https://git-scm.com/)

## 📱 Instalação do Projeto

### 1. Clone o Repositório (se ainda não tiver feito)

```bash
git clone https://github.com/SEU_USUARIO/cidade-sensorial.git
cd cidade-sensorial
```

### 2. Instale as Dependências

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

Isso instalará todas as dependências necessárias do projeto.

### 3. Instale o Expo Go no seu celular

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## 🏃 Executando o Projeto

### Desenvolvimento Local

```bash
npm start
# ou
expo start
```

Isso iniciará o servidor de desenvolvimento e mostrará um QR Code no terminal.

### Rodando no Dispositivo

1. **Android**: Abra o Expo Go e escaneie o QR Code
2. **iOS**: Use a Camera do iPhone para escanear o QR Code

### Rodando em Emulador/Simulador

```bash
# Para Android
npm run android
# ou
expo start --android

# Para iOS (apenas no macOS)
npm run ios
# ou
expo start --ios

# Para Web
npm run web
# ou
expo start --web
```

## 📁 Estrutura do Projeto

```
cidade-sensorial/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── screens/        # Telas do aplicativo
│   │   ├── HomeScreen.tsx
│   │   ├── MapScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/      # Serviços e APIs
│   │   ├── accessibilityService.ts
│   │   ├── beaconService.ts
│   │   └── navigationService.ts
│   ├── utils/         # Funções utilitárias
│   │   └── location.ts
│   ├── types/         # Definições TypeScript
│   │   └── index.ts
│   └── constants/     # Constantes
│       └── colors.ts
├── assets/            # Imagens e recursos
├── App.tsx           # Componente principal
└── package.json
```

## 🎯 Telas Principais

### 1. Home Screen
- Tela inicial com ações rápidas
- Navegação para o mapa
- Acesso ao perfil
- Botão para reportar obstáculos

### 2. Map Screen
- Mapa interativo com localização
- Visualização de balizas (simuladas)
- Botão para iniciar navegação

### 3. Profile Screen
- Configuração do tipo de deficiência
- Preferências de acessibilidade
- Opções de voz e vibração

## 🔧 Configurações Importantes

### Localização

O app requer permissão de localização. Certifique-se de:
- Habilitar localização no dispositivo
- Permitir acesso quando solicitado

### Android

Para testar no Android, você precisa do **Android Studio** com:
- Android SDK
- Emulador Android (opcional)

### iOS

Para testar no iOS, você precisa do **Xcode** (apenas macOS).

## 🐛 Resolução de Problemas

### Erro: "Module not found"
```bash
npm install
# ou
rm -rf node_modules && npm install
```

### Erro: "Metro Bundler"
```bash
npm start -- --reset-cache
```

### Problemas com Location
- Certifique-se de que as permissões estão habilitadas
- Em emuladores, configure uma localização manualmente

## 📚 Próximos Passos

1. **Customize o App**: Adicione suas próprias funcionalidades
2. **Adicione Assets**: Substitua os placeholders de imagens
3. **Configure Mapas**: Adicione uma chave de API do Google Maps
4. **Implemente Features**: Desenvolva as funcionalidades específicas

## 📝 Comandos Úteis

```bash
# Iniciar o servidor
npm start

# Ver logs
npm start -- --log

# Limpar cache
npm start -- --clear

# Executar lint
npm run lint

# Formatar código
npm run format
```

## 🌐 Links Úteis

- [Documentação Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [TypeScript](https://www.typescriptlang.org/)

## 💡 Dicas

- Use `console.log()` para debug
- Reinicie o app se houver mudanças de configuração
- Verifique os logs no terminal para erros
- Use o Expo Go para testes rápidos
- Para produção, use `expo build` ou EAS Build

---

**Boa Sorte com o Desenvolvimento! 🚀**

