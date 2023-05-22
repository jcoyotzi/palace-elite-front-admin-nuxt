import {ContainerModule, interfaces} from 'inversify'
import {CountryRepository} from 'app/country/domain/repositories/countryRepository'
import countryTypes from 'app/common/types/countryTypes'
import CountryServiceRepository from 'app/country/domain/repositories/countryServiceRepository'
import GetCountriesUseCase from 'app/country/application/getCountriesUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<CountryRepository>(countryTypes.countryRepository).to(CountryServiceRepository)
  bind<GetCountriesUseCase>(countryTypes.getCountriesUseCase).to(GetCountriesUseCase)
})
