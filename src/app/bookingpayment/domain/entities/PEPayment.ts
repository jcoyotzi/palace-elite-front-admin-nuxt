import {PaymentStatus} from '../enums/paymentStatus'
import {PERoom} from './room'
import { BookingStatus } from '~/src/app/bookings/domain/enums/bookingStatus'

export interface PEPayment {
  remaningBalance: number
  room: PERoom
  currency?: string
  status: PaymentStatus | BookingStatus
  roomIndex: number
  folio:number
}
