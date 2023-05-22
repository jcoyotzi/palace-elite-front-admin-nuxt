import {BaseError, ErrorType} from '../../../jsonServer/infrastructure/di/baseError'
import HttpStatusCode from '../../../jsonServer/infrastructure/di/HttpStatusCode'

export default class RatesException extends BaseError {
  readonly statusCode: HttpStatusCode
  constructor(
    statusCode: HttpStatusCode,
    errors?: ErrorType | ErrorType[],
    warnings?: ErrorType | ErrorType[]
  ) {
    super(errors, warnings)
    this.name = 'RatesException'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, RatesException.prototype)
  }
}
