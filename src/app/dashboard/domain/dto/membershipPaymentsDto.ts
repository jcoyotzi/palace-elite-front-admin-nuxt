export interface Data {
  dueDate: string
  completedPayments: number
  totalPayments: number
  amount: number
}

export interface MembershipPaymentsDto {
  data: Data
  warnings: any[]
  errors: any[]
}
