import {injectable} from 'inversify'
import {RoomAccess} from '../domain/entities/roomAccess'
import {LockOffRoomAccessCode} from '../domain/data/lockOffRoomAccessCode'
import {RoomPaxByType} from '../domain/data/roomPaxByType'
import UseCase from '../../common/application/UseCase'

@injectable()
export class CreateLockOffRoomAccess implements UseCase<RoomAccess[], RoomAccess[]> {
  // eslint-disable-next-line require-await
  public async run(rooms: RoomAccess[]): Promise<RoomAccess[]> {
    const lockOffRooms = this.getLockOffRooms(rooms)
    return lockOffRooms.map(room => this.create(room))
  }

  // TODO: set new namingConvention RealCode
  private getLockOffRooms(rooms: RoomAccess[]): RoomAccess[] {
    return rooms.filter(room => LockOffRoomAccessCode.includes(room.RealCode))
  }

  // TODO: set new namingConvention for CLVRoomTypeCategory
  private create(room: RoomAccess): RoomAccess {
    room.description = 'LOCK OFF'
    room.isLockOff = true
    room.lockOffType = "L1"
    room.CLVRoomTypeCategory.max_occupancy = RoomPaxByType.LOCK_OFF
    return room
  }
}
