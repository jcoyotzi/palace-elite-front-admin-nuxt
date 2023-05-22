import {SelectedCategory} from '~/interfaces/Booking/Category.interface'
import {MembershipTable} from 'app/common/domain/entities/membershipTable'
import {RoomBenefit} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import {ProvitionOption} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'
import {RawProvisionFromLegacyDto} from 'app/reservation/domain/dto/rawProvisionFromLegacyDto'
import {ReservationReferral} from 'app/booking/domain/entities/reservationReferral'
import {RmfolioRC} from '~/src/app/contractByPromotion/domain/entities/ContractByPromotion'
import {ImperialTotalRate} from '~/src/ui/store/bookingStore'
import {IsTransferableResponse} from '~/src/app/user/domain/entities/isTransferableBonus'
import {CreateRoomFolioRespondeDto} from '~/src/app/provisions/assignProvision/dto/CreateRoomFolioResponseDto'

export interface RoomsPax {
  adults: number
  children: number
  childrenages?: any[]
}

export interface RoomProvisions {
  anniversary: ProvitionOption | null | undefined
  incentive: ProvitionOption | null | undefined
}

export interface ReservationInfo {
  chris?: boolean
  isLockOff?: boolean
  preAmountChrismas?: any
  roomsPax: RoomsPax
  benefits?: Array<RoomBenefit>
  roomSelected: SelectedCategory | null
  guests: MembershipTable[]
  showDailyRates: boolean
  combinations: any
  preferentialRates: any
  index: number
  status: PaymentStatus
  eliteProduct: string
  eliteProductType?: string
  folio: number
  selectedProvition?: RawProvisionFromLegacyDto | null
  provisions?: RoomProvisions
  imperialFee?: number
  extraFee: number
  imperialLeblancFee?: number
  selectedReferrals?: ReservationReferral[]
  transferableBonus?: IsTransferableResponse
  week52Fee?: number
  RmfolioRc: RmfolioRC | null
  imperialTotalRate: ImperialTotalRate | null
  savedXAmount?: number
  folioContent?: CreateRoomFolioRespondeDto
  reservationFolioData?: any
}
