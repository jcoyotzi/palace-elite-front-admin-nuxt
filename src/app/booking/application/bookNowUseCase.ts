import {inject, injectable} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingTypes from '../../common/types/bookingTypes'
import {BookingEntity} from '../domain/entities/bookingEntity'
import {BookingMapper} from '../domain/mapper/bookingMapper'
import {BookingRespository} from '../domain/repositories/bookingRepository'

@injectable()
export default class BookNowUseCase implements UseCase<BookingEntity, void> {
  constructor(
    @inject(bookingTypes.bookingRepository) private readonly bookingRepository: BookingRespository
  ) {}

  async run(booking: BookingEntity): Promise<void> {
    await this.bookingRepository.post(BookingMapper.mapToBookingNowDto(booking))
  }
}
