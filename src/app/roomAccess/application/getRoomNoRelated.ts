import {injectable} from 'inversify'
import {RoomAccess} from '../domain/entities/roomAccess'
import UseCase from 'app/common/application/UseCase'

@injectable()
export class GetRoomNoRelated implements UseCase<RoomAccess[], RoomAccess[]> {
  // eslint-disable-next-line require-await
  async run(roomAccess: RoomAccess[]): Promise<RoomAccess[]> {
    // TODO: set new namingConvention for Category
    return roomAccess.filter(room => !room.relRoomsCodes && !this.isRoomDivided(room.Category._RmtypeRelated))
  }

  private isRoomDivided(str:string) {
    return /[1-4]/.test(str);
  }
}
