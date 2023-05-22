import {injectable, inject} from 'inversify'
import contractTypes from '../../common/types/contractTypes'
import UseCase from '@/src/app/common/application/UseCase'
import {ContractRepository} from '@/src/app/contract/domain/repositories/contractRepository'
import {Response} from '@/src/app/common/domain/entities/response'

@injectable()
export default class PostRequestContractUseCase
  implements UseCase<number | string, Response<String>>
{
  constructor(
    @inject(contractTypes.contractRepository)
    private readonly contractRepository: ContractRepository
  ) {}

  async run(params: number | string): Promise<any> {
    return await this.contractRepository.postRequestContract(params)
  }
}
