import {injectable, inject} from 'inversify'
import CardProvitionDto from '../dto/cardProvitionDto'
import PayloadGetWeeksProvitions from '../entities/payloadGetWeeksProvitions'
import PayloadGetWeeksAndNightsPreferentials from '../entities/payloadGetWeeksAndNightsPreferentials'
import ResponseGetWeeksAndNightsPreferentials from '../entities/responseGetWeeksAndNightsPreferentials'
import {CardSummaryDto} from '../dto/cardSummaryDto'
import {UniversalCreditsDto} from '../dto/universalCreditsDto'
import {BenefitsRepository} from './benefitsRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class BenefitServiceRepository implements BenefitsRepository {
  constructor(
    @inject(httpTypes.jsonApi) private readonly httpJS: HttpApi,
    @inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi,
    @inject(httpTypes.apiUrl) private readonly httpApi: HttpApi,
    @inject(httpTypes.strapiHttpApi) private readonly httpStrapi: HttpApi
  ) {}

  getWalletSummarys(application: string): Promise<Response<{data: CardSummaryDto}>> {
    return this.httpApi.get(`/benefit/api/v1/universal-credit/application/${application}`)
  }

  getWeeksProvitions(params: PayloadGetWeeksProvitions): Promise<Response<CardProvitionDto>> {
    return this.httpApi.get(
      `/benefit/api/v1/application/${params.application}/company/${params.company}/provisions?isNational=${params.isNational}`
    )
  }

  getWeeksAndNightsPreferentials(
    params: PayloadGetWeeksAndNightsPreferentials
  ): Promise<Response<ResponseGetWeeksAndNightsPreferentials>> {
    return this.http.get(
      `/membership/preferential-weeks-and-nights/application/${params.application}/company/${params.company}`
    )
  }

  getStrapiPreferential(): Promise<any> {
    return this.httpStrapi.get(
      '/api/base-pages?populate=deep,4&filters[slug][$eq]=preferential-weeks'
    )
  }

  getStrapiResortCreditPage(): Promise<any> {
    return this.httpStrapi.get('/api/base-pages?populate=deep,4&filters[slug][$eq]=resort-credit')
  }

  getWalletUniversalCredits(application: string): Promise<Response<UniversalCreditsDto>> {
    return this.httpApi.get(`/benefit/api/v1/application/${application}/universal-credits/details`)
  }
}
