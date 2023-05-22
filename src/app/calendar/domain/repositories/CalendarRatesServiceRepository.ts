import {injectable, inject} from 'inversify'
import {
  CalendarRatesRepository,
  LegacyRatesApiResponse
} from '../../domain/repositories/CalendarRatesRepository'
import {RateServicePayloadDto} from '../../domain/dto/RateServicePayloadDto'
import httpTypes from '../../../common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class CalendarRatesServiceRepository implements CalendarRatesRepository {
  constructor(@inject(httpTypes.ratesApi) private readonly http: HttpApi) {}

  getRates(
    payload: Payload<RateServicePayloadDto>,
    locale: string
  ): Promise<Response<LegacyRatesApiResponse>> {
    return this.http.post('/rateview/bookingengine', payload)
  }
}
