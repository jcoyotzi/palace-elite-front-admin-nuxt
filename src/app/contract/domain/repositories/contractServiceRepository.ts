import {injectable, inject} from 'inversify'
import PayloadContractDocument from '../entities/payloadContractDocument'
import {ContractRepository} from './contractRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
// import { Payload } from '~/src/app/common/domain/entities/payload'

@injectable()
export default class ContractServiceRepository implements ContractRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getContractDocument(payload: PayloadContractDocument): Promise<Response<String>> {
    return this.http.get(
      `/docusign/document/application/${payload.application}/company/${payload.company}`,
      {
        responseType: 'blob'
      }
    )
  }

  postRequestContract(payload: number | string): Promise<Response<String>> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            data: String(payload)
          }),
        2000
      )
    })
  }
}
