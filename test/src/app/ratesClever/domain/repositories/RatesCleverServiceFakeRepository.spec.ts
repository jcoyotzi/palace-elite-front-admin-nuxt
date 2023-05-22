/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:14:41
 *
 */

import {container} from '~/src/container'
import {RatesCleverRepository} from 'app/ratesClever/domain/repositories/ratesCleverRepository'
import ratesCleverTypes from 'app/common/types/ratesCleverTypes'
import {isValidAxiosResponse} from '~/test/testUtils/assertions/axiosApi'
import {
  CleverRoomCode,
  RatesCleverPayloadDto
} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import RoomRatesCleverRawMapper from 'app/ratesClever/domain/mappers/roomRatesCleverRawMapper'
import {r0, r1} from '~/test/src/app/ratesClever/domain/repositories/response'
import {
  RoomRatesCleverFullResponseFull,
  RoomRatesCleverResponse
} from 'app/ratesClever/domain/entities/roomRatesClever'

import {InfantsGrouped} from "app/booking/domain/mapper/infantGrouping";

describe('RatesCleverServiceFakeRepository', () => {
  it('Get rates clever', async () => {
    // GIVEN I have a room ID 'CHRO898'
    const repo: RatesCleverRepository = container.get(ratesCleverTypes.RatesCleverRespository)

    // region Data Anotations
    const application = 4028205 // affiliation number
    const company = 5 // local storage user info
    const hotel = 'MPS'
    const checkInDate = 1688601600000
    const checkOutDate = 1658016000000
    const nights = 7
    const roomCodes: CleverRoomCode[] = [{code: 'SUP', isLockOff: false}] // is Lock Off -> 'SUP,isLockOff'
    const market = 'USA'
    const country = 'USA' // jalar desde PropertyAccessServiceRepo llamar al iniciar sesion
    const isRefundable = false
    const isNational = false // local storage user info
    const costType = true // Dejar siempre en true
    const guestCd = 'M' // Dejar por ahora en M de member y G si es Guest
    const adult = 2
    const infants:  InfantsGrouped  = {
      kids: 1,
      children: 1,
      babies: 1
    }
    const rateType = 'L' // hotel user access serv
    const reservationCostType = 'V' // user info
    // endregion

    const payloadRefundable: RatesCleverPayloadDto = {
      application,
      company,
      hotel,
      checkInDate,
      checkOutDate,
      nights,
      roomCodes,
      market,
      country,
      isRefundable,
      isNational,
      costType,
      guestCd,
      adult,
      infants,
      rateType,
      reservationCostType,
      promotions: []
    }
    const payloadNonRefundable: RatesCleverPayloadDto = {
      application,
      company,
      hotel,
      checkInDate,
      checkOutDate,
      nights,
      roomCodes,
      market,
      country,
      isRefundable: false,
      isNational,
      costType,
      guestCd,
      adult,
      infants,
      rateType,
      reservationCostType,
      promotions: []
    }

    const refundableResponse = await repo.get(payloadRefundable)
    const nonRefundableResponse = await repo.get(payloadNonRefundable)

    //@ts-ignore
    const mapper = new RoomRatesCleverRawMapper(refundableResponse, nonRefundableResponse)
    const result = mapper.map()
    expect(isValidAxiosResponse(refundableResponse)).toBe(true)
  })

  it('Mapper', () => {
    const refundableResponse: RoomRatesCleverResponse = r0
    const NonRefundableResponse: RoomRatesCleverResponse = r1
    const res = {
      data: refundableResponse,
      errors: [],
      warnings: []
    }

    const resN = {
      data: refundableResponse,
      errors: [],
      warnings: []
    }

    const realResponse: RoomRatesCleverFullResponseFull = {
      refundableResponse,
      NonRefundableResponse
    }

    //@ts-ignore
    const mapper = new RoomRatesCleverRawMapper(res, resN)
    const result = mapper.map()
    expect(1).toBe(1)
  })
})
