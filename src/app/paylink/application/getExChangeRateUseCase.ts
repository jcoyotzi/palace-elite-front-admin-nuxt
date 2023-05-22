import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import payLinkTypes from '../../common/types/payLinkTypes'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'

@injectable()
export default class GetExChangeRateUseCase implements UseCase<any, any> {
  constructor(
    @inject(payLinkTypes.payLinkRepository)
    private readonly paylinkRepository: PayLinkRepository
  ) {}

  async run(payload: any): Promise<any> {
    return await this.paylinkRepository.getExChangeRate(payload)
  }
}
