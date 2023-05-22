/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 10 / 7 1:56:9
 *
 */

import {injectable} from 'inversify'
import {AxiosApiFake, AxiosConfigAuthType, emptyResponseWithParams} from '../axiosServer/axiosApi'
import {HttpApi} from '../common/domain/entity/httpApi'
import {Payload} from 'app/common/domain/entities/payload'
import {Response} from 'app/common/domain/entities/response'

// TODO Move method to another file or files to reach SRP
const getTokenFake = (token: string): boolean => {
  return token.length > 0
}

const isValidToken = async (clasName: string, url: string): Promise<string> => {
  // console.log('Generando Token')
  // console.log(url)
  return '123456789TOKEN_DESDE_CONFIG_' + clasName
}

@injectable()
@AxiosApiFake({
  url: 'http://fake.api.example',
  headers: {
    post: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  },
  auth: {
    enable: true,
    type: AxiosConfigAuthType.BearerToken,
    getToken: getTokenFake,
    isValidToken
  },
  expected: {
    post: {
      status: 'Ok',
      code: 200,
      message: '',
      data: [
        {
          hello: 'world'
        }
      ],
      error: false,
      tag: ''
    },
    get: {
      status: 'Ok',
      code: 200,
      message: '',
      data: [
        {
          hello: 'world'
        }
      ],
      error: false,
      tag: ''
    },
    statusCode: 200
  }
})
export class ExampleAuthFakeApi implements HttpApi {
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload)
  }

  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload)
  }

  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload)
  }

  put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload)
  }
}
