import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {EliteProductsGolf} from '../domain/dto/eliteProductsGolf'

@injectable()
export default class GetEliteProductsGolfUseCase
  implements UseCase<any, Response<Response<EliteProductsGolf[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<Response<Response<EliteProductsGolf[]>>> {
    return await this.bpgRepository.getEliteProductsGolf(application)
  }
}
