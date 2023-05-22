import {InfoAccessRoom} from '../infoAccessRoom'
import {Response} from '../../../common/domain/entities/response'
import {GetRoomAccessByAffiliation} from '../dto/getRoomAccessByAffiliation'

export interface InfoAccessRoomRepository {
  all(getRoomAccessByAffiliation: GetRoomAccessByAffiliation): Promise<Response<InfoAccessRoom>>
}
