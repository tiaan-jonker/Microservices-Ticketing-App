export class DBConnectionError extends Error {
  message = 'Error connecting to database'

  constructor() {
    super()

    Object.setPrototypeOf(this, DBConnectionError.prototype)
  }
}
