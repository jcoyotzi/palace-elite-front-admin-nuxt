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
import {GetAllZonesRequest} from '../entities/strapiBpg'
import { MaxOccupancyByHotelDTO } from '../dto/maxOccupancyByHotelDTO'
import { GetMaxOccupancyByHotelRequest } from '../entities/maxOccupancyByHotel'
import SisturPromotion from '../dto/sisturPromotionDto'
import { QueryAffiliation } from '../dto/infoAffiliation'

@injectable()
export default class BPGServiceRepository implements BPGRepository {
  constructor(
    @inject(httpTypes.apiUrl) private readonly httpApi: HttpApi,
    @inject(httpTypes.strapiHttpApi) private readonly httpStrapi: HttpApi
  ) {}

  getURLWithQueryAffiliation(url: string, query: QueryAffiliation): string {
    const queryParams = [
      `application=${query.application}`,
      `company=${query.company}`
    ].join('&')

    return `${url}?${queryParams}`
  }

  getCategorysByProperty(query: QueryAffiliation): Promise<Response<any>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/room-access-hotel`, query)
    return this.httpApi.get(url)
  }

  getProductsElitePromotions(query: QueryAffiliation): Promise<Response<any>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/promotions-list`, query)
    return this.httpApi.get(url)
  }

  getProductsEliteBenefits(query: QueryAffiliation): Promise<Response<any>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/provisions`, query)
    return this.httpApi.get(url)
  }

  getAllZones({accessProperties, locale}: GetAllZonesRequest): Promise<Response<any>> {
    const query = [
      'fields=name,bpgOrder,locale',
      'populate[properties][fields]=title,externalId,bpgSuiteAccessYears,bpgOrder',
      `locale=${locale}`,
      'populate[properties][populate][media][populate][media][fields]=url',
      ...accessProperties.map((access: string, index: number) => {
        return `populate[properties][filters][externalId][$in][${index}]=${access}`
      }),
    ].join('&')

    return this.httpStrapi.get(`/api/zones?${query}`)
  }

  getInfoAffiliation(application: string): Promise<Response<any>> {
    return this.httpApi.get(`/membership/api/v1/admin/info?application=${application}`)
  }

  getMinimumStay(query: QueryAffiliation): Promise<Response<Response<MinimumStay[]>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/minimum-stay`, query)
    return this.httpApi.get(url)
  }

  getAccessGolf(query: QueryAffiliation): Promise<Response<Response<GolfAccess>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/golf-access`, query)
    return this.httpApi.get(url)
  }

  getAccessProperties(query: QueryAffiliation): Promise<Response<Response<string[]>>> {
    const queryParams = [
      `application=${query.application}`,
      `company=${query.company}`,
      `isNational=${query.isNational}`,
    ].join('&')

    return this.httpApi.get(`/membership/api/v1/admin/hotel-access?${queryParams}`)
  }

  getValidateAccessGroup(query: QueryAffiliation): Promise<Response<Response<any[]>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/validity-access/group`, query)
    return this.httpApi.get(url)
  }

  getExtraFeeGolf(query: QueryAffiliation): Promise<Response<Response<ExtraFeeGolfDto[]>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/golf/extra-fee`, query)
    return this.httpApi.get(url)
  }

  getEliteProductsGolf(query: QueryAffiliation): Promise<Response<Response<EliteProductsGolf[]>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/elite-products`, query)
    return this.httpApi.get(url)
  }

  getTermsAndConditions(query: QueryAffiliation): Promise<Response<Response<any>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/terms-and-conditions`, query)
    return this.httpApi.get(url)
  }

  getBenefitsAdditionals(query: QueryAffiliation): Promise<Response<Response<BenefitsAdditionalsDto[]>>> {
    const url = this.getURLWithQueryAffiliation(`/benefit/api/v1/admin/additional`, query)
    return this.httpApi.get(url)
  }

  getMaxOccupancyByHotel(request: GetMaxOccupancyByHotelRequest): Promise<Response<Response<MaxOccupancyByHotelDTO[]>>> {
    const query = [
      `application=${request.application}`,
      `company=${request.company}`,
      `hotel=${request.hotel}`,
    ].join('&')

    return this.httpApi.get(`/membership/api/v1/admin/special-max-ocupancy?${query}`)
  }

  getResortCredits(query: QueryAffiliation): Promise<Response<Response<SisturPromotion[]>>> {
    const url = this.getURLWithQueryAffiliation(`/membership/api/v1/admin/sistur-promotion`, query)
    return this.httpApi.get(url)
  }
}
