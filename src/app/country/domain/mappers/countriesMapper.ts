import {GetCountriesResponseDto} from 'app/country/domain/dto/getCountriesResponseDto'
import {CountryEntity} from 'app/country/domain/entities/countryEntity'

export default class CountriesMapper {
  public static map(countries: GetCountriesResponseDto[]) {
    return countries.map(this.transform)
  }

  private static transform(country: GetCountriesResponseDto): CountryEntity {
    return {
      name: country._nombre,
      code: country._iso2,
      id: country._recnum
    }
  }
}
