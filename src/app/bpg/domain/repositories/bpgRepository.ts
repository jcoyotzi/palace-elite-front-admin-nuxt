import {Response} from '~/src/app/common/domain/entities/response'
import GolfAccess from '../entities/golfAccess'
import {ExtraFeeGolfDto} from '../dto/extraFeeGolf'
import {EliteProductsGolf} from '../dto/eliteProductsGolf'
import BenefitsAdditionalsDto from '../dto/getBenefitsAdditionalsDto'
import MinimumStay from '../entities/minimumStay'
import {GetAllZonesRequest} from '../entities/strapiBpg'
import { GetMaxOccupancyByHotelRequest } from '../entities/maxOccupancyByHotel'
import { MaxOccupancyByHotelDTO } from '../dto/maxOccupancyByHotelDTO'
import SisturPromotion from '../dto/sisturPromotionDto'
import { QueryAffiliation } from '../dto/infoAffiliation'

export interface BPGRepository {
  getCategorysByProperty(query: QueryAffiliation): Promise<Response<any>>
  getProductsEliteBenefits(query: QueryAffiliation): Promise<Response<any>>
  getProductsElitePromotions(query: QueryAffiliation): Promise<Response<any>>
  getAllZones(request: GetAllZonesRequest): Promise<Response<any>>
  getInfoAffiliation(application: string): Promise<Response<any>>
  getAccessGolf(query: QueryAffiliation): Promise<Response<Response<GolfAccess>>>
  getAccessProperties(query: QueryAffiliation): Promise<Response<Response<string[]>>>
  getValidateAccessGroup(query: QueryAffiliation): Promise<Response<Response<any[]>>>
  getExtraFeeGolf(query: QueryAffiliation): Promise<Response<Response<ExtraFeeGolfDto[]>>>
  getEliteProductsGolf(query: QueryAffiliation): Promise<Response<Response<EliteProductsGolf[]>>>
  getTermsAndConditions(query: QueryAffiliation): Promise<Response<Response<any>>>
  getBenefitsAdditionals(query: QueryAffiliation): Promise<Response<Response<BenefitsAdditionalsDto[]>>>
  getMinimumStay(query: QueryAffiliation): Promise<Response<Response<MinimumStay[]>>>
  getMaxOccupancyByHotel(request: GetMaxOccupancyByHotelRequest): Promise<Response<Response<MaxOccupancyByHotelDTO[]>>>
  getResortCredits(query: QueryAffiliation): Promise<Response<Response<SisturPromotion[]>>>
}
