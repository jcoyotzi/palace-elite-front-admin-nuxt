import {BookingEntity} from '../entities/bookingEntity'
import RoomFactory from './roomFactory'

export default function BookingFactory(): BookingEntity {
  return {
    affiliateId: '',
    propertyCode: '',
    operaId: '',
    checkIn: '',
    checkOut: '',
    rooms: RoomFactory(),
    roomsCopy: RoomFactory()
  }
}
