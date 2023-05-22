// import {container} from '~/src/container'
// import ratesCleverTypes from 'app/common/types/ratesCleverTypes'
// import {useCaseAssertionContext} from '~/test/testUtils/assertions/applicationLayer'
// import GetRoomRatesFormattedUseCase from 'app/ratesClever/application/getRoomRatesFormattedUseCase'
// import {isFakeContext} from '~/test/src/app/ratesClever/application/globalConfig'
// import {RatesCleverPayloadDto} from "app/ratesClever/domain/dto/RatesCleverPayloadDto";
//
// describe('GetRoomRatesFormattedUseCase', () => {
//   it('Happy Path', async () => {
//     const useCase: GetRoomRatesFormattedUseCase = container.get(
//       ratesCleverTypes.GetRoomRatesFormattedUseCase
//     )
//     const payload: RatesCleverPayloadDto = {
//       resort: 'ZHPC',
//       from: '2022-09-22',
//       to: '2022-09-25',
//       room: 'ROOLD'
//     }
//
//     await useCaseAssertionContext(async () => {
//       const data = await useCase.run(payload)
//       const prices = data.pricesPerNight
//       expect(prices.length).toBeGreaterThanOrEqual(4)
//       expect(data.publicRate.includes('$')).toBe(true)
//     }, isFakeContext)
//   })
// })
