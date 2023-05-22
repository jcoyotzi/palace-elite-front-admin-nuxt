import {injectable} from 'inversify'
import dayjs from 'dayjs'
import {AxiosApi, AxiosConfigAuthType, emptyResponse} from '../axiosServer/axiosApi'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import {HttpApi} from '../common/domain/entity/httpApi'

@injectable()
@AxiosApi({
  url: 'https://7lufx0yq8l.execute-api.us-east-1.amazonaws.com/EliteIntelligenceX/api/v1'
})
export class AmazonHttpApi implements HttpApi {
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
