import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import PayloadGetReservations from '../domain/entities/payloadGetReservations'
import {Response} from '~/src/app/common/domain/entities/response'
import ReservationsDto from '../domain/dto/reservationsDto'
import {ReservationsMapper} from '../domain/mapper/reservationsMapper'
import {PaginationReservations} from '../domain/dto/paginationBookings'
@injectable()
export default class GetReservationsUseCase
  implements UseCase<PayloadGetReservations, PaginationReservations<ReservationsDto>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(params: PayloadGetReservations): Promise<PaginationReservations<ReservationsDto>> {
    const {data} = await this.bookingsRepository.getReservations(params)
    //@ts-ignore
    return ReservationsMapper.map(data?.data!)
  }
}
