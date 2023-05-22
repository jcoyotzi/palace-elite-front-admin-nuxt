import {inject, injectable} from 'inversify'
import dayjs from 'dayjs'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import ContractByPromotionServiceRepository from 'app/contractByPromotion/domain/repositories/contractByPromotionServiceRepository'
import createRmFolio from 'app/common/types/createRmFolio'
import {PromotionMapper} from 'app/filldatareservation/domain/mappers/promotionMapper'
import {PromotionListMapper} from 'app/filldatareservation/domain/mappers/promotionListMapper'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'
import imperialRateMock from 'app/filldatareservation/test/imperialRate.mock'
import contractPromotionMock from 'app/filldatareservation/test/contractPromotion.mock'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'

@injectable()
export class CreateReservationRateCodes {
  constructor(
    @inject(contractByPromotionTypes.ContractByPromotionRepository)
    private readonly contractByPromotionServiceRepository: ContractByPromotionServiceRepository,

    @inject(createRmFolio.promotionMapper)
    private readonly promotionMapper: PromotionMapper,

    @inject(createRmFolio.promotionListMapper)
    private readonly promotionListMapper: PromotionListMapper
  ) {}

  public async run(
    payload: any,
    roomCodes: string[],
    nights: number,
    afilliation: string,
    company: number,
    hotelCode: string,
    checkInEpoch: string,
    checkOutEpoch: string,
    reservationType: number,
    isRefundable: boolean[],
    provisionType: string,
    productId: string = 'AIWK',
    isNational: boolean,
    adult: number,
    child: number,
    market: string,
    country: string,
    reservationTypeCode: string,
    promotionId: string = '',
    promotions: any
  ) {
    let promotionList: any = []
    const reservationRateCodes: any = []
    const promotionCurrent: any = []
    let contract = ''

    for (const [index, roomCode] of roomCodes.entries()) {
      let data: any = {
        data: {
          RCDetail: [
            {
              ContractPromotion: contractPromotionMock,
              RmfolioRc: []
            }
          ]
        }
      }

      /* if ([ReservationTypes.IMP_WEEKS, ReservationTypes.IMP_NIGHT].includes(reservationType)) {

        for (let i = 0; i < nights ; i++) {
          data.data.RCDetail[0].RmfolioRc.push(imperialRateMock);
        }

      } else {
        const response = await this.contractByPromotionServiceRepository.getContractByPromotion({
          nights,
          roomCode,
          afilliation,
          company,
          hotelCode,
          checkInEpoch: toEpochTimeStamp(checkInEpoch),
          checkOutEpoch: toEpochTimeStamp(checkOutEpoch),
          productId,
          // @ts-ignore
          provisionType,
          isRefundable: isRefundable[index],
          isNational,
          reservationType,
          adult,
          child,
          market,
          country
        })

        data = response.data;
      } */
      // console.log('Create Reservation!!!!!!!!!!!!!!!!!!!!!!!!!!!')

      // console.log('Promotions 🎅🎅🔥🔥', promotions)

      /* const response = await this.contractByPromotionServiceRepository.getContractByPromotion({
        market: market, // TODO HACERLO DINAMICO
        nights,
        roomCode,
        afilliation,
        company,
        hotelCode,
        checkInEpoch: toEpochTimeStamp(checkInEpoch),
        checkOutEpoch: toEpochTimeStamp(checkOutEpoch),
        productId,
        // @ts-ignore
        provisionType,
        isRefundable: isRefundable[index],
        isNational,
        reservationType,
        adult,
        child,
        promotionId,
        promotions,
      }) */

      const response = await this.contractByPromotionServiceRepository.getContractByPromotion(payload)

      data = response.data

      // @ts-ignore
      contract = data.data?.RCDetail[0].RmfolioRc[0].RateCodeCLV ?? ''
      /// store.action()
      // @ts-ignore
      promotionList = data.data?.RCDetail[0].RmfolioRc.map(item => {
        item.PromotionList = item.PromotionList.map(this.promotionListMapper.map)
        return item
      })
      /*
      // @ts-ignore
      for (let i = 0; i < data.data?.RCDetail[0].RmfolioRc.length ; i++) {
        // @ts-ignore
        data.data?.RCDetail[0].RmfolioRc[i] = promotionList[i];
      } */

      if (!isRefundable[index]) {
        let subFix = this.addSubFixForNotRefundableRoom(roomCode)

        if (
          reservationType === ReservationTypes.ANIVERSARIO ||
          reservationType === ReservationTypes.INCENTIVA
        ) {
          subFix += provisionType
        }

        reservationRateCodes[subFix] = [
          // @ts-ignore
          promotionList,
          0,
          0,
          0
        ]

        // @ts-ignore
        promotionCurrent[subFix] =
          // @ts-ignore
          data.data?.RCDetail[0].ContractPromotion.map(contractPromotion => {
            return this.promotionMapper.map(contractPromotion)
          })
      } else {
        let reservationRoomCode = roomCode

        if (
          reservationType === ReservationTypes.ANIVERSARIO ||
          reservationType === ReservationTypes.INCENTIVA
        ) {
          reservationRoomCode += provisionType
        }

        // @ts-ignore
        reservationRateCodes[reservationRoomCode] = [
          // @ts-ignore
          promotionList,
          0,
          0,
          0
        ]

        // @ts-ignore
        promotionCurrent[reservationRoomCode] = data.data?.RCDetail[0].ContractPromotion.map(
          // @ts-ignore
          contractPromotion => {
            return this.promotionMapper.map(contractPromotion)
          }
        )
      }
    }

    return [reservationRateCodes, promotionCurrent, contract, promotionList]
  }

  addSubFixForNotRefundableRoom(roomCode: string) {
    return `${roomCode}_NR`
  }
}
