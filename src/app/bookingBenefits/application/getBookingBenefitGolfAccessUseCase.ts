import {inject, injectable} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingBenefitTypes from '../../common/types/bookingBenefitTypes'
import {BookingBenefitGolfAccessEntity} from '../domain/entities/bookingBenefitGolfAccess'
import {BookingBenefitGolfAccessRepository} from '../domain/repositories/bookingBenefitGolfAccessRepository'
import {BookingBenefitGolfAccessRequestDto} from '../domain/dto/bookingBenefitGolfAccessRequestDto'
import {BookingBenefitGolfAccessMapper} from '../domain/mapper/bookingBenefitGolfAccessMapper'

@injectable()
export default class GetBookingBenefitGolfAccessUseCase
  implements UseCase<BookingBenefitGolfAccessRequestDto, Array<BookingBenefitGolfAccessEntity>>
{
  constructor(
    @inject(bookingBenefitTypes.BookingBenefitGolfAccessRepository)
    private bookingBenefitGolfAccessRepository: BookingBenefitGolfAccessRepository
  ) {}

  async run(
    params: BookingBenefitGolfAccessRequestDto
  ): Promise<Array<BookingBenefitGolfAccessEntity>> {
    const response = await this.bookingBenefitGolfAccessRepository.get(params)
    return BookingBenefitGolfAccessMapper.map(response.data?.data || [])
  }
}
