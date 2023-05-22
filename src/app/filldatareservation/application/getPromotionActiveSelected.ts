/**
 * @name GetPromotionCatalogActivesSelected
 * @description Obtiene siempre el primer elemento de promotionCatalogActivesSelected - el metodo que lo invoca siempre manda 1
 */
export function getPromotionActiveSelected(promotionCatalogActivesSelected: any[], index: number) {
  return promotionCatalogActivesSelected[index - 1]
}
