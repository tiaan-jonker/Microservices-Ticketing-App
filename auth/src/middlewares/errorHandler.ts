import { Request, Response, NextFunction } from 'express'

// Exported and used in index, this error message will get used
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Something went wrong', err)

  res.status(400).send({
    message: 'Something went wrong',
  })
}
