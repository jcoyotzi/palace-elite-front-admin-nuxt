import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import {GetTermsAndConditionsDto} from '../domain/dto/getTermsAndConditionsDto'
import {RequestSendConfirmationLetter} from '../domain/entities/requestSendConfirmationLetter'
import {ResponseSendConfirmationLetter} from '../domain/entities/responseSendConfirmationLetter'

@injectable()
export default class SendConfirmationLetter
  implements UseCase<RequestSendConfirmationLetter, Response<ResponseSendConfirmationLetter>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(
    payload: RequestSendConfirmationLetter
  ): Promise<Response<ResponseSendConfirmationLetter>> {
    return await this.bookingsRepository.sendConfirmationLetter(payload)
  }
}
