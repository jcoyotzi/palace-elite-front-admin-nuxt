import {inject, injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'
import PayloadGetReservation from '../domain/dto/payloadGetReservation'

@injectable()
export class GetReservationUseCase implements UseCase<PayloadGetReservation, any> {
  constructor(
    @inject(bookingTypes.bookingRepository) private readonly bookingRepository: BookingRespository
  ) {}

  async run(payload: PayloadGetReservation): Promise<any> {
    return await this.bookingRepository.getReservation(payload)
  }
}
