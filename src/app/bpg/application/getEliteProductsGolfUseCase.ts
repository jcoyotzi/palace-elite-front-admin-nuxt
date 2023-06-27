import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {EliteProductsGolf} from '../domain/dto/eliteProductsGolf'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetEliteProductsGolfUseCase implements UseCase<QueryAffiliation, Response<Response<EliteProductsGolf[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<Response<EliteProductsGolf[]>>> {
    return await this.bpgRepository.getEliteProductsGolf(query)
  }
}
