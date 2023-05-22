import {injectable} from 'inversify'
import {PromotionListDto} from 'app/filldatareservation/domain/promotionListDto'
import {PromotionList} from 'app/filldatareservation/domain/PromotionList'

@injectable()
export class PromotionListMapper {
  map(promotionList: PromotionListDto): PromotionList {
    return {
      Recnum: promotionList._Recnum,
      RecnumRcDetail: promotionList._RecnumRcDetail,
      Folio: promotionList._Folio,
      Hotel: promotionList._Hotel,
      promotion_code: promotionList._promotion_code,
      description: promotionList._description,
      factor_value: promotionList._factor_value,
      idrate_factor_type: promotionList._idrate_factor_type,
      amount_promotion: promotionList._amount_promotion,
      idrate_promotion: promotionList._idrate_promotion,
      creation_date: promotionList._creation_date,
      IsDelete: promotionList._IsDelete
    }
  }
}
