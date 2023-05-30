import {Response} from '~/src/app/common/domain/entities/response'
import { Payload } from '~/src/app/common/domain/entities/payload'

export interface HttpApi {
  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
}
