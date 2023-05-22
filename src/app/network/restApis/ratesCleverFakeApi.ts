/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 10:16:46
 *
 */

import {injectable} from 'inversify'
import {AxiosApiFake, emptyResponseWithParams} from '../axiosServer/axiosApi'
import {HttpApi} from '../common/domain/entity/httpApi'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
@AxiosApiFake({
  url: process.env.ratesCleverApiUrl!,
  expected: {
    get: {
      status: 'Ok',
      code: 200,
      message: '',
      data: {
        currency: 'USD',
        pricesPerNight: [
          {
            date: '2022-09-22',
            price: 379,
            regularPrice: 541
          },
          {
            date: '2022-09-23',
            price: 379,
            regularPrice: 541
          },
          {
            date: '2022-09-24',
            price: 379,
            regularPrice: 541
          },
          {
            date: '2022-09-25',
            price: 379,
            regularPrice: 541
          }
        ],
        publicRate: 4652,
        total: 3535,
        preferentialRate: 3585,
        refundable: [
          {
            label: 'Preferential rate',
            price: 4468,
            value: 'preferential',
            checked: false
          },
          {
            label: 'Referal',
            price: 4760,
            value: 'referal',
            checked: false
          },
          {
            label: 'Imperial Week',
            price: 5760,
            value: 'imperial',
            checked: false
          }
        ],
        nonRefundable: [
          {
            label: 'Preferential rate',
            price: 3468,
            value: 'preferential',
            checked: false
          },
          {
            label: 'Referal',
            price: 3760,
            value: 'referal',
            checked: false
          },
          {
            label: 'Imperial Week',
            price: 3760,
            value: 'imperial',
            checked: false
          }
        ]
      }
    },
    statusCode: 200
  }
})
export class RatesCleverFakeApi implements HttpApi {
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
