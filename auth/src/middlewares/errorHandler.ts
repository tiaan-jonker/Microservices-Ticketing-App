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
    // see reqValidationErrors; with subclass all
    // props become available; arr is returned
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })

    return res.status(400).send({ errors: formattedErrors })
  }

  if (err instanceof DBConnectionError) {
    return res.status(500).send({ errors: [{ message: err.message }] })
  }

  res.status(400).send({
    // Error object makes the error message more meaningful
    message: err.message,
  })
}
