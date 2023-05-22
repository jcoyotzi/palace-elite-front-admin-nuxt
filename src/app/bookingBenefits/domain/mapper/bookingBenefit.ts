import {
  BookingBenefitDto,
  Benefits,
  StrapiBeneffitsFluffyAttributes
} from '../dto/bookingBenefitDto'
import {BookingBenefitEntity, StrapiBenefitEntity} from '../entities/bookingBenefit'

export class BookingBenefitMapper {
  static map(bookingBenefits: BookingBenefitDto[]): BookingBenefitEntity[] {
    return bookingBenefits.map(bookingBenefit => this.transform(bookingBenefit))
  }

  public static transform(bookingBenefit: BookingBenefitDto): BookingBenefitEntity {
    return {
      title: bookingBenefit.attributes.title,
      description: bookingBenefit.attributes.description,
      benefits: this.transformBenefitGroup(bookingBenefit.attributes.benefits.data)
    }
  }

  public static transformBenefitGroup(benefitGroup: Benefits['data']): StrapiBenefitEntity[] {
    return benefitGroup.map(benefit => this.transformBenefit(benefit.attributes))
  }

  public static transformBenefit(benefit: StrapiBeneffitsFluffyAttributes): StrapiBenefitEntity {
    return {
      benefitId: benefit.externalId,
      capacityText: benefit?.caption || '',
      chipText: benefit.recommended,
      moreDetails: benefit?.moreDetailsContent || '',
      photo: benefit.media.media.data.attributes.url,
      title: benefit.title,
      description: benefit.description,
      maxUnits: benefit.maxPax || 0,
      dependsOnOcupation: benefit.dependsOnOcupation || false
    }
  }
}
