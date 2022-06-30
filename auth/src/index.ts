import express from 'express'
import { json } from 'body-parser'
const colors = require('colors')

const PORT = process.env.PORT || 3000

const server = express()
server.use(json())

server.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port: ${PORT}`))
})
