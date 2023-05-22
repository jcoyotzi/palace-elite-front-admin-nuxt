import {GetPromotionCatalogActivesSelected} from './GetPromotionCatalogActiveSelected'

export function HasPromotionActiveSelected(__PromotionCatalogActivesSelected: any, Index = 1) {
  var has = false
  try {
    if (GetPromotionCatalogActivesSelected(__PromotionCatalogActivesSelected, Index).length > 0) {
      has = true
    }
    return has
  } catch (error) {
    return false
  }
}
