import PayloadContractDocument from '../entities/payloadContractDocument'
import {Response} from '~/src/app/common/domain/entities/response'

export interface ContractRepository {
  getContractDocument(params: PayloadContractDocument): Promise<Response<String>>
  postRequestContract(params: number | string): Promise<Response<String>>
}
