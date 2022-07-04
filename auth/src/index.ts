import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
const colors = require('colors')
import cookieSession from 'cookie-session'
import { connectDB } from '../config/db'

// Routes imports
import { currentUserRouter } from './routes/currentUser'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import { errorHandler } from './middlewares/errorHandler'
import { NotFoundError } from './errors/notFoundError'

const server = express()
const baseApiV1 = '/api/v1/users'
// Express sees things are proxyd, but behind nginx and ingress
// set Express to trust proxy
server.set('trust proxy', true)
server.use(json())
// Disabling cookie encryption as JWT handles that
server.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)

// Routes
server.use(baseApiV1, currentUserRouter)
server.use(baseApiV1, signinRouter)
server.use(baseApiV1, signoutRouter)
server.use(baseApiV1, signupRouter)

server.all('*', async (req, res) => {
  throw new NotFoundError()
})
// Error handling
server.use(errorHandler)

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
