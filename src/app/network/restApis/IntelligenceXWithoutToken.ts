import {injectable} from 'inversify'
import {AxiosApi, emptyResponse} from '../axiosServer/axiosApi'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import {HttpApi} from '../common/domain/entity/httpApi'

@injectable()
@AxiosApi({
  url: process.env.intelligenceXApiUrl!,
  clasName: 'IXHttpApiWithoutToken',
  headers: {
    global: {
      'Content-Type': 'application/json'
    }
  }
})
export class IntelligenceXWithoutToken implements HttpApi {
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
