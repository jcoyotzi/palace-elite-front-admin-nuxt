import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import balanceTypes from '../../common/types/balanceTypes'
import {ParamsBalanceEntity} from '../domain/entities/paramsBalanceEntity'
import {BalanceEntity} from '../domain/entities/balanceEntity'
import {BalanceRepository} from '../domain/repositories/balanceRepository'

@injectable()
export default class GetBalanceUseCase implements UseCase<ParamsBalanceEntity, BalanceEntity> {
  constructor(
    @inject(balanceTypes.balanceRepository) private readonly balanceRepository: BalanceRepository
  ) {}

  async run(params: ParamsBalanceEntity): Promise<BalanceEntity> {
    const balance: BalanceEntity = await this.balanceRepository.getBalance(params)
    balance.dueDownpayment =
      balance.downpayment - (balance.paidDownpayment + balance.downpaymentBalance)
    balance.totalDownpayment = balance.paidDownpayment + balance.dueDownpayment
    balance.totalFinanciedMembership =
      balance.paidFinanciedMembership + balance.dueFinanciedMembership
    balance.remainingMonthlyPayments = balance.totalMonthlyPayments - balance.paidMonthlyPayments
    balance.paidTotal = balance.paidDownpayment + balance.paidFinanciedMembership
    balance.dueTotal = balance.dueDownpayment + balance.dueFinanciedMembership
    balance.membershipValue = balance.dueTotal + Math.abs(balance.paidTotal)

    return balance
  }
}
