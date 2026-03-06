import mongoose from 'mongoose'

const agendamentoSchema = new mongoose.Schema({
  alunoId: { type: String, required: true },
  instrutorId: { type: String, required: true },
  data: { type: Date, required: true },
  horario: String,
  status: { type: String, enum: ['pendente','confirmado','concluído','cancelado'], default: 'pendente' },
  criadoEm: { type: Date, default: Date.now }
})

export default mongoose.model('Agendamento', agendamentoSchema)
