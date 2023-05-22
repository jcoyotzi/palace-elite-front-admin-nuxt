import {RoomBenefit} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import {ProvitionOption} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'

export interface RoomsPax {
  adults: number
  children: number
}

export interface RoomProvisions {
  anniversary: ProvitionOption | null | undefined
  incentive: ProvitionOption | null | undefined
}

export interface CategoryEntity {
  code: string
  title: string
  recnum: string
}

interface AccessibleCategories {
  RealCode: string
  title: string
  recnum: string
}

interface RefundableButton {
  rate?: number
  bonusRate?: number
  code?: string
}

interface DailyRates {
  date: string
  dashedPrice: string
  price: number
}

interface SelectedCategory {
  dailyRates: DailyRates[]
  selectedCategory: AccessibleCategories
  selectedOption: RefundableButton | undefined
  selectedRefundRate: number
  provisions?: RoomProvisions
}

export interface MembershipTable {
  name: string
  memberUtils: {
    firstname: string
    lastname: string
  }
}

export interface ReservationFromBookings {
  roomSelected: SelectedCategory | null
  benefits?: Array<RoomBenefit>
  guests: MembershipTable[]
  roomsPax: RoomsPax
  checkIn: string
  checkOut: string
  index: number
  folio: number
  Hotel: string
  status: BookingStatus
  showDailyRates: boolean
  balance: number
  imperialFee?: number
  extraFee?: number
  imperialLeblancFee?: number
  week52Fee?: number
  contract?: string
  reservationFolioData?: any
}
