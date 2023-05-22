export interface ValidatePromotionDto {
  arvDate: Date | string
  departDate: Date | string
  bookingWindowDate: Date | null
  memberLevel: string 
  hotelCurrent: string | null
  rmTypeCurrent: string | null
  categoryRsv: string | null
  memberRateType: string | null
  memberCostType: string | null
  country: string
  typePromotionFilter: string | null
  omitPromoCode: null,
  application: string
  company: number
  isNational: boolean
  nights: number | string
  market: string
  golfType: string
  customPromotion: null 
}