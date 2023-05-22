export function FilterPromotionByRecnumPromotion(__PromoExchangeFree: any, RecnumPromo: string) {
  try {
    var a = __PromoExchangeFree.filter(function (i: any) {
      return i.Recnum == RecnumPromo
    })[0]
    return a
  } catch (error) {
    return undefined
  }
}
