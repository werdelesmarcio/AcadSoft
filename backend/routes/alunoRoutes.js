import { Router } from 'express'
import Aluno from '../models/aluno.js'
import User from '../models/user.js'

const router = Router()

// Registrar novo aluno
router.post('/register', async (req, res) => {
  try {
    const { uid, email, name, idade, objetivo, telefone, instrutorId } = req.body

    const alunoData = {
      uid,
      email,
      name,
      idade,
      objetivo,
      telefone,
      instrutorId: instrutorId || null,
      agendamentos: [],
      historico: [],
      medidas: []
    }

    await Aluno.create(alunoData)
    
    // Atualizar documento de usuário
    await User.create({ uid, email, name, type: 'aluno' })

    res.json({ message: 'Aluno registrado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Obter aluno
router.get('/:alunoId', async (req, res) => {
  try {
    const { alunoId } = req.params
    const aluno = await Aluno.findOne({ uid: alunoId }).lean()
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }
    res.json(aluno)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Escolher instrutor
router.put('/:alunoId/instrutor', async (req, res) => {
  try {
    const { alunoId } = req.params
    const { instrutorId } = req.body

    const aluno = await Aluno.findOneAndUpdate(
      { uid: alunoId },
      { instrutorId },
      { new: true }
    )

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    res.json({ message: 'Instrutor selecionado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
