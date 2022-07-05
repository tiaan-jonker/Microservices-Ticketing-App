import express, { Request, Response } from 'express'
const router = express.Router()

// @route   GET api/v1/users/currentuser
// @desc    Signin existing user
// @access  Public
// @endpoint ticketing.dev/api/v1/users/currentuser

// current user steps

router.get('/currentuser', (req: any, res: any) => {
  res.send('Working')
})

export { router as currentUserRouter }
