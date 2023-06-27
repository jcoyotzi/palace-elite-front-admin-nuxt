import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import GolfAccess from '../domain/entities/golfAccess'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetAccessGolfUseCase implements UseCase<QueryAffiliation, Response<Response<GolfAccess>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<Response<GolfAccess>>> {
    return await this.bpgRepository.getAccessGolf(query)
  }
}
