import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import instrutorRoutes from './routes/instrutorRoutes.js'
import alunoRoutes from './routes/alunoRoutes.js'
import agendamentoRoutes from './routes/agendamentoRoutes.js'
import { authenticate } from './middleware/auth.js'

dotenv.config()

import { connectMongo } from './config/mongo.js'

const app = express()
const PORT = process.env.BACKEND_PORT || 5000

// conectar ao MongoDB
await connectMongo()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
// protected routes require JWT
app.use('/api/users', authenticate, usersRoutes)
app.use('/api/instrutor', authenticate, instrutorRoutes)
app.use('/api/aluno', authenticate, alunoRoutes)
app.use('/api/agendamentos', authenticate, agendamentoRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
