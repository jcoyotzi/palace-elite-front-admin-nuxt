import {injectable} from 'inversify'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import {HttpApi} from '../common/domain/entity/httpApi'
import AxiosServer from '../axiosServer/axiosServer'
import {JsonApiAbstract} from '~/src/app/network/restApis/jsonApiAbstract'

@injectable()
export class LegacyHttpApi implements HttpApi {
  private http: JsonApiAbstract

  constructor() {
    this.http = AxiosServer.init(process.env.LEGACY_URL!)
  }

  async delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return {}
  }

  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return this.http.get(url, {
      headers: payload?.headers,
      params: payload?.params
    })
  }

  async post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return {}
  }

  async put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return {}
  }
}
