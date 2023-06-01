import {Response} from '~/src/app/common/domain/entities/response'
import GolfAccess from '../entities/golfAccess'
import {ExtraFeeGolfDto} from '../dto/extraFeeGolf'
import {EliteProductsGolf} from '../dto/eliteProductsGolf'
import BenefitsAdditionalsDto from '../dto/getBenefitsAdditionalsDto'
import MinimumStay from '../entities/minimumStay'

export interface BPGRepository {
  getCategorysByProperty(application: string): Promise<Response<any>>
  getProductsEliteBenefits(application: string): Promise<Response<any>>
  getProductsElitePromotions(application: string): Promise<Response<any>>
  getAllZones(locale: string, accessProperties: string[]): Promise<Response<any>>
  getInfoAffiliation(application: string): Promise<Response<any>>
  getAccessGolf(application: string): Promise<Response<Response<GolfAccess>>>
  getAccessProperties(application: string, company: number, isNational: number): Promise<Response<Response<string[]>>>
  getValidateAccessGroup(application: string): Promise<Response<Response<any[]>>>
  getExtraFeeGolf(application: string): Promise<Response<Response<ExtraFeeGolfDto[]>>>
  getEliteProductsGolf(application: string): Promise<Response<Response<EliteProductsGolf[]>>>
  getTermsAndConditions(application: string): Promise<Response<Response<any>>>
  getBenefitsAdditionals(application: string): Promise<Response<Response<BenefitsAdditionalsDto[]>>>
  getMinimumStay(application: string): Promise<Response<Response<MinimumStay[]>>>
}
