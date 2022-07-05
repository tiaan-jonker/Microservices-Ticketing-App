import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// for any service
// 1. incoming req with cookies and jwt in headers
// 2. middleware to extract JWT payload & set it on req.currentUser (this middleware)
// 3. middleware to reject req if the user is not logged in (see if !req.currentUser)

interface UserPayload {
  id: string
  email: string
}

declare global {
  // telling TS that inside of the express project
  namespace Express {
    // find the interface of request that is already defined inside there
    interface Request {
      // take interface and add additional property in there (which might or might not be signed in ?.)
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // make sure session obj is defined, or if jwt is not defined
  // if not logged in the continue on, but current user will be undefined
  if (!req.session?.jwt) {
    return next()
  }

  try {
    // (json web token, actual token)
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload

    req.currentUser = payload
  } catch (error) {}

  next()
}
