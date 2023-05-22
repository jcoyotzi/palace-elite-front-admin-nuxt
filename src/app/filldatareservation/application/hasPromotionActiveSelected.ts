/**
 * @description El metodo anteriormente tenia una firma que recibia un index que recibia 1 por defecto
 * El legado nunca le paso otro valor ademas del default por lo que se quedo como el index por defecto en 0
 */
export function hasPromotionActiveSelected(promotionCatalogActivesSelected: any[]) {
  let has = false

  try {
    if (promotionCatalogActivesSelected[0].length > 0) {
      has = true
    }

    return has
  } catch (e) {
    // console.log(e)
    return false
  }
}
