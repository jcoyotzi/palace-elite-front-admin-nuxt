import {Store, Pinia} from 'pinia-class-component'
import {BookingStore} from './bookingStore'
import GetCategorysByPropertyUseCase from '~/src/app/bpg/application/getCategorysByPropertyUseCase'
import {HeaderTable} from '~/src/app/bpg/domain/dto/cardCategoryTabsDto'
import {Category} from '~/src/app/bpg/domain/entities/categorys'
import bpgTypes from '~/src/app/common/types/bpgTypes'
import {lazyInject} from '~/src/container'
import {Response} from '~/src/app/common/domain/entities/response'
import GetProductsElitePromotionsUseCase from '~/src/app/bpg/application/getProductsElitePromotionsUseCase'
import GetProductsEliteBenefitsUseCase from '~/src/app/bpg/application/getProductsEliteBenefitsUseCase'
import GetAllZonesUseCase from '~/src/app/bpg/application/getAllZonesUseCase'
import GetInfoAffiliationUseCase from '~/src/app/bpg/application/getInfoAffiliationUseCase'
import GetAccessGolfUseCase from '~/src/app/bpg/application/getAccessGolfUseCase'
import GetAccessPropertiesUseCase from '~/src/app/bpg/application/getAccessPropertiesUseCase'
import GetValidateAccessGroupUseCase from '~/src/app/bpg/application/getValidateAccessGroupUseCase'
import GetEliteProductsGolfUseCase from '~/src/app/bpg/application/getEliteProductsGolfUseCase'
import GetExtraFeeGolfUseCase from '~/src/app/bpg/application/getExtraFeeGolfUseCase'
import GetTermsAndConditionsUseCase from '~/src/app/bpg/application/getTermsAndConditionsUseCase'
import GetBenefitsAdditionalsUseCase from '~/src/app/bpg/application/getBenefitsAdditionalsUseCase'
import GetMinimumStayUseCase from '~/src/app/bpg/application/getMinimumStayUseCase'
import MinimumStay from '~/src/app/bpg/domain/entities/minimumStay'
import {GetAllZonesRequest} from '~/src/app/bpg/domain/entities/strapiBpg'
import GetMaxOccupancyByHotelUseCase from '~/src/app/bpg/application/getMaxOccupancyByHotelUseCase'
import { MaxOccupancyByHotelAndRoomType } from '~/src/app/bpg/domain/entities/maxOccupancyByHotel'
import GetResortCreditsUseCase from '~/src/app/bpg/application/getResortCreditsUseCase'
import SisturPromotion from '~/src/app/bpg/domain/dto/sisturPromotionDto'
import { AffiliateInfo } from '~/src/app/bpg/domain/entities/affiliateInfo'

@Store({
  name: 'BPGStore'
})
export class BPGStore extends Pinia {
  @lazyInject(bpgTypes.getCategorysByPropertyUseCase)
  private readonly getCategorysByPropertyUseCase!: GetCategorysByPropertyUseCase

  @lazyInject(bpgTypes.getValidateAccessGroupUseCase)
  private readonly getValidateAccessGroupUseCase!: GetValidateAccessGroupUseCase

  @lazyInject(bpgTypes.getProductsElitePromotionsUseCase)
  private readonly getProductsElitePromotionsUseCase!: GetProductsElitePromotionsUseCase

  @lazyInject(bpgTypes.getProductsEliteBenefitsUseCase)
  private readonly getProductsEliteBenefitsUseCase!: GetProductsEliteBenefitsUseCase

  @lazyInject(bpgTypes.getAllZonesUseCase)
  private readonly getAllZonesUseCase!: GetAllZonesUseCase

  @lazyInject(bpgTypes.getInfoAffiliationUseCase)
  private readonly getInfoAffiliationUseCase!: GetInfoAffiliationUseCase

  @lazyInject(bpgTypes.getAccessGolfUseCase)
  private readonly getAccessGolfUseCase!: GetAccessGolfUseCase

  @lazyInject(bpgTypes.getAccessPropertiesUseCase)
  private readonly getAccessPropertiesUseCase!: GetAccessPropertiesUseCase

  @lazyInject(bpgTypes.getExtraFeeGolfUseCase)
  private readonly getExtraFeeGolfUseCase!: GetExtraFeeGolfUseCase

  @lazyInject(bpgTypes.getEliteProductsGolfUseCase)
  private readonly getEliteProductsGolfUseCase!: GetEliteProductsGolfUseCase

  @lazyInject(bpgTypes.getTermsAndConditionsUseCase)
  private readonly getTermsAndConditionsUseCase!: GetTermsAndConditionsUseCase

  @lazyInject(bpgTypes.getBenefitsAdditionalsUseCase)
  private readonly getBenefitsAdditionalsUseCase!: GetBenefitsAdditionalsUseCase

  @lazyInject(bpgTypes.getMinimumStayUseCase)
  private readonly getMinimumStayUseCase!: GetMinimumStayUseCase

  @lazyInject(bpgTypes.getMaxOccupancyByHotelUseCase)
  private readonly getMaxOccupancyByHotelUseCase!: GetMaxOccupancyByHotelUseCase

  @lazyInject(bpgTypes.getResortCreditsUseCase)
  private readonly getResortCreditsUseCase!: GetResortCreditsUseCase

  public categorys: Category[] = []

  public termsAndConditionsProvisions: any = []

  public accessProperties: string[] = []

  public headersTableCategory: HeaderTable[] = [
    {title: 'category', titleMobile: 'category', name: 'category', width: '30%', align: 'left'},
    {title: 'bpg', titleMobile: 'bpg', name: 'bpg', width: '10%', align: 'center'},
    {title: 'ocupationMax', titleMobile: 'oMax', name: 'ocupacion_max', width: '10%', align: 'center'},
    {title: 'staysMin', titleMobile: 'sMin', name: 'estancias_min', width: '10%', align: 'center'}
  ]

  public zones: any = []

  public minimumStay: MinimumStay[] = []

  public maxOccupanciesByHotel: {
    [key: string]: MaxOccupancyByHotelAndRoomType[]
  } = {}

  public get bookingStore(): BookingStore {
    return new BookingStore()
  }

  public async getAccessProperties() {
    const {data} = await this.getAccessPropertiesUseCase.run(this.affiliateInfo)
    this.accessProperties = data?.data!
  }

  public async getMimimumStay() {
    try {
      const {data} = await this.getMinimumStayUseCase.run(this.affiliateInfo)
      this.minimumStay = data?.data! || []
    } catch (error) {
      console.log(error)
    }
  }

  public async getMaxOccupanciesByHotel(hotel: string) {
    if (!this.maxOccupanciesByHotel[hotel]){
      const request = {
        hotel,
        application: this.affiliateInfo.application,
        company: this.affiliateInfo.company
      }

      this.maxOccupanciesByHotel[hotel] = await this.getMaxOccupancyByHotelUseCase.run(request)
    }

    return this.maxOccupanciesByHotel[hotel]
  }

  public async getCategorysByProperty() {
    const {data} = await this.getCategorysByPropertyUseCase.run(this.affiliateInfo)
    return await Promise.all(
      data?.data.map(async (categorie: Category) => ({
        ...categorie,
        estancias_min:
          this.minimumStay.find(
            stay => stay.discountRate === `D`.concat(String(categorie.discountRate))
          )?.applicableStay || '-'
      }))
    )
  }

  public async getInfoAffiliation(application: string) {
    return await this.getInfoAffiliationUseCase.run(application)
  }

  public async getAllZones(data: GetAllZonesRequest) {
    this.zones = await this.getAllZonesUseCase.run(data)
  }

  public async getResortCredit(): Promise<Response<SisturPromotion[]>> {
    return await this.getResortCreditsUseCase.run({
      application: this.affiliateInfo.application,
      company: this.affiliateInfo.company
    })
  }

  public async getProductsElitePromotions(): Promise<Response<any>> {
    return await this.getProductsElitePromotionsUseCase.run(this.affiliateInfo)
  }

  public async getProductsEliteBenefits(): Promise<Response<any>> {
    return await this.getProductsEliteBenefitsUseCase.run(this.affiliateInfo)
  }

  public async getValidateAccessGroup() {
    const response = await this.getValidateAccessGroupUseCase.run(this.affiliateInfo)
    return response.data
  }

  public async getExtraFeeGolf() {
    return await this.getExtraFeeGolfUseCase.run(this.affiliateInfo)
  }

  public async getEliteProductsGolf() {
    return await this.getEliteProductsGolfUseCase.run(this.affiliateInfo)
  }

  public async getTermsAndConditions() {
    const response = await this.getTermsAndConditionsUseCase.run(this.affiliateInfo)
    this.termsAndConditionsProvisions = response?.data?.data
    return response
  }

  public async getBenefitsAdditionals() {
    const {data} = await this.getBenefitsAdditionalsUseCase.run({
      application: this.affiliateInfo.application,
      company: this.affiliateInfo.company
    })
    return data
  }

  /* ----------------------------------------------------------- */

  public affiliateInfo: AffiliateInfo = {} as AffiliateInfo

  public async getAffiliateInfo(application: string): Promise<AffiliateInfo> {
    const { data } = await this.getInfoAffiliation(application)

    if (data?.data[0]) {
      this.affiliateInfo = data?.data[0]
    }

    return this.affiliateInfo
  }
}
