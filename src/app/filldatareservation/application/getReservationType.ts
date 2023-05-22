import {ReservationTypes} from '../domain/reservationTypes'

/**
 * @todo
 */
export class GetReservationType {
  constructor(private readonly reservationType: ReservationTypes) {}

  public run(isMultipleCategoryEngine: boolean, roomCode?: string): ReservationTypes {
    return this.reservationType
  }
}
