/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 21 3:57:30
 *
 */

import {injectable, inject} from 'inversify'
import {
  CalendarRatesRepository,
  LegacyRatesApiResponse
} from '../../domain/repositories/CalendarRatesRepository'
import {RateServicePayloadDto} from '../../domain/dto/RateServicePayloadDto'
import httpTypes from '../../../common/types/httpTypes'
import {Response} from 'app/common/domain/entities/response'
import {Payload} from 'app/common/domain/entities/payload'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class CalendarRatesServiceFakeRepository implements CalendarRatesRepository {
  constructor(@inject(httpTypes.ratesApiFake) private readonly http: HttpApi) {}

  getRates(
    payload: Payload<RateServicePayloadDto>,
    locale: string
  ): Promise<Response<LegacyRatesApiResponse>> {
    return this.http.post('/rateview/bookingengine', payload)
  }
}
