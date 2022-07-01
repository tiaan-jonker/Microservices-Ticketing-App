import express from 'express'
import { json } from 'body-parser'
const colors = require('colors')

// Routes imports
const currentUser = require('./routes/currentUser')

const server = express()
server.use(json())

// Routes
server.use('/api/v1/users', currentUser)

// Port config
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port: ${PORT}`))
})
