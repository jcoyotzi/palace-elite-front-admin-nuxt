import {ContainerModule, interfaces} from 'inversify'
import ownersTypes from '../common/types/ownersTypes'
import GetOwnersUseCase from './application/getOwnersUseCase'
import PinUseCase from './application/pinUseCase'
import SaveOwnerUseCase from './application/saveOwnerUseCase'
import ValidatePinUseCase from './application/validatePinUseCase'
import {OwnersRepository} from './domain/repositories/ownersRepository'
import OwnersServiceRepository from './domain/repositories/ownersServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<OwnersRepository>(ownersTypes.ownersRepository).to(OwnersServiceRepository)
  bind<GetOwnersUseCase>(ownersTypes.getOwnersUseCase).to(GetOwnersUseCase)
  bind<PinUseCase>(ownersTypes.pinUseCase).to(PinUseCase)
  bind<SaveOwnerUseCase>(ownersTypes.saveOwnerUseCase).to(SaveOwnerUseCase)
  bind<ValidatePinUseCase>(ownersTypes.validatePinUseCase).to(ValidatePinUseCase)
})
