import {RoomBookingEntity, RoomBookingEntityForPayload} from './roomBookingEntity'

export interface BookingEntity {
  affiliateId: string
  propertyCode: string
  operaId: string
  checkIn: string // Format: yyyy-MM-DD
  checkOut: string // Format: yyyy-MM-DD
  rooms: RoomBookingEntity[]
  roomForPayload: RoomBookingEntityForPayload[]
}
