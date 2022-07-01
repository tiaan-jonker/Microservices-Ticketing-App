import express from 'express'
import { json } from 'body-parser'
const colors = require('colors')

const PORT = process.env.PORT || 3000

const server = express()
server.use(json())

server.get('/api/v1/users/currentuser', (req, res) => {
  res.send('It is working')
})

server.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port: ${PORT}`))
})
