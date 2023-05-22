import {GetPromotionCatalogActivesSelected} from './GetPromotionCatalogActiveSelected'

export function ValidateYCheckIfPromoIsNoRefundableSelected(
  __PromotionCatalogActivesSelected: any,
  Index: number,
  ListPromotionsCheck = null
) {
  var PromotionByTab =
    ListPromotionsCheck != undefined && ListPromotionsCheck !== null
      ? ListPromotionsCheck
      : GetPromotionCatalogActivesSelected(__PromotionCatalogActivesSelected, Index)
  var Response = 0
  // si existen promociones seleccionadas.
  if (PromotionByTab != undefined && PromotionByTab !== null && PromotionByTab.length > 0) {
    PromotionByTab.forEach(function (data: any) {
      var InfoPromotionNoRefundable =
        data.PromotionIsNotRefundable !== undefined && data.PromotionIsNotRefundable != null
          ? data.PromotionIsNotRefundable
          : null
      if (InfoPromotionNoRefundable != null) {
        if (InfoPromotionNoRefundable.IsNoRefundable) {
          Response = 1
        } else {
          Response = 2
        }
      }
    })
  }
  return Response
}
