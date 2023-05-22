import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import buildSearchTypes from '../../common/types/buildSearchTypes'
import BuildSearchPageDto from '../domain/dto/buildSearchPageDto'
import {BuildSearchRepository} from '../domain/repository/buildSearchRepository'

@injectable()
export default class GetBuildSearchPageUseCase implements UseCase<null, any> {
  constructor(
    @inject(buildSearchTypes.buildSearchRepository)
    private readonly buildRepository: BuildSearchRepository
  ) {}

  async run(): Promise<BuildSearchPageDto | undefined> {
    const response = await this.buildRepository.getBuildSearchPage()
    return response.data
  }
}
