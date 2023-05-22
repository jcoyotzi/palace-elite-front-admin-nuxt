import {PromotionHotelElement} from './promotionHotelElement'

export interface PromotionBlackOut {
  Recnum: number
  RecnumPromo: string
  InitDate: string
  EndDate: string
  Status: string
  PromotionBlackOutsRooms: PromotionHotelElement[]
  PromotionBlackOutsHotel: PromotionHotelElement[]
}
