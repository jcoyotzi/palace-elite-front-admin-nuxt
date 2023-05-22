import {BookingBenefitAccessDto} from '../dto/bookingBenefitAccessDto'
import {BookingBenefitAccessRequestDto} from '../dto/bookingBenefitAccessRequestDto'
import {Response} from '~/src/app/common/domain/entities/response'

export interface BookingBenefitAccessRepository {
  get(params: BookingBenefitAccessRequestDto): Promise<Response<BookingBenefitAccessDto>>
}
