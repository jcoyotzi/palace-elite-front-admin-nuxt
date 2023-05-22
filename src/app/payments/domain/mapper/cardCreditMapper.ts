import {CardsCreditEntity} from '../entities/cardsCreditEntity'

export class CardCreditMapper {
  public static map(cards: CardsCreditEntity[]): CardsCreditEntity[] {
    return cards.map((card: CardsCreditEntity) => ({
      ...card,
      cardMain: true,
      cardStamp: this.getStamp(card.cardStamp ? card.cardStamp : ''),
      securityCode: '000',
      disabledButtonDelete: true,
      hiddenButtonDelete: true
    }))
  }

  public static getStamp(stamp: string): string {
    if (['MASTERCARD', 'MC'].includes(stamp)) {
      return 'MC'
    } else if (['V', 'VISA'].includes(stamp)) {
      return 'VISA'
    } else if (['AMEX', 'AEX'].includes(stamp)) {
      return 'AMEX'
    }
    return ''
  }
}
