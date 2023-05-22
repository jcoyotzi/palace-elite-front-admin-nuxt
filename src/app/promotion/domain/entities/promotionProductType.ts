import {PromotionStayMinimusByProduct} from './promotionStayMinimusByProduct'

export interface PromotionProductType {
  Recnum: number
  RecnumPromo: number
  ProductType: string
  MinNights: number
  MaxNights: number
  Status: string
  PromotionStayMinimusByProduct: PromotionStayMinimusByProduct[]
}
