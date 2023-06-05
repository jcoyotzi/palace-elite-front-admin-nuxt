import {injectable, inject} from 'inversify'
import {BPGRepository} from './bpgRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import GolfAccess from '../entities/golfAccess'
import {ExtraFeeGolfDto} from '../dto/extraFeeGolf'
import {EliteProductsGolf} from '../dto/eliteProductsGolf'
import BenefitsAdditionalsDto from '~/src/app/bpg/domain/dto/getBenefitsAdditionalsDto'
import MinimumStay from '../entities/minimumStay'

@injectable()
export default class BPGServiceRepository implements BPGRepository {
  constructor(
    @inject(httpTypes.apiUrl) private readonly httpApi: HttpApi,
    @inject(httpTypes.strapiHttpApi) private readonly httpStrapi: HttpApi
  ) {}

  getCategorysByProperty(application: string): Promise<Response<any>> {
    return this.httpApi.get(`/membership/api/v1/admin/room-access-hotel?application=${application}`)
  }

  getProductsElitePromotions(application: string): Promise<Response<any>> {
    return this.httpApi.get(`/membership/api/v1/admin/promotions-list?application=${application}`)
  }

  getProductsEliteBenefits(application: string): Promise<Response<any>> {
    return this.httpApi.get(`/membership/api/v1/admin/provisions?application=${application}`)
  }

  getAllZones(locale: string, accessProperties: string[]): Promise<Response<any>> {
    const query = [
      'fields=name,bpgOrder,locale',
      'populate[properties][fields]=title,externalId,bpgSuiteAccessYears,bpgOrder,locale',
      'populate[properties][populate][media][populate][media][fields]=url',
      ...accessProperties.map((access: string, index: number) => {
        return `populate[properties][filters][externalId][$in][${index}]=${access}`
      }),
      `locale=${locale}`,
    ].join('&')

    return this.httpStrapi.get(`/api/zones?${query}`)
  }

  getInfoAffiliation(application: string): Promise<Response<any>> {
    return this.httpApi.get(`/membership/api/v1/admin/info?application=${application}`)
  }

  getMinimumStay(application: string): Promise<Response<Response<MinimumStay[]>>> {
    return this.httpApi.get(`/membership/api/v1/admin/minimum-stay?application=${application}`)
  }

  getAccessGolf(application: string): Promise<Response<Response<GolfAccess>>> {
    return this.httpApi.get(`/membership/api/v1/admin/golf-access?application=${application}`)
  }

  getAccessProperties(application: string, company: number, isNational: number): Promise<Response<Response<string[]>>> {
    const query = [
      `application=${application}`,
      `company=${company}`,
      `isNational=${isNational}`,
    ].join('&')

    return this.httpApi.get(`/membership/api/v1/admin/hotel-access?${query}`)
  }

  getValidateAccessGroup(application: string): Promise<Response<Response<any[]>>> {
    return this.httpApi.get(`/membership/api/v1/admin/validity-access/group?application=${application}`)
  }

  getExtraFeeGolf(application: string): Promise<Response<Response<ExtraFeeGolfDto[]>>> {
    return this.httpApi.get(`/membership/api/v1/admin/golf/extra-fee?application=${application}`)
  }

  getEliteProductsGolf(application: string): Promise<Response<Response<EliteProductsGolf[]>>> {
    return this.httpApi.get(`/membership/api/v1/admin/elite-products?application=${application}`)
  }

  getTermsAndConditions(application: string, company: number): Promise<Response<Response<any>>> {
    const query = [
      `application=${application}`,
      `company=${company}`,
    ].join('&')

    return this.httpApi.get(`/membership/api/v1/admin/terms-and-conditions?${query}`)
  }

  getBenefitsAdditionals(application: string): Promise<Response<Response<BenefitsAdditionalsDto[]>>> {
    return this.httpApi.get(`/benefit/api/v1/admin/additional?application=${application}`)
  }
}
