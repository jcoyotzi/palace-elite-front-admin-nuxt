import {ContainerModule, interfaces} from 'inversify'
import UseCase from '../common/application/UseCase'
import cancelationsTypes from '../common/types/cancelationsTypes'
import { CancelationsRepository } from './domain/repositories/cancelationsRepository'
import CancelationsRepositoryService from './domain/repositories/cancelationsRepositoryService'
import GetWeeksUseCase from './application/getWeeksUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {

  bind<CancelationsRepository>(cancelationsTypes.cancelationsRepository).to(CancelationsRepositoryService)
  bind<UseCase<null,any>>(cancelationsTypes.getWeeksUseCase).to(GetWeeksUseCase)
})
