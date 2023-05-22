import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import buildSearchTypes from '../../common/types/buildSearchTypes'
import {RewardNightDTO} from '../domain/dto/rewardNightDTO'
import {BuildSearchRepository} from '../domain/repository/buildSearchRepository'

@injectable()
export default class GetRewardNightsUseCase implements UseCase<string, any> {
  constructor(
    @inject(buildSearchTypes.buildSearchRepository)
    private readonly buildRepository: BuildSearchRepository
  ) {}

  async run(locale: string): Promise<RewardNightDTO | undefined> {
    const response = await this.buildRepository.getRewardNights(locale)
    return response.data
  }
}
