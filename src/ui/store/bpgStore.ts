import {Store, Pinia} from 'pinia-class-component'
import {BookingStore} from './bookingStore'
import GetCategorysByPropertyUseCase from '~/src/app/bpg/application/getCategorysByPropertyUseCase'
import {HeaderTable} from '~/src/app/bpg/domain/dto/cardCategoryTabsDto'
import {Category} from '~/src/app/bpg/domain/entities/categorys'
import bpgTypes from '~/src/app/common/types/bpgTypes'
import {lazyInject} from '~/src/container'
import {
  EnumReservationCategory,
  PipelinesEnum
} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {MethodsStay} from '~/src/app/bpg/domain/enum/methodsStay'
import {Response} from '~/src/app/common/domain/entities/response'
import GetProductsElitePromotionsUseCase from '~/src/app/bpg/application/getProductsElitePromotionsUseCase'
import GetProductsEliteBenefitsUseCase from '~/src/app/bpg/application/getProductsEliteBenefitsUseCase'
import GetAllZonesUseCase from '~/src/app/bpg/application/getAllZonesUseCase'
import GetInfoAffiliationUseCase from '~/src/app/bpg/application/getInfoAffiliationUseCase'
import GetAccessGolfUseCase from '~/src/app/bpg/application/getAccessGolfUseCase'
import GolfAccess from '~/src/app/bpg/domain/entities/golfAccess'
import GetAccessPropertiesUseCase from '~/src/app/bpg/application/getAccessPropertiesUseCase'
import GetValidateAccessGroupUseCase from '~/src/app/bpg/application/getValidateAccessGroupUseCase'
import GetEliteProductsGolfUseCase from '~/src/app/bpg/application/getEliteProductsGolfUseCase'
import GetExtraFeeGolfUseCase from '~/src/app/bpg/application/getExtraFeeGolfUseCase'
import GetTermsAndConditionsUseCase from '~/src/app/bpg/application/getTermsAndConditionsUseCase'
import GetBenefitsAdditionalsUseCase from '~/src/app/bpg/application/getBenefitsAdditionalsUseCase'

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

  public categorys: Category[] = []

  public termsAndConditionsProvisions: any = []

  public accessProperties: string[] = []

  public headersTableCategory: HeaderTable[] = [
    {title: 'category', name: 'category', width: '30%', align: 'left'},
    {title: 'bpg', name: 'bpg', width: '10%', align: 'center'},
    // {title: 'ocupationMin', name: 'ocupacion_min', width: '10%', align: 'center'},
    {title: 'ocupationMax', name: 'ocupacion_max', width: '10%', align: 'center'},
    {title: 'staysMin', name: 'estancias_min', width: '10%', align: 'center'}
    // {title: 'staysMinRef', name: 'estancias_mree', width: '10%', align: 'center'}
  ]

  public zones: any = []

  public golfAccess: GolfAccess = {
    golfRounds: 0,
    golfSale: '',
    grAccess: 0
  }

  public get bookingStore(): BookingStore {
    return new BookingStore()
  }

  public async getAccessProperties() {
    const {data} = await this.getAccessPropertiesUseCase.run(this.affiliateInfo)
    this.accessProperties = data?.data!
  }

  public async getCategorysByProperty() {
    const {data} = await this.getCategorysByPropertyUseCase.run(this.affiliateInfo.application)
    return await Promise.all(
      data?.data.map(async (categorie: Category) => {
        const minimalStay = await this.bookingStore.validateRuleMinimalStay(
          PipelinesEnum.STAY_MINIMAL,
          categorie.rmType,
          EnumReservationCategory.PREFERENCIAL,
          'N',
          MethodsStay.GET
        )

        return await {
          ...categorie,
          estancias_min: minimalStay
        }
      })
    )
  }

  public async getInfoAffiliation(application: string) {
    return await this.getInfoAffiliationUseCase.run(application)
  }

  public async getAllZones(accessProperties: string[]) {
    const locale = this.$nuxt.i18n.locale
    this.zones = await this.getAllZonesUseCase.run({locale, accessProperties})
  }

  public async getProductsElitePromotions(): Promise<Response<any>> {
    return await this.getProductsElitePromotionsUseCase.run(this.affiliateInfo.application)
  }

  public async getProductsEliteBenefits(): Promise<Response<any>> {
    return await this.getProductsEliteBenefitsUseCase.run(this.affiliateInfo.application)
  }

  public async getAccessGolf() {
    try {
      const {data} = await this.getAccessGolfUseCase.run(this.affiliateInfo.application)
      this.golfAccess = data?.data!
    } catch (error) {
      console.log(error)
    }
  }

  public async getValidateAccessGroup() {
    const response = await this.getValidateAccessGroupUseCase.run(this.affiliateInfo.application)
    return response.data
  }

  public async getExtraFeeGolf() {
    return await this.getExtraFeeGolfUseCase.run(this.affiliateInfo.application)
  }

  public async getEliteProductsGolf() {
    return await this.getEliteProductsGolfUseCase.run(this.affiliateInfo.application)
  }

  public async getTermsAndConditions() {
    const response = await this.getTermsAndConditionsUseCase.run(this.affiliateInfo.application)
    this.termsAndConditionsProvisions = response?.data?.data
    return response
  }

  public async getBenefitsAdditionals() {
    const {data} = await this.getBenefitsAdditionalsUseCase.run(this.affiliateInfo.application)
    return data
  }

  /* ----------------------------------------------------------- */

  public affiliateInfo: any = {}

  public async getAffiliateInfo(application: string) {
    const { data } = await this.getInfoAffiliation(application)

    this.affiliateInfo = data?.data.find((_info: any, index: number) => index === 0)

    return this.affiliateInfo
  }
}