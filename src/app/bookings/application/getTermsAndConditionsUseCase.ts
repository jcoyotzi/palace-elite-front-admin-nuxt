import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import {GetTermsAndConditionsDto} from '../domain/dto/getTermsAndConditionsDto'

@injectable()
export default class GetTermsAndConditionsUseCase
  implements UseCase<null, Response<GetTermsAndConditionsDto> | undefined>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(): Promise<Response<GetTermsAndConditionsDto> | undefined> {
    return await this.bookingsRepository.getTermsAndConditions().catch(error => {
      return undefined
    })
  }
}
