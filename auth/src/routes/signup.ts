import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { ReqValidationError } from '../errors/reqValidationError'
import { DBConnectionError } from '../errors/dbConnectionError'

const router = express.Router()

// @route   POST api/v1/users/signup
// @desc
// @access
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
