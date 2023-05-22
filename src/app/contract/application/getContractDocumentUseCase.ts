import {injectable, inject} from 'inversify'
import contractTypes from '../../common/types/contractTypes'
import PayloadContractDocument from '../domain/entities/payloadContractDocument'
import UseCase from '@/src/app/common/application/UseCase'
import {ContractRepository} from '@/src/app/contract/domain/repositories/contractRepository'
import {Response} from '@/src/app/common/domain/entities/response'

@injectable()
export default class GetContractDocumentUseCase
  implements UseCase<PayloadContractDocument, Response<String>>
{
  constructor(
    @inject(contractTypes.contractRepository)
    private readonly contractRepository: ContractRepository
  ) {}

  async run(params: PayloadContractDocument): Promise<any> {
    return await this.contractRepository.getContractDocument(params)
  }
}
