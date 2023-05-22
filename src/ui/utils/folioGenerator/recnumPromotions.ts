import {ReservationInfo} from 'app/booking/domain/entities/reservationInfo'
import {ReservationTypes} from '~/src/app/filldatareservation/domain/reservationTypes'

interface GenerateRecnumPromotions {
  room: ReservationInfo
  referralPromotionsBenefits: number
}

export function generateRecnumPromotions({
  room,
  referralPromotionsBenefits
}: GenerateRecnumPromotions): Array<number> {
  const recnumPromotions: Array<number> = []

  if (room.roomSelected?.selectedOption?.id === ReservationTypes.REFERIDOS) {
    recnumPromotions.push(referralPromotionsBenefits)
  } else recnumPromotions.push(0)

  if (room.roomSelected?.selectedCategory?.RealCode === 'SUPF1') recnumPromotions.push(0)

  return recnumPromotions
}
