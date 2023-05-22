import {injectable} from 'inversify'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import AxiosServer from '../axiosServer/axiosServer'
import {JsonApiAbstract} from '~/src/app/network/restApis/jsonApiAbstract'

@injectable()
export default class JsonServer implements JsonApiAbstract {
  private http: JsonApiAbstract

  constructor() {
    // @inject(httpTypes.axiosServer) private http: Http
    this.http = AxiosServer.init(process.env.jsonApiUrl!)
  }

  get<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    return this.http.get(url, payload)
  }

  put<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    return this.http.put(url, payload)
  }

  post<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    return this.http.post(url, payload)
  }

  delete<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    return this.http.delete(url, payload)
  }
}
