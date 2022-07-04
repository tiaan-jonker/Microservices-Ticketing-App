import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { User } from '../models/user'
import { ReqValidationError } from '../errors/reqValidationError'
import { DBConnectionError } from '../errors/dbConnectionError'
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

router.post(
  '/signup',
  [
    body('name', 'Name required').notEmpty(),
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password length must be between 6 and 20 characters')
      .trim()
      .isLength({ min: 6, max: 20 }),
  ],
  async (req: Request, res: Response) => {
    // validate req object first
    const errors = validationResult(req)

    // if errors is not empty then true
    if (!errors.isEmpty()) {
      // rather than just throwing the generic Error
      throw new ReqValidationError(errors.array())
    }

    //* Info from body
    const { name, email, password } = req.body

    // Check existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('User already exists')
    }

    // Create new user
    const user = User.build({ name, email, password })

    // Save new user
    await user.save()

    res.status(201).send(user)
  }
)

export { router as signupRouter }
