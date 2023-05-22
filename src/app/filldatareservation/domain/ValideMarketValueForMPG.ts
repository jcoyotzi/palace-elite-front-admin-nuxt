import {RoomAccess} from './roomAccess/roomAccess'

export function ValideMarketValueForMPG(RoomTypeAccess: RoomAccess[], RoomType: any) {
  var response = false
  var type = 0
  //Verificamos que el hotel seleccionado este en el array de HotelRateType
  for (var R = 0; R < RoomTypeAccess.length; R++) {
    //var Room = RoomType[R];
    var Room = RoomTypeAccess[R]
    //Si esta el codigo de la habitacion.
    if (Room.code == RoomType) {
      //Obtenemos el tipo
      //Parseamos a entero
      type = Number(Room.Category.Type)
      if (type == 1 || type == 4) {
        response = true
      }
    }
  }

  return response
}
