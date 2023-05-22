import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import buildSearchTypes from '../../common/types/buildSearchTypes'
import { RequestRates, RoomRateData } from '../domain/dto/rewardNightDTO'
import { BuildSearchRepository } from '../domain/repository/buildSearchRepository'

@injectable()
export default class GetRoomRatesUseCase implements UseCase<RequestRates, any> {
  constructor(
    @inject(buildSearchTypes.buildSearchRepository)
    private readonly buildRepository: BuildSearchRepository
  ) {}

  async run(params: RequestRates): Promise<RoomRateData | undefined> {
    const response = await this.buildRepository.getRoomRates(params)
    return response.data
  }
}
