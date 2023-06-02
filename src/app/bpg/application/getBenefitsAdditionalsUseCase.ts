import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import BenefitsAdditionalsDto from '../domain/dto/getBenefitsAdditionalsDto'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import bpgTypes from '../../common/types/bpgTypes'

@injectable()
export default class GetBenefitsAdditionalsUseCase
  implements UseCase<String, Response<BenefitsAdditionalsDto[]>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<Response<BenefitsAdditionalsDto[]>> {
    const {data} = await this.bpgRepository.getBenefitsAdditionals(application)
    return data!
  }
}
