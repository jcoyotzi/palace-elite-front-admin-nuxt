import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import payLinkTypes from '../../common/types/payLinkTypes'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'
import ReservationsDto from '../../bookings/domain/dto/reservationsDto'
import PayloadDataReservation from '../domain/entities/payloadDataReservation'
import {Response} from '../../network/common/domain/entity/response'

@injectable()
export default class GetReservationByTokenUseCase
  implements UseCase<PayloadDataReservation, Response<ReservationsDto>>
{
  constructor(
    @inject(payLinkTypes.payLinkRepository)
    private readonly payLinkRepository: PayLinkRepository
  ) {}

  async run(payload: PayloadDataReservation): Promise<Response<ReservationsDto>> {
    return await this.payLinkRepository.getReservationByToken(payload)
  }
}
