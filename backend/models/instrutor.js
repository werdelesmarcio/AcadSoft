import mongoose from 'mongoose'

const horarioSchema = new mongoose.Schema({
  diaSemana: String,
  horaInicio: String,
  horaFim: String
}, { _id: false })

const exercicioSchema = new mongoose.Schema({
  id: Number,
  nome: String,
  descricao: String,
  series: Number,
  repeticoes: Number,
  imagem: String,
  criadoEm: { type: Date, default: Date.now }
}, { _id: false })

const instrutorSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  especialidade: String,
  telefone: String,
  foto: String,
  horarios: [horarioSchema],
  exercicios: [exercicioSchema],
  alunos: [String], // array of aluno uid
  avaliacoes: [mongoose.Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Instrutor', instrutorSchema)
