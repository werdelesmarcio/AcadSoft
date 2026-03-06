import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

// Obter informações do usuário
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findOne({ uid: userId }).lean()
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar perfil do usuário
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const updateData = req.body

    const user = await User.findOneAndUpdate({ uid: userId }, updateData, { new: true })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    res.json({ message: 'Usuário atualizado com sucesso', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
