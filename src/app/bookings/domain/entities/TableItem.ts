export interface BalanceInfoBookings {
  totalBalance: number
  totalBalanceText: string
  currency: string
  buttonText: string
  sendPaymentLinkText: string
}

export interface TableItemCardBookings {
  id: string
  status: string
  confirmationNumberText: string
  place: string
  userName: string
  from: Date | number
  to: Date | number
  roomSelectionSummary: string
  totalPayment: number
  totalPaymentText: string
  totalPaymentCurrency: string
  callToActionText: string
  isCallToActionOutlined: boolean
}

export interface TableItemBookings extends TableItemCardBookings {
  showPaymentLinkSlot: boolean
  CountdownText: string
  endTime: Date | number
}
