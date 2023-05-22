import {Store, Pinia} from 'pinia-class-component'
import {lazyInject} from '../../container'
import balanceTypes from '../../app/common/types/balanceTypes'
import GetBalanceUseCase from '../../app/balance/application/getBalanceUseCase'
import GetDownloadBalanceUseCase from '../../app/balance/application/getDownloadBalanceUseCase'
import {BalanceEntity} from '~/src/app/balance/domain/entities/balanceEntity'
import {ParamsBalanceEntity} from '~/src/app/balance/domain/entities/paramsBalanceEntity'
import {ParamsDownloadBalanceEntity} from '~/src/app/balance/domain/entities/paramsDownloadBalanceEntity'
@Store({
  name: 'balanceStore'
})
export class BalanceStore extends Pinia {
  @lazyInject(balanceTypes.getBalanceUseCase)
  private readonly getBalanceUseCase!: GetBalanceUseCase

  @lazyInject(balanceTypes.getDownloadBalanceUseCase)
  private readonly getDownloadBalanceUseCase!: GetDownloadBalanceUseCase

  balance: BalanceEntity = {
    paidDownpayment: 0,
    dueDownpayment: null,
    totalDownpayment: 0,
    // Finnancing membership
    paidFinanciedMembership: 0,
    dueFinanciedMembership: 0,
    paidMonthlyPayments: 0,
    totalMonthlyPayments: 0,
    remainingMonthlyPayments: 0,
    totalFinanciedMembership: 0,
    // Totals
    paidTotal: 0,
    dueTotal: 0,
    membershipValue: 0,
    downpayment: 0,
    downpaymentBalance: 0,
    dueDate: new Date().toISOString()
  }

  downloadBalanceBlob = ''

  isLoading = true
  hasError = false

  async getBalance(params: ParamsBalanceEntity) {
    try {
      const response = await this.getBalanceUseCase.run(params)
      this.balance = response
      this.isLoading = false
      this.hasError = false
    } catch (error) {
      this.isLoading = false
      this.hasError = true
    }
  }

  async getDownloadBalance(params: ParamsDownloadBalanceEntity) {
    return await this.getDownloadBalanceUseCase.run(params)
  }
}
