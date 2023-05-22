import {ContainerModule, interfaces} from 'inversify'
import bookingPaymentTypes from '../common/types/bookingPaymentTypes'
import UseCase from '../common/application/UseCase'
import PayNowUseCase from './application/payNowUseCase'
import PayWithUniversalCreditsUseCase from './application/payWithUniversalCreditsUseCase'
import {BookingPaymentRepository} from './domain/repositories/bookingPaymentRepository'
import {PaymentConfirmationContentRepository} from './domain/repositories/paymentConfirmationContentRepository'
import BookingPaymentServiceRepository from './domain/repositories/bookingPaymentServiceRepository'
import PaymentConfirmationContentServiceRepository from './domain/repositories/paymentConfirmationServiceRepository'
import GetPaymentConfirmationContentUseCase from './application/paymentConfirmationContentUseCase'
import { PaymentConfirmationContentEntity } from './domain/entities/paymentConfirmationContentEntity'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BookingPaymentRepository>(bookingPaymentTypes.bookingPaymentRepository).to(
    BookingPaymentServiceRepository
  )
  bind<PayNowUseCase>(bookingPaymentTypes.payNowUseCase).to(PayNowUseCase)
  bind<PayWithUniversalCreditsUseCase>(bookingPaymentTypes.payWithUniversalCreditsCase).to(
    PayWithUniversalCreditsUseCase
  )
  bind<PaymentConfirmationContentRepository>(bookingPaymentTypes.paymentConfirmationContent).to(PaymentConfirmationContentServiceRepository)
  bind<UseCase<null,PaymentConfirmationContentEntity>>(bookingPaymentTypes.paymentConfirmationContentUsecase).to(GetPaymentConfirmationContentUseCase)
})
