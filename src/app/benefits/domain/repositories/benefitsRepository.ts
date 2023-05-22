import PayloadGetWeeksAndNightsPreferentials from '../entities/payloadGetWeeksAndNightsPreferentials'
import PayloadGetWeeksProvitions from '../entities/payloadGetWeeksProvitions'
import {CardSummaryDto} from '../dto/cardSummaryDto'
import {Response} from '~/src/app/common/domain/entities/response'
export interface BenefitsRepository {
  getWalletSummarys(payload: string): Promise<Response<{data: CardSummaryDto}>>
  getWeeksProvitions(payload: PayloadGetWeeksProvitions): Promise<any>
  getWeeksAndNightsPreferentials(params: PayloadGetWeeksAndNightsPreferentials): Promise<any>
  getStrapiPreferential(): Promise<any>
  getWeeksAndNightsPreferentials(params: PayloadGetWeeksAndNightsPreferentials): Promise<any>
  getWalletUniversalCredits(params: string): Promise<any>
  getStrapiResortCreditPage(): Promise<any>
}
