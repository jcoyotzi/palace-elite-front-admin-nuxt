import {EventDataLayer} from './EventDataLayer'
import {RoomInfoDetail} from './RoomInfoDetail'

// First step - Event Room Data Layer

export type RoomsDataLayer = EventDataLayer & {
  hotelName: string
  checkIn: string
  checkOut: string
  numberOfRooms: number
  numberOfGuests: number
  numberOfAdults: number
  numberOfChildren: number
  currencyCode: string
  nights: number
  rooms: RoomInfoDetail[]
}
