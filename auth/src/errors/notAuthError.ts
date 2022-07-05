import { CustomError } from './customError'

export class NotAuthError extends CustomError {
  statusCode = 401
  message = 'Not authorized'

  constructor() {
    super('Not authorized')

    Object.setPrototypeOf(this, NotAuthError.prototype)
  }

  serializedErrors() {
    return [{ message: this.message }]
  }
}
