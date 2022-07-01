const express = require('express')
const router = express.Router()

router.post('/signout', (req: any, res: any) => {
  res.send('Working')
})

export { router as signoutRouter }
