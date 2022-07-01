const express = require('express')
const router = express.Router()

router.get('/currentuser', (req: any, res: any) => {
  res.send('Working')
})

module.exports = router
