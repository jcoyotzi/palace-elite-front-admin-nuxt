import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import membershipPaymentTypes from '../../common/types/membershipPaymentTypes'
import {ParamsAmountPromiseEntity} from '../domain/entities/paramsAmountPromiseEntity'
// import { AmountPromiseEntity } from '../domain/entities/amountPromisesEntity';
import {AmountPromiseRepository} from '../domain/repositories/amountPromiseRepository'

@injectable()
export default class GetAmountPromiseUseCase implements UseCase<ParamsAmountPromiseEntity, number> {
  constructor(
    @inject(membershipPaymentTypes.amountPromiseRepository)
    private readonly amountPromiseRepository: AmountPromiseRepository
  ) {}

  async run(params: ParamsAmountPromiseEntity): Promise<number> {
    const amountPromise: number = await this.amountPromiseRepository.getAmountPromise(params)
    // @ts-ignore
    return amountPromise.data
  }
}
