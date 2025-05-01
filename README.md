# FURIA Chat App 🎮

Um aplicativo mobile completo para torcedores da FURIA Esports, com sistema de autenticação, chat em tempo real com IA, gerenciamento de usuários e mais! 

## 🚀 Funcionalidades

### Autenticação & Segurança
- Login e Registro com confirmação por e-mail
- Recuperação de senha com timer de 60s para reenvio
- Tokens JWT com refresh token
- Criptografia de senhas com BCrypt
- Proteção contra XSS e CORS configurado

### Chat em Tempo Real
- FURIA IA usando inteligência artificial.
- WebSocket (STOMP) para comunicação instantânea entre usuários
- Indicador de "digitando" animado
- Histórico de mensagens com limite de tokens
- Interface amigável e responsiva

### Perfil & Usuário
- Visualização e edição de perfil
- Ativação de conta via e-mail
- Gerenciamento de sessões
- Verificação de e-mail em duas etapas

## 🛠️ Tecnologias

### Backend
- Java 21
- Spring Boot 3.3
  - Spring Security
  - Spring WebSocket
  - Spring Data JPA
- PostgreSQL
- Flyway Migration
- JWT & BCrypt
- OpenRouter API
- Docker

### Frontend
- React Native
- TypeScript
- STOMP.js & SockJS
- Async Storage
- Axios
- React Navigation
- Componentes personalizados

## 📱 Telas

- Login/Registro
- Confirmação de E-mail
- Recuperação de Senha
- Chat Principal
- Perfil do Usuário
- Sobre

## 🚀 Como Executar

### Backend

```bash
# Clone o repositório
git clone https://github.com/KevinAp-5/furia_Challenge1.git

# Entre na pasta do backend
cd backend

# Configure as variáveis de ambiente
cp .env.example .env

# Execute com Docker
docker-compose up -d

# Ou execute localmente
./mvnw spring-boot:run
```

### Frontend

```bash
# Entre na pasta do app
cd FuriaApp

# Instale as dependências
npm install

# Execute
npx expo start --go
```

## 📝 Configuração


## 🔑 Endpoints da API

### Autenticação
```
POST /api/auth/register         - Registro
GET  /api/auth/register/confirm - Confirmação de e-mail
POST /api/auth/login           - Login
POST /api/auth/password/forget - Recuperação de senha
POST /api/auth/password/reset  - Reset de senha
```

### Chat
```
WS   /ws/chat         - WebSocket connection
SUB  /topic/messages  - Receber mensagens
SUB  /topic/typing    - Status de digitação
SEND /app/chat        - Enviar mensagem
```

## 📦 Estrutura do Projeto

```
furia-challenge/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── .env
│   └── pom.xml
└── FuriaApp/
    ├── screens/
    ├── components/
    ├── config/
    ├── theme/
    └── package.json
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor
**Keven Santos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Keven-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/keven-santos-430849201/)
[![Email](https://img.shields.io/badge/Email-keven.moraes.dev%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:keven.moraes.dev@gmail.com)

---

Feito com 💜 por um torcedor da FURIA. 🇧🇷
