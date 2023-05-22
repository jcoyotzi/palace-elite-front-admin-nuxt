import {inject, injectable} from 'inversify'
import {CountryRepository} from 'app/country/domain/repositories/countryRepository'
import {GetCountriesResponseDto} from 'app/country/domain/dto/getCountriesResponseDto'
import {GetCountriesPayloadDto} from 'app/country/domain/dto/getCountriesPayloadDto'
import httpTypes from 'app/common/types/httpTypes'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {Response} from 'app/common/domain/entities/response'
import {Payload} from 'app/common/domain/entities/payload'

@injectable()
export default class CountryServiceRepository implements CountryRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getCountries(
    payload: Payload<GetCountriesPayloadDto>
  ): Promise<Response<GetCountriesResponseDto[]>> {
    return this.http.get(`/country?request.national=${payload.params?.isNational}`)
  }
}
