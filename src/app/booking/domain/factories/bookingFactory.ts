import {BookingEntity} from '../entities/bookingEntity'
import roomFactory, { roomForPayloadFactory } from './roomFactory'

export default function BookingFactory(): BookingEntity {
  return {
    affiliateId: '',
    propertyCode: '',
    operaId: '',
    checkIn: '',
    checkOut: '',
    rooms: roomFactory(),
    roomForPayload: roomForPayloadFactory()
  }
}
