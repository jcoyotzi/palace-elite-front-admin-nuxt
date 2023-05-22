/* eslint-disable camelcase */
import {injectable} from 'inversify'
import UseCase from '~/src/app/common/application/UseCase'
import {RoomAccess} from '~/src/app/roomAccess/domain/entities/roomAccess'

@injectable()
export class GetRoomAccessRelated implements UseCase<RoomAccess[], RoomAccess[]> {
  // eslint-disable-next-line require-await
  async run(allRooms: RoomAccess[]): Promise<RoomAccess[]> {
    const roomsRelated = this.getRoomsRelated(allRooms)
    return this.relateRooms(roomsRelated, allRooms)
  }

  // TODO: set new namingConvention RealCode
  private relateRooms(roomsWithRelation: RoomAccess[], allRooms: RoomAccess[]) {
    return roomsWithRelation.map(room => {
      const roomComplementCodes = room.relRoomsCodes.split(',')
      const roomsSelected = allRooms.filter(room => roomComplementCodes.includes(room.RealCode))
      return this.joinRoomMetaData(room, roomsSelected)
    })
  }

  private getRoomsRelated(roomAccess: RoomAccess[]) {
    return roomAccess.filter(room => !!room.relRoomsCodes)
  }

  private joinRoomMetaData(roomFirstPart: RoomAccess, roomRelated: RoomAccess[]): RoomAccess {
    return {
      ...roomFirstPart
    }
  }
}
