import {ContainerModule, interfaces} from 'inversify'
import layoutTypes from '../common/types/layoutTypes'
import GetDestinationsUseCase from './application/getDestinationsUseCase'
import GetFooterUseCase from './application/getFooterUseCase'
import GetMenuUseCase from './application/getMenuUseCase'
import GetNavbarUseCase from './application/getNavbarUseCase'
import MergeMenuDataUseCase from './application/mergeMenuDataUseCase'
import {LayoutRepository} from './domain/repositories/layoutRepository'
import LayoutServiceRepository from './domain/repositories/layoutServiceRepository'

/*  Contenedor de inversify (Injección de depencias Layout)  */

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<LayoutRepository>(layoutTypes.layoutRepository).to(LayoutServiceRepository)
  bind<GetFooterUseCase>(layoutTypes.getFooterUseCase).to(GetFooterUseCase)
  bind<GetNavbarUseCase>(layoutTypes.getNavbarUseCase).to(GetNavbarUseCase)
  bind<GetMenuUseCase>(layoutTypes.getMenuUseCase).to(GetMenuUseCase)
  bind<GetDestinationsUseCase>(layoutTypes.getDestinationsUseCase).to(GetDestinationsUseCase)
  bind<MergeMenuDataUseCase>(layoutTypes.mergeMenuDataUseCase).to(MergeMenuDataUseCase)
})
