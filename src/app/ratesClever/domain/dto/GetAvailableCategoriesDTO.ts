export interface GetAvailableCategoriesDTO {
    application: string | null
    company: number | null
    hotel: string
    checkInDate: number
    checkOutDate: number
    nights: number
    market: string | null
    isNational: boolean | null
  }