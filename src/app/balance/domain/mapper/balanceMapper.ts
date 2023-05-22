import {BalanceEntity} from '../entities/balanceEntity'
import {BalanceDto} from '../dto/balanceDto'

export class BalanceMapper {
  public static transform(balance: BalanceDto): BalanceEntity {
    return {
      // Downpayment
      paidDownpayment: balance.Down_escrow,
      dueDownpayment: 0,
      totalDownpayment: 0,
      // Financing membership
      paidFinanciedMembership: balance.Collect_prin,
      dueFinanciedMembership: balance.Remain_prin,
      totalFinanciedMembership: 0,
      // Monthly payments
      paidMonthlyPayments: balance.Pmts,
      totalMonthlyPayments: balance.Tot_pmts,
      remainingMonthlyPayments: 0,
      // Totals
      paidTotal: 0,
      dueTotal: 0,
      membershipValue: 0,
      //
      downpayment: balance.Down,
      downpaymentBalance: balance.Down_bal,
      dueDate: balance.First
    }
  }
}
