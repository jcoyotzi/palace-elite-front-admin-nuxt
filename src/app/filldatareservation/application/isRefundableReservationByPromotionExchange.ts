import {filterPromotionByRecNumPromotion} from './filterPromotionByRecNumPromotion'
import {ReservationPromotionTargetType} from '../domain/reservationPromotionTargetType'
import {hasPromotionActiveSelected} from './hasPromotionActiveSelected'
import {isSelectedPromotionNotRefundable} from './isSelectedPromotionNotRefundable'

/**
 * @description Este metodo nececita de applyFreeNightsPromotion (no sabes de donde sacarlos) puede ser true
 * @todo: Revisar cuando cambia de valor applyFreeNightsPromotion y de donde viene dicho valor
 * @todo: promotionCatalogActivesSelected - No sabemos el tipo y es un array 👀
 */
export function isRefundableReservationByPromotionExchange(
  applyFreeNightsPromotion: boolean,
  currentRefundable: boolean,
  index: number,
  promotionId: number,
  promotionTargetType: ReservationPromotionTargetType,
  promotionCatalogActivesSelected: any[]
) {
  try {
    let refundable = false
    const currentSelectedPromotion = filterPromotionByRecNumPromotion(promotionId)

    if (currentSelectedPromotion) {
      if (promotionTargetType === ReservationPromotionTargetType.Exchange) {
        // TODO: Dar un tipo - no se encontró como se ve el objeto
        refundable = !currentSelectedPromotion.PromotionExchange.NonRefundable
      } else {
        refundable = !currentSelectedPromotion.PromotionFree.NonRefundable
      }

      // Si existe una promotion actual seleccionada
      return refundable
    }
    // si es promotion FREE, se retorna NR
    if (applyFreeNightsPromotion) {
      return false
    }

    // Si se trata de las nuevas promociones
    if (hasPromotionActiveSelected(promotionCatalogActivesSelected)) {
      // false -> respetamos el origen
      const check = isSelectedPromotionNotRefundable(promotionCatalogActivesSelected, 1)
      return !check ? currentRefundable : false
    }

    return currentRefundable
  } catch (e) {
    // console.log(e)
    // si es promotion FREE, se retorna NR
    if (applyFreeNightsPromotion) {
      return false
    }

    return currentRefundable
  }
}
