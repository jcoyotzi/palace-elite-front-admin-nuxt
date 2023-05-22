import {ContainerModule, interfaces} from 'inversify'
import buildSearchTypes from '../common/types/buildSearchTypes'
import GetBuildSearchPageUseCase from './aplication/getBuildSearchPageUseCase'
import GetRewardNightsUseCase from './aplication/getRewardNightsUseCase'
import GetRoomRatesUseCase from './aplication/getRoomRatesUseCase'
import { BuildSearchRepository } from './domain/repository/buildSearchRepository'
import BuildSearchServiceRepository from './domain/repository/buildSearchServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BuildSearchRepository>(buildSearchTypes.buildSearchRepository).to(BuildSearchServiceRepository)
  bind<GetBuildSearchPageUseCase>(buildSearchTypes.getBuildSearchPageUseCase).to(GetBuildSearchPageUseCase)
  bind<GetRewardNightsUseCase>(buildSearchTypes.getRewardNightsUseCase).to(GetRewardNightsUseCase)
  bind<GetRoomRatesUseCase>(buildSearchTypes.getRoomRatesUseCase).to(GetRoomRatesUseCase)
})
