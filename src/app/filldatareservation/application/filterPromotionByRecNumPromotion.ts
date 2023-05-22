/**
 * @description Va a filtrar promociones en un array de promociones por el RecNum si recibe un objeto regresa undefined
 * @return any | undefined
 */
export function filterPromotionByRecNumPromotion(promoExchangeFree: any, recNumPromo?: string) {
  try {
    return promoExchangeFree.filter(function (i: {Recnum: string}) {
      return i.Recnum == recNumPromo
    })[0]
  } catch (error) {
    return undefined
  }
}
