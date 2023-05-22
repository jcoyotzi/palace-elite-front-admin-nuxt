import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import Companions from '../domain/entities/companions'
import {CompanionsDto} from '../domain/dto/getCompanionsDto'

@injectable()
export default class GetCompanionsUseCase
  implements UseCase<Companions, Response<CompanionsDto[]>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: Companions): Promise<Response<CompanionsDto[]>> {
    const {data} = await this.bookingsRepository.getCompanions(payload)

    // @ts-ignore
    return data
  }
}
