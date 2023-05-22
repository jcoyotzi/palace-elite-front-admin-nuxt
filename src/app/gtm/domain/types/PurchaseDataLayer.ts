import {EventDataLayer} from './EventDataLayer'
import {RoomInfoDetail} from './RoomInfoDetail'

// Fourth Step - Event Purchase

export type PurchaseDataLayer = EventDataLayer & {
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
  revenue: number
  rooms: RoomInfoDetail[]
}
