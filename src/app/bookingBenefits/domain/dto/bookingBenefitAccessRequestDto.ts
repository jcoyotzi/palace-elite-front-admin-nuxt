export interface BookingBenefitAccessRequestDto {
  application: string
  company: string
  request: BookingBenefitAccessRequest
}

export interface BookingBenefitAccessRequest {
  isNational: boolean
  hotel: string
  arrivalDate: string
  departureDate: string
}
