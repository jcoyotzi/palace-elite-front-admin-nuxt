import {ContainerModule, interfaces} from 'inversify'
import benefitsTypes from '../common/types/benefitsTypes'
import GetWeeksProvitionsUseCase from './application/getWeeksProvitionsUseCase'
import {BenefitsRepository} from './domain/repositories/benefitsRepository'
import GetWeeksAndNightsPreferentialsUseCase from './application/getWeeksAndNightsPreferentialsUseCase'
import BenefitServiceRepository from './domain/repositories/benefitServiceRepository'
import GetWalletSummarysUseCase from './application/getWalletSummarysUseCase'
import GetStrapiPreferentialUseCase from './application/getStrapiPreferentialUseCase'
import GetWalletUniversalCreditsUseCase from './application/getWalletUniversalCreditsUseCase'
import GetResortCreditsActivitiesUseCase from './application/getResortCreditActivitiesUseCase'
import {ResortCreditsRepository} from './domain/repositories/resortCreditRepository'
import ResortCreditsServiceRepository from './domain/repositories/resortCreditRepositoryService'
import GetStrapiResortCreditUseCase from './application/getStrapiResortCreditUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BenefitsRepository>(benefitsTypes.benefitsRepository).to(BenefitServiceRepository)
  bind<GetWeeksProvitionsUseCase>(benefitsTypes.getWeeksProvitionsUseCase).to(
    GetWeeksProvitionsUseCase
  )
  bind<GetWeeksAndNightsPreferentialsUseCase>(
    benefitsTypes.getWeeksAndNightsPreferentialsUseCase
  ).to(GetWeeksAndNightsPreferentialsUseCase)
  bind<GetWalletSummarysUseCase>(benefitsTypes.getWalletSummarysUseCase).to(
    GetWalletSummarysUseCase
  )
  bind<GetStrapiPreferentialUseCase>(benefitsTypes.getStrapiPreferentialUseCase).to(
    GetStrapiPreferentialUseCase
  )
  bind<GetWalletUniversalCreditsUseCase>(benefitsTypes.getWalletUniversalCreditsUseCase).to(
    GetWalletUniversalCreditsUseCase
  )

  bind<ResortCreditsRepository>(benefitsTypes.resortCreditRepository).to(
    ResortCreditsServiceRepository
  )

  bind<GetResortCreditsActivitiesUseCase>(benefitsTypes.getResortCreditActivitiesUseCase).to(
    GetResortCreditsActivitiesUseCase
  )
  bind<GetStrapiResortCreditUseCase>(benefitsTypes.getStrapiResortCreditPageUseCase).to(
    GetStrapiResortCreditUseCase
  )
})
