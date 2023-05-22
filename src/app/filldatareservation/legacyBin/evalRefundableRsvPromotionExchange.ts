import {FilterPromotionByRecnumPromotion} from './filterPromotionByRecnumPromotion'
import {HasPromotionActiveSelected} from './HasPromotionActiveSelected'
import {ValidateYCheckIfPromoIsNoRefundableSelected} from './ValidateYCheckIfPromoIsNoRefundableSelected'

export function EvalRefundableRsvPromotionExchange(
  RefundableOrigin: any,
  PromotionId: string,
  __RsvPromotionTargetType: string,
  __APPLYFREENIGHTSPROMOTION: boolean,
  __PromoExchangeFree: any,
  __PromotionCatalogActivesSelected: any
) {
  try {
    var Refundable = false
    var CurSelectedRsvPromo = FilterPromotionByRecnumPromotion(__PromoExchangeFree, PromotionId)
    if (CurSelectedRsvPromo != undefined) {
      //Verificamos segu el tipo de reserva que se vaya a generar
      if (__RsvPromotionTargetType == 'exchange') {
        Refundable = !CurSelectedRsvPromo.PromotionExchange.NonRefundable
      } else {
        Refundable = !CurSelectedRsvPromo.PromotionFree.NonRefundable
      }
      //Si existe una promocion actual seleccionada
      return Refundable
    }
    //si es promocion FREE, se retorna NR
    if (__APPLYFREENIGHTSPROMOTION) {
      return false
    }
    //Si se trata de las nuevas promociones
    if (HasPromotionActiveSelected(__PromotionCatalogActivesSelected)) {
      //false -> respetamos el origne
      var check = ValidateYCheckIfPromoIsNoRefundableSelected(__PromotionCatalogActivesSelected, 1)
      return !check ? RefundableOrigin : false
    }

    return RefundableOrigin
  } catch (ex) {
    //si es promocion FREE, se retorna NR
    if (__APPLYFREENIGHTSPROMOTION) {
      return false
    }
    return RefundableOrigin
  }
}
