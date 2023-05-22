import {Payload} from '../../../common/domain/entities/payload'
import {Response} from '../../../common/domain/entities/response'

export interface HttpRates {
  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
}
