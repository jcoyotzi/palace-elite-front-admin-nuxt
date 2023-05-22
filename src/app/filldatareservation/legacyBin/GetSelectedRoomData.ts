import {FixDatesInObject} from './FixDatesInObject'
import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function GetSelectedRoomData(RoomTypeAccess: RoomAccess[], Room: string) {
  var room = null
  RoomTypeAccess.forEach(function (item) {
    if (Room == item.code) {
      room = item
    }
  })

  return FixDatesInObject(room)
}
