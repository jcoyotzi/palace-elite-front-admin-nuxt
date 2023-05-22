export interface ProvitionsRequest {
  application: string
  company: number
  isNational: boolean
  hotel: string
  arrivalDate: string
  departureDate: string
}
export interface ImperialProvitionRequest extends ProvitionsRequest {
  room: string
  nights: number
}

export enum BookingProvitionCategoties {
  Imperial = 4
}
