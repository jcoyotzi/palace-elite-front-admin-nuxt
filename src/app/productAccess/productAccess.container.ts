import {ContainerModule, interfaces} from 'inversify'
import infoAccessRoom from '../common/types/productAccessTypes'
import GetProductAccessUseCase from './application/getAccessProductsUseCase'
import {ProductAccessRepository} from './domain/repositories/productAccessRepository'
import productAccessServiceRepository from './domain/repositories/productAccessServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ProductAccessRepository>(infoAccessRoom.productAccessRepository).to(
    productAccessServiceRepository
  )
  bind<GetProductAccessUseCase>(infoAccessRoom.GetProductAccessUseCase).to(GetProductAccessUseCase)
})
