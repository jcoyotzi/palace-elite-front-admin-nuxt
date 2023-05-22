import {ContainerModule, interfaces} from 'inversify'
import termsAndCoditionsTypes from '../common/types/termsAndCoditionsTypes'
import GetTermsAndConditionsUseCase from './application/getTermsAndConditionsUseCase'
import { TermsAndConditionsRepository } from './domain/repositories/termsAndConditionsRepository'
import TermsAndConditionsServiceRepository from './domain/repositories/termsAndConditionsServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<TermsAndConditionsRepository>(termsAndCoditionsTypes.termsAndConditionsRepository).to(TermsAndConditionsServiceRepository)
  bind<GetTermsAndConditionsUseCase>(termsAndCoditionsTypes.getTermsAndConditionsUseCase).to(GetTermsAndConditionsUseCase)
})
