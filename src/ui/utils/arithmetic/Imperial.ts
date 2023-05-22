import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'

export function calculateRoomImperialFee(room: ReservationInfo) {
  let supplementFee = 0
  supplementFee += room.imperialTotalRate?.Rate || 0
  supplementFee += room.imperialTotalRate?.AmountChargeUpgrade || 0
  supplementFee += room.imperialTotalRate?.AmountOutOfSeason || 0
  supplementFee += room.imperialTotalRate?.AmountResortAccess || 0
  supplementFee += room.imperialTotalRate?.AmountThanksGivingDay || 0
  supplementFee += room.imperialTotalRate?.AmountWeek52 || 0

  return supplementFee
}
