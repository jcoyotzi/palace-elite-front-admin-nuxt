import {PromotionBookingWindow} from './roomAccess/promotionBookingWindow'
import {PromotionRoom} from './roomAccess/promotionRoom'
import {PromotionCondYUsesClass} from './roomAccess/promotionCondYUsesClass'
import {PackageByPromotion} from './roomAccess/packageByPromotion'
import {PromotionIsNotRefundable} from './roomAccess/promotionIsNotRefundable'
import {PromotionBlackOut} from './roomAccess/promotionBlackOut'
import {PromotionCategoriesReservationElement} from './roomAccess/promotionCategoriesReservationElement'
import {PromotionTransferibleOptions} from './roomAccess/promotionTransferibleOptions'
import {PromotionFriendBlocked} from './roomAccess/promotionFriendBlocked'
import {PromotionAddittionalBenefit} from './roomAccess/promotionAddittionalBenefit'
import {PromotionByProvitionInCategory} from './roomAccess/promotionByProvitionInCategory'
import {PromotionMemberType} from './roomAccess/promotionMemberType'
import {PromotionMarket} from './roomAccess/promotionMarket'
import {PromotionProductType} from './roomAccess/promotionProductType'
import {PromotionWindow} from './roomAccess/promotionWindow'
import {PromotionHotelElement} from './roomAccess/promotionHotelElement'
import {PromotionConfiguration} from './roomAccess/promotionConfiguration'
import {PromotionInfoSettings} from './roomAccess/promotionInfoSettings'

export interface PromotionAccessRoom {
  Recnum: number
  Code: string
  Description: string
  Message: string
  MinNights: number
  MaxNights: number
  MaxUses: number
  TypePromotion: string
  GroupPromotion: string
  OutTravelWindow: boolean
  IsExternal: boolean
  PriorityGroup: number
  Status: string
  OnlyNew: number
  UsesAvailables: number
  PromotionDetail: PromotionDetail
  PromotionBookingWindow: PromotionBookingWindow[]
  PromotionTravelWindow: PromotionWindow[]
  PromotionHotels: PromotionHotelElement[]
  PromotionRooms: PromotionRoom[]
  PromotionIsNotRefundable: PromotionIsNotRefundable
  PromotionMarkets: PromotionMarket[]
  PromotionFriendly: PromotionCategoriesReservationElement[]
  PromotionBlackOuts: PromotionBlackOut[]
  PromotionCondYUses: PromotionCondYUsesClass
  PromotionCategoriesReservation: PromotionCategoriesReservationElement[]
  PromotionMemberType: PromotionMemberType[]
  PromotionCountries: PromotionCategoriesReservationElement[]
  PromotionConfiguration: PromotionConfiguration
  PromotionProductType: PromotionProductType[]
  PromotionByProvitionInCategory: PromotionByProvitionInCategory[]
  PackageByPromotion: PackageByPromotion[]
  PromotionFriendBlocked: PromotionFriendBlocked[]
  PromotionInfoSettings: PromotionInfoSettings
  PromotionLevelMember: PromotionCategoriesReservationElement[]
  PromotionTransferibleOptions: PromotionTransferibleOptions
  PromotionAddittionalBenefit: PromotionAddittionalBenefit[]
}

export interface PromotionDetail {}
