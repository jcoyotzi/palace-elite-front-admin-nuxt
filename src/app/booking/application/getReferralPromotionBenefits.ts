import {inject, injectable} from 'inversify'
import {ReferralPromotionBenefitsRequest} from '../domain/dto/referralPromotionBenefitsRequest'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'

@injectable()
export class GetReferralPromotionBenefits
  implements UseCase<ReferralPromotionBenefitsRequest, any>
{
  constructor(
    @inject(bookingTypes.bookingRepository) private readonly bookingRepository: BookingRespository
  ) {}

  async run(port: ReferralPromotionBenefitsRequest): Promise<any> {
    const result = await this.bookingRepository.getReferralPromotionBenefits(
      port.application,
      port.arvDate
    )

    // @ts-ignore
    return result.data!.data
  }
}
