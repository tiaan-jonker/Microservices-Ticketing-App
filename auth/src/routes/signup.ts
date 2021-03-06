import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateReq } from '../middlewares/validateReq'
import { User } from '../models/user'
import { BadRequestError } from '../errors/badRequestError'

const router = express.Router()

// @route   POST api/v1/users/signup
// @desc    Register a new user route
// @access  Public
// @endpoint ticketing.dev/api/v1/users/signup

// auth steps
// 1. email already exists: respond with error
// 2. does not exist: create new user and save to DB
// 3. hash password (don't save password in plain text) -> in utils/passwordHash.ts
// 4. perform hashing in the model
// 5. then log-in: send back cookie/jwt/other

// for other services the user would need to be authed. However,
// with sync req there is the issue of the auth service being down
// solution is 'teach' each service to if user is authed. No reliance on auth service

router.post(
  '/signup',
  [
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password length must be between 6 and 20 characters')
      .trim()
      .isLength({ min: 6, max: 20 }),
  ],
  validateReq,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('User already exists')
    }

    // Create new user then save
    const user = User.build({ email, password })
    await user.save()

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      // Type check in index.ts
      process.env.JWT_KEY!
    )

    // Store it on session obj
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }

// Other notes on JWT:
// take session cookie
// use base64decode to get jwt
// use jwt to decode with secret key
// need a way to share secret key between services
