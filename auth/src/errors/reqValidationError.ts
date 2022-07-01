import { ValidationError } from 'express-validator'

// extending the class Error which is built into JS
export class ReqValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super()

    // only because a built-in class is being extended
    Object.setPrototypeOf(this, ReqValidationError.prototype)
  }
}
