import {InfantsGrouped} from "app/booking/domain/mapper/infantGrouping";
import { GetAvailableCategoriesResponseDTO } from "./GetAvailableCategoriesResponseDTO";

export interface CleverRoomCode {
  code: string
  isLockOff: boolean
  lockoffType?: string
}
export interface RatesCleverPayloadDto {
  application: number | string
  company: number
  hotel: string
  checkInDate: number
  checkOutDate: number
  nights: number
  roomCodes: CleverRoomCode[]
  market: string
  country: string
  isRefundable: boolean
  isNational: boolean
  costType: boolean
  guestCd: string
  adult: number
  infants: InfantsGrouped
  rateType: string
  reservationCostType: string
  promotions: any[]
  availableReservationCategories?: GetAvailableCategoriesResponseDTO[]
}
