import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function GetRoomRelated(accessRooms: RoomAccess[], Room: string) {
  let related = ''

  accessRooms.forEach(function (item) {
    if (Room == item.code) {
      related = item.Category.RmtypeRelated
    }
  })
  return related
}
