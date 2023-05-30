import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetAccessPropertiesUseCase
  implements UseCase<any, Response<Response<string[]>>>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(port: {application: string, company: number, isNational: number}): Promise<Response<Response<string[]>>> {
    return await this.bpgRepository.getAccessProperties(port.application, port.company, port.isNational)
  }
}
