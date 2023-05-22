import {ContainerModule, interfaces} from 'inversify'
import bookingBenefitTypes from '../common/types/bookingBenefitTypes'
import GetBookingBenefitAccessUseCase from './application/getBookingBenefitAccessUseCase'
import GetBookingBenefitUseCase from './application/getbookingBenefitUseCase'
import {BookingBenefitAccessRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitAccessRepository'
import {BookingBenefitRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitRepository'
import BookingBenefitServiceRepository from './domain/repositories/bookingBenefitServiceRepository'
import BookingBenefitAccessServiceRepository from './domain/repositories/bookingBenefitAccessServiceRepository'
import GetBookingBenefitGolfAccessUseCase from '~/src/app/bookingBenefits/application/getBookingBenefitGolfAccessUseCase'
import {BookingBenefitGolfAccessRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitGolfAccessRepository'
import BookingBenefitGolfAccessServiceRepository from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitGolfAccessServiceRepository'
import GetEliteProductRuleUseCase from './application/rules/getEliteProductRule'
import {EliteProductRulesRepository} from './domain/repositories/rules/EliteProductRuleRepository'
import EliteProductRulesServiceRepository from './domain/repositories/rules/EliteProductServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BookingBenefitRepository>(bookingBenefitTypes.bookingBenefitRepository).to(
    BookingBenefitServiceRepository
  )
  bind<GetBookingBenefitUseCase>(bookingBenefitTypes.GetBookingBenefitUseCase).to(
    GetBookingBenefitUseCase
  )
  bind<BookingBenefitAccessRepository>(bookingBenefitTypes.BookingBenefitAccessRepository).to(
    BookingBenefitAccessServiceRepository
  )

  bind<GetBookingBenefitAccessUseCase>(bookingBenefitTypes.GetBookingBenefitAccessUseCase).to(
    GetBookingBenefitAccessUseCase
  )

  bind<GetBookingBenefitGolfAccessUseCase>(
    bookingBenefitTypes.GetBookingBenefitGolfAccessUseCase
  ).to(GetBookingBenefitGolfAccessUseCase)

  bind<BookingBenefitGolfAccessRepository>(
    bookingBenefitTypes.BookingBenefitGolfAccessRepository
  ).to(BookingBenefitGolfAccessServiceRepository)

  bind<GetEliteProductRuleUseCase>(bookingBenefitTypes.GetEliteProductRuleUseCase).to(
    GetEliteProductRuleUseCase
  )

  bind<EliteProductRulesRepository>(bookingBenefitTypes.EliteProductRulesRepository).to(
    EliteProductRulesServiceRepository
  )
})
