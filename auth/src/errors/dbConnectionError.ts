export class DBConnectionError extends Error {
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
