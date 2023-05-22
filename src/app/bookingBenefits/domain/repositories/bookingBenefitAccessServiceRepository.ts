import {inject, injectable} from 'inversify'
import {BookingBenefitAccessDto} from '../dto/bookingBenefitAccessDto'
import {BookingBenefitAccessRequestDto} from '../dto/bookingBenefitAccessRequestDto'
import {BookingBenefitAccessRepository} from './bookingBenefitAccessRepository'
import {HttpJS} from '~/src/app/common/jsonServer/domain/httpJS'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'

@injectable()
export default class BookingBenefitAccessServiceRepository
  implements BookingBenefitAccessRepository
{
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpJS) {}

  get(params: BookingBenefitAccessRequestDto): Promise<Response<BookingBenefitAccessDto>> {
    return this.httpJs.get(
      `/membership/private-transportation/application/${params.application}/company/${params.company}?request.isNational=${params.request.isNational}&request.hotel=${params.request.hotel}&request.arrivalDate=${params.request.arrivalDate}&request.departureDate=${params.request.departureDate}`
    )
  }
}
