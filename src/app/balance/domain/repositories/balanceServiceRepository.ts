import {injectable, inject} from 'inversify'
import httpTypes from '../../../../../src/app/common/types/httpTypes'
import {BalanceDto} from '../dto/balanceDto'
import {ParamsBalanceEntity} from '../entities/paramsBalanceEntity'
import {BalanceMapper} from '../mapper/balanceMapper'
import {BalanceEntity} from '../entities/balanceEntity'
import {BalanceRepository} from './balanceRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
@injectable()
export default class BalanceServiceRepository implements BalanceRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpApi) {}

  async getBalance(params: ParamsBalanceEntity): Promise<BalanceEntity> {
    const response = await this.httpJs.get(
      `/payments/application/${params.affiliationId}/company/${params.company}?isNational=${params.isNational}`
    )
    // const response = await this.httpJs.get(`/payments?application.application=${params.affiliationId}&application.company=${params.company}&application.isNational=${params.isNational}`);
    // @ts-ignore
    return BalanceMapper.transform(response.data.data.Member as BalanceDto)
    // return await {
    //   paidDownpayment: 0,
    //   dueDownpayment: 0,
    //   totalDownpayment: 1,
    //   // Finnancing membership
    //   paidFinanciedMembership: 1,
    //   dueFinanciedMembership: 1,
    //   paidMonthlyPayments: 1,
    //   totalMonthlyPayments: 4,
    //   remainingMonthlyPayments: 1,
    //   totalFinanciedMembership: 1,
    //   // Totals
    //   paidTotal: 1,
    //   dueTotal: 1,
    //   membershipValue: 1,
    //   downpayment: 1,
    //   downpaymentBalance: 1
    // }
  }
}
