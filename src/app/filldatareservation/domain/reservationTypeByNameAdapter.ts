import {ReservationTypes} from './reservationTypes'
import {reservationTypesByName} from './reservationTypesByName'

export function ReservationTypeByNameAdapter(name: string): ReservationTypes {
  if (reservationTypesByName.has(name)) {
    return reservationTypesByName.get(name)!
  }

  return ReservationTypes.REFERIDOS
}
