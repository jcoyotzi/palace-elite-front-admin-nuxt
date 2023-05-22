import {Pinia, Store} from 'pinia-class-component'
import benefitsTypes from '~/src/app/common/types/benefitsTypes'
import {lazyInject} from '~/src/container'
import UseCase from '~/src/app/common/application/UseCase'
import {UniversalCreditsDto} from '~/src/app/benefits/domain/dto/universalCreditsDto'
import {CardSummaryDto} from '~/src/app/benefits/domain/dto/cardSummaryDto'

@Store({
  name: 'walletStore'
})
export class WalletStore extends Pinia {
  @lazyInject(benefitsTypes.getWalletSummarysUseCase)
  private readonly getWalletSummarysUseCase!: UseCase<String, any>

  @lazyInject(benefitsTypes.getWalletUniversalCreditsUseCase)
  private readonly getWalletUniversalCreditsUseCase!: UseCase<String, any>

  public itemIndex: number = 0

  public summarysCards: CardSummaryDto | null = null

  public universalCredits: UniversalCreditsDto[] = []

  public async getSummarys(application: string) {
    try {
      const data = await this.getWalletSummarysUseCase.run(application)

      this.summarysCards = data
    } catch (e) {
      this.summarysCards = {
        account: '',
        amountAvailable: 0,
        earned: 0
      }
    }
  }

  public async getUniversalCredits(application: string) {
    try {
      const data = await this.getWalletUniversalCreditsUseCase.run(application)

      this.universalCredits = data
    } catch (error) {
      this.universalCredits = []
    }
  }
}
