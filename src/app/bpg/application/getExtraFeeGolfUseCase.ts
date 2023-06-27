import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {ExtraFeeGolfDto} from '../domain/dto/extraFeeGolf'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetExtraFeeGolfUseCase implements UseCase<QueryAffiliation, Response<Response<ExtraFeeGolfDto[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<Response<ExtraFeeGolfDto[]>>> {
    return await this.bpgRepository.getExtraFeeGolf(query)
  }
}
