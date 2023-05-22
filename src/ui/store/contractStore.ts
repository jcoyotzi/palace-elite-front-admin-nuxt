import {Store, Pinia} from 'pinia-class-component'
import {container} from '~/src/container'
import contractTypes from '~/src/app/common/types/contractTypes'
import PostRequestContractUseCase from '~/src/app/contract/application/postRequestContractUseCase'
import GetContractDocumentUseCase from '~/src/app/contract/application/getContractDocumentUseCase'
import PayloadContractDocument from '~/src/app/contract/domain/entities/payloadContractDocument'
@Store({
  name: 'contractStore'
})
export class ContractStore extends Pinia {
  public getContractDocumentUseCase = container.get<GetContractDocumentUseCase>(
    contractTypes.getContractDocumentUseCase
  )

  public postRequestContracUseCase = container.get<PostRequestContractUseCase>(
    contractTypes.postRequestContractUseCase
  )

  contractUrl = ''
  withoutContract = false

  async getContractDocument(params: PayloadContractDocument) {
    try {
      const {data} = await this.getContractDocumentUseCase.run(params)
      this.contractUrl = window.URL.createObjectURL(data)
      this.withoutContract = false
    } catch (error) {
      this.withoutContract = true
    }
  }

  async requestContractDocument(params: number | string) {
    return await this.postRequestContracUseCase.run(params)
  }
}
