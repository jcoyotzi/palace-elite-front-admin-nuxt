import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import paymentTypes from '../../common/types/paymentTypes'
import {CardsCreditEntity} from '../domain/entities/cardsCreditEntity'
import PayloadUpdateCardCredit from '../domain/entities/payloadUpdateCardCredit'
import {PaymentsRepository} from '../domain/repositories/paymentsRepository'
import {Response} from '../../common/domain/entities/response'

@injectable()
export default class UpdateCardCreditUseCase
  implements UseCase<PayloadUpdateCardCredit, Response<CardsCreditEntity>>
{
  constructor(
    @inject(paymentTypes.paymentsRepository)
    private readonly paymentsRepository: PaymentsRepository
  ) {}

  async run(params: PayloadUpdateCardCredit): Promise<any> {
    const payload = {
      data: params
    }

    return await this.paymentsRepository.updateCardCredit(payload)
  }
}
