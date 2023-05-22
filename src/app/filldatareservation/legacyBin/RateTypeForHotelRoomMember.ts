import {ValideMarketValueForMPG} from '../domain/ValideMarketValueForMPG'
import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function RateTypeForHotelRoomMember(
  Hotel: string,
  Category: string,
  MemberRateType: string,
  RoomType: string,
  RoomAccess: RoomAccess[]
) {
  var RateType = ''
  if (Hotel == 'MPG' && Category !== '8') {
    // Si es Presidencial villa  se valida que la afiliacion sea fijao tarifa ambas, en donde es necesario seleccionar el tipo de tarifa en estas habitaciones.
    //[efdiaz] 17/09/2019 Se agrega GRS
    if (ValideMarketValueForMPG(RoomAccess, RoomType) || RoomType == 'GRS') {
      // Tarifa ambas y baja sera baja, alta sera alta
      //Para la provision 33 Inventiva siempre sera L
      /*if (MemberRateType == 'L' || MemberRateType == 'B' || (GetModeReservation(GetCurrentSuiteEngine()) == "7" && provisionId == '33')) {
        RateType = 'L';
      }
      else {*/
      RateType = 'H'
      //}
    } else {
      // La Rv sera siempre baja, y el resto sera alta
      if (RoomType == 'RV') RateType = 'L'
      else RateType = 'H'
    }
  } // si no es MPG siempre sera baja
  else {
    RateType = 'L'
  }
  return RateType
}
