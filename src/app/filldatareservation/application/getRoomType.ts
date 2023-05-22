import {getSelectedRoomData} from '../legacy/getSelectedRoomData'
import {RoomAccess} from '../domain/roomAccess/roomAccess'
import {getRoomRelated} from '../legacy/getRoomRelated'
import {verifyIsLockOffRoom} from '../legacy/verifyIsLockOffRoom'

/**
 *
 * @description Devuelve el tipo de habitacion
 * Con las lockoff, ahora es necesario verificar el RoomTypeAccess y obtener el codigo original
 */
export function getRoomType(
  roomAccess: RoomAccess[],
  roomCode: string,
  isMultiCategoryEngine: boolean,
  index?: number
) {
  const currentRoomData = getSelectedRoomData(roomAccess, roomCode)
  let room = index === undefined || index === 1 ? roomCode : getRoomRelated(roomAccess, roomCode)

  if (verifyIsLockOffRoom(currentRoomData)) {
    room = currentRoomData.OriginalCode
  }

  if (isMultiCategoryEngine && index) {
    room = currentRoomData.Category.RmtypeRelated
  }

  return room
}
