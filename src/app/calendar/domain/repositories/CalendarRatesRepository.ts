import {RateServicePayloadDto} from '../../domain/dto/RateServicePayloadDto'
import {Response} from '../../../common/domain/entities/response'
import {Payload} from '../../../common/domain/entities/payload'
import {ResponseWithCollection} from '../../../calendar/domain/mappers/ResponseWithCollection'
import {RateServiceItem} from '../../../calendar/domain/entities/RateServiceItem'
export type LegacyRatesApiResponse = ResponseWithCollection<RateServiceItem>
export interface CalendarRatesRepository {
  getRates(
    payload: Payload<RateServicePayloadDto>,
    locale: string
  ): Promise<Response<LegacyRatesApiResponse>>
}
