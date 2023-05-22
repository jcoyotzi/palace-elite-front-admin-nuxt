import {Response} from '../../../common/domain/entities/response'
import {BookingBenefitResponseDto} from '../dto/bookingBenefitDto'

export interface BookingBenefitRepository {
  get(): Promise<Response<BookingBenefitResponseDto>>
}
