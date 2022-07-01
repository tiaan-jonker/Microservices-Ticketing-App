import { CustomError } from './customError'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('Route not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializedErrors() {
    return [{ message: 'Not found' }]
  }
}
