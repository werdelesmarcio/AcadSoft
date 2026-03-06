import mongoose from 'mongoose'

const agendamentoSchema = new mongoose.Schema({
  id: Number,
  data: Date,
  horario: String,
  status: { type: String, enum: ['pendente','confirmado','concluído','cancelado'], default: 'pendente' }
}, { _id: false })

const medidaSchema = new mongoose.Schema({
  data: Date,
  peso: Number,
  altura: Number
}, { _id: false })

const alunoSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  idade: Number,
  objetivo: String,
  telefone: String,
  foto: String,
  instrutorId: String,
  agendamentos: [agendamentoSchema],
  historico: [mongoose.Schema.Types.Mixed],
  medidas: [medidaSchema],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Aluno', alunoSchema)
