import {BalanceEntity} from '../entities/balanceEntity'
import {ParamsBalanceEntity} from '../entities/paramsBalanceEntity'
export interface BalanceRepository {
  getBalance(params: ParamsBalanceEntity): Promise<BalanceEntity>
}
