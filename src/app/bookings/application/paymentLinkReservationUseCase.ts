import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import PayloadPaymentLinkReservation from '../domain/entities/payloadPaymentLinkReservation'

@injectable()
export default class PaymentLinkReservationUseCase
  implements UseCase<PayloadPaymentLinkReservation, Response<any>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: PayloadPaymentLinkReservation): Promise<Response<any>> {
    return await this.bookingsRepository.sendPaymentLinkReservation(payload as any)
  }
}
