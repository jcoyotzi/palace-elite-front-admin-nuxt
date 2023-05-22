import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import payLinkTypes from '../../common/types/payLinkTypes'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'
import ReservationsDto from '../../bookings/domain/dto/reservationsDto'
import {Response} from '../../network/common/domain/entity/response'
import PayloadPayNowReservation from '../domain/entities/payloadPayNowReservation'

@injectable()
export default class PayNowReservationUseCase
  implements UseCase<PayloadPayNowReservation, Response<any>>
{
  constructor(
    @inject(payLinkTypes.payLinkRepository)
    private readonly payLinkRepository: PayLinkRepository
  ) {}

  async run(payload: PayloadPayNowReservation): Promise<Response<any>> {
    return await this.payLinkRepository.payNowReservation(payload)
  }
}
