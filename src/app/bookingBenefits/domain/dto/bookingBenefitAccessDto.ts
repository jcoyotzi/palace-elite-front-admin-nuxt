export interface BookingBenefitAccessDto {
  data: Data
  errors: null
  warnings: null
}

export interface Data {
  PrivateTransportation: PrivateTransportation[]
}

export interface PrivateTransportation {
  Recnum: number
  RecnumPromo: number
  Name: string
  Amount: number
}
export enum BookingBenefitAccessLabelDto {
  description = 'Price per unit'
}
