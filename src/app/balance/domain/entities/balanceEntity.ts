export interface BalanceEntity {
  // Downpayment
  paidDownpayment: number
  dueDownpayment: number | null
  totalDownpayment: number
  // Finnancing membership
  paidFinanciedMembership: number
  dueFinanciedMembership: number
  paidMonthlyPayments: number
  // Monthly payments
  totalMonthlyPayments: number
  totalFinanciedMembership: number
  remainingMonthlyPayments: number
  // Totals
  paidTotal: number
  dueTotal: number
  membershipValue: number
  //
  downpayment: number
  downpaymentBalance: number
  dueDate: string
}
