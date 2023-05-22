/**
 * @param roomCode
 * @description Es el equivalente al código de la habitación [SUP, G1, SUPF1]
 */
import {GetReservationType} from './getReservationType'
import {ReservationTypes} from '../domain/reservationTypes'

export function isProvisionalReservation(
  multiCategoryEngine: boolean,
  reservationType: ReservationTypes,
  roomCode: string
) {
  const getReservationType = new GetReservationType(reservationType)
  const reservationTypeFromCode = getReservationType.run(multiCategoryEngine, roomCode)
  return (
    reservationTypeFromCode === ReservationTypes.INCENTIVA ||
    reservationTypeFromCode === ReservationTypes.ANIVERSARIO
  )
}
