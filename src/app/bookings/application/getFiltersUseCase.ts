import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import GetFiltersDto from '../domain/dto/getFiltersDto'
import PayloadGetFilters from '../domain/entities/payloadGetFilters'

@injectable()
export default class GetFiltersUseCase
  implements UseCase<PayloadGetFilters, Response<GetFiltersDto>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: PayloadGetFilters): Promise<Response<GetFiltersDto>> {
    return await this.bookingsRepository.getFilters(payload)
  }
}
