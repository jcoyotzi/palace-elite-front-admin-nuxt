import {Response} from 'app/common/domain/entities/response'
import {GetCountriesResponseDto} from 'app/country/domain/dto/getCountriesResponseDto'
import {GetCountriesPayloadDto} from 'app/country/domain/dto/getCountriesPayloadDto'
import {Payload} from 'app/common/domain/entities/payload'

export interface CountryRepository {
  getCountries(
    params: Payload<GetCountriesPayloadDto>
  ): Promise<Response<GetCountriesResponseDto[]>>
}
