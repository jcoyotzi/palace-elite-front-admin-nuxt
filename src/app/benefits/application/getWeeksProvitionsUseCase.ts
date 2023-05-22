import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {BenefitsRepository} from '../domain/repositories/benefitsRepository'
import PayloadGetWeeksProvitions from '../domain/entities/payloadGetWeeksProvitions'
import CardProvitionDto from '../domain/dto/cardProvitionDto'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetWeeksProvitionsUseCase
  implements UseCase<PayloadGetWeeksProvitions, Response<CardProvitionDto>>
{
  constructor(
    @inject(benefitsTypes.benefitsRepository)
    private readonly benefitsRepository: BenefitsRepository
  ) {}

  async run(params: PayloadGetWeeksProvitions): Promise<any> {
    return await this.benefitsRepository.getWeeksProvitions(params)
  }
}
