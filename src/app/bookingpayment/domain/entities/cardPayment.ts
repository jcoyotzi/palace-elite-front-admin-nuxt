import {PECardPaymentType} from '../enums/cardPaymentType'
import {PECreditCard} from './cardCredit'
import {PEPayment} from './PEPayment'
export interface IPECardPayment {
  paymentType: PECardPaymentType
  payments: PEPayment[]
  cards: PECreditCard[]
  dueDate?: string
}

export interface CardSelected {
  id?: string
  firstName?: string
  number?: string
  termination?: string
  expMM?: string
  expYY?: string
  cardType: string
  securityCode: string
  address?: string
  state?: string
  country?: string
  zipcode?: string
  city?: string
}

export interface PayDetail {
  amountCreditCard: number
  amountUniversalCredits: number
  remaningBalance: number
  cardSelected: CardSelected | null
}
