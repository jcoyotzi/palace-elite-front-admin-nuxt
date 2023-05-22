import {ParamsDownloadBalanceEntity} from '../entities/paramsDownloadBalanceEntity'
import {DownloadBalanceEntity} from '../entities/downloadBalanceEntity'
export interface DownloadBalanceRepository {
  getDownloadBalance(params: ParamsDownloadBalanceEntity): Promise<DownloadBalanceEntity>
}
