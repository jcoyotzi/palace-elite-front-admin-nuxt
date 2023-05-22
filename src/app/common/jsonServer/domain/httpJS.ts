import {Response} from '../../../common/domain/entities/response'
import {Payload} from '../../../common/domain/entities/payload'

export interface HttpJS {
  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
}
