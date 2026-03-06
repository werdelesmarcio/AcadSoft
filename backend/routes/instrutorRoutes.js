import { Router } from 'express'
import Instrutor from '../models/instrutor.js'

const router = Router()

// Registrar novo instrutor
router.post('/register', async (req, res) => {
  try {
    const { uid, email, name, especialidade, telefone, horarios } = req.body

    const instrutorData = {
      uid,
      email,
      name,
      especialidade,
      telefone,
      horarios: horarios || [], // Array de horários disponíveis
      exercicios: [],
      alunos: [],
      avaliacoes: []
    }

    await Instrutor.create(instrutorData)

    res.json({ message: 'Instrutor registrado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Obter instrutor
router.get('/:instrutorId', async (req, res) => {
  try {
    const { instrutorId } = req.params
    const instrutor = await Instrutor.findOne({ uid: instrutorId }).lean()
    if (!instrutor) {
      return res.status(404).json({ error: 'Instrutor não encontrado' })
    }
    res.json(instrutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar todos os instrutores
router.get('/', async (req, res) => {
  try {
    const instrutores = await Instrutor.find().lean()
    res.json(instrutores)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Adicionar exercício
router.post('/:instrutorId/exercicios', async (req, res) => {
  try {
    const { instrutorId } = req.params
    const { nome, descricao, series, repeticoes, imagem } = req.body

    const exercicio = {
      id: Date.now(),
      nome,
      descricao,
      series,
      repeticoes,
      imagem,
      criadoEm: new Date()
    }

    const instrutor = await Instrutor.findOneAndUpdate(
      { uid: instrutorId },
      { $push: { exercicios: exercicio } },
      { new: true }
    )

    if (!instrutor) {
      return res.status(404).json({ error: 'Instrutor não encontrado' })
    }

    res.json({ message: 'Exercício adicionado com sucesso', exercicio })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Adicionar horário de atendimento
router.post('/:instrutorId/horarios', async (req, res) => {
  try {
    const { instrutorId } = req.params
    const { diaSemana, horaInicio, horaFim } = req.body

    const horario = {
      diaSemana,
      horaInicio,
      horaFim
    }

    const instrutor = await Instrutor.findOneAndUpdate(
      { uid: instrutorId },
      { $push: { horarios: horario } },
      { new: true }
    )

    if (!instrutor) {
      return res.status(404).json({ error: 'Instrutor não encontrado' })
    }

    res.json({ message: 'Horário adicionado com sucesso', horario })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
