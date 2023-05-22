export interface BookingNowDto {
  // TODO: Queda pendiente validar con equipo de backend prop room
  affiliationId: string
  arrivalDate: number
  departureDate: number
  market: string
  company: string
  property: string
  adult: number
  child: number
}
