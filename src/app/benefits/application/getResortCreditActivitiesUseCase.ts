import {injectable, inject} from 'inversify'
import {Response} from '../../common/domain/entities/response'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {ResortCreditsRepository} from '../domain/repositories/resortCreditRepository'
import ActivityEntity from '../domain/entities/activityEntity'
import ResortCreditActivitiesMapper from '../domain/mapper/resortCreditActivitiesMapper'

@injectable()
export default class GetResortCreditsActivitiesUseCase
  implements UseCase<string, Response<ActivityEntity>>
{
  constructor(
    @inject(benefitsTypes.resortCreditRepository)
    private readonly resortCreditRepository: ResortCreditsRepository
  ) {}

  async run(resort: string): Promise<any> {
    const response = await this.resortCreditRepository.getResortCreditActivities(resort)
    return ResortCreditActivitiesMapper.transform(response.data?.data || [])
  }
}
