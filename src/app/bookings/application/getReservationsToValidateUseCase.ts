import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import PayloadGetFilters from '../domain/entities/payloadGetFilters'
import {Response} from '~/src/app/common/domain/entities/response'
import ReservationsDto from '../domain/dto/reservationsDto'

@injectable()
export default class GetReservationsToValidateUseCase
  implements UseCase<PayloadGetFilters, Response<ReservationsDto>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(params: PayloadGetFilters): Promise<Response<ReservationsDto>> {
    return await this.bookingsRepository.getReservationsToValidate(params)
  }
}
