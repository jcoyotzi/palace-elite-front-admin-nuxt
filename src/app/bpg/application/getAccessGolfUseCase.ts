import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import GolfAccess from '../domain/entities/golfAccess'

@injectable()
export default class GetAccessGolfUseCase
  implements UseCase<String, Response<Response<GolfAccess>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<Response<Response<GolfAccess>>> {
    return await this.bpgRepository.getAccessGolf(application)
  }
}
