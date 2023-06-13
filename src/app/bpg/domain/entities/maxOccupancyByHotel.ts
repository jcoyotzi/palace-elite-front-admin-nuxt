export interface GetMaxOccupancyByHotelRequest {
  application: string
  company: number
  hotel: string
}

export interface MaxOccupancyByHotelAndRoomType {
  hotel: string
  roomType: string
  maxOccupancy: number
}