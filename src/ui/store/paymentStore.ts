import {Store, Pinia} from 'pinia-class-component'
import {container, lazyInject} from '../../container'
import paymentTypes from '../../app/common/types/paymentTypes'
import {CardsCreditEntity} from '~/src/app/payments/domain/entities/cardsCreditEntity'
import PayloadUpdateCardCredit from '~/src/app/payments/domain/entities/payloadUpdateCardCredit'
import GetCardCreditUseCase from '@/src/app/payments/application/getCardCreditUseCase'
import RemoveCardCreditUseCase from '@/src/app/payments/application/removeCardCreditUseCase'
import AddCardCreditUseCase from '@/src/app/payments/application/addCardCreditUseCase'
import UpdateCardCreditUseCase from '@/src/app/payments/application/updateCardCreditUseCase'
import {MethodCard} from '~/src/app/payments/domain/enum/methodCardsCredit'
import CardsTypeRegEx from '~/src/app/payments/domain/entities/CardsTypeRegEx'
import UseCase from '~/src/app/common/application/UseCase'
import Exception from '~/src/app/network/common/domain/entity/Exception'
@Store({
  name: 'paymentStore'
})
export class PaymentStore extends Pinia {
  @lazyInject(paymentTypes.getCardCreditUseCase)
  private readonly getCardsCreditUseCase!: UseCase<String, any>

  public removeCardCreditUseCase = container.get<RemoveCardCreditUseCase>(
    paymentTypes.removeCardCreditUseCase
  )

  public addCardCreditUseCase = container.get<AddCardCreditUseCase>(
    paymentTypes.addCardCreditUseCase
  )

  @lazyInject(paymentTypes.updateCardCreditUseCase)
  public updateCardCreditUseCase!: UpdateCardCreditUseCase

  private cardsCreditList: CardsCreditEntity[] = []

  private cardsTypeRegEx: CardsTypeRegEx = {
    visa: /^4[0-9]{5}/i,
    mastercard: /^5[1-5][0-9]{4}/i,
    amex: /^3[47][0-9]{3}/i,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/i,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}/i
  }

  showModalDeleteCardCredit: boolean = false

  showModalCancelUpdateCardCredit: boolean = false

  showLoadingCardCredit: boolean = false

  showModalConfirmationUpdateCardCredit: boolean = false

  methodCardCredit: string = MethodCard.ADD

  cardCreditDefault: CardsCreditEntity = {
    cardStamp: '',
    cardTermination: '',
    cardNumber: '',
    dueDate: '',
    cardMain: false,
    cardHolder: '',
    securityCode: '000'
  }

  cardCreditSelected: CardsCreditEntity = this.cardCreditDefault

  get cardsRegEx() {
    return this.cardsTypeRegEx
  }

  get cardsCredit() {
    return this.cardsCreditList
  }

  // get cardsMain() {
  //     return this.cardsCreditList.find((card) => card.main);
  // }

  // get othersCards(){
  //     return this.cardsCreditList.filter((card) => !card.main);
  // }

  get selectedCardCredit() {
    return this.cardCreditSelected
  }

  async setCardsCredit(cardsCredits: CardsCreditEntity[]) {
    this.cardsCreditList = cardsCredits
  }

  async getCardsCredit(membership: string, isNational: boolean = false) {
    try {
      this.showLoadingCardCredit = true
      const params = {
        membership,
        isNational
      } as any
      const response: CardsCreditEntity[] = await this.getCardsCreditUseCase.run(params)
      this.cardsCreditList = response
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    } finally {
      this.showLoadingCardCredit = false
    }
  }

  async removeCardCredit() {
    // const response = await this.removeCardCreditUseCase.run(this.selectedCardCredit);
    // // console.log(response);
  }

  async addCardCredit(card: CardsCreditEntity) {
    // const response = await this.addCardCreditUseCase.run(card);
    // // console.log(response);
  }

  async updateCardCredit(params: PayloadUpdateCardCredit) {
    return this.updateCardCreditUseCase.run(params)
  }

  verifyTypeCard(number: string): string {
    if (this.cardsRegEx.visa.test(number)) return 'VISA'
    if (this.cardsRegEx.mastercard.test(number)) return 'MC'
    if (this.cardsRegEx.amex.test(number)) return 'AMEX'
    if (this.cardsRegEx.diners.test(number)) return 'DINERS'
    if (this.cardsRegEx.discover.test(number)) return 'DISCOVER'
    return 'OTHER'
  }

  getRegexCards(): CardsTypeRegEx{
    return this.cardsTypeRegEx
  }

  async resetCardCreditSelected() {
    this.cardCreditSelected = this.cardCreditDefault
  }
}
