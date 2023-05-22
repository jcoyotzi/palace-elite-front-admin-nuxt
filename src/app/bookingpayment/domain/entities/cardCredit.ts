export interface PECreditCard {
  cardId: number
  cardNumber: string
  cardHolderName?: string
  expiryDate?: string
  cvv?: string
  selected?: boolean
  cardStamp: string
}
