import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import paymentTypes from '../../common/types/paymentTypes'
import {CardsCreditEntity} from '../domain/entities/cardsCreditEntity'
import {PaymentsRepository} from '../domain/repositories/paymentsRepository'
import {Response} from '../../common/domain/entities/response'
@injectable()
export default class RemoveCardCreditUseCase
  implements UseCase<CardsCreditEntity, Response<CardsCreditEntity>>
{
  constructor(
    @inject(paymentTypes.paymentsRepository)
    private readonly paymentsRepository: PaymentsRepository
  ) {}

  async run(card: CardsCreditEntity): Promise<any> {
    // return this.paymentsRepository.removeCardCredit(card);
  }
}
