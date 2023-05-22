import {ContainerModule, interfaces} from 'inversify'
import guestsTypes from '../common/types/guestsTypes'
import AddGuestUseCase from './application/addGuestUseCase'
import GetGuestsUseCase from './application/getGuestsUseCase'
import SaveGuestUseCase from './application/saveGuestUseCase'
import {GuestsRepository} from './domain/repositories/guestsRepository'
import GuestsServiceRepository from './domain/repositories/guestsServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<GuestsRepository>(guestsTypes.guestsRepository).to(GuestsServiceRepository)
  bind<GetGuestsUseCase>(guestsTypes.getGuestsUseCase).to(GetGuestsUseCase)
  bind<SaveGuestUseCase>(guestsTypes.saveGuestUseCase).to(SaveGuestUseCase)
  bind<AddGuestUseCase>(guestsTypes.addGuestUseCase).to(AddGuestUseCase)
})
