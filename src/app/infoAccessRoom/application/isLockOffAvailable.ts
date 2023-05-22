import {injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import {FindLockOffAccess} from 'app/infoAccessRoom/domain/findLockOffAccess'
import {InfoAccessRoomHasLockOff} from 'app/infoAccessRoom/application/infoAccessRoomHasLockOff'
import {LockOffAccessAvailable} from 'app/infoAccessRoom/domain/lockOffAccessAvailable'
import {RoomAccess} from 'app/roomAccess/domain/entities/roomAccess'
import {LockOffRoomAccessCode} from 'app/roomAccess/domain/data/lockOffRoomAccessCode'

@injectable()
export class IsLockOffAvailable implements UseCase<FindLockOffAccess, boolean> {
  constructor(private readonly infoAccessRoomHasLockOff: InfoAccessRoomHasLockOff) {}

  async run({from, access, roomTypeAccess, to}: LockOffAccessAvailable): Promise<boolean> {
    const hasLockOffAccess = await this.infoAccessRoomHasLockOff.run({
      from,
      access,
      to
    })

    return hasLockOffAccess && this.isLockOffAvailableToBook(roomTypeAccess)
  }

  // TODO: set new namingConvention
  private isLockOffAvailableToBook(roomAccess: RoomAccess[]): boolean {
    return roomAccess.some(room => LockOffRoomAccessCode.includes(room.RealCode))
  }
}
