// import { AmountPromiseEntity } from '../entities/amountPromisesEntity'
import {ParamsAmountPromiseEntity} from '../entities/paramsAmountPromiseEntity'

export interface AmountPromiseRepository {
  getAmountPromise(params: ParamsAmountPromiseEntity): Promise<number>
}
