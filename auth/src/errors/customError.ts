// similar to interface, but using class instead
// advantage of using the class definition in JS
// world
export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor() {
    super()

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializedErrors(): { message: string; field?: string }[]
}
