import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetInfoAffiliationUseCase implements UseCase<String, Response<any>> {
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(application: string): Promise<any> {
    return await this.bpgRepository.getInfoAffiliation(application)
  }
}
