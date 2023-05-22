import {ContainerModule, interfaces} from 'inversify'
import bookingTypes from '../common/types/bookingTypes'
import BookNowUseCase from './application/bookNowUseCase'
import {BookingRespository} from './domain/repositories/bookingRepository'
import BookingServiceRepository from './domain/repositories/bookingServiceRepository'
import {GetReferralPromotionBenefits} from './application/getReferralPromotionBenefits'
import {GetProvitions} from './application/getProvitions'
import {GetImperialProvitions} from './application/getImperial'
import {GetReservationUseCase} from './application/getReservationUseCase'
import { GetMinimumStay } from './application/getMinimumStayUseCase'
import {GetReferralProgram} from 'app/booking/application/getReferralProgram'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BookingRespository>(bookingTypes.bookingRepository).to(BookingServiceRepository)
  bind<BookNowUseCase>(bookingTypes.bookNowUseCase).to(BookNowUseCase)
  bind<GetReferralProgram>(bookingTypes.getReferralProgram).to(GetReferralProgram)
  bind<GetReferralPromotionBenefits>(bookingTypes.getReferralPromotionBenefits).to(
    GetReferralPromotionBenefits
  )
  bind<GetProvitions>(bookingTypes.getProvitions).to(GetProvitions)
  bind<GetImperialProvitions>(bookingTypes.getImperialProvitions).to(GetImperialProvitions)
  bind<GetReservationUseCase>(bookingTypes.getReservationUseCase).to(GetReservationUseCase)
  bind<GetMinimumStay>(bookingTypes.getMinimumStay).to(GetMinimumStay)
  
})
