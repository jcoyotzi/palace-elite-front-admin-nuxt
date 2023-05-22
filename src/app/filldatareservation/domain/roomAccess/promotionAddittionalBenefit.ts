import {PromotionAddittionalBenefitHotel} from './promotionAddittionalBenefitHotel'
import {PromotionWindow} from './promotionWindow'

export interface PromotionAddittionalBenefit {
  Recnum: number
  RecnumPromo: number
  Description: string
  Name: string
  TypeBenefit: string
  MinNights: number
  MaxNights: number
  Status: string
  PromotionAddittionalBenefitHotel: PromotionAddittionalBenefitHotel[]
  PromotionAddittionalBookingWindow: PromotionWindow[]
}
