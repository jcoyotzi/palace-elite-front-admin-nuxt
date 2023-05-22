import {FindLockOffAccess} from 'app/infoAccessRoom/domain/findLockOffAccess'
import {RoomAccess} from 'app/roomAccess/domain/entities/roomAccess'

export interface LockOffAccessAvailable extends FindLockOffAccess {
  roomTypeAccess: RoomAccess[]
}
