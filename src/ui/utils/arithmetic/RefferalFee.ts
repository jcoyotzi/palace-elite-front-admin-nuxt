import {ReferralProgram} from '~/src/app/booking/domain/dto/referralProgram'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'

export const ReferalMarkets = ['USA', 'CANADA', 'LATAM']

export interface calculatereferralFeePayload {
  room: ReservationInfo
  referralScheme: number
  referralProgram: ReferralProgram | null
}

export function calculateRoomRefferalFee({
  room,
  referralScheme,
  referralProgram
}: calculatereferralFeePayload): number {
  if (
    room.roomSelected?.selectedOption?.code === BookingCategoryStatus.REFERIDO &&
    referralProgram?.fee
  ) {
    const fee =
      referralScheme === 1 || referralScheme === 3
        ? referralProgram?.feeInternet || 0
        : referralProgram?.fee || 0
    if (ReferalMarkets.includes(referralProgram?.market || '')) {
      return fee
    } else {
      return Number(fee) * Number(room.roomSelected?.dailyRates.length)
    }
  }
  return 0
}
