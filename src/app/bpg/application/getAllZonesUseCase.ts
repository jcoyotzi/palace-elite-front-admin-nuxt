import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {ZonesMapper} from '../domain/mapper/zonesMapper'
// import YearsAccessSuites from '../domain/entities/yearsAccessSuites'

@injectable()
export default class GetAllZonesUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(port: {locale: string, accessProperties: string[]}): Promise<any> {
    const {data} = await this.bpgRepository.getAllZones(port.locale, port.accessProperties)
    return ZonesMapper.map(data.data)
  }
}
