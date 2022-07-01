import { ValidationError } from 'express-validator'
import { CustomError } from './customError'

// option #1 for type check
// interface CustomError {
//   statusCode: number
//   serializedErrors(): {
//     message: string
//     field?: string
//   }[]
// }
// add: implements CustomError at end of class extn.

// extending the class Error which is built into JS
export class ReqValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Error connecting to database')

    // only because a built-in class is being extended
    Object.setPrototypeOf(this, ReqValidationError.prototype)
  }

  serializedErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param }
    })
  }
}

/*
ValidationError array props:

(alias) type ValidationError = {
  param: '_error';
  msg: any;
  nestedErrors: ValidationError[];
  location?: undefined;
  value?: undefined;
} | {
  location: Location;
  param: string;
  value: any;
  msg: any;
  nestedErrors?: unknown[] | undefined;
}
*/
