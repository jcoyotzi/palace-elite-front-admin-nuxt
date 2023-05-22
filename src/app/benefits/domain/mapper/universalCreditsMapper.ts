import {UniversalCreditsDto} from '../dto/universalCreditsDto'

export class UniversalCreditsMapper {
  public static map(credits: UniversalCreditsDto[]): UniversalCreditsDto[] {
    return credits.map((credit: UniversalCreditsDto) => ({
      ...credit,
      headerDetail: false,
      active: false,
      textButton: credit.status,
      amount: Number(credit.amount.toFixed(2)),
      balance: Number(credit.balance.toFixed(2)),
      items: credit.items.map(item => ({
        ...item,
        amount: Number(Number(item.amount).toFixed(2)),
        balance: Number(Number(item.balance).toFixed(2))
      }))
    }))
  }
}
