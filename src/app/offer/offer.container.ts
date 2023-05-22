import {ContainerModule, interfaces} from 'inversify'
import offerTypes from '../common/types/offerTypes'
import GetOfferPageUseCase from './aplication/getOfferPageUseCase'
import GetPropertiesUseCase from './aplication/getPropertiesUseCase'
import {OfferRepository} from './domain/repositories/offerRepository'
import OfferServiceRepository from './domain/repositories/offerServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<OfferRepository>(offerTypes.offerRepository).to(OfferServiceRepository)
  bind<GetOfferPageUseCase>(offerTypes.getOfferPageUseCase).to(GetOfferPageUseCase)
  bind<GetPropertiesUseCase>(offerTypes.getPropertiesUseCase).to(GetPropertiesUseCase)
})
