import {GetSelectedRoomData} from './GetSelectedRoomData'
import {RoomAccess} from '../domain/roomAccess/roomAccess'
import {GetRoomRelated} from './getRoomRelated'
import {VerifyIsLockOffRoom} from './VerifyIsLockOffRoom'

export function GetRoomType(
  Index: number,
  roomAccess: RoomAccess[],
  roomCode: string,
  _IsMultiCategoryEngine: boolean,
  _RoomTypesRelated: any
) {
  var CurrentRoomData = GetSelectedRoomData(roomAccess, roomCode)
  //Implementar index para busqueda de habitaciones relacionadas de mas de 2 unidades
  //Implemetacion de villas - index 4
  var Room = Index == undefined || Index == 1 ? roomCode : GetRoomRelated(roomAccess, roomCode)
  //Las lockoff no tienen habitacion relacionada
  if (VerifyIsLockOffRoom(CurrentRoomData)) {
    Room = CurrentRoomData.OriginalCode
  }

  if (_IsMultiCategoryEngine && Index != undefined) {
    Room = _RoomTypesRelated[roomCode][Index - 1]
  }
  return Room
}
