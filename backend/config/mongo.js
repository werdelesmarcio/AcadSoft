import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/acadsoft'

export const connectMongo = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Conectado ao MongoDB')
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message)
    process.exit(1)
  }
}

export default mongoose
