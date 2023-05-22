import {EventDataLayer} from './EventDataLayer'
import {RoomInfoDetail} from './RoomInfoDetail'

// Second Step - Event Payment Link

export type PaymentLinkDataLayer = EventDataLayer & {
  hotelName: string
  checkIn: string
  checkOut: string
  numberOfRooms: number
  numberOfGuests: number
  numberOfAdults: number
  numberOfChildren: number
  currencyCode: string
  nights: number
  totalRooms: number
  totalServices: number
  reservID: string
  rooms: RoomInfoDetail[]
}
