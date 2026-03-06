# AcadSoft - Instruções para Desenvolvimento

## Visão Geral

AcadSoft é uma aplicação web para gerenciamento de academias, com clientes (alunos) e instrutores. A autenticação é feita pelo backend usando JWT e todos os dados são armazenados em MongoDB.

## Arquitetura do Projeto

### 1. Frontend (React + Vite)
- **Localização**: `/frontend`
- **Porta**: 3000
- **Funcionalidades**:
  - Autenticação via API (JWT)
  - Dashboards para alunos e instrutores
  - Agendamento de aulas
  - Cadastro de exercícios
  - Gerenciamento de horários

### 2. Backend (Express + Node.js)
- **Localização**: `/backend`
- **Porta**: 5000
- **API RESTful** com endpoints para:
  - Autenticação (login/register)
  - Gerenciamento de usuários
  - Controle de agendamentos
  - Cadastro de exercícios
  - Gerenciamento de horários
- **Banco de dados**: MongoDB via Mongoose

### 3. Banco de Dados (MongoDB)
- Pode ser rodado localmente (`docker run -p 27017:27017 mongo`) ou em serviço gerenciado

### 4. Scripts Python
- **Localização**: `/python-scripts`
- Análise de dados
- Geração de relatórios
- Automação de tarefas

## Padrões de Código

### React Components
- Use componentes funcionais com Hooks
- Nomeie em PascalCase
- Coloque em `/src/components` ou `/src/pages`

### Express Routes
- Nomeie rotas em `/backend/routes`
- Use padrão RESTful
- Adicione middlewares em `/backend/middleware`
- Controllers em `/backend/controllers`

### Estilos
- CSS em `/src/styles`
- Use CSS Grid e Flexbox
- Variáveis CSS para cores e temas

### Estrutura de Dados
- Tipos de usuário: "aluno" e "instrutor"
- Status de agendamento: "pendente", "confirmado", "concluído", "cancelado"

## Como Contribuir

### Adicionar Nova Feature (Exemplo: Avaliações)

1. **Backend**:
   ```javascript
   // /backend/routes/avaliacaoRoutes.js
   // Criar endpoints POST/GET/PUT para avaliações
   ```

2. **Frontend**:
   ```jsx
   // /frontend/src/components/AvaliacaoForm.jsx
   // Criar componente React
   ```

3. **Database**:
   - Definir schema em `/backend/models`

4. **Testes**:
   - Testar endpoints com Postman
   - Testar UI no navegador

## Variáveis de Ambiente

Criar `.env` na raiz com:
```
# Backend
BACKEND_PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/acadsoft

# JWT Secret
JWT_SECRET=chave-super-secreta

# URLs
VITE_API_URL=http://localhost:5000/api
```

## Comandos Principais

```bash
# Frontend
cd frontend
npm install
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Backend
cd backend
npm install
npm run dev          # Desenvolvimento com nodemon
npm run start        # Produção

# Python
cd python-scripts
pip install -r requirements.txt
python seu_script.py
```

## Estrutura de Commits

Use prefixos claros:
- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração de código
- `test:` Testes

Exemplo: `feat: adicionar autenticação de instrutores`

## Dicas de Desenvolvimento

1. **Desenvolva com console aberto** (F12) para debugar
2. **Use Postman/Insomnia** para testar API
3. **React DevTools** para debugar componentes
4. **Netlify/Vercel** para deploy do frontend
5. **Heroku/Railway** para deploy do backend

## Próximas Implementações (Roadmap)

- [ ] Sistema de pagamento
- [ ] Notificações em tempo real (Socket.io)
- [ ] Testes unitários (Jest)
- [ ] CI/CD com GitHub Actions
- [ ] Progressivo Web App (PWA)
- [ ] Dark mode
- [ ] Integração com iCalendar
- [ ] Relatórios PDF
- [ ] Two-factor authentication

## Contatos e Suporte

Para dúvidas sobre a arquitetura, consulte o README.md na raiz do projeto.
