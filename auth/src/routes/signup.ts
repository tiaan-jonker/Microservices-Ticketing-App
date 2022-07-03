import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { ReqValidationError } from '../errors/reqValidationError'
import { DBConnectionError } from '../errors/dbConnectionError'

const router = express.Router()

// @route   POST api/v1/users/signup
// @desc
// @access

// auth steps
// 1. email already exists: respond with error
// 2. does not exist: create new user and save to DB
// 3. hash password (don't save password in plain text)
// 4. then log-in: send back cookie/jwt/other
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

    const { name, email, password } = req.body

    console.log('Created a user')
    throw new DBConnectionError()

    res.send({ message: 'Success' })
  }
)

export { router as signupRouter }
