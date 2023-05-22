import {RoomAccess} from '../domain/roomAccess/roomAccess'
import {FixDatesInObject} from './fixDatesInObject'

export function getSelectedRoomData(roomAccess: RoomAccess[], room: string) {
  let currentRoom = null

  roomAccess.forEach(function (item) {
    if (room == item.code) {
      currentRoom = item
    }
  })

  return FixDatesInObject(room)
}
