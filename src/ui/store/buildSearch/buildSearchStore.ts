import {Store, Pinia} from 'pinia-class-component'
import {lazyInject} from '../../../container'
import { currentLocale } from '../../utils/currentLocaleByCookie'
import buildSearchTypes from '~/src/app/common/types/buildSearchTypes'
import GetBuildSearchPageUseCase from '~/src/app/buildSearch/aplication/getBuildSearchPageUseCase'
import { BuildSearchPageMapper } from '~/src/app/buildSearch/domain/meppers/buildSearchPageMapper'
import GetRewardNightsUseCase from '~/src/app/buildSearch/aplication/getRewardNightsUseCase'
import { RewardNightsMapper } from '~/src/app/buildSearch/domain/meppers/rewardNightsMapper'
import { IOffer, IRewardNight, RequestRates, RoomRate } from '~/src/app/buildSearch/domain/dto/rewardNightDTO'
import GetRoomRatesUseCase from '~/src/app/buildSearch/aplication/getRoomRatesUseCase'
import { RoomRateMapper } from '~/src/app/buildSearch/domain/meppers/roomRateMapper'

@Store({
  name: 'buildSearchStore'
})
export class BuildSearchStore extends Pinia {
  @lazyInject(buildSearchTypes.getBuildSearchPageUseCase)
  private readonly getBuildSearchPageUseCase!: GetBuildSearchPageUseCase

  @lazyInject(buildSearchTypes.getRewardNightsUseCase)
  private readonly getRewardNightsUseCase!: GetRewardNightsUseCase
  
  @lazyInject(buildSearchTypes.getRoomRatesUseCase)
  private readonly getRoomRatesUseCase!: GetRoomRatesUseCase

  private buildSearch: any = null
  private rewardNights: IRewardNight[] | null = null
  private roomRates: RoomRate[] | null = null
  private offers: IOffer[] | null = null

  async fetchBuildSearchPageStrapi() {
    const data = await this.getBuildSearchPageUseCase.run()

    if (data) {
      const pageMapper = BuildSearchPageMapper.mapBuildSearchPage(data)
      this.buildSearch = pageMapper
    }
    return data
  }
  
  async fetchRewardNights() {
    const data = await this.getRewardNightsUseCase.run(currentLocale())

    if (data) {      
      const nightsMapper = RewardNightsMapper.mapRewardNights(data)
      this.rewardNights = nightsMapper?? null
    }
    return data
  }
  
  async fetchRoomRates(params: RequestRates) {
    const data = await this.getRoomRatesUseCase.run(params)

    if (data) {
      this.roomRates = data.data
      const offersMapped = RoomRateMapper.mapRoomRates(data.data)
      this.offers = offersMapped?? null
    }
    return data
  }

  get buildSearchPage() {
    if (!this.buildSearch) this.fetchBuildSearchPageStrapi()
    return this.buildSearch
  }
  
  get rewardNightsResorts() {
    if (!this.rewardNights) this.fetchRewardNights()
    return this.rewardNights
  }
  
  get allOffers() {
    return this.offers
  }
}
