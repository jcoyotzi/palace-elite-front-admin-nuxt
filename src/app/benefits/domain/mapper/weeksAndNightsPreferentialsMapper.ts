import PreferentialWeeksAndNightsDto from '../dto/preferentialWeeksAndNightsDto'
import ResponseGetWeeksAndNightsPreferentials from '../entities/responseGetWeeksAndNightsPreferentials'
import {TypesPreferentials} from '~/src/app/benefits/domain/enum/TypesPreferentials'

export class WeeksAndNightsPreferentialsMapper {
  public static map(
    weeksAndNights: ResponseGetWeeksAndNightsPreferentials[]
  ): PreferentialWeeksAndNightsDto {
    return {
      title: 'preferentialWeeksAndNights',
      assets: weeksAndNights.map((item: ResponseGetWeeksAndNightsPreferentials) => ({
        total: item._PURCHASED,
        used: item._USED,
        value: (item._USED / item._PURCHASED) * 100,
        labelEnd: item._TIPO === TypesPreferentials.WEEKS ? 'totalWeeks' : 'totalNights',
        labelStart: item._TIPO === TypesPreferentials.WEEKS ? 'usedWeeks' : 'usedNights'
      }))
    }
  }
}
