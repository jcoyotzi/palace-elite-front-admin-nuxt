import Nationalities, {NationalitiesDto} from '../entities/nationalities'

export class NationalitiesMapper {
  static map(items: Nationalities[]): NationalitiesDto[] {
    return items.map((nationalitie: Nationalities) => ({
      value: String(nationalitie.recnum),
      text: nationalitie.description
    }))
  }
}
