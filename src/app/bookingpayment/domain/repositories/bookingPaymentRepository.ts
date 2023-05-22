import {Response} from '~/src/app/network/common/domain/entity/response'

export interface BookingPaymentRepository {
  payNow(payload: any): Promise<Response<any>>
  payWithUniversalCredits(payload: any): Promise<Response<any>>
}
