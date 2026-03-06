# AcadSoft - Sistema de Gerenciamento de Academia

Uma aplicação web completa para gerenciamento de academia onde usuários podem ser tanto clientes (alunos) quanto instrutores, com funcionalidades de agendamento, cadastro de exercícios e administração.

## 🎯 Funcionalidades

### Para Alunos
- ✅ Cadastro e autenticação
- ✅ Visualizar lista de instrutores
- ✅ Escolher seu instrutor
- ✅ Agendar atendimentos
- ✅ Visualizar histórico de agendamentos
- ✅ Gerenciar perfil

### Para Instrutores
- ✅ Cadastro e autenticação
- ✅ Definir horários de atendimento
- ✅ Gerenciar agenda de alunos
- ✅ Cadastrar exercícios personalizados
- ✅ Administrar lista de alunos
- ✅ Acompanhamento de treinos

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2** - Interface do usuário
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **HTML5 & CSS3** - Estrutura e estilo
- **JavaScript (ES6+)** - Lógica da aplicação
- Autenticação via JWT comunicado com backend

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Persistência de dados (Mongoose)
- **JSON Web Tokens (JWT)** - Autenticação

### Banco de Dados
- **MongoDB** - Pode ser rodado localmente ou em serviço gerenciado (Atlas)

### Scripts Utilitários
- **Python** - Scripts de análise, relatórios e automação

## 📁 Estrutura do Projeto

```
AcadSoft/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas (Login, Register, Dashboards)
│   │   ├── styles/          # Arquivos CSS
│   │   ├── utils/           # Funções utilitárias
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Arquivos estáticos
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Servidor Express
│   ├── routes/              # Rotas API
│   ├── controllers/         # Lógica dos endpoints
│   ├── middleware/          # Middlewares customizados
│   ├── models/              # Modelos de dados
│   ├── config/              # Configurações (MongoDB, etc.)
│   ├── server.js
│   └── package.json
│
├── python-scripts/          # Scripts Python
│   ├── requirements.txt     # Dependências Python
│   └── ...                  # Scripts de automação
│
├── docs/                    # Documentação (ex. SETUP_DATABASE.md)
├── .env.example            # Variáveis de ambiente (exemplo)
├── .gitignore
└── README.md
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+ e npm/yarn
- MongoDB rodando (local ou Atlas)

### 1. Configurar Banco de Dados MongoDB
O backend usa MongoDB para armazenar todos os dados da aplicação.
Você pode:

- Rodar localmente (ex: `docker run -p 27017:27017 mongo`)
- Utilizar um serviço gerenciado (Mongo Atlas, etc)

Defina a string de conexão em `MONGO_URI` no `.env` (veja o exemplo em
`.env.example`).

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo e abra-o:

   ```bash
   cp .env.example .env
   ```

2. Edite `.env` e preencha as variáveis necessárias (`MONGO_URI`,
   `JWT_SECRET`, `VITE_API_URL`, etc.).

3. Salve o arquivo e reinicie os servidores (frontend e backend).

### 3. Instalar Dependências

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

**Python (opcional):**
```bash
cd python-scripts
pip install -r requirements.txt
```

### 4. Executar a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

Para instruções detalhadas de configuração do banco, veja
`docs/SETUP_DATABASE.md`.
