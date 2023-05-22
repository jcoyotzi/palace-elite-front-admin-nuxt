import {GetReservationType} from './getReservationType'
import {ReservationTypes} from '../domain/reservationTypes'

export function isImperialReservation(
  isMultipleCategoryEngine: boolean,
  reservationType: ReservationTypes,
  roomCode: string
) {
  const getReservationType = new GetReservationType(reservationType)
  const currentReservationType = getReservationType.run(isMultipleCategoryEngine, roomCode)
  return (
    currentReservationType === ReservationTypes.IMP_WEEKS ||
    currentReservationType === ReservationTypes.IMP_NIGHT
  )
}
