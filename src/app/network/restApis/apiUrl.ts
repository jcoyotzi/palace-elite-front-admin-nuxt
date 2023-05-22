import {injectable} from 'inversify'
import {Auth} from 'aws-amplify'
import {AxiosApi, AxiosConfigAuthType, emptyResponse} from '../axiosServer/axiosApi'
import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import {HttpApi} from '../common/domain/entity/httpApi'

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c: string) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )
  return JSON.parse(jsonPayload)
}

function isValidTokenCognito(token: string) {
  if (!token) return false
  const now = Math.floor(Date.now() / 1000)

  const tokenData = parseJwt(token!)

  return tokenData.exp > now
}

const getTokenCognito = async (clasName: string, url: string): Promise<string> => {
  let token = localStorage.getItem('ACCESS_TOKEN')
  // console.log('token obtain', token)

  if (!isValidTokenCognito(token!)) {
    const session = await Auth.currentSession()
    const accessToken = session.getIdToken().getJwtToken()
    localStorage.setItem('ACCESS_TOKEN', accessToken)
  }
  token = localStorage.getItem('ACCESS_TOKEN')
  return token!
}

@injectable()
@AxiosApi({
  url: process.env.apiUrl!,
  clasName: 'ServerlessHttpApi',
  headers: {
    global: {
      'Content-Type': 'application/json'
    }
  },

  auth: {
    enable: true,
    type: AxiosConfigAuthType.BearerToken,
    getToken: getTokenCognito,
    isValidToken: isValidTokenCognito
  }
})
export class ApiUrl implements HttpApi {
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
