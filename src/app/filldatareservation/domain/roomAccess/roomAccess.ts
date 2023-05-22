import {PromotionAccessRoom} from '../PromotionAcessRoom'
import {Category} from './roomCategory'
import {CleverRoomTypeCategory} from './cleverRoomTypeCategory'
import {RoomInfoAvailability} from './roomInfoAvailability'
import {RoomArea} from './roomArea'

export interface RoomAccess {
  availability: boolean
  IsLockOff?: boolean
  RealCode: string
  totalRooms: number
  isVirtual: boolean
  relRoomsCodes: string
  lockOffType: string
  promotionAccessRoom: PromotionAccessRoom | null
  recnum: number
  hotel: string
  code: string
  description: string
  rate1: number
  rate2: number
  rate3: number
  rate_add: number
  // eff_string: string;
  eff_date: string
  rooms: number
  // ent_string: string;
  ent_date: string
  ent_time: string
  ent_term: string
  ent_oper: string
  // chg_string: string;
  chg_date: string
  chg_time: string
  chg_term: string
  chg_oper: string
  max_pers: number
  max_priv: number
  ocn_view: string
  pertenece: string
  doubleb: number
  king: number
  queen: number
  murphy: number
  Category: Category
  CLVRoomTypeCategory: CleverRoomTypeCategory
  infoAvailability: RoomInfoAvailability | null
  operaId: string
  RoomArea: RoomArea | null
  bookingTerms: string
}
