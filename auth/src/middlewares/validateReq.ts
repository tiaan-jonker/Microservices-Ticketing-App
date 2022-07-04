import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ReqValidationError } from './../errors/reqValidationError'

// produce errors
export const validateReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validate req object first
  const errors = validationResult(req)

  // if errors is not empty then true
  if (!errors.isEmpty()) {
    // rather than just throwing the generic Error
    throw new ReqValidationError(errors.array())
  }

  next()
}
