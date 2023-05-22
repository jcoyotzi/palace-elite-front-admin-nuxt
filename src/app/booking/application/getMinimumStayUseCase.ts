import {inject, injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'

@injectable()
export class GetMinimumStay implements UseCase<{application: string}, any> {
  constructor(
    @inject(bookingTypes.bookingRepository)
    private readonly bookingRepository: BookingRespository
  ) {}

  run(payload: {application: string}): Promise<any> {
    const result = this.bookingRepository.getMinimumStay(payload)
    return result
  }
}