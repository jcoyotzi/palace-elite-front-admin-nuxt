import {ContainerModule, interfaces} from 'inversify'
import UseCase from '../common/application/UseCase'
import GetExChangeRateUseCase from './application/getExChangeRateUseCase'
import payLinkTypes from '../common/types/payLinkTypes'
import GetPropertiesUseCase from '../contact/aplication/getPropertiesUseCase'
import GetNationalitiesUseCase from './application/getNationalitiesUseCase'
import GetReservationByTokenUseCase from './application/getReservationByTokenUseCase'
import GetTermsAndConditionsUseCase from './application/getTermsAndConditionsUseCase'
import PayNowReservationUseCase from './application/payNowReservationUseCase'
import {PayLinkRepository} from './domain/repositories/payLinkRepository'
import PayLinkServiceRepository from './domain/repositories/payLinkServiceRepository'
import PayNowUseCase from './application/payNowUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<PayLinkRepository>(payLinkTypes.payLinkRepository).to(PayLinkServiceRepository)
  bind<GetTermsAndConditionsUseCase>(payLinkTypes.getTermsAndConditionsUseCase).to(
    GetTermsAndConditionsUseCase
  )
  bind<GetNationalitiesUseCase>(payLinkTypes.getNationalitiesUseCase).to(GetNationalitiesUseCase)
  bind<GetPropertiesUseCase>(payLinkTypes.getPropertiesUseCase).to(GetPropertiesUseCase)
  bind<GetReservationByTokenUseCase>(payLinkTypes.getReservationByTokenUseCase).to(
    GetReservationByTokenUseCase
  )
  bind<PayNowReservationUseCase>(payLinkTypes.payNowReservationUseCase).to(PayNowReservationUseCase)
  bind<GetExChangeRateUseCase>(payLinkTypes.getExChangeRateUseCase).to(GetExChangeRateUseCase)
  bind<UseCase<any,any>>(payLinkTypes.payNowUseCase).to(PayNowUseCase)
})
