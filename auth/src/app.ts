import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

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

export { server }
