import {ContainerModule, interfaces} from 'inversify'
import dashboardTypes from '../common/types/dashboardTypes'
import {DashboardRepository} from './domain/repositories/dashboardRepository'
import GetStrapiDashboardUseCase from './application/getStrapiDashboardUseCase'
import DashboardServiceRepository from './domain/repositories/dashboardServiceRepository'
import GetMembershipPaymentsUseCase from './application/getMembershipPaymentsUseCase'
import GetDashboardPrivacyNoticiesUseCase from './application/getDashboardPrivacyNoticiesUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<DashboardRepository>(dashboardTypes.dashboardRepository).to(DashboardServiceRepository)
  bind<GetStrapiDashboardUseCase>(dashboardTypes.getStrapiDashboardUseCase).to(
    GetStrapiDashboardUseCase
  )
  bind<GetDashboardPrivacyNoticiesUseCase>(dashboardTypes.getDashboardPrivacyNoticies).to(
    GetDashboardPrivacyNoticiesUseCase
  )
  bind<GetMembershipPaymentsUseCase>(dashboardTypes.getMembershipPaymentsUseCase).to(
    GetMembershipPaymentsUseCase
  )
})
