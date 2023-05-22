import {Response} from '../../../network/common/domain/entity/response'
import {RoomAccess} from '../../../roomAccess/domain/entities/roomAccess'
import {ValidatePromotionDto} from '../dto/validatePromotionDto'

export interface ValidatePromotionRepository {
  getPromotionActive(request: ValidatePromotionDto): Promise<Response<RoomAccess[]>>
}
