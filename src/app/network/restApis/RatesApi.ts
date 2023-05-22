import {injectable} from 'inversify'
import {AxiosApi, emptyResponse} from '../axiosServer/axiosApi'
import {HttpApi} from '../common/domain/entity/httpApi'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'

@injectable()
@AxiosApi({
  url: process.env.ratesApiUrl!,
  headers: {
    post: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  }
})
// @ts-ignore
export class RatesApi implements HttpApi {
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
