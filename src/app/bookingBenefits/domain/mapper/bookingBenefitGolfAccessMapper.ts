import {BookingBenefitGolfAccessDtoDatum} from '../dto/bookingBenefitGolfAccessDto'
import {BookingBenefitGolfAccessEntity} from '../entities/bookingBenefitGolfAccess'

export class BookingBenefitGolfAccessMapper {
  static map(
    bookingBenefitGolfAccesss: Array<BookingBenefitGolfAccessDtoDatum>
  ): Array<BookingBenefitGolfAccessEntity> {
    return bookingBenefitGolfAccesss
  }
}
