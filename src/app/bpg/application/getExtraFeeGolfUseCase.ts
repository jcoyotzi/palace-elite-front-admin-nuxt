import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {ExtraFeeGolfDto} from '../domain/dto/extraFeeGolf'

@injectable()
export default class GetExtraFeeGolfUseCase
  implements UseCase<String, Response<Response<ExtraFeeGolfDto[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<Response<Response<ExtraFeeGolfDto[]>>> {
    return await this.bpgRepository.getExtraFeeGolf(application)
  }
}
