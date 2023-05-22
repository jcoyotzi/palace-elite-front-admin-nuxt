import {inject, injectable} from 'inversify'
import dayjs from 'dayjs'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import ContractByPromotionServiceRepository from 'app/contractByPromotion/domain/repositories/contractByPromotionServiceRepository'
import createRmFolio from 'app/common/types/createRmFolio'
import {PromotionMapper} from 'app/filldatareservation/domain/mappers/promotionMapper'
import {PromotionListMapper} from 'app/filldatareservation/domain/mappers/promotionListMapper'
import {ReservationTypes} from "app/filldatareservation/domain/reservationTypes";
import imperialRateMock from "app/filldatareservation/test/imperialRate.mock";
import contractPromotionMock from "app/filldatareservation/test/contractPromotion.mock";
import toEpochTimeStamp from "~/src/ui/utils/toEpochTimeStamp";

@injectable()
export class GetReservationRate {
  constructor(
    @inject(contractByPromotionTypes.ContractByPromotionRepository)
    private readonly contractByPromotionServiceRepository: ContractByPromotionServiceRepository,

    @inject(createRmFolio.promotionMapper)
    private readonly promotionMapper: PromotionMapper,

    @inject(createRmFolio.promotionListMapper)
    private readonly promotionListMapper: PromotionListMapper
  ) {}

  public async run(
    roomCode: string,
    nights: number,
    afilliation: string,
    company: number,
    hotelCode: string,
    checkInEpoch: string,
    checkOutEpoch: string,
    reservationType: number,
    isRefundable: boolean,
    productId: string = 'AIWK',
    isNational: boolean,
    adult: number,
    child: number,
    market: string,
    country: string,
    golfType?: string,
    promotionId?: string,
    reservationCostType?: string,
    provisionGold?: string,
    marketAll?: string,
    type?: string,
    promotions?: any,
  ) {
    let data: any = {
      data: {
        RCDetail: [{
          ContractPromotion: contractPromotionMock,
          RmfolioRc: []
        }],
      }
    };

    const response = await this.contractByPromotionServiceRepository.getContractByPromotion({
      nights,
      roomCode,
      afilliation,
      company,
      hotelCode,
      checkInEpoch: toEpochTimeStamp(checkInEpoch),
      checkOutEpoch: toEpochTimeStamp(checkOutEpoch),
      productId,
      reservationType,
      isRefundable,
      isNational,
      adult,
      child,
      market,
      country,
      golfType,
      promotionId,
      reservationCostType,
      provisionGold,
      marketAll,
      type,
      promotions,
    })

    data = response.data;

    return data;
  }
}
