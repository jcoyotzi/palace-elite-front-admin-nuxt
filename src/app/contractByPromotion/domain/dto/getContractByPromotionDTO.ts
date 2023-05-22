export default interface GetContractByPromotionDTO {
  afilliation: string
  company: number
  hotelCode: string
  checkInEpoch: number
  checkOutEpoch: number
  nights: number
  roomCode: string
  provisionType?: string
  productId: string
  isRefundable: boolean
  reservationType: number
  isNational: boolean
  isLockOff?: boolean
  market?: string
  country?: string
  adult: number
  child: number
  promotionId?: string
  golfType?: string
  promotions?: any
  reservationCostType?: string
  marketAll?: string 
  type?: string
  guestCd?: string
  typeCombination?: string
  provisionGold?: string
  folio?: number
}
