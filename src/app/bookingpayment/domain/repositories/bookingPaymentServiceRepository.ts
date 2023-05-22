import {injectable, inject} from 'inversify'
import {BookingPaymentRepository} from './bookingPaymentRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/network/common/domain/entity/response'

@injectable()
export default class BookingPaymentServiceRepository implements BookingPaymentRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpApi: HttpApi) {}

  payNow(payload: any): Promise<Response<any>> {
    return this.httpApi.post('/bookings/apply-reservation-payment-by-ts-credit', {
      data: payload
    })
  }

  payWithUniversalCredits(payload: any): Promise<Response<any>> {
    return this.httpApi.post('/bookings/apply-reservation-payment-by-credit-universal', {
      data: payload
    })
  }
}
