/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:44:41
 *
 */
import {container} from '~/src/container'
import ratesCleverTypes from '~/src/app/common/types/ratesCleverTypes'
import GetRoomRatesUseCase from '~/src/app/ratesClever/application/getRoomRatesUseCase'
import {useCaseAssertionContext} from '~/test/testUtils/assertions/applicationLayer'

import {isFakeContext, isRoomRateClever} from '~/test/src/app/ratesClever/application/globalConfig'
// import GetRoomRatesFormattedUseCase from '~/src/app/ratesClever/application/getRoomRatesFormattedUseCase'
import {RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'

// https://7lufx0yq8l.execute-api.us-east-1.amazonaws.com/EliteIntelligenceX/api/v1/bookings/rooms/application/4050638/company/5/hotel/CZ/check-in/1668751200000/check-out/1669356000000/nights/7?request.market=USA&request.roomCodes=CNG&request.roomCodes=JOF&request.roomCodes=JRS&request.roomCodes=MEZ&request.isRefundable=true&request.isNational=false&request.costType=true&request.adult=1&request.child=0&request.guestCd=M&request.rateType=L&request.reservationCostType=V
// https://7lufx0yq8l.execute-api.us-east-1.amazonaws.com/EliteIntelligenceX/api/v1/bookings/rooms/application/4050638/company/5/hotel/CZ/check-in/1668751200000/check-out/1669356000000/nights/7?request.market=USA&request.roomCodes=CNG&request.roomCodes=JOF&request.roomCodes=JRS&request.roomCodes=MEZ&request.isRefundable=false&request.isNational=false&request.costType=true&request.adult=1&request.child=0&request.guestCd=M&request.rateType=L&request.reservationCostType=V
describe('GetRoomRatesUseCase', () => {
  // it('Happy Path', async () => {
  //   const useCase: GetRoomRatesUseCase = container.get(ratesCleverTypes.GetRoomRatesUseCase)
  //   const payload: RatesCleverPayloadDto = {
  //     resort: 'ZHPC',
  //     from: '2022-09-22',
  //     to: '2022-09-25',
  //     room: 'ROOLD'
  //   }
  //
  //   await useCaseAssertionContext(async () => {
  //     const data = await useCase.run(payload)
  //     const prices = data.pricesPerNight
  //     expect(isRoomRateClever(data)).toBe(true)
  //     expect(prices.length).toBeGreaterThanOrEqual(4)
  //   }, isFakeContext)
  // })
  // it('Get Formated', async () => {
  //   const useCase: GetRoomRatesUseCase = container.get(ratesCleverTypes.GetRoomRatesUseCase)
  //
  //   const payload: RatesCleverPayloadDto = {
  //     resort: 'ZHPC',
  //     from: '2022-09-22',
  //     to: '2022-09-25',
  //     room: 'ROOLD'
  //   }
  //
  //   await useCaseAssertionContext(async () => {
  //     const rawData = await useCase.run(payload)
  //
  //     const mapperFormatted = new RoomRatesCleverMapper(rawData)
  //     const data = mapperFormatted.map()
  //     const prices = data.pricesPerNight
  //
  //     expect(isRoomRateClever(data)).toBe(true)
  //     expect(prices.length).toBeGreaterThanOrEqual(4)
  //     expect(typeof data.total).toBe(typeof 'string')
  //     expect(data.total.includes('$')).toBe(true)
  //     expect(data.pricesPerNight[0].price.includes('$')).toBe(true)
  //     expect(data.pricesPerNight[0].date.includes('2022-')).toBe(false)
  //   }, isFakeContext)
  // })
  // it('Get Formated Tell Dont Ask', async () => {
  //   const useCase: GetRoomRatesFormattedUseCase = container.get(
  //     ratesCleverTypes.GetRoomRatesFormattedUseCase
  //   )
  //
  //   const payload: RatesCleverPayloadDto = {
  //     resort: 'ZHPC',
  //     from: '2022-09-22',
  //     to: '2022-09-25',
  //     room: 'ROOLD'
  //   }
  //
  //   await useCaseAssertionContext(async () => {
  //     const data = await useCase.run(payload)
  //     const prices = data.pricesPerNight
  //
  //     expect(isRoomRateClever(data)).toBe(true)
  //     expect(prices.length).toBeGreaterThanOrEqual(4)
  //     expect(typeof data.total).toBe(typeof 'string')
  //     expect(data.total.includes('$')).toBe(true)
  //     expect(data.pricesPerNight[0].price.includes('$')).toBe(true)
  //     expect(data.pricesPerNight[0].date.includes('2022-')).toBe(false)
  //   }, isFakeContext)
  // })
})
