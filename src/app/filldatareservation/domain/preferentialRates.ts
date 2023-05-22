import {NumProduct} from './numProduct'

interface Info {
  Reservations: boolean[]
}

export interface PreferentialRates {
  Contract: number[]
  CurrentContract: boolean[]
  CurrentProduct: boolean[]
  IPG: boolean
  IUG: boolean
  IsActive: boolean[]
  NumProduct: NumProduct
  Product: number
  changePaymentTypeNight: boolean
  changePaymentTypeWeek: boolean
  info: Info
}
