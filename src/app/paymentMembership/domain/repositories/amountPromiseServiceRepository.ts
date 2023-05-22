import {injectable, inject} from 'inversify'
import httpTypes from '../../../../../src/app/common/types/httpTypes'
import {ParamsAmountPromiseEntity} from '../entities/paramsAmountPromiseEntity'
import {AmountPromiseEntity} from '../entities/amountPromisesEntity'
import {AmountPromiseRepository} from './amountPromiseRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
@injectable()
export default class AmountPromiseServiceRepository implements AmountPromiseRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpApi) {}

  async getAmountPromise(params: ParamsAmountPromiseEntity): Promise<number> {
    // return await this.httpJs.get(`/payments/application/${params.affiliationId}/company/${params.company}?isNational=${params.isNational}`);
    const amount = await this.httpJs.get(
      `/amount-promises/application/${params.application}/isNational/${params.isNational}/promises/${params.promises}`
    )
    return amount.data as number
  }
}
