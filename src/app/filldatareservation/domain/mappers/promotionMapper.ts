import {injectable} from 'inversify'
import {PromotionCurrentDto} from 'app/filldatareservation/domain/promotionCurrentDto'
import {PromotionCurrent} from 'app/filldatareservation/domain/PromotionCurrent'

@injectable()
export class PromotionMapper {
  map(promotionCurrentDto: PromotionCurrentDto): PromotionCurrent {
    return {
      Promo: promotionCurrentDto._promo,
      ArrvDate: promotionCurrentDto._arrvDate,
      DeptDate: promotionCurrentDto._deptDate,
      Nights: promotionCurrentDto._nights,
      Discount: promotionCurrentDto._discount,
      Contract: promotionCurrentDto._contract,
      Refundablediscount: promotionCurrentDto._refundablediscount,
      Realdiscount: promotionCurrentDto._realdiscount,
      Publicdiscount: promotionCurrentDto._publicdiscount,
      Ratetype: promotionCurrentDto._ratetype,
      Reservationcosttype: promotionCurrentDto._reservationcosttype,
      Name: promotionCurrentDto._name,
      Isrefundable: promotionCurrentDto._isrefundable,
      Clevercode: promotionCurrentDto._clevercode
    }
  }
}
