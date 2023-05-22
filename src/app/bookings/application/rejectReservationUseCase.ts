import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import PayloadRejectReservation from '../domain/entities/payloadRejectReservation'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class RejectReservationUseCase
  implements UseCase<PayloadRejectReservation, Response<any>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: PayloadRejectReservation): Promise<Response<any>> {
    return await this.bookingsRepository.rejectReservation(payload)
  }
}
