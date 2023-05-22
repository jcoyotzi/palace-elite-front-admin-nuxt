import {inject, injectable} from 'inversify'
import GetContractByPromotionDTO from '../dto/getContractByPromotionDTO'
import {ContractByPromotion} from '../entities/ContractByPromotion'
import ContractByPromotionRepository from './contractByPromotionRepository'
import httpTypes from 'app/common/types/httpTypes'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {Response} from 'app/common/domain/entities/response'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'

@injectable()
export default class ContractByPromotionServiceRepository implements ContractByPromotionRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getContractByPromotion(
    params: GetContractByPromotionDTO
  ): Promise<Response<ContractByPromotion>> {
    const bodyParams: any = {
      market: params.market,
      isRefundable: params.isRefundable,
      isNational: params.isNational,
      country: params.country,
      costType: true,
      adult: params.adult,
      child: params.child,
      guestCd: params.guestCd || 'M',
      rateType: 'L', // Validar con angel
      reservationCostType: 'V',
      isLockOff: params.isLockOff || false,
      marketAll: '',
      promotions: params.promotions,
      reservationType: params.reservationType,
      folio: params.folio
    }

    if (params.isLockOff) {
      bodyParams.lockOffType = "L1"
    }

    if (
      params.reservationType === ReservationTypes.PREFERENCIAL ||
      params.reservationType === ReservationTypes.REFERIDOS
    ) {
      bodyParams.productId = params.productId
    } else if (params.reservationType === ReservationTypes.BONO) {
      bodyParams.golfType = 'AINC'
      bodyParams.marketAll = 'All'
      bodyParams.reservationCostType = ''
    } else if (params.reservationType === ReservationTypes.ANIVERSARIO) {
      bodyParams.type = params.provisionType
      bodyParams.golfType = params.golfType
      bodyParams.productId = params.productId
    } else if (
      params.reservationType === ReservationTypes.IMP_WEEKS ||
      params.reservationType === ReservationTypes.IMP_NIGHT
    ) {
      bodyParams.promotionId = params.promotionId
      bodyParams.golfType = params.golfType
      bodyParams.marketAll = 'All'
      bodyParams.reservationCostType = ''
      bodyParams.typeCombination = params.typeCombination
      bodyParams.provisionGold = params.provisionGold
      if (params.folio !== undefined && params.folio > 0) bodyParams.folio = params.folio
    } else if (params.reservationType === ReservationTypes.INCENTIVA) {
      bodyParams.marketAll = 'AllINC'
      bodyParams.promotionId = params.promotionId
      bodyParams.golfType = params.golfType
      bodyParams.market = params.market
      bodyParams.productId = params.productId
      bodyParams.provisionGold = params.provisionGold
    } else {
      bodyParams.marketAll = ''
      bodyParams.golfType = params.productId
    }

    return this.http.post(
      `/contract/promotion-array/application/${params.afilliation}/company/${params.company}/hotel/${params.hotelCode}/check-in/${params.checkInEpoch}/check-out/${params.checkOutEpoch}/nights/${params.nights}/room/${params.roomCode}/category/${params.reservationType}`,
      {
        data: bodyParams
      }
    )
  }
}
