import {EventDataLayer} from './EventDataLayer'
import {RoomInfoDetail} from './RoomInfoDetail'

// Second Step - Event Services

export type ServicesDataLayer = EventDataLayer & {
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
  rooms: RoomInfoDetail[]
}
