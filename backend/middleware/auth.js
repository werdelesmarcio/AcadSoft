import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret-insecure'

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || ''
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token ausente' })
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await User.findOne({ uid: payload.uid }).lean()
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
