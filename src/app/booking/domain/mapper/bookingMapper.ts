import {BookingNowDto} from '../dto/bookingNowDto'
import {BookingEntity} from '../entities/bookingEntity'
import {RoomBookingEntity} from '../entities/roomBookingEntity'

export class BookingMapper {
  public static mapToBookingNowDto(booking: BookingEntity): BookingNowDto {
    return {
      affiliationId: booking.affiliateId,
      arrivalDate: new Date(booking.checkIn).valueOf(),
      departureDate: new Date(booking.checkOut).valueOf(),
      market: '',
      company: '',
      property: booking.propertyCode,
      adult: this.countPeople(booking.rooms, true),
      child: this.countPeople(booking.rooms, false)
    }
  }

  public static countPeople(rooms: RoomBookingEntity[], isAdult: boolean): number {
    let total = 0
    rooms.forEach(room => {
      total += isAdult ? room.adults : room.children
    })
    return total
  }
}
