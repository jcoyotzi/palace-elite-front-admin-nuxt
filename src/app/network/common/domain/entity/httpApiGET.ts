import {Response} from '@/src/app/common/domain/entities/response'
import {Payload} from '@/src/app/common/domain/entities/payload'

export interface HttpApiGET {
  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>>
}
