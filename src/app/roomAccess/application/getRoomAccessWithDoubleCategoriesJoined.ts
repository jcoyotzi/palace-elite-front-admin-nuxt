import {inject, injectable} from 'inversify'
import {RoomAccess} from '../domain/entities/roomAccess'
import roomAccessTypes from '../../common/types/roomAccessTypes'
import {GetRoomAccessRelated} from './getRoomAccessRelated'
import {GetRoomNoRelated} from './getRoomNoRelated'
import UseCase from '~/src/app/common/application/UseCase'

@injectable()
export default class GetRoomAccessWithDoubleCategoriesJoined
  implements UseCase<RoomAccess[], RoomAccess[]>
{
  constructor(
    @inject(roomAccessTypes.getJoinedRoomsByRealCode)
    private readonly getJoinedRoomsByRealCode: GetRoomAccessRelated,

    @inject(roomAccessTypes.getRoomNoRelated)
    private readonly getRoomNoRelated: GetRoomNoRelated
  ) {}

  async run(roomAccess: RoomAccess[]): Promise<RoomAccess[]> {
    if (!this.isAnyRoomRelated(roomAccess)) {
      return roomAccess
    }

    const singleRooms = await this.getRoomNoRelated.run(roomAccess)
    const roomsRelatedJoined = await this.getJoinedRoomsByRealCode.run(roomAccess)

    return singleRooms.concat(roomsRelatedJoined)
  }

  private isAnyRoomRelated(allRoomAccess: RoomAccess[]) {
    return allRoomAccess.some(room => !!room.relRoomsCodes)
  }
}
