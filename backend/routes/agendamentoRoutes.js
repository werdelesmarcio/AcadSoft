import { Router } from 'express'
import Agendamento from '../models/agendamento.js'

const router = Router()

// Criar agendamento
router.post('/', async (req, res) => {
  try {
    const { alunoId, instrutorId, data, horario } = req.body

    const agendamentoData = {
      alunoId,
      instrutorId,
      data,
      horario
    }

    const agendamento = await Agendamento.create(agendamentoData)
    res.json({ message: 'Agendamento criado com sucesso', agendamento })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar agendamentos do aluno
router.get('/aluno/:alunoId', async (req, res) => {
  try {
    const { alunoId } = req.params
    const agendamentos = await Agendamento.find({ alunoId }).lean()
    res.json(agendamentos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar agendamentos do instrutor
router.get('/instrutor/:instrutorId', async (req, res) => {
  try {
    const { instrutorId } = req.params
    const agendamentos = await Agendamento.find({ instrutorId }).lean()
    res.json(agendamentos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar status do agendamento
router.put('/:agendamentoId', async (req, res) => {
  try {
    const { agendamentoId } = req.params
    const { status } = req.body

    const agendamento = await Agendamento.findByIdAndUpdate(
      agendamentoId,
      { status },
      { new: true }
    )
    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' })
    }
    res.json({ message: 'Agendamento atualizado com sucesso', agendamento })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
