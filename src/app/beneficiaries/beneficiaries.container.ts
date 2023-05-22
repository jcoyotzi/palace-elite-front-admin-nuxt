import {ContainerModule, interfaces} from 'inversify'
import beneficiaryType from '../common/types/beneficiaryType'
import BeneficiariesServiceRepository from './domain/repositories/beneficiariesServiceRepository'
import SaveBeneficiaryUseCase from './application/saveBeneficiaryUseCase'
import {BeneficiariesRepository} from './domain/repositories/beneficiariesRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BeneficiariesRepository>(beneficiaryType.beneficiariesRepository).to(
    BeneficiariesServiceRepository
  )
  bind<SaveBeneficiaryUseCase>(beneficiaryType.saveBeneficiaryUseCase).to(SaveBeneficiaryUseCase)
})
