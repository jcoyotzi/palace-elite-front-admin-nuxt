import {injectable, inject} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {DownloadBalanceEntity} from '../entities/downloadBalanceEntity'
import {ParamsDownloadBalanceEntity} from '../entities/paramsDownloadBalanceEntity'
import {DownloadBalanceRepository} from './downloadBalanceRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class DownloadBalanceServiceRepository implements DownloadBalanceRepository {
  constructor(@inject(httpTypes.apiUrl) private readonly httpJs: HttpApi) {}

  async getDownloadBalance(params: ParamsDownloadBalanceEntity): Promise<DownloadBalanceEntity> {
    const response = await this.httpJs.get(
      `reports/api/v1/reports/edocta?affiliationNumber=${params.affiliationId}&company=${params.company}&isNational=${params.isNational}`
    )
    // @ts-ignore
    return response.data.data.body
  }
}
