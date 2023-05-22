import {inject, injectable} from 'inversify'
import {HttpJS} from '../../../common/jsonServer/domain/httpJS'
import jsonTypes from '../../../common/jsonServer/infrastructure/di/jsonTypes'
import {BookingNowDto} from '../dto/bookingNowDto'
import {
  ImperialProvitionRequest,
  ProvitionsRequest,
  BookingProvitionCategoties
} from '../dto/provitionsRequest'
import PayloadGetReservation from '../dto/payloadGetReservation'
import {BookingRespository} from './bookingRepository'
import httpTypes from 'app/common/types/httpTypes'
import {ReferralProgram} from 'app/booking/domain/dto/referralProgram'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class BookingServiceRepository implements BookingRespository {
  constructor(
    @inject(jsonTypes.jsonServer) private readonly httpJs: HttpJS,
    @inject(httpTypes.intelligenceXHttpApi) private readonly ixApi: HttpJS,
    @inject(httpTypes.apiUrl) private readonly azApi: HttpJS
  ) {}

  async post(booking: BookingNowDto): Promise<void> {
    // TODO: Implementar el servicio de booking para que se pueda solicitar una reserva
    await this.httpJs.post('/booking')
  }

  getReferralProgram(
    market: string,
    application: string,
    company: string,
    year: string
  ): Promise<Response<ReferralProgram>> {
    return this.ixApi.get(`membership/market-fee/${market}/${application}/${company}/${year}`)
  }

  getReferralPromotionBenefits(application: string, arrivalDate: string): Promise<Response<any>> {
    return this.ixApi.get(
      `booking-engine/referral-promotionId?application=${application}&arvDate=${arrivalDate}`
    )
  }

  getProvitions(request: ProvitionsRequest): Promise<Response<any>> {
    return this.ixApi.get(
      `membership/member-promotionId-engine/application/${request.application}/company/${request.company}?request.isNational=${request.isNational}&request.hotel=${request.hotel}&request.arrivalDate=${request.arrivalDate}&request.departureDate=${request.departureDate}`
    )
  }

  getImperialProvitions(request: ImperialProvitionRequest): Promise<Response<any>> {
    return this.ixApi.get(
      `bookings/provisions-combinations?request.company=${request.company}&request.application=${request.application}&request.isNational=${request.isNational}&request.hotel=${request.hotel}&request.room=${request.room}&request.arrivalDate=${request.arrivalDate}&request.nigths=${request.nights}&request.category=
      ${BookingProvitionCategoties.Imperial}`
    )
  }

  public getReservation(payload: PayloadGetReservation) {
    return this.ixApi.get(
      `/bookings/info-reservation-balance-by-member-hotel-folio/application/${payload.application}/company/${payload.company}/isNational/${payload.isNational}/hotel/${payload.hotel}/folio/${payload.folio}`
    )
  }

  public getMinimumStay(payload: {application: string}): Promise<Response<any>> {
    return this.azApi.get(`/membership/api/v1/application/${payload.application}/minimun-stay`)
  }
}
