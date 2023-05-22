import {NotRequired} from './TypeValidationsUtils'
import {Price} from './bookingBenefit'

export interface ExternalRooms {
  id: number
  pax: number
  namePax: string
}

export interface CardBenefitDetail {
  benefitId: string
  capacityText: NotRequired<string>
  chipText: boolean
  description: NotRequired<string>
  moreDetails: string
  photo: string
  price: Price
  title: string
  externalRooms: NotRequired<ExternalRooms[]>
}

export interface RoomData extends ExternalRooms {
  units: number
}

export interface TransportDetail extends CardBenefitDetail {
  maxUnits: number
}

export {NotRequired, TransportationUnits, isNotEmptyText} from './TypeValidationsUtils'
