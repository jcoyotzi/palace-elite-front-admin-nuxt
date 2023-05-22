import {PromotionLevelMemberInPresale} from './promotionLevelMemberInPresale'

export interface PromotionBookingWindow {
  Recnum: number
  RecnumPromo: number
  InitDate: string
  EndDate: string
  Status: string
  PromotionLevelMemberInPresale: PromotionLevelMemberInPresale[]
}
