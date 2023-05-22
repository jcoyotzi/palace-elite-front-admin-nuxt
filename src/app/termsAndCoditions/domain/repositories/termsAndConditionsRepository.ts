import {Response} from '@/src/app/common/domain/entities/response'
import { GetTermsAndConditionsDto } from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'

export interface TermsAndConditionsRepository {
  getTandC(code: string): Promise<Response<GetTermsAndConditionsDto>>
}