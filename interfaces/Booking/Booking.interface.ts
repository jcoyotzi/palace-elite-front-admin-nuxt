export interface BookingEvent {
  checkIn: string
  checkOut: string
  rooms: {adults: number; children: number; childrenages: number[]}[]
  totalRooms: number
}
