import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {ZonesMapper} from '../domain/mapper/zonesMapper'
import {GetAllZonesRequest} from '../domain/entities/strapiBpg'

@injectable()
export default class GetAllZonesUseCase implements UseCase<GetAllZonesRequest, Response<any>> {
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(request: GetAllZonesRequest): Promise<any> {
    const {data} = await this.bpgRepository.getAllZones(request)
    return ZonesMapper.map(data.data)
  }
}
