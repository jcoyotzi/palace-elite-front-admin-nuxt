import {inject, injectable} from 'inversify'
import {BookingBenefitGolfAccessDto} from '~/src/app/bookingBenefits/domain/dto/bookingBenefitGolfAccessDto'
import {BookingBenefitGolfAccessRequestDto} from '~/src/app/bookingBenefits/domain/dto/bookingBenefitGolfAccessRequestDto'
import {BookingBenefitGolfAccessRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitGolfAccessRepository'
import {HttpJS} from '~/src/app/common/jsonServer/domain/httpJS'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'

@injectable()
export default class BookingBenefitGolfAccessServiceRepository
  implements BookingBenefitGolfAccessRepository
{
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpJS) {}

  get(params: BookingBenefitGolfAccessRequestDto): Promise<Response<BookingBenefitGolfAccessDto>> {
    return this.httpJs.get(
      `/benefit/golf-rates/rooms/application/${params.application}/company/${
        params.company
      }/hotel/${params.request.hotel}/check-in/${params.request.arrivalDate}/check-out/${
        params.request.departureDate
      }/nights/${params.request.nights}/category/${params.request.categoryId}?request.market=${
        params.request.market
      }${this.parseRoomCodes(params.request.roomCodes)}&request.isNational=${params.request.isNational}`
    )
  }
  parseRoomCodes(codes: string[]): string {
    if(codes.length === 0) return ''
    const codesParsed = codes.map(code => `&request.roomCodes=${code}`)
    const result = codesParsed?.reduce((prev: string, curr: string) => prev + `${curr}`)

    return result
  }
}
