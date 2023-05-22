export interface GetRoomTypeAccessDto {
  hotel: string
  allRoomsAccess?: boolean
  isVip?: boolean
  searchAvailability?: boolean
  arrivalDate: string
  departureDate: string
  company: number | null
  affiliationNumber: string
  promotions?: any[]
}
