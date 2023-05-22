/**
 * @name ValidateYCheckIfPromoIsNoRefundableSelected
 * @description funcion que devuelve si alguna promocion seleccionada es no refundable.
 * devuelve 0 si la promo no tiene valor de no refundable por lo que no es obligatorio el valor
 * devuelve 1 si la promo es no refundable
 * devuelve 2 si la prmo es refundable
 */
import {getPromotionActiveSelected} from './getPromotionActiveSelected'

export function isSelectedPromotionNotRefundable(
  promotionCatalogActivesSelected: any[],
  index: number,
  listPromotionsCheck: any = null
) {
  let response = 0
  const promotionByTab = !!listPromotionsCheck
    ? listPromotionsCheck
    : getPromotionActiveSelected(promotionCatalogActivesSelected, index)

  if (promotionByTab && promotionByTab.length > 0) {
    /**
     * @todo: Dar un tipo a promotion
     */
    promotionByTab.forEach(({PromotionIsNotRefundable}: any) => {
      const infoPromotionNotRefundable = !!PromotionIsNotRefundable
        ? PromotionIsNotRefundable
        : null

      if (infoPromotionNotRefundable) {
        if (infoPromotionNotRefundable.IsNoRefundable) {
          return 1
        }

        return 2
      }
    })
  }

  return response
}
