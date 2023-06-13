import {ContainerModule, interfaces} from 'inversify'
import bpgTypes from '../common/types/bpgTypes'
import {BPGRepository} from './domain/repositories/bpgRepository'
import BPGServiceRepository from './domain/repositories/bpgServiceRepository'
import GetCategorysByPropertyUseCase from './application/getCategorysByPropertyUseCase'
import GetProductsElitePromotionsUseCase from './application/getProductsElitePromotionsUseCase'
import GetProductsEliteBenefitsUseCase from './application/getProductsEliteBenefitsUseCase'
import GetAllZonesUseCase from './application/getAllZonesUseCase'
import GetInfoAffiliationUseCase from './application/getInfoAffiliationUseCase'
import GetAccessGolfUseCase from './application/getAccessGolfUseCase'
import GetAccessPropertiesUseCase from './application/getAccessPropertiesUseCase'
import GetValidateAccessGroupUseCase from './application/getValidateAccessGroupUseCase'
import GetExtraFeeGolfUseCase from './application/getExtraFeeGolfUseCase'
import GetEliteProductsGolfUseCase from './application/getEliteProductsGolfUseCase'
import GetTermsAndConditionsUseCase from './application/getTermsAndConditionsUseCase'
import GetBenefitsAdditionalsUseCase from './application/getBenefitsAdditionalsUseCase'
import GetMinimumStayUseCase from './application/getMinimumStayUseCase'
import GetMaxOccupancyByHotelUseCase from './application/getMaxOccupancyByHotelUseCase'
import GetResortCreditsUseCase from './application/getResortCreditsUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<BPGRepository>(bpgTypes.bpgRepository).to(BPGServiceRepository)
  bind<GetCategorysByPropertyUseCase>(bpgTypes.getCategorysByPropertyUseCase).to(
    GetCategorysByPropertyUseCase
  )
  bind<GetProductsElitePromotionsUseCase>(bpgTypes.getProductsElitePromotionsUseCase).to(
    GetProductsElitePromotionsUseCase
  )
  bind<GetProductsEliteBenefitsUseCase>(bpgTypes.getProductsEliteBenefitsUseCase).to(
    GetProductsEliteBenefitsUseCase
  )

  bind<GetAllZonesUseCase>(bpgTypes.getAllZonesUseCase).to(GetAllZonesUseCase)

  bind<GetInfoAffiliationUseCase>(bpgTypes.getInfoAffiliationUseCase).to(GetInfoAffiliationUseCase)

  bind<GetAccessGolfUseCase>(bpgTypes.getAccessGolfUseCase).to(GetAccessGolfUseCase)
  bind<GetMinimumStayUseCase>(bpgTypes.getMinimumStayUseCase).to(GetMinimumStayUseCase)

  bind<GetAccessPropertiesUseCase>(bpgTypes.getAccessPropertiesUseCase).to(
    GetAccessPropertiesUseCase
  )

  bind<GetValidateAccessGroupUseCase>(bpgTypes.getValidateAccessGroupUseCase).to(
    GetValidateAccessGroupUseCase
  )

  bind<GetExtraFeeGolfUseCase>(bpgTypes.getExtraFeeGolfUseCase).to(GetExtraFeeGolfUseCase)

  bind<GetEliteProductsGolfUseCase>(bpgTypes.getEliteProductsGolfUseCase).to(
    GetEliteProductsGolfUseCase
  )

  bind<GetTermsAndConditionsUseCase>(bpgTypes.getTermsAndConditionsUseCase).to(
    GetTermsAndConditionsUseCase
  )

  bind<GetBenefitsAdditionalsUseCase>(bpgTypes.getBenefitsAdditionalsUseCase).to(
    GetBenefitsAdditionalsUseCase
  )

  bind<GetMaxOccupancyByHotelUseCase>(bpgTypes.getMaxOccupancyByHotelUseCase).to(
    GetMaxOccupancyByHotelUseCase
  )

  bind<GetResortCreditsUseCase>(bpgTypes.getResortCreditsUseCase).to(GetResortCreditsUseCase)
})
