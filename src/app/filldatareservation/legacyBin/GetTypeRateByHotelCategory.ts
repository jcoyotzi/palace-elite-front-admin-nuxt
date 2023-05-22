import {RateTypeForHotelRoomMember} from './RateTypeForHotelRoomMember'
import {RoomAccess} from '../domain/roomAccess/roomAccess'

export function GetTypeRateByHotelCategory(
  Hotel: string,
  Category: string,
  MemberRateType: string,
  MemberCostType: string,
  RoomType: string,
  ExceptionRateVariable: string,
  provisionId: string,
  RoomAccess: RoomAccess[]
) {
  var RateType = ''

  switch (
    MemberCostType // si es fija la afiliacion se verifica hotel y las habitaciones asi como el tipo de tarifa del socio.
  ) {
    case 'F':
      RateType = RateTypeForHotelRoomMember(Hotel, Category, MemberRateType, RoomType, RoomAccess)
      break
    //Si la afiliacion es Variable sera siempre Baja
    case 'V':
    case 'N':
      if (Category == '3' || Category == '4' || Category == '6' || ExceptionRateVariable)
        RateType = RateTypeForHotelRoomMember(Hotel, Category, MemberRateType, RoomType, RoomAccess)
      else RateType = 'L'
      break
  }
  return RateType
}
