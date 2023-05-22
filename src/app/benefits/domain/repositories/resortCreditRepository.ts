import {ResortCreditDTO} from '../dto/resortCreditDto'
import {Response} from '~/src/app/common/domain/entities/response'

export interface ResortCreditsRepository {
  getResortCreditActivities(resort: string): Promise<Response<ResortCreditDTO>>
}
