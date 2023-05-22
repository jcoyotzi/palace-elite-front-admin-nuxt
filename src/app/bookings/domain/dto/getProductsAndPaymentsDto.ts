export interface PromotionsAndProduct {
  description: string
  amount: number
  type: string
}

export interface PaymentMethod {
  type: string
  date: string
  amount: number
  cardNumber: string
}

export interface GetProductsAndPaymentsDto {
  supplementFee: number
  promotionsAndProducts: PromotionsAndProduct[]
  paymentMethods: PaymentMethod[]
}
