import {PromotionDetail} from './promotionDetail'
import {PromotionBookingWindow} from './promotionBookingWindow'
import {PromotionWindow} from './promotionWindow'
import {PromotionHotelElement} from './promotionHotelElement'
import {PromotionRoom} from './promotionRoom'
import {PromotionIsNotRefundable} from './promotionIsNotRefundable'
import {PromotionMarket} from './promotionMarket'
import {PromotionCategoriesReservationElement} from './promotionCategoriesReservationElement'
import {PromotionBlackOut} from './promotionBlackOut'
import {PromotionCondYUsesClass} from './promotionCondYUsesClass'
import {PromotionMemberType} from './promotionMemberType'
import {PromotionConfiguration} from './promotionConfiguration'
import {PromotionProductType} from './promotionProductType'
import {PromotionByProvitionInCategory} from './promotionByProvitionInCategory'
import {PackageByPromotion} from '././../../../roomAccess/domain/entities/packageByPromotion'
import {PromotionFriendBlocked} from './promotionFriendBlocked'
import {PromotionInfoSettings} from './promotionInfoSettings'
import {PromotionTransferibleOptions} from './promotionTransferibleOptions'
import {PromotionAddittionalBenefit} from './promotionAddittionalBenefit'

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
