import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import BenefitsAdditionalsDto from '../domain/dto/getBenefitsAdditionalsDto'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import bpgTypes from '../../common/types/bpgTypes'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetBenefitsAdditionalsUseCase
  implements UseCase<QueryAffiliation, Response<BenefitsAdditionalsDto[]>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<BenefitsAdditionalsDto[]>> {
    const {data} = await this.bpgRepository.getBenefitsAdditionals(query)
    return data!
  }
}
