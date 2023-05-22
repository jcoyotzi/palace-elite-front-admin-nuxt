import {PromotionCondYUsesClass} from './promotionCondYUsesClass'

export interface PromotionIsNotRefundable {
  Recnum: number
  RecnumPromo: string
  IsNoRefundable: boolean
  ApplyDiscount: boolean
  Status: string
  PromotionIsNotRefundableCondYUse: PromotionCondYUsesClass
}
