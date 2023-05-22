import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingPaymentTypes from '../../common/types/bookingPaymentTypes'
import {BookingPaymentRepository} from '../domain/repositories/bookingPaymentRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class PayWithUniversalCreditsUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(bookingPaymentTypes.bookingPaymentRepository)
    private readonly bookingPaymentRepository: BookingPaymentRepository
  ) {}

  async run(payload: any): Promise<Response<any>> {
    return await this.bookingPaymentRepository.payWithUniversalCredits(payload)
  }
}
