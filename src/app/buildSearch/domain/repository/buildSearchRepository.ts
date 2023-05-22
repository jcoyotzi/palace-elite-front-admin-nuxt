import BuildSearchPageDto from '../dto/buildSearchPageDto'
import { RequestRates, RewardNightDTO, RoomRateData } from '../dto/rewardNightDTO'
import {Response} from '@/src/app/common/domain/entities/response'

export interface BuildSearchRepository {
  getBuildSearchPage(): Promise<Response<BuildSearchPageDto>>
  getRewardNights(locale: string): Promise<Response<RewardNightDTO>>
  getRoomRates(params: RequestRates): Promise<Response<RoomRateData>>
}
