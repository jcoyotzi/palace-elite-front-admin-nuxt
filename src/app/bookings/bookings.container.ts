import {ContainerModule, interfaces} from 'inversify'
import bookingsTypes from '../common/types/bookingsTypes'
import GetFiltersUseCase from './application/getFiltersUseCase'
import GetReservationsUseCase from './application/getReservationsUseCase'
import GetReservationsToValidateUseCase from './application/getReservationsToValidateUseCase'
import {BookingsRepository} from './domain/repositories/bookingsRepository'
import BookingsServiceRepository from './domain/repositories/bookingsServiceRepository'
import RejectReservationUseCase from './application/rejectReservationUseCase'
import ValidateReservationUseCase from './application/validateReservationUseCase'
import PaymentLinkReservationUseCase from './application/paymentLinkReservationUseCase'
import GetProductsAndPaymentUseCase from './application/getProductsAndPaymentsUseCase'
import GetTermsAndConditionsUseCase from './application/getTermsAndConditionsUseCase'
import GetCompanionsUseCase from './application/getCompanionsUseCase'
import GetCategorieUseCase from './application/getCategorieUseCase'
import SendConfirmationLetterUseCase from './application/sendConfirmationLetterUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BookingsRepository>(bookingsTypes.bookingsRepository).to(BookingsServiceRepository)

  bind<GetReservationsUseCase>(bookingsTypes.getReservationsUseCase).to(GetReservationsUseCase)

  bind<GetReservationsToValidateUseCase>(bookingsTypes.getReservationsToValidateUseCase).to(
    GetReservationsToValidateUseCase
  )

  bind<GetFiltersUseCase>(bookingsTypes.getFiltersUseCase).to(GetFiltersUseCase)

  bind<RejectReservationUseCase>(bookingsTypes.rejectReservationUseCase).to(
    RejectReservationUseCase
  )

  bind<ValidateReservationUseCase>(bookingsTypes.validateReservationUseCase).to(
    ValidateReservationUseCase
  )

  bind<PaymentLinkReservationUseCase>(bookingsTypes.sendPaymentLinkReservationUseCase).to(
    PaymentLinkReservationUseCase
  )

  bind<GetProductsAndPaymentUseCase>(bookingsTypes.getProductsAndPaymentUseCase).to(
    GetProductsAndPaymentUseCase
  )

  bind<GetTermsAndConditionsUseCase>(bookingsTypes.getTermsAndConditionsUseCase).to(
    GetTermsAndConditionsUseCase
  )

  bind<GetCompanionsUseCase>(bookingsTypes.getCompanionsUseCase).to(GetCompanionsUseCase)

  bind<GetCategorieUseCase>(bookingsTypes.getCategoriesUseCase).to(GetCategorieUseCase)

  bind<SendConfirmationLetterUseCase>(bookingsTypes.sendConfirmationLetterUseCase).to(
    SendConfirmationLetterUseCase
  )
})
