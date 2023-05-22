import HttpStatusCode from './HttpStatusCode'
import {BaseError, ErrorType} from './baseError'

export default class Exception extends BaseError {
  readonly statusCode: HttpStatusCode

  constructor(
    statusCode: HttpStatusCode,
    errors?: ErrorType | ErrorType[],
    warnings?: ErrorType | ErrorType[]
  ) {
    super(errors, warnings)
    this.name = 'Exception'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, Exception.prototype)
  }
}
