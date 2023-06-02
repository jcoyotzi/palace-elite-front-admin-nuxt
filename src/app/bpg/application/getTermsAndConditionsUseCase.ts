import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetTermsAndConditionsUseCase implements UseCase<any, Response<Response<any>>> {
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(port: {application: string, company: number}): Promise<Response<Response<any>>> {
    return await this.bpgRepository.getTermsAndConditions(port.application, port.company)
  }
}
