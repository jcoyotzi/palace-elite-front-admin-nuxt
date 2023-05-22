import {GetPromotionCatalogActivesSelected} from './GetPromotionCatalogActivesSelected'
import {GetPromotionAccessRoomCatalogActivesSelected} from './GetPromotionAccessRoomCatalogActivesSelected'

export function GenerateListPromotionSelectedToSave(
  __PromotionCatalogActivesSelected: any,
  _ListPromotionAccessRoomSelected: any,
  Index = 1,
  Room = ''
) {
  var PromotionSelected = GetPromotionCatalogActivesSelected(
    __PromotionCatalogActivesSelected,
    Index
  )

  var PromotionAccessRoomSelected = GetPromotionAccessRoomCatalogActivesSelected(
    _ListPromotionAccessRoomSelected,
    Index,
    Room
  )

  var Result = new Array()

  if (PromotionSelected != null || PromotionSelected.length > 0) {
    PromotionSelected.forEach(function (data: any, i: any) {
      var Promotion: any = new Object()

      Promotion.RecnumPromo = data.Recnum
      Promotion.CodePromo = data.Code
      Promotion.Status = 1
      Result.push(Promotion)
    })
  }

  if (PromotionAccessRoomSelected != null || PromotionAccessRoomSelected.length > 0) {
    PromotionAccessRoomSelected.forEach(function (data: any) {
      var Promotion: any = new Object()
      Promotion.RecnumPromo = data.Recnum
      Promotion.CodePromo = data.Code
      Promotion.Status = 1
      Result.push(Promotion)
    })
  }

  return Result
}
