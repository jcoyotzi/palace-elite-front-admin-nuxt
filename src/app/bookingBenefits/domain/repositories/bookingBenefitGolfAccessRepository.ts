import {BookingBenefitGolfAccessDto} from '../dto/bookingBenefitGolfAccessDto'
import {BookingBenefitGolfAccessRequestDto} from '../dto/bookingBenefitGolfAccessRequestDto'
import {Response} from '~/src/app/common/domain/entities/response'

export interface BookingBenefitGolfAccessRepository {
  get(params: BookingBenefitGolfAccessRequestDto): Promise<Response<BookingBenefitGolfAccessDto>>
}
