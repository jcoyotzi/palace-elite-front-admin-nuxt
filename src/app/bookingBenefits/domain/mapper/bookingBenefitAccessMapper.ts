import {PrivateTransportation, BookingBenefitAccessLabelDto} from '../dto/bookingBenefitAccessDto'
import {BookingBenefitAccessEntity} from '../entities/bookingBenefitAccess'

export class BookingBenefitAccessMapper {
  static map(bookingBenefitAccesss: Array<PrivateTransportation>): BookingBenefitAccessEntity[] {
    return bookingBenefitAccesss.map(bookingBenefitAccess => this.transform(bookingBenefitAccess))
  }

  static transform(bookingBenefitAccess: PrivateTransportation): BookingBenefitAccessEntity {
    return {
      id: String(bookingBenefitAccess.Recnum),
      recNumPromo: String(bookingBenefitAccess.RecnumPromo),
      currency: 'USD',
      price: bookingBenefitAccess.Amount,
      description: BookingBenefitAccessLabelDto.description,
      freeText: 'To be confirmed'
    }
  }
}
