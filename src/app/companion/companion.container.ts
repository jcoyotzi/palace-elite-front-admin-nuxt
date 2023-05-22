import {ContainerModule, interfaces} from 'inversify'
import {CompanionRepository} from 'app/companion/domain/repositories/companionRepository'
import companionTypes from 'app/common/types/companionTypes'
import CompanionServiceRepository from 'app/companion/domain/repositories/companionServiceRepository'
import AddCompanionUseCase from 'app/companion/application/addCompanionUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<CompanionRepository>(companionTypes.companionRepository).to(CompanionServiceRepository)
  bind<AddCompanionUseCase>(companionTypes.addCompanionUseCase).to(AddCompanionUseCase)
})
