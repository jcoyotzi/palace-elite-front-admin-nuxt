import 'reflect-metadata'
import RunEngineUseCase from '~/src/app/rules/application/runEngineUseCase'
import {EnumRoomCategory, PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {container} from '~/src/container'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import dayjs from 'dayjs'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'
import {EnumMarkets} from '~/src/app/common/domain/enums/markets'
import {EliteProductType} from '~/src/app/bookingBenefits/domain/entities/rules/reservationTypes'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
describe('Minimal Stays rules', () => {
  const runEngine: RunEngineUseCase = container.get(rulesTypes.runEngineUseCase)
  const roomTypes = [
    EnumRoomCategory.ESPECIAL,
    EnumRoomCategory.ESTANDARD,
    EnumRoomCategory.PRESIDENTIAL,
    EnumRoomCategory.RESIDENCE,
    EnumRoomCategory.VILLA
  ]

  const markets = [
    EnumMarkets.USA,
    EnumMarkets.MEXICO,
    EnumMarkets.CANADA,
    EnumMarkets.LATAM,
    EnumMarkets.UK
  ]
  const pipeline = PipelinesEnum.STAY_MINIMAL

  it('Validando recibir Minimal Stays Policies', async () => {
    const fact = {
      checkInDate: toEpochTimeStamp('2020-12-25'),
      expirationDate: toEpochTimeStamp('2020-12-25')
    }
    const pipeline = PipelinesEnum.IMPERIAL_POLICY

    const data = await runEngine.run({fact, pipeline})
    expect(data.events?.compliance).toBe(undefined)
  })

  it('will return more than 6 as minimal stay on ANIVERSARIO  week provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.ANIVERSARIO,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.weekType
    }
    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }
            try {
              const result = await runEngine.run({fact, pipeline})
              expect(result.events?.stayMinimal).toBeGreaterThan(6)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })
  it('will return more than 6 as minimal stay on INCENTIVA  week provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.INCENTIVA,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.weekType
    }
    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }
            try {
              const result = await runEngine.run({fact, pipeline})
              expect(result.events?.stayMinimal).toBeGreaterThan(6)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })
  it('will return more than 6  as  minimal stay on IMP_WEEKS week provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.IMP_WEEKS,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.weekType
    }

    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }
            try {
              const result = await runEngine.run({fact, pipeline})
              expect(result.events?.stayMinimal).toBeGreaterThan(6)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })

  it('will return a number on ANIVERSARIO night provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.ANIVERSARIO,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.nightType
    }

    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }

            const result = await runEngine.run({fact, pipeline})
            try {
              expect(result.events?.stayMinimal).toBeGreaterThan(0)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })

  it('will return a number on IMP_WEEKS night provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.ANIVERSARIO,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.nightType
    }

    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }

            const result = await runEngine.run({fact, pipeline})
            try {
              expect(result.events?.stayMinimal).toBeGreaterThan(0)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })
  it('will return a number on IMP_WEEKS night provisions', async () => {
    let fact = {
      reservationType: BookingCategoryStatus.INCENTIVA,
      roomType: EnumRoomCategory.ESPECIAL,
      market: EnumMarkets.USA,
      stayMinimal: false,
      stayMinimalPresidential: false,
      stayMinimalReferral: false,
      productType: EliteProductType.nightType
    }

    await Promise.all(
      roomTypes.map(async roomType => {
        fact = {
          ...fact,
          roomType
        }

        await Promise.all(
          markets.map(async market => {
            fact = {
              ...fact,
              market
            }

            const result = await runEngine.run({fact, pipeline})
            try {
              expect(result.events?.stayMinimal).toBeGreaterThan(0)
            } catch (error) {
              throw new Error(
                `Error on Rerservation type: ${fact.reservationType} RoomType: ${fact.roomType} Market : ${fact.market} ProductType: ${fact.productType}`
              )
            }
          })
        )
      })
    )
  })
})
