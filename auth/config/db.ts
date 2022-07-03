import mongoose from 'mongoose'
const colors = require('colors')

const connectDB = async () => {
  try {
    // check auth-mongo-depl for uri
    const conn = await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error: any) {
    console.error(colors.cyan.bold(`Database error: ${error.message}`))
    process.exit(1)
  }
}

export { connectDB }
