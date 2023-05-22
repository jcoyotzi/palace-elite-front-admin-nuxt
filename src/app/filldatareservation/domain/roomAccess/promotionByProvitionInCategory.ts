import {PromotionTypeMemberByProvition} from './promotionTypeMemberByProvition'

export interface PromotionByProvitionInCategory {
  Recnum: number
  RecnumPromo: number
  RecnumCategory: number
  IdProvition: string
  Status: string
  PromotionTypeMemberByProvition: PromotionTypeMemberByProvition[]
}
