import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {BenefitsRepository} from '../domain/repositories/benefitsRepository'
import {UniversalCreditsDto} from '../domain/dto/universalCreditsDto'
import {UniversalCreditsMapper} from '../domain/mapper/universalCreditsMapper'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetWalletUniversalCreditsUseCase
  implements UseCase<String, Response<UniversalCreditsDto>>
{
  constructor(
    @inject(benefitsTypes.benefitsRepository)
    private readonly benefitsRepository: BenefitsRepository
  ) {}

  public async run(application: string): Promise<any> {
    const {data} = await this.benefitsRepository.getWalletUniversalCredits(application)

    return UniversalCreditsMapper.map(data.data)
  }
}
