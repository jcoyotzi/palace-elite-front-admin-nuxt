import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingPaymentTypes from '../../common/types/bookingPaymentTypes'
import {PaymentConfirmationContentRepository} from '../domain/repositories/paymentConfirmationContentRepository'
import { PaymentConfirmationContentEntity } from '../domain/entities/paymentConfirmationContentEntity'

@injectable()
export default class GetPaymentConfirmationContentUseCase implements UseCase<null, PaymentConfirmationContentEntity> {
  constructor(
    @inject(bookingPaymentTypes.paymentConfirmationContent)
    private readonly paymentConfirmationContentRepository: PaymentConfirmationContentRepository
  ) {}

  async run(): Promise<PaymentConfirmationContentEntity> {
    return await this.paymentConfirmationContentRepository.getPaymentConfirmationContent()
  }
}
