import { Payload } from "../../domain/entities/payload"
import { Response } from "../../domain/entities/response"

export interface HttpJS {
  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
}
