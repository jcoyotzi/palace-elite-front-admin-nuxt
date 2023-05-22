import {CategoryEntity} from '~/src/app/category/domain/entities/category'
import {RoomAccess} from '~/src/app/roomAccess/domain/entities/roomAccess'
import {AccessibleCategories} from '~/src/app/category/domain/mapper/AccesibleCategories'

import {
  RoomRatesCleverNightPriceFormatted,
  RoomRefundableRateFormated
} from '~/src/app/ratesClever/domain/entities/roomRatesClever'
import {RoomProvisions} from 'app/booking/domain/entities/reservationInfo'
import {Combination} from '~/src/app/booking/domain/dto/imperialDto'
import {RawProvisionFromLegacyDto} from 'app/reservation/domain/dto/rawProvisionFromLegacyDto'

export interface MappedRates {
  dailyRates: RoomRatesCleverNightPriceFormatted[]
  refundableRates: RoomRefundableRateFormated[]
  nonRefundableRates: RoomRefundableRateFormated[]
  totalRate: string
  currency: string
  publicRate: string
}

interface BonusReferrals {
  label: string
  notes: string
}

interface DailyRates {
  date: string
  dashedPrice: string
  price: any
}

interface ImperialWeeks {
  label: string
  value: string
  notes: string
  id: string
}

interface RefundableButton {
  rateLbl: string
  ratePrice: string
  value: string
  checked?: boolean
  code?: string
  rate?: number
  bonusRate?: number
  id?: number | string
}

interface RefundRateOptions {
  id: string
  name: string
  labelText: string
}

interface RoomDetailProps {
  category: AccessibleCategories
  index: number
}

interface CategoryMappedItems {
  appendIcons: string[]
  content: string
  header: string
}

interface CategoryMapped
  extends Pick<AccessibleCategories, 'area' | 'code' | 'images' | 'max' | 'title' | 'tour'>,
    MappedRates {
  items: CategoryMappedItems[]
  lock: boolean
}

interface SelectedOption {
  code: string
  rate: number
  regularRate: number
  bonusRate?: number
}

interface SelectedCategory {
  dailyRates: DailyRates[]
  selectedCategory: AccessibleCategories
  selectedOption: RefundableButton | undefined
  selectedRefundRate: string
  totalRate: string
  creditLimit: string
  provisions?: RoomProvisions
  selectedProvition?: RawProvisionFromLegacyDto
  selectedCombination?: Combination
  bonusRate?: number
  isImperial?: boolean
  imperialPublicRatesData?: imperialPublicRatesData
  bonusWeekPublicRatesData?: imperialPublicRatesData
  amountUpgrade?: number
}

interface imperialPublicRatesData {
  publicRate: string
  totalRate: string
}

export {
  AccessibleCategories,
  BonusReferrals,
  CategoryEntity,
  DailyRates,
  ImperialWeeks,
  RefundableButton,
  RefundRateOptions,
  RoomAccess,
  RoomDetailProps,
  CategoryMapped,
  CategoryMappedItems,
  SelectedCategory
}
