import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import paymentTypes from '../../common/types/paymentTypes'
import {CardsCreditEntity} from '../domain/entities/cardsCreditEntity'
import {PaymentsRepository} from '../domain/repositories/paymentsRepository'
import {Response} from '../../common/domain/entities/response'
import {CardCreditMapper} from '../domain/mapper/cardCreditMapper'

export type request = {
  membership: string
  isNational: boolean
}

@injectable()
export default class GetCardCreditUseCase implements UseCase<request, Response<CardsCreditEntity>> {
  constructor(
    @inject(paymentTypes.paymentsRepository)
    private readonly paymentsRepository: PaymentsRepository
  ) {}

  async run(request: request): Promise<any> {
    const response = await this.paymentsRepository.getCardCredits(
      request.membership,
      request.isNational
    )
    return CardCreditMapper.map(response?.data.data)
  }
}
