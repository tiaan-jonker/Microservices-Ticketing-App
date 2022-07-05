import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router()

// @route   POST api/v1/users/signout
// @desc    Signin existing user
// @access  Public
// @endpoint ticketing.dev/api/v1/users/signout

// send back a header telling users browser to empty out cookie,
// this will remove jwt so no follow up requests are possible

router.post('/signout', (req: any, res: any) => {
  req.session = null

  res.send({})
})

export { router as signoutRouter }
