import {NationalitiesDto} from './nationalities'

type input = {
  text: string
  value: string
}
export default interface BookingPaymentForm {
  nationalitie: NationalitiesDto
  holderName: string
  number: string
  expiration: string
  securityCode: string
  currency: string
  cardStamp?: string
  address?: string
  zip?: string
  state?:input
  city?: string
  country?: input
}
