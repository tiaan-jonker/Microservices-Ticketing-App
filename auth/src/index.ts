import { connectDB } from '../config/db'
import { server } from './app'
const colors = require('colors')

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    connectDB()
  } catch (error) {
    console.error(error)
  }

  // Port config
  const PORT = process.env.PORT || 3000

  server.listen(PORT, () => {
    console.log(colors.green.bold(`Server listening on port: ${PORT}`))
  })
}

startServer()
