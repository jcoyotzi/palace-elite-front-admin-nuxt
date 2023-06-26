import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import MinimumStay from '../domain/entities/minimumStay'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetMinimumStayUseCase implements UseCase<QueryAffiliation, Response<Response<MinimumStay[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<Response<MinimumStay[]>>> {
    return await this.bpgRepository.getMinimumStay(query)
  }
}