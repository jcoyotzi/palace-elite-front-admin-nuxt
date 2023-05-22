export function GetPromotionAccessRoomCatalogActivesSelected(
  _ListPromotionAccessRoomSelected: any,
  Index: any = 1,
  Room = ''
) {
  if (Room != '') {
    if (
      _ListPromotionAccessRoomSelected &&
      _ListPromotionAccessRoomSelected != null &&
      _ListPromotionAccessRoomSelected.length > 0
    )
      var PromoAR = _ListPromotionAccessRoomSelected[Index - 1].filter(function (a: any) {
        return a.Room == Room
      })
    var Result = new Array()
    if (PromoAR.length > 0) {
      PromoAR.forEach(function (item: any) {
        Result.push(item.PromoAccess)
      })
    }
    return Result
  } else {
    return _ListPromotionAccessRoomSelected[Index - 1]
  }
}
