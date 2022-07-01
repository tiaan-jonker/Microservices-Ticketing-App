import { Request, Response, NextFunction } from 'express'
import { ReqValidationError } from '../errors/reqValidationError'
import { DBConnectionError } from '../errors/dbConnectionError'

// Exported and used in index, this error message will get used
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ReqValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializedErrors() })
  }

  if (err instanceof DBConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializedErrors() })
  }

  res.status(400).send({
    // Error object makes the error message more meaningful
    message: err.message,
  })
}
