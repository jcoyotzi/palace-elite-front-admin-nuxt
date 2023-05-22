/**
 * Verifica si el data de una habitaicon proporcionada tiene el marcaje de lockoff
 */
import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function VerifyIsLockOffRoom(Data: RoomAccess) {
  var IsLockOffRoom = false
  try {
    if (Data != null || Data != undefined) {
      IsLockOffRoom = Data.IsLockOff != undefined ? Data.IsLockOff : false
    }
    return IsLockOffRoom
  } catch (ex) {
    return IsLockOffRoom
  }
}
