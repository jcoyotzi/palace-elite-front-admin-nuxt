import {injectable} from 'inversify'
import {AxiosApi, emptyResponse} from '../../axiosServer/axiosApi'
import { HttpApi } from '../domain/entity/httpApi'
import { Payload } from '~/src/app/common/domain/entities/payload'
import { Response } from '~/src/app/common/domain/entities/response'

@injectable()
@AxiosApi({
  url: process.env.strapiUrl!,
  headers: {
    global: {
      Authorization: process.env.strapiToken!
    }
  }
})
export class StrapiHttpApi implements HttpApi {
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }
}
