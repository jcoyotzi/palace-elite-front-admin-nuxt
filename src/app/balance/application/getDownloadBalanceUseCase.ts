import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import balanceTypes from '../../common/types/balanceTypes'
import {DownloadBalanceRepository} from '../domain/repositories/downloadBalanceRepository'
import {ParamsDownloadBalanceEntity} from '../domain/entities/paramsDownloadBalanceEntity'
import {DownloadBalanceEntity} from '../domain/entities/downloadBalanceEntity'

@injectable()
export default class GetDownloadBalanceUseCase
  implements UseCase<ParamsDownloadBalanceEntity, DownloadBalanceEntity>
{
  constructor(
    @inject(balanceTypes.downloadBalanceRepository)
    private readonly downloadBalanceRepository: DownloadBalanceRepository
  ) {}

  async run(params: ParamsDownloadBalanceEntity): Promise<DownloadBalanceEntity> {
    const balance: DownloadBalanceEntity = await this.downloadBalanceRepository.getDownloadBalance(
      params
    )
    return balance
  }
}
