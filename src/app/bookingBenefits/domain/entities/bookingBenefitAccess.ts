import {Price} from './bookingBenefit'
export interface BookingBenefitAccessEntity extends Price {
  id: string
  recNumPromo?: string
}
