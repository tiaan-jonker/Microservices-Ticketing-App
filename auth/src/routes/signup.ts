import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
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
  (req: Request, res: Response) => {
    // validate req object first
    const errors = validationResult(req)

    // if errors is not empty then true
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    console.log('Creating a user')

    res.send({ message: 'Success' })
  }
)

export { router as signupRouter }
