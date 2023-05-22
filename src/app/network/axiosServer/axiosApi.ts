import {AxiosExpectedResponse, AxiosServerFake} from './axiosServerFake'
import AxiosServer from './axiosServer'
import {Payload} from 'app/common/domain/entities/payload'
import {Response} from 'app/common/domain/entities/response'

import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

export interface AxiosGlobalHeaders {
  global: any
}

export interface AxiosHeaders {
  get?: any
  post: any
  put?: any
  delete?: any
}

export type AxiosApiHeaders = AxiosGlobalHeaders | AxiosHeaders | undefined

export const enum AxiosConfigAuthType {
  NoAuth,
  BearerToken
}

export interface AxiosConfigAuth {
  enable: boolean
  type: number
  getToken?: Function
  isValidToken?: Function
}

export interface AxiosConfig {
  url: string
  headers?: AxiosApiHeaders
  auth?: AxiosConfigAuth
  clasName?: string
}

export interface AxiosConfigFake extends AxiosConfig {
  expected: AxiosExpectedResponse
}

// TODO Move methods to another file or files to reach SRP
export function emptyResponse<U>(): Promise<Response<U>> {
  const r: Response<U> = {}
  return Promise.resolve(r)
}

export function emptyResponseWithParams<U>(url: string, payload?: any): Promise<Response<U>> {
  const r: Response<U> = {}
  const notUsed = {
    url,
    payload
  }
  if (notUsed.url === undefined) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      message: 'On order to get response from api we need a correct url'
    })
  }
  return Promise.resolve(r)
}

const castAxiosHeaders = (headers: AxiosApiHeaders): AxiosHeaders | undefined => {
  if (headers === undefined) {
    return undefined
  }
  if ('global' in headers) {
    return {
      get: headers.global,
      post: headers.global,
      put: headers.global,
      delete: headers.global
    }
  }

  return headers
}

const getBearerTokenFromLocalStorageFake = async (
  name: string,
  getToken: Function,
  url: string
): Promise<string> => {
  // Responsibility: Manage from local storage the Token and check expiration.
  // if token from LocalStorage not exists or is expired
  const token = await getToken(name, url)
  if (token === '') {
    return 'Bearer TOKENFAKEFORTESTINGPURPOSES' + name
  }
  return token
}

const castAxiosAuthFromLocalStorageTesting = async (
  auth: AxiosConfigAuth,
  clasName: string,
  getToken: Function,
  url: string
): Promise<string> => {
  if (auth.type === AxiosConfigAuthType.BearerToken) {
    return getBearerTokenFromLocalStorageFake(clasName, getToken, url)
  }
  return ''
}
const castAxiosAuthFromLocalStorageClient = async (
  auth: AxiosConfigAuth,
  clasName: string,
  getToken: Function,
  isValidToken: Function,
  url: string
): Promise<string> => {
  let token = localStorage.getItem(clasName)
  if (token === undefined || token === null) {
    token = await getToken(clasName, url)
    localStorage.setItem(clasName, token!)
  }

  const isValid = isValidToken(token)

  if (!isValid) {
    token = await getToken(clasName, url)
    localStorage.setItem(clasName, token!)
  }
  if (auth.type === AxiosConfigAuthType.BearerToken) {
    return `Bearer ${token}`
  }
  return token!
}

const castAxiosAuthFromLocalStorage = (config: AxiosConfig, clasName: string): Function => {
  const emptyFunction = async (_headers: AxiosApiHeaders): Promise<string> => {
    return ''
  }

  const hasAuth = 'auth' in config
  if (!hasAuth) {
    return emptyFunction
  }
  const {auth} = config

  if (!auth?.enable) {
    return emptyFunction
  }

  return async (): Promise<string> => {
    const getToken = auth.getToken === undefined ? emptyFunction : auth.getToken
    const isValidToken = auth.isValidToken === undefined ? emptyFunction : auth.isValidToken
    if (clasName.includes('Fake')) {
      return castAxiosAuthFromLocalStorageTesting(auth, clasName, getToken, config.url)
    }
    if (process.client) {
      return castAxiosAuthFromLocalStorageClient(auth, clasName, getToken, isValidToken, config.url)
    }
    return ''
  }
}

const statusCodeMiddleware = (config: AxiosConfig | AxiosConfigFake): void => {
  if ('expected' in config) {
    const code = config.expected.statusCode
    if (code > 299) {
      throw new Error(`Received status code: ${code}`)
    }
  }
}

function axiosServerClassDecoratorProcess(
  constructor: Function,
  config: AxiosConfig,
  axiosServer: HttpApi
) {
  const originalMethods = {
    get: constructor.prototype.get,
    post: constructor.prototype.post,
    put: constructor.prototype.put,
    patch: constructor.prototype.patch,
    delete: constructor.prototype.delete
  }

  const headers = castAxiosHeaders(config.headers)
  const authGetter = castAxiosAuthFromLocalStorage(config, constructor.name)

  // region Methods
  async function get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    statusCodeMiddleware(config)
    const h = headers?.get === undefined ? {} : headers?.get

    const authorization = await authGetter()
    if (authorization !== '') {
      h.Authorization = authorization
    }
    if (payload === undefined || payload.headers === undefined) {
      payload = {
        ...payload,
        headers: h
      }
    }

    if (originalMethods.get !== undefined) {
      await originalMethods.get(url, payload)
    }
    return axiosServer.get(url, payload)
  }

  async function put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    statusCodeMiddleware(config)
    const h = headers?.put
    const authorization = await authGetter()
    if (authorization !== '') {
      h.Authorization = authorization
    }
    if (payload === undefined || payload.headers === undefined) {
      payload = {
        ...payload,
        headers: h
      }
    }
    if (originalMethods.put !== undefined) {
      await originalMethods.put(url, payload)
    }
    return axiosServer.put(url, payload)
  }

  async function post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    statusCodeMiddleware(config)
    const h = headers?.post
    const authorization = await authGetter()
    if (authorization !== '') {
      h.Authorization = authorization
    }
    if (payload === undefined || payload.headers === undefined) {
      payload = {
        ...payload,
        headers: h
      }
    }
    if (originalMethods.post !== undefined) {
      await originalMethods.post(url, payload)
    }

    return axiosServer.post(url, payload)
  }

  async function del<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    statusCodeMiddleware(config)
    const h = headers?.delete
    const authorization = await authGetter()
    if (authorization !== '') {
      h.Authorization = authorization
    }
    if (payload === undefined || payload.headers === undefined) {
      payload = {
        ...payload,
        headers: h
      }
    }
    if (originalMethods.delete !== undefined) {
      await originalMethods.delete(url, payload)
    }
    return axiosServer.delete(url, payload)
  }

  // endregion

  constructor.prototype.get = get
  constructor.prototype.post = post
  constructor.prototype.put = put
  constructor.prototype.delete = del
  return constructor
}

export function AxiosApi(config: AxiosConfig) {
  return function (constructor: Function) {
    const axiosServer = new AxiosServer(config.url)
    axiosServerClassDecoratorProcess(constructor, config, axiosServer)
  }
}

export function AxiosApiFake(config: AxiosConfigFake) {
  return function (constructor: Function) {
    const axiosServer = new AxiosServerFake(config.url, config.expected)
    axiosServerClassDecoratorProcess(constructor, config, axiosServer)
  }
}
