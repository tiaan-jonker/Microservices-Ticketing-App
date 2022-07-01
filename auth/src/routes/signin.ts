const express = require('express')
const router = express.Router()

router.post('/signin', (req: any, res: any) => {
  res.send('Working')
})

export { router as signinRouter }
