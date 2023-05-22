import {injectable, inject} from 'inversify'
import httpTypes from '../../../../../src/app/common/types/httpTypes'
import { HighDemandWeeks } from '../entities/cancelationsWeeksEntity'
import { CancelationsMapper } from '../mapper/cancelationsMapper'
import { CancelationsRepository } from './cancelationsRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class CancelationsRepositoryService implements CancelationsRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  async getWeeks(): Promise<HighDemandWeeks> {
    const response = await this.httpJs.get(
      `/api/pe-weeks`
    )
    // @ts-ignore
    return CancelationsMapper.transform(response.data)

  }
}
