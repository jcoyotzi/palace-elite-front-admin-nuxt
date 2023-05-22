import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import buildSearchPageDto from '../dto/buildSearchPageDto'
import { RequestRates, RewardNightDTO, RoomRateData } from '../dto/rewardNightDTO'
import { BuildSearchRepository } from './buildSearchRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'


// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars
import { nights } from './data/mockdata'

@injectable()
export default class BuildSearchServiceRepository implements BuildSearchRepository {
  constructor(
    @inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi,
    @inject(httpTypes.intelligenceXHttpApi) private readonly httpApi: HttpApi
  ) {}
  
  getBuildSearchPage(): Promise<Response<buildSearchPageDto>> {
    return this.httpJs.get(
      '/api/base-pages?populate=deep,5&filters[slug][$eq]=build-your-search'
    )
  }
  
  getRewardNights(locale: string): Promise<Response<RewardNightDTO>> {
    return this.httpJs.get(`/api/properties?populate=deep,3&locale=${locale}`)
  }
  
  getRoomRates({ begin, end, market, costType }: RequestRates): Promise<Response<RoomRateData>> {
    return this.httpApi.get(
      `/hotel/all-room-rates/travel-begin/${begin}/travel-end/${end}/market/${market}/reservation-cost-type/${costType}`
    )
  }
}
