import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {BenefitsRepository} from '../domain/repositories/benefitsRepository'
import {CardSummaryDto} from '../domain/dto/cardSummaryDto'
import {CardSummaryMapper} from '../domain/mapper/cardSummaryMapper'

@injectable()
export default class GetWalletSummarysUseCase implements UseCase<String, CardSummaryDto> {
  constructor(
    @inject(benefitsTypes.benefitsRepository)
    private readonly benefitsRepository: BenefitsRepository
  ) {}

  async run(params: string): Promise<CardSummaryDto> {
    const data = await this.benefitsRepository.getWalletSummarys(params)

    return CardSummaryMapper.map(data.data?.data!)
  }
}
