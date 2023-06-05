import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetValidateAccessGroupUseCase
  implements UseCase<String, Response<Response<any[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<Response<Response<any[]>>> {
    return await this.bpgRepository.getValidateAccessGroup(application)
  }
}
