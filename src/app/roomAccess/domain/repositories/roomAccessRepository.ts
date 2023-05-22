import {Response} from '../../../network/common/domain/entity/response'
import {RoomAccess} from '../../../roomAccess/domain/entities/roomAccess'
import {GetRoomTypeAccessDto} from '~/src/app/roomAccess/domain/dto/getRoomTypeAccessDto'

export interface RoomAccessRepository {
  getHotelAccessByHotelAffiliation(request: GetRoomTypeAccessDto): Promise<Response<RoomAccess[]>>
}
