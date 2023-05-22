import {ReservationTypes} from './reservationTypes'

const reservationTypesByName = new Map<string, number>()

reservationTypesByName.set('PREFERENCIAL', ReservationTypes.PREFERENCIAL)
reservationTypesByName.set('REFERIDOS', ReservationTypes.REFERIDOS)

export {reservationTypesByName}
