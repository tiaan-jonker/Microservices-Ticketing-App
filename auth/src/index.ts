import express from 'express'
import { json } from 'body-parser'
const colors = require('colors')

// Routes imports
import { currentUserRouter } from './routes/currentUser'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import { errorHandler } from './middlewares/errorHandler'

const server = express()
server.use(json())

// Routes
// Users
server.use('/api/v1/users', currentUserRouter)
server.use('/api/v1/users', signinRouter)
server.use('/api/v1/users', signoutRouter)
server.use('/api/v1/users', signupRouter)

// Error handling
server.use(errorHandler)

// Port config
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port: ${PORT}`))
})
