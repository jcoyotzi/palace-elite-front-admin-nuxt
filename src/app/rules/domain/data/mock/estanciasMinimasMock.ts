import {EnumMarkets} from '~/src/app/common/domain/enums/markets'
import {EnumReservationCategory, EnumRoomCategory} from '../../entities/enum/pipelinesEnum'

export const minimalStayFacts = [
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    roomType: EnumRoomCategory.ESTANDARD,
    market: EnumMarkets.USA, // LATAM, UK, EU
    stayMinimal: true, // true / false
    stayMinimalDays: 4 // null / 5, 6, etc
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    roomType: EnumRoomCategory.ESPECIAL,
    market: EnumMarkets.USA, // LATAM, UK, EU
    stayMinimal: true, // true / false
    stayMinimalDays: 4 // null / 5, 6, etc
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    roomType: EnumRoomCategory.ESPECIAL,
    market: EnumMarkets.USA, // LATAM, UK, EU
    stayMinimal: false, // true / false
    stayMinimalDays: 0 // 0 / 5, 6, etc
  },
  {
    reservationType: EnumReservationCategory.REFERIDOS,
    roomType: EnumRoomCategory.ESPECIAL,
    market: EnumMarkets.USA, // LATAM, UK, EU
    stayMinimal: false, // true / false
    stayMinimalDays: 0 // 0 / 5, 6, etc
  },
  {
    reservationType: EnumReservationCategory.BONO,
    roomType: EnumRoomCategory.ESPECIAL,
    market: EnumMarkets.USA, // LATAM, UK, EU
    stayMinimal: false, // true / false
    stayMinimalDays: 0 // 0 / 5, 6, etc
  }
]
