const express = require('express')
const router = express.Router()

router.post('/signup', (req: any, res: any) => {
  res.send('Working')
})

export { router as signupRouter }
