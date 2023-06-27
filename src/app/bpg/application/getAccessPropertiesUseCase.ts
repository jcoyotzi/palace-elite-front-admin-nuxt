import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetAccessPropertiesUseCase implements UseCase<QueryAffiliation, Response<Response<string[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<Response<string[]>>> {
    return await this.bpgRepository.getAccessProperties(query)
  }
}
