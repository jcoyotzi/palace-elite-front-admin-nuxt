import {inject, injectable} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingBenefitTypes from '../../common/types/bookingBenefitTypes'
import {BookingBenefitAccessEntity} from '../domain/entities/bookingBenefitAccess'
import {BookingBenefitAccessRepository} from '../domain/repositories/bookingBenefitAccessRepository'
import {BookingBenefitAccessRequestDto} from '../domain/dto/bookingBenefitAccessRequestDto'
import {BookingBenefitAccessMapper} from '../domain/mapper/bookingBenefitAccessMapper'

@injectable()
export default class GetBookingBenefitAccessUseCase
  implements UseCase<BookingBenefitAccessRequestDto, Array<BookingBenefitAccessEntity>>
{
  constructor(
    @inject(bookingBenefitTypes.BookingBenefitAccessRepository)
    private bookingBenefitAccessRepository: BookingBenefitAccessRepository
  ) {}

  async run(params: BookingBenefitAccessRequestDto): Promise<Array<BookingBenefitAccessEntity>> {
    const response = await this.bookingBenefitAccessRepository.get(params)
    return BookingBenefitAccessMapper.map(response?.data?.data.PrivateTransportation || [])
  }
}
