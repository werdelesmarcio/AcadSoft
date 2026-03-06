# Setup Database - AcadSoft

Guia rápido para configurar o banco de dados MongoDB usado pela aplicação.

## 📋 Pré-requisitos

- MongoDB instalado localmente ou conta em serviço gerenciado (Atlas, etc.)
- Node.js 16+ e npm/yarn

## 🔧 Passo 1: Rodar MongoDB localmente

Para desenvolvimento, o método mais simples é usar o Docker:

```bash
# iniciar um container MongoDB na porta padrão
docker run --name acadsoft-mongo -p 27017:27017 -d mongo:latest
```

Se você preferir instalar MongoDB diretamente no sistema, siga as instruções oficiais
para sua distribuição: https://docs.mongodb.com/manual/installation/

## 🔐 Passo 2: Configurar a string de conexão

O backend espera a variável de ambiente `MONGO_URI` apontando para o servidor.
No arquivo `.env` da raiz do projeto, copie o exemplo e ajuste conforme necessário:

```env
# backend
BACKEND_PORT=5000
NODE_ENV=development

# conexão MongoDB (exemplo local)
MONGO_URI=mongodb://localhost:27017/acadsoft

# segredo JWT
JWT_SECRET=sua_chave_secreta_aqui

# URL da API usada pelo frontend
VITE_API_URL=http://localhost:5000/api
```

Para usar um cluster Atlas, obtenha a string de conexão no painel do Atlas e cole
aqui; ela geralmente tem o formato:

```
MONGO_URI="mongodb+srv://usuario:senha@cluster0.xyz.mongodb.net/acadsoft?retryWrites=true&w=majority"
```

## ✅ Passo 3: Testar a aplicação

### Terminal 1 – Backend:

```bash
cd backend
npm install
npm run dev
```

O servidor deverá iniciar e exibir algo como:

```
Conectado ao MongoDB
Servidor rodando na porta 5000
```

### Terminal 2 – Frontend:

```bash
cd frontend
npm install
npm run dev
```

O Vite mostrará:

```
Local:   http://localhost:3000
```

Abra o navegador em http://localhost:3000 e crie uma conta para testar.

## 🧪 Troubleshooting

- **Erro de conexão com Mongo**: verifique se o serviço está rodando e se
  `MONGO_URI` está correta. Use `docker ps` ou `mongo --eval "db.stats()"`.
- **Credenciais inválidas ao logar**: o backend usa JWT; confira se o token
  chega no cabeçalho `Authorization: Bearer ...` nas requisições.
- **Página branca no frontend**: abra o console do navegador. Se houver
  erro de `VITE_API_URL` indefinida, atualize seu `.env` e reinicie.

## 🔒 Produção

Antes de fazer deploy:

1. Use um cluster MongoDB seguro e com autenticação.
2. Defina `NODE_ENV=production` e um `JWT_SECRET` forte.
3. Garanta que as variáveis de ambiente estejam configuradas no host.
4. Configure backups do banco de dados.

## 📚 Recursos Úteis

- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

