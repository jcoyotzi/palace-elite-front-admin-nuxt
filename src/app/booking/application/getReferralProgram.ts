import {inject, injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import {ReferralProgram} from 'app/booking/domain/dto/referralProgram'
import {ReferralProgramRequest} from 'app/booking/domain/dto/referralProgramRequest'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'

@injectable()
export class GetReferralProgram implements UseCase<ReferralProgramRequest, ReferralProgram> {
  constructor(
    @inject(bookingTypes.bookingRepository) private readonly bookingRepository: BookingRespository
  ) {}

  async run(port: ReferralProgramRequest): Promise<ReferralProgram> {
    const result = await this.bookingRepository.getReferralProgram(
      port.market,
      port.applicationId,
      port.company,
      port.year
    )

    // @ts-ignore
    return result.data!.data
  }
}
