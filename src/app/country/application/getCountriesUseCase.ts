import {inject, injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import {Payload} from 'app/common/domain/entities/payload'
import countryTypes from 'app/common/types/countryTypes'
import {CountryRepository} from 'app/country/domain/repositories/countryRepository'
import {GetCountriesPayloadDto} from 'app/country/domain/dto/getCountriesPayloadDto'
import CountriesMapper from 'app/country/domain/mappers/countriesMapper'
import {CountryEntity} from 'app/country/domain/entities/countryEntity'

@injectable()
export default class GetCountriesUseCase
  implements UseCase<Payload<GetCountriesPayloadDto>, CountryEntity[]>
{
  constructor(
    @inject(countryTypes.countryRepository) private readonly countryRepository: CountryRepository
  ) {}

  async run(params: Payload<GetCountriesPayloadDto>): Promise<CountryEntity[]> {
    const response = await this.countryRepository.getCountries(params)
    // @ts-ignore
    return CountriesMapper.map(response.data.data)
  }
}
