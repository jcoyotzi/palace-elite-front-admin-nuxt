export interface BookingBenefitGolfAccessRequestDto {
  application: string
  company: string
  request: BookingBenefitGolfAccessRequest
}

export interface BookingBenefitGolfAccessRequest {
  hotel: string
  arrivalDate: string
  departureDate: string
  categoryId: string
  nights: number
  roomCodes: string[]
  market: string
  isNational: boolean
}
