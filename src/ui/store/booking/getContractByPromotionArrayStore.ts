import {Pinia, Store} from 'pinia-class-component'
import dayjs from 'dayjs'
import {BookingStore} from '../bookingStore'
import {lazyInject} from '~/src/container'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import ContractByPromotionServiceRepository from 'app/contractByPromotion/domain/repositories/contractByPromotionServiceRepository'
import {UseAuth} from '~/src/ui/store/auth'
import GetContractByPromotionDTO from 'app/contractByPromotion/domain/dto/getContractByPromotionDTO'
import {GuestRelationship} from 'app/filldatareservation/domain/data/GuestRelationship'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {RefundableOptions} from 'app/common/domain/enums/refundableOptions'
import {InfoMemberProvision} from 'app/booking/domain/dto/imperialDto'
import {RCDetail} from 'app/contractByPromotion/domain/entities/ContractByPromotion'

export interface getContractByPromotionArrayPayload {
  index: number
}

@Store({
  name: 'GetContractByPromotionArrayStore'
})
export default class GetContractByPromotionArrayStore extends Pinia {
  @lazyInject(contractByPromotionTypes.ContractByPromotionRepository)
  private readonly contractByPromotionServiceRepository!: ContractByPromotionServiceRepository

  getContractByPromotionArrayPayload({
    index = 0
  }: getContractByPromotionArrayPayload): GetContractByPromotionDTO {
    const authStore = new UseAuth()
    const bookingStore = new BookingStore()
    const {checkIn, checkOut, propertyCode} = bookingStore.getBooking

    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

    const currentRoomInfo = bookingStore.reservationInfo[index]

    const selectedCombination = currentRoomInfo.roomSelected?.selectedCombination

    const selectedProvition = currentRoomInfo.roomSelected?.selectedProvition
    const selectedCategory = currentRoomInfo.roomSelected?.selectedOption

    let golfType = ''

    try {
      golfType = this.golfType(currentRoomInfo.roomSelected!.selectedProvition!)
      /* console.log(
        '🚀 ~ file: getContractByPromotionArrayStore.ts:47 ~ GetContractByPromotionArrayStore ~ golfType',
        golfType
      )
      */
    } catch (error) {
      // console.log(error)
    }

    // debugger

    let guestCd = 'G'

    const guests = bookingStore.reservationInfo[index].guests

    if (guests.length > 0 && guests[0] !== null) {
      guestCd = guests[0].memberUtils?.isGuest ? GuestRelationship.Guest : GuestRelationship.Member
    }

    return {
      adult: currentRoomInfo.roomsPax.adults,
      afilliation: authStore.user!._UserMember._application,
      checkInEpoch: toEpochTimeStamp(checkIn),
      checkOutEpoch: toEpochTimeStamp(checkOut),
      child: currentRoomInfo.roomsPax.children,
      company: authStore.user!._UserMember._company,
      hotelCode: propertyCode,
      isLockOff: currentRoomInfo.isLockOff,
      isNational: authStore.user!._UserMember._isnational,
      market: authStore.user!._Market,
      productId: bookingStore.reservationInfo[index].eliteProduct || '',
      promotionId:
        golfType === 'ULG'
          ? selectedCombination!.ProvisionIdWithGolf
          : selectedCombination?.ToProvisionId,
      provisionType: selectedProvition?.TYPE,
      isRefundable:
        currentRoomInfo.roomSelected?.selectedRefundRate === RefundableOptions.REFUNDABLE,
      nights,
      reservationType: Number(selectedCategory!.id),
      roomCode: currentRoomInfo.roomSelected!.selectedCategory.RealCode,
      golfType,
      promotions: bookingStore.specialRatesPromotion,
      guestCd,
      typeCombination: bookingStore.reservationInfo[index].roomSelected!.selectedCombination?.Type,
      provisionGold: bookingStore.reservationInfo[index].roomSelected?.selectedProvition?.USG_TEMP,
      folio: currentRoomInfo.folio
    }
  }

  golfType(provision: InfoMemberProvision): string {
    // console.log('Provition', provision)

    if (provision === undefined) {
      return 'AINC'
    }
    const inluded = provision ? provision.ULG_INCLUDE === 'Y' : false
    const amount = provision.ULG_AMOUNT
    const additionalPayment: boolean =
      provision.ULG_ADDITIONAL_PAYMENT === undefined ? false : provision.ULG_ADDITIONAL_PAYMENT
    const hasAmount = amount !== undefined && amount !== 0
    const withPayment = additionalPayment || hasAmount

    // AINC
    if (!inluded) {
      return 'AINC'
    }
    // ULG
    if (inluded && withPayment) {
      return 'ULGW'
    }
    // ULGW
    if (inluded && !withPayment) {
      return 'ULG'
    }

    return 'AINC'
  }

  getTotalImperialAmounts(rcDetail: RCDetail) {
    return rcDetail.RmfolioRc.reduce(
      (previousValue, currentValue) => {
        return {
          AmountWeek52: previousValue.AmountWeek52 + currentValue.AmountWeek52,
          AmountChargeUpgrade: previousValue.AmountChargeUpgrade + currentValue.AmountChargeUpgrade,
          AmountOutOfSeason: previousValue.AmountOutOfSeason + currentValue.AmountOutOfSeason,
          AmountPromotion: previousValue.AmountPromotion + currentValue.AmountPromotion,
          AmountResortAccess: previousValue.AmountResortAccess + currentValue.AmountResortAccess,
          AmountThanksGivingDay:
            previousValue.AmountThanksGivingDay + currentValue.AmountThanksGivingDay,
          Rate: previousValue.Rate + currentValue.Rate,
          AditionalCharges: previousValue.AditionalCharges + currentValue.AditionalCharges,
          AdditionalCost: previousValue.AdditionalCost + currentValue.AdditionalCost
        }
      },
      {
        AmountWeek52: 0,
        AmountChargeUpgrade: 0,
        AmountOutOfSeason: 0,
        AmountPromotion: 0,
        AmountResortAccess: 0,
        AmountThanksGivingDay: 0,
        Rate: 0,
        AditionalCharges: 0,
        AdditionalCost: 0
      }
    )
  }
}
