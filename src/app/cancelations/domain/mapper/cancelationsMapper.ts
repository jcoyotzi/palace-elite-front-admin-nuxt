import {HighDemandWeeks} from '../entities/cancelationsWeeksEntity'
import {HighDemandWeeksDto, ItemWeek} from '../dto/highDemandWeeksDto'


export class CancelationsMapper {
  public static transform(weeks: HighDemandWeeksDto): HighDemandWeeks[] {
    return weeks.data.map((item) => {
      return this.getWeek(item)
    })
  }

  public static getWeek(item: ItemWeek) {
    return {
      start: item.attributes.start,
      end: item.attributes.end
    }
  }
}
