import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import paylinkTypes from '../../common/types/payLinkTypes'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class PayNowUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(paylinkTypes.payLinkRepository)
    private readonly paylinkRepository: PayLinkRepository
  ) {}

  async run(payload: any): Promise<Response<any>> {
    return await this.paylinkRepository.payNow(payload)
  }
}
