import {ReservationFromBookings} from '../entities/reservationFromBookings'
import {Reservation} from '~/src/app/bookings/domain/dto/getBookingDto'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import {DailyRates} from '~/interfaces/Booking/Category.interface'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'

export default function ReservationFromBookingsFactory(
  roomSource: ReservationsDto,
  roomDetailSource: Reservation,
  rates: DailyRates[]
): ReservationFromBookings {
  return {
    roomSelected: {
      selectedOption: {
        rate: Number(roomSource.balance),
        code: roomDetailSource.ContractCategory
      },
      selectedCategory: {
        RealCode: roomDetailSource.Rm_type,
        title: roomSource.resort,
        recnum: roomDetailSource.Recnum.toString()
      },
      dailyRates: rates,
      selectedRefundRate: Number(roomSource.Refundable)
    },
    benefits: [], // TODO: agregar beneficios para el resumen mostrado en payment-process
    guests: [
      {
        name: `${roomSource.first_name || ''} ${roomSource.last_name || ''}`,
        memberUtils: {
          firstname: roomSource.first_name || '',
          lastname: roomSource.last_name || ''
        }
      }
    ],
    roomsPax: {
      adults: Number(roomDetailSource.Adult),
      children: Number(roomDetailSource.Child)
    },
    checkIn: roomDetailSource.Arv_date,
    checkOut: roomDetailSource.Depart_dt,
    Hotel: roomDetailSource.Hotel,
    index: 0,
    status: BookingStatus[roomSource.status as keyof typeof BookingStatus],
    folio: roomDetailSource.Folio,
    showDailyRates: true,
    balance: Number(roomSource.balance)
  }
}
