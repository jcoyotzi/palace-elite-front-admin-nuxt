import {ContainerModule, interfaces} from 'inversify'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import ContractByPromotionServiceRepository from './domain/repositories/contractByPromotionServiceRepository'
import ContractByPromotionRepository from './domain/repositories/contractByPromotionRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ContractByPromotionRepository>(contractByPromotionTypes.ContractByPromotionRepository).to(
    ContractByPromotionServiceRepository
  )
})
