import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import PayloadValidateReservation from '../domain/entities/payloadValidateReservation'

@injectable()
export default class ValidateReservationUseCase
  implements UseCase<PayloadValidateReservation, Response<any>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: PayloadValidateReservation): Promise<Response<Number>> {
    return await this.bookingsRepository.validateReservation(payload)
  }
}
