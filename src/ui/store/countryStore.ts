import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import countryTypes from 'app/common/types/countryTypes'
import GetCountriesUseCase from 'app/country/application/getCountriesUseCase'
import {CountryEntity} from 'app/country/domain/entities/countryEntity'

@Store({
  name: 'countryStore'
})
export class CountryStore extends Pinia {
  @lazyInject(countryTypes.getCountriesUseCase)
  private readonly getCountriesUseCase!: GetCountriesUseCase

  countries: CountryEntity[] = []

  get countryList() {
    return this.countries
  }

  async fetchCountries() {
    try {
      this.countries = await this.getCountriesUseCase.run({
        params: {isNational: true}
      })
    } catch (e) {
      console.error(e)
    }
  }
}
