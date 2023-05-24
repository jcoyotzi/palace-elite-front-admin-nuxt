import { ContainerModule, interfaces } from "inversify"
import type { Persistence } from "./domain/entities/Persistence"
import LocalStorageRepository from './domain/repositories/LocalStorageRepository'
import SessionStorageRepository from './domain/repositories/SessionStorageRepository'
import persistenceTypes from './types'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<Persistence>(persistenceTypes.localStorage).to(LocalStorageRepository)
  bind<Persistence>(persistenceTypes.sessionStorage).to(SessionStorageRepository)
})