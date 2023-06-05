/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 21 3:22:13
 *
 */

import Exception from '../common/domain/entity/Exception'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {Response} from '~/src/app/common/domain/entities/response'
import {ErrorType} from '~/src/app/network/common/domain/entity/baseError'

export interface AxiosExpectedResponse {
  get?: any
  post?: any
  put?: any
  delete?: any
  statusCode: number
  headers?: any
}

const proccessAxiosRequest = (
  url: string,
  method: string,
  expected: AxiosExpectedResponse,
  payload?: any
) => {
  const isError = expected.statusCode > 299

  let responseDto

  switch (method) {
    case 'get':
      responseDto = expected.get
      break
    case 'post':
      responseDto = expected.post
      break
    case 'put':
      responseDto = expected.put
      break
    case 'delete':
      responseDto = expected.delete
      break
    default:
      responseDto = expected.get
      break
  }

  if (!isError) {
    return {
      data: responseDto,
      errors: undefined,
      warnings: undefined,
      headers: expected.headers
    }
  }
  const eMessage = `Fake error status code: ${
    expected.statusCode
  } when try ${method.toUpperCase()} to ${url} with payload: ${payload}`
  const err: ErrorType = {
    category: 0,
    description: eMessage,
    msg: eMessage,
    code: expected.statusCode.toString()
  }

  throw new Exception(0, [err], [])
}

export class AxiosServerFake implements HttpApi {
  static init(baseUrl: string, expected: AxiosExpectedResponse) {
    return new AxiosServerFake(baseUrl, expected)
  }

  constructor(private readonly baseURL: string, private readonly expected: AxiosExpectedResponse) {}

  async get<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    const response = JSON.parse(JSON.stringify(this.expected))
    response.headers = payload?.headers
    return proccessAxiosRequest(url, 'get', response, payload)
  }

  async put<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    const response = JSON.parse(JSON.stringify(this.expected))
    response.headers = payload?.headers
    return proccessAxiosRequest(url, 'put', response, payload)
  }

  async post<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    const response = JSON.parse(JSON.stringify(this.expected))
    response.headers = payload?.headers
    return proccessAxiosRequest(url, 'post', response, payload)
  }

  async delete<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    const response = JSON.parse(JSON.stringify(this.expected))
    response.headers = payload?.headers
    return proccessAxiosRequest(url, 'delete', response, payload)
  }
}
