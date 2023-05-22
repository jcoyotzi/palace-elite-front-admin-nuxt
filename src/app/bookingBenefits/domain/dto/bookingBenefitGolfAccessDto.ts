export interface BookingBenefitGolfAccessDto {
  data: BookingBenefitGolfAccessDtoDatum[]
  errors: null
  warnings: null
}

export interface BookingBenefitGolfAccessDtoDatum {
  roomCode: string
  golfRateByProducts: GolfRateByProduct[]
}

export interface GolfRateByProduct {
  productId: string
  golfType: string
  rate: number
}
