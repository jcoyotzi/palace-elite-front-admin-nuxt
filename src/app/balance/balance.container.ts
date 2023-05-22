import {ContainerModule, interfaces} from 'inversify'
import UseCase from '../common/application/UseCase'
import balanceTypes from '../common/types/balanceTypes'
import {BalanceRepository} from './domain/repositories/balanceRepository'
import BalanceServiceRepository from './domain/repositories/balanceServiceRepository'
import GetBalanceUseCase from './application/getBalanceUseCase'
import {ParamsBalanceEntity} from './domain/entities/paramsBalanceEntity'
import {BalanceEntity} from './domain/entities/balanceEntity'
import {DownloadBalanceRepository} from './domain/repositories/downloadBalanceRepository'
import DownloadBalanceServiceRepository from './domain/repositories/downloadBalanceServiceRepository'
import {DownloadBalanceEntity} from './domain/entities/downloadBalanceEntity'
import GetDownloadBalanceUseCase from './application/getDownloadBalanceUseCase'
import {ParamsDownloadBalanceEntity} from './domain/entities/paramsDownloadBalanceEntity'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BalanceRepository>(balanceTypes.balanceRepository).to(BalanceServiceRepository)
  bind<UseCase<ParamsBalanceEntity, BalanceEntity>>(balanceTypes.getBalanceUseCase).to(
    GetBalanceUseCase
  )
  bind<DownloadBalanceRepository>(balanceTypes.downloadBalanceRepository).to(
    DownloadBalanceServiceRepository
  )
  bind<UseCase<ParamsDownloadBalanceEntity, DownloadBalanceEntity>>(
    balanceTypes.getDownloadBalanceUseCase
  ).to(GetDownloadBalanceUseCase)
})
