import { CustomError } from './customError'

export class DBConnectionError extends CustomError {
  statusCode = 500
  message = 'Error connecting to database'

  constructor() {
    super()

    Object.setPrototypeOf(this, DBConnectionError.prototype)
  }

  serializedErrors() {
    return [{ message: this.message }]
  }
}
