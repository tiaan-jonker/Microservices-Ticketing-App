import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router()

// @route   GET api/v1/users/currentuser
// @desc    Signin existing user
// @access  Public
// @endpoint ticketing.dev/api/v1/users/currentuser

// current user steps
// 1. currUser req either has jwt with cookie or not
// 2. check req.session.jwt if it exists
// 3. not set or invalid, return early (currentUser: null)
// 4. set and jwt valid, send back info stored inside JWT (payload)

// session cookie is included. If cookie is deleted the current user should be null

router.get('/currentuser', (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)

    res.send({ currentUser: payload })
  } catch (error) {
    res.send({ currentUser: null })
  }
})

export { router as currentUserRouter }
