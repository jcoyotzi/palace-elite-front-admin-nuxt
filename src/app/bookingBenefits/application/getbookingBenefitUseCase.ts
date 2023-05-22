import {injectable, inject} from 'inversify'
import {BookingBenefitEntity} from '../domain/entities/bookingBenefit'
import {BookingBenefitMapper} from '../domain/mapper/bookingBenefit'
import bookingBenefitTypes from '../../common/types/bookingBenefitTypes'
import UseCase from '../../common/application/UseCase'
import {BookingBenefitRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitRepository'

@injectable()
export default class GetBookingBenefitUseCase implements UseCase<null, BookingBenefitEntity[]> {
  constructor(
    @inject(bookingBenefitTypes.bookingBenefitRepository)
    private readonly bookingBenefitRepository: BookingBenefitRepository
  ) {}

  async run(): Promise<BookingBenefitEntity[]> {
    const response = await this.bookingBenefitRepository.get()
    const mapped = BookingBenefitMapper.map(response.data!.data || [])
    return mapped
  }
}
