import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { PasswordManager } from '../utils/passwordHash'
import { validateReq } from '../middlewares/validateReq'
import { BadRequestError } from '../errors/badRequestError'

const router = express.Router()

// @route   POST api/v1/users/signin
// @desc    Signin existing user
// @access  Public
// @endpoint ticketing.dev/api/v1/users/signin

// auth signin steps
// 1. if no user with associated email then response with error
// 2. compare password of stored user with supplied password
// 3. if match then good
// 4. user now logged in, send JWT in a cookie

router.post(
  '/signin',
  [
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Please enter password').trim().notEmpty(),
  ],
  validateReq,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    // Generate JWT
    const existingUserJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      // Type check in index.ts
      process.env.JWT_KEY!
    )

    // Store it on session obj
    req.session = {
      jwt: existingUserJwt,
    }

    res.status(201).send(existingUser)
  }
)

export { router as signinRouter }
