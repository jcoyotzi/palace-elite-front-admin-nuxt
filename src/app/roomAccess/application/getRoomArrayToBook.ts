import {inject, injectable} from 'inversify'
import roomAccessTypes from '../../common/types/roomAccessTypes'
import {RoomAccess} from '../domain/entities/roomAccess'
import {CreateLockOffRoomAccess} from 'app/roomAccess/application/createLockOffRoomAccess'
import {GetRoomNoRelated} from 'app/roomAccess/application/getRoomNoRelated'
import {GetArrayToBookPayload} from "app/roomAccess/domain/getArrayToBookPayload";

@injectable()
export default class GetRoomArrayToBook {
  constructor(
    @inject(roomAccessTypes.getRoomNoRelated)
    private readonly getRoomNoRelated: GetRoomNoRelated,

    @inject(roomAccessTypes.createLockOffRoomAccess)
    private readonly createLockOffAccess: CreateLockOffRoomAccess
  ) {}

  public async run({ allRooms, hasLockOffAccess }: GetArrayToBookPayload): Promise<RoomAccess[]> {
    const relatedRooms = this.getFirstPart(allRooms)
    const noRelatedRooms = await this.getRoomNoRelated.run(allRooms)
    let lockOfRooms: any[] = [];

    if (hasLockOffAccess) {
      lockOfRooms = await this.createLockOffAccess.run(JSON.parse(JSON.stringify(relatedRooms)))
    }

    return noRelatedRooms.concat(relatedRooms).concat(lockOfRooms)
  }

  private getFirstPart(allRooms: RoomAccess[]) {
    // TODO: set new namingConvention for Category
    return allRooms.filter(room => room.Category._IsPartOne && room.Category._IsDouble)
  }
}
