import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {BenefitsRepository} from '../domain/repositories/benefitsRepository'
import PayloadGetWeeksAndNightsPreferentials from '../domain/entities/payloadGetWeeksAndNightsPreferentials'
import ResponseGetWeeksAndNightsPreferentials from '../domain/entities/responseGetWeeksAndNightsPreferentials'
import {WeeksAndNightsPreferentialsMapper} from '../domain/mapper/weeksAndNightsPreferentialsMapper'
import PreferentialWeeksAndNightsDto from '../domain/dto/preferentialWeeksAndNightsDto'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetWeeksAndNightsPreferentialsUseCase
  implements
    UseCase<PayloadGetWeeksAndNightsPreferentials, Response<PreferentialWeeksAndNightsDto>>
{
  constructor(
    @inject(benefitsTypes.benefitsRepository)
    private readonly benefitsRepository: BenefitsRepository
  ) {}

  public async run(params: PayloadGetWeeksAndNightsPreferentials): Promise<any> {
    const {data} = await this.benefitsRepository.getWeeksAndNightsPreferentials(params)
    return WeeksAndNightsPreferentialsMapper.map(data?.data)
  }
}
