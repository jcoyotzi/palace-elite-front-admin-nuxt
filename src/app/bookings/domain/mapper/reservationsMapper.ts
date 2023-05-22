import {PaginationReservations} from '../dto/paginationBookings'
import ReservationsDto from '../dto/reservationsDto'
import {BookingStatus} from '../enums/bookingStatus'

export class ReservationsMapper {
  public static map(
    pagination: PaginationReservations<ReservationsDto>
  ): PaginationReservations<ReservationsDto> {
    let mapper = pagination
    mapper.items = pagination.items.map(reservation => ({
      ...reservation,
      countDown:
        reservation.status === BookingStatus.ON_HOLD ||
        reservation.status === BookingStatus.PENDING,
      status:
        reservation.status === BookingStatus.PENDING
          ? BookingStatus.PENDING_PAYMENT
          : reservation.status,
      sendPaymentLink: false
    }))
    return mapper
  }
}
