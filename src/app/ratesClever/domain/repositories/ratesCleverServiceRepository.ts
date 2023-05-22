/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:6:50
 *
 */

import {inject, injectable} from 'inversify'
import {RatesCleverRepository} from '~/src/app/ratesClever/domain/repositories/ratesCleverRepository'
import {Pagination} from 'app/network/common/domain/entity/pagination'
import {Response} from 'app/network/common/domain/entity/response'
import httpTypes from 'app/common/types/httpTypes'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {
  CleverRoomCode,
  RatesCleverPayloadDto
} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import { GetAvailableCategoriesDTO } from '../dto/GetAvailableCategoriesDTO'
import { GetAvailableCategoriesResponseDTO } from '../dto/GetAvailableCategoriesResponseDTO'
import { baglioniCodes } from '~/src/app/property/domain/data/baglioniCodes'

@injectable()
export default class RatesCleverServiceRepository implements RatesCleverRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {
  }

  async get(payload: RatesCleverPayloadDto): Promise<Response<Pagination<any>>> {
    // region Destructuring DTO

    const child = payload.infants.children
    const kid = payload.infants.kids
    const baby = payload.infants.babies

    const newPromotions = payload.promotions

    // @TODO - Promotion forced due to baglioni integration
    if (baglioniCodes.includes(payload.hotel)) {
      newPromotions.push({
        Recnum: 100000,
        PromotionConfiguration: {
          Recnum: 24,
          RecnumPromo: 27,
          ParamsClever: '{ \"PromotionClb\" : \"EMPTY\" }',
          ParamsOpera: '',
          Status: 'A'
        }
      })
    }


    const {
      application,
      company,
      hotel,
      checkInDate,
      checkOutDate,
      nights,
      roomCodes,
      country,
      market,
      isRefundable,
      isNational,
      costType,
      guestCd,
      adult,
      rateType,
      reservationCostType,
      promotions,
      availableReservationCategories
    } = payload
    // endregion

    // const firstRequest = await this.http.get(`/bookings/reservation-categories/application/${application}/company/${company}/market/${market}/hotel/${hotel}/check-in/${checkInDate}/check-out/${checkOutDate}/nights/${nights}?request.isNational=${isNational}`)

    // @ts-ignore
    // const availableCategories = firstRequest.data.data;


    const rooms = roomCodes.map(item => ({
      roomCode: item.code,
      isLockOff: item.isLockOff,
      lockoffType: item.isLockOff ? 'L1' : ''
    }))

    const response: any = await this.http.post(`/bookings/categories-rates/hotel/${hotel}/check-in/${checkInDate}/check-out/${checkOutDate}/nights/${nights}`, {
      data: {
        availableReservationCategories: availableReservationCategories,
        rooms,
        market,
        isRefundable,
        isNational,
        country,
        costType,
        adult,
        child,
        kid,
        baby,
        guestCd,
        rateType,
        reservationCostType,
        promotions: newPromotions,
      }
    })

    // @ts-ignore
    for (let i = 0; i < response.data.data.rooms.length ; i++) {
      response.data.data.rooms[i].category.push({
        "id": 4,
        "code": "IMP_WEEKS",
        "rate": -1,
        "regularRate": -1,
        "promotionId": "",
        "productId": ""
      })
    }

    return response;
  }

  private serializeRoomCodes(codes: CleverRoomCode[]): string {
    const codesParsed = codes.map(
      code => `&request.roomCodes=${code.code}${code.isLockOff ? ',isLockOff' : ''}`
    )
    const result = codesParsed.reduce((prev: string, curr: string) => prev + `${curr}`)
    return result
  }

  async getAvailableCategories(params: GetAvailableCategoriesDTO): Promise<GetAvailableCategoriesResponseDTO[]> {
    // region Destructuring DTO

    const firstRequest = await this.http.get(`/bookings/reservation-categories/application/${params.application}/company/${params.company}/market/${params.market}/hotel/${params.hotel}/check-in/${params.checkInDate}/check-out/${params.checkOutDate}/nights/${params.nights}?request.isNational=${params.isNational}`)
    
    // @ts-ignore    
    const availableCategories: GetAvailableCategoriesResponseDTO[] = firstRequest.data.data

    return availableCategories
  }
}
