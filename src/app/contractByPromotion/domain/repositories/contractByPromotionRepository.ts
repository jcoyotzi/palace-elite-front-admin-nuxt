import GetContractByPromotionDTO from '../dto/getContractByPromotionDTO'
import {ContractByPromotion} from '../entities/ContractByPromotion'
import {Response} from '~/src/app/common/domain/entities/response'

export default interface ContractByPromotionRepository {
  getContractByPromotion(params: GetContractByPromotionDTO): Promise<Response<ContractByPromotion>>
}
