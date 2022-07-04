import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/customError'

// Exported and used in index, this error message will get used
// capture errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializedErrors() })
  }

  res.status(400).send({
    // Error object makes the error message more meaningful
    message: err.message,
  })
}
