import {CardSummaryDto} from '../dto/cardSummaryDto'

export class CardSummaryMapper {
  public static map(summary: CardSummaryDto): CardSummaryDto {
    return {
      ...summary,
      amountAvailable: Number(Number(summary.amountAvailable).toFixed(2)),
      earned: Number(Number(summary.earned).toFixed(2))
    }
  }
}
