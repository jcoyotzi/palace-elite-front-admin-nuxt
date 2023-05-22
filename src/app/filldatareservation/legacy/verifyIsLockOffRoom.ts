import {RoomAccess} from '../domain/roomAccess/roomAccess'

/**
 * Verifica si él data de una habitaicon proporcionada tiene el marcaje de lockoff
 */
export function verifyIsLockOffRoom(data: RoomAccess | null) {
  let IsLockOffRoom = false

  try {
    if (data) {
      IsLockOffRoom = data.IsLockOff !== undefined ? data.IsLockOff : false
    }
    return IsLockOffRoom
  } catch (ex) {
    return IsLockOffRoom
  }
}
