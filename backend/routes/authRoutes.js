import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'secret-insecure'

// Registrar novo usuário
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, type } = req.body
    if (!email || !password || !name || !type) {
      return res.status(400).json({ error: 'email, senha, nome e tipo são obrigatórios' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Usuário já existe' })
    }

    const hash = await bcrypt.hash(password, 10)
    const uid = new Date().getTime().toString() // simple uid

    const user = await User.create({
      uid,
      email,
      name,
      passwordHash: hash,
      type
    })

    res.json({ message: 'Usuário registrado com sucesso', uid: user.uid })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'email e senha são obrigatórios' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }
    const match = await bcrypt.compare(password, user.passwordHash || '')
    if (!match) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ uid: user.uid, type: user.type }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { uid: user.uid, email: user.email, name: user.name, type: user.type } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
