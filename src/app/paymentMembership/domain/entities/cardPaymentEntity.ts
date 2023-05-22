export interface CardPaymentEntity {
  id?: number | string | null
  cardType?: string
  number?: string | number | null
  firstName?: string
  securityCode?: number | string
  expMM?: string
  expYY?: string
  termination?: string
  // For Amex
  country?: string
  address?: string
  city?: string
  state?: string
  zipcode?: string
}
