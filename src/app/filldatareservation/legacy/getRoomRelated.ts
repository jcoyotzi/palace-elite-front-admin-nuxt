/**
 * Obtiene la habitacion relacionada
 */
import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function getRoomRelated(roomTypeAccess: RoomAccess[], roomCode: string) {
  let related = ''
  roomTypeAccess.forEach(function (item) {
    if (roomCode == item.code) {
      related = item.Category.RmtypeRelated
    }
  })
  return related
}
