import { ReservationInfo } from "~/src/app/booking/domain/entities/reservationInfo"

export interface BookingBenefitEntity {
  title: string
  description: string
  benefits: Array<StrapiBenefitEntity>
}

export interface StrapiBenefitEntity {
  benefitId: string
  capacityText: string
  chipText: boolean
  description: string
  moreDetails: string
  photo: string
  title: string
  maxUnits: number
  dependsOnOcupation: boolean
}

export interface Benefit extends StrapiBenefitEntity {
  price: Price
  roomData: ExternalRooms
  roomsData: Array<ExternalRooms>
  externalRooms: Array<ExternalRooms>
}

export interface Price {
  currency: string
  description: string
  price: number
  freeText: string
}

export interface SelectedBookingBenefits extends Omit<Benefit, 'price'> {
  benefitName: string
  units: number
  price: number
  currency?: string
  recNumPromo?: string
}

export interface EmitedSelectedBookingBenefits
  extends Omit<SelectedBookingBenefits, 'roomData' | 'externalRooms'> {}

export interface imperialGolfInfo {
  status: imperialStatus
  value: imperialResponse
}

export interface imperialResponse {
  golfType: string
  provisionType: string
  price?: number
}

enum imperialStatus {
  fulfilled = 'fulfilled',
  notFulfilled = 'notFulfilled',
}

export interface ExternalRooms extends Omit<ReservationInfo, 'benefits'> {
  id: number
  pax: number
  namePax: string
  categoryId: string
  benefits: Array<Benefit>
  reserveType?: string
  imperialGolfType: imperialGolfInfo
  units?: number
  hasGolfCompliance: boolean
  freeGolfPolicyWeeksCompliance: boolean
  paidGolfPolicyWeeksCompliance: boolean
  allInclusivePolicyWeeksCompliance: boolean
  eliteProduct: string
  eliteProductType: string
  costoElite?: number
  costoProvision?: number
}

export interface RoomBenefit {
  benefitId: string
  benefitName: string
  roomData: ExternalRooms
  unitPrice: number
  totalPrice: number
  recNumPromo?: string
}
