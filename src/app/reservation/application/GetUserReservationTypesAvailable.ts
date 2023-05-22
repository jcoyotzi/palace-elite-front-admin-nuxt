import {inject, injectable} from 'inversify'
import {GetReservationTypesByAffiliationNumber} from '../domain/dto/getReservationTypesByAffiliationNumber'
import UseCase from '../../common/application/UseCase'
import {Reservation} from '../domain/entities/reservation'
import reservationTypes from '../../common/types/reservationTypes'
import {ReservationRepository} from '../domain/repositories/reservationRepository'

@injectable()
export default class GetUserReservationTypesAvailable
  implements UseCase<GetReservationTypesByAffiliationNumber, Reservation[]>
{
  constructor(
    @inject(reservationTypes.reservationRepository)
    private readonly reservationRepository: ReservationRepository
  ) {}

  async run(port: GetReservationTypesByAffiliationNumber): Promise<Reservation[]> {
    const response = await this.reservationRepository.getReservationTypesAvailable(
      port.affiliation,
      port.isNational,
      port.showNotSure
    )

    return response.data!
  }
}
