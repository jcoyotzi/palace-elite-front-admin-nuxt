import {CountryEntity} from 'app/country/domain/entities/countryEntity'
import {PESelectDto} from 'app/companion/domain/adapter/selectCompanionAdapter'

export const selectCountryAdapter = (items: CountryEntity[]): PESelectDto[] => {
  if (!items) return []
  return items.map(country => {
    return {
      text: country.name,
      value: country.code,
      disable: false
    }
  })
}
