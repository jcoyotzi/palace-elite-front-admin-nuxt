import {ContainerModule, interfaces} from 'inversify'
import contractTypes from '../common/types/contractTypes'
import GetContractDocumentUseCase from './application/getContractDocumentUseCase'
import PostRequestContractUseCase from './application/postRequestContractUseCase'
import {ContractRepository} from '~/src/app/contract/domain/repositories/contractRepository'
import ContractServiceRepository from '~/src/app/contract/domain/repositories/contractServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ContractRepository>(contractTypes.contractRepository).to(ContractServiceRepository)
  bind<GetContractDocumentUseCase>(contractTypes.getContractDocumentUseCase).to(
    GetContractDocumentUseCase
  )
  bind<PostRequestContractUseCase>(contractTypes.postRequestContractUseCase).to(
    PostRequestContractUseCase
  )
})
