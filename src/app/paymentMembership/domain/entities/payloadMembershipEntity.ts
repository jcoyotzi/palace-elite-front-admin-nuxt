import {Payload} from '~/src/app/common/domain/entities/payload'
export interface UserMember {
  company: number | null
}

export interface QueryPayload {
  numMonthlys: number | string
  monthlyAmount: number | string
  downPayment?: number | string
  lateFee?: number | string
  exchangeRate?: number | string
  type?: string
}

export interface CardCreditPayload {
  id?: number | string | null
  amount: number
  currency: string
  cardType?: string
  number?: string | number | null
  firstName?: string
  middleName?: string
  lastName?: string
  lastName2?: string
  email?: string
  phone?: string
  paymentType?: string
  monthsInterestFree?: boolean | number
  securityCode?: string | number | null
  expMM?: string
  expYY?: string
  address?: string
  zipCode?: string
  state?: string
  stateMEX?: string | number
  stateUSA?: string | number
  stateCAN?: string | number
  city?: string
  country?: string
  countryISO3?: string
  language?: string
  district?: string
  municipality?: string
}

export interface PayloadMembershipDto {
  // postOnly: boolean,
  authId: string
  account: number
  transactionId: number
  merchantCode: string
  userMember: UserMember
  query: QueryPayload
  creditCard: CardCreditPayload
  isNational?: boolean | null
}

export interface PayloadMembershipPayment {
  affiliationId: string | null
  payload?: Payload<PayloadMembershipDto>
}
