/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16 1:0:2
 *
 */

import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import rulesTypes from 'app/common/types/rulesTypes'
import AnniversaryProvisionRuleEngineUseCase from 'app/rules/application/provisions/anniversary/AnniversaryProvisionRuleEngineUseCase'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {provisionAniversaryStoreMapper} from 'app/provisions/aniversary/domain/mappers/ProvisionAniversaryStoreMapper'
import {
  ProvisionAniversaryRulePayload,
  ProvitionOption,
  ProvitionOptionItem,
  ProvitionOptionType
} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'
import ProvisionAniversaryReducer from 'app/provisions/aniversary/domain/mappers/ProvisionAniversaryReducer'
import {eligibleHotelsWithGolf} from 'app/bookingBenefits/domain/policies/GolfPolicie'
import IncentiveProvisionRuleEngineUseCase from 'app/rules/application/provisions/incentive/IncentiveProvisionRuleEngineUseCase'
import {provisionIncentiveStoreMapper} from 'app/provisions/incentive/domain/mappers/ProvisionIncentiveStoreMapper'
import {RoomProvisions} from 'app/booking/domain/entities/reservationInfo'
import provisionTypes from 'app/common/types/provisionTypes'
import GetGolfWithPaymentULGWUseCase from 'app/provisions/golfWithPaymentULGW/getGolfWithPaymentULGWUseCase'

const hotelSupportsGolf = (hotelCode: string) => {
  const codes: string[] = eligibleHotelsWithGolf
  return codes.includes(hotelCode)
}

export const enum ProvisionType {
  anniversary,
  incentive
}

interface builFactPayloadParams {
  rawProvitions: any
  propertyCode: string
  nightsToBook: number
  market: string
}

function buildFactPayload(
  data: builFactPayloadParams,
  onlyNightsMarkets: string[]
): ProvisionAniversaryRulePayload {
  const {rawProvitions, propertyCode, nightsToBook, market} = data

  return {
    market: market,
    nightsToBook: nightsToBook,
    hotelHasGolf: hotelSupportsGolf(propertyCode),
    provisions: rawProvitions !== null ? rawProvitions : [],
    onlyNightsMarkets
  }
}

@Store({
  name: 'provisionStore'
})
export class ProvisionStore extends Pinia {
  @lazyInject(rulesTypes.AnniversaryProvisionRuleEngineUseCase)
  private readonly anniversaryProvisionRulesUseCase!: AnniversaryProvisionRuleEngineUseCase

  @lazyInject(rulesTypes.IncentiveProvisionRuleEngineUseCase)
  private readonly incentiveProvisionRulesUseCase!: IncentiveProvisionRuleEngineUseCase

  @lazyInject(provisionTypes.GetGolfWithPaymentULGWUseCase)
  private readonly getGolfWithPaymentULGWUseCase!: GetGolfWithPaymentULGWUseCase

  private anniversaryRaw: ProvitionOptionItem[] | null = null
  /*   private anniversaryAvailable: ProvitionOptionItem[] = []
   */ /*   private anniversaryUsed: ProvitionOptionItem[] = []
   */
  private incentiveRaw: ProvitionOptionItem[] | null = null
  /*   private incentiveAvailable: ProvitionOptionItem[] = [] */
  /*  private incentiveUsed: ProvitionOptionItem[] = [] */
  private propertyCode: string = ''

  anniversary: ProvitionOption[] | null = null
  incentive: ProvitionOption[] | null = null

  onlyNightsMarkets: string[] = []

  get anniversaryItems() {
    return this.anniversary
  }

  get incentiveItems() {
    return this.incentive
  }

  async getGolfWithPaymentULGW(): Promise<number> {
    return await this.getGolfWithPaymentULGWUseCase.run({
      checkIn: '2023-02-01',
      checkOut: '2023-02-02',
      type: 'W'
    })
  }

  async resetProvisions(type: number, propertyCode: string, rawProvitions: any) {
    /*   let mapper */
    switch (type) {
      case ProvisionType.anniversary:
        /* mapper = provisionAniversaryStoreMapper */
        this.anniversaryRaw = provisionAniversaryStoreMapper(rawProvitions)

        break
      case ProvisionType.incentive:
        /* mapper = provisionIncentiveStoreMapper */
        this.incentiveRaw = provisionIncentiveStoreMapper(rawProvitions)

        break
      default:
        break
    }

    // @ts-ignore
    /*     this[`${provisionName}Available`] = structuredClone(this[`${provisionName}Raw`])
     */ // @ts-ignore
    /*  this[`${provisionName}Used`] = [] */
    this.propertyCode = propertyCode
  }


  async computeAvailableAnniversaryProvitions(
    rawProvitions: any,
    propertyCode: string,
    nightsToBook: number,
    market: string
  ) {
    if (
      this.anniversaryRaw?.length === 0 ||
      this.anniversaryRaw === null ||
      this.propertyCode !== propertyCode
    ) {
      this.resetProvisions(ProvisionType.anniversary, propertyCode, rawProvitions)
    }
    const fact = buildFactPayload(
      {
        rawProvitions: this.anniversaryAvailable,
        propertyCode,
        nightsToBook,
        market
      },
      this.onlyNightsMarkets
    )
    const engineResult = await this.anniversaryProvisionRulesUseCase.run(fact)
    this.anniversary = engineResult.events.result
  }

  async computeAvailableIncentiveProvitions(
    rawProvitions: any,
    propertyCode: string,
    nightsToBook: number,
    market: string
  ) {
    if (
      this.incentiveRaw?.length === 0 ||
      this.incentiveRaw === null ||
      this.propertyCode !== propertyCode
    ) {
      this.resetProvisions(ProvisionType.incentive, propertyCode, rawProvitions)
    }
    const fact = buildFactPayload(
      {
        rawProvitions: this.incentiveAvailable,
        propertyCode,
        nightsToBook,
        market
      },
      this.onlyNightsMarkets
    )
    const engineResult = await this.incentiveProvisionRulesUseCase.run(fact)
    this.incentive = engineResult.events.result
    
  }

  get anniversaryUsed() {
    const {reservation} = new BookingStore()
    const usedAnniversaries = reservation
      .map(room => {
        if (room.roomSelected?.provisions?.anniversary?.id) {
          return room.roomSelected?.provisions?.anniversary?.provision
        }
        return null
      })
      .filter(item => item !== null)
    return usedAnniversaries
  }

  get incentiveUsed() {
    const {reservation} = new BookingStore()
    const usedAnniversaries = reservation
      .flatMap(room => {
        if (room.roomSelected?.provisions?.incentive?.id) {
          return room.roomSelected?.provisions?.incentive?.provision
        } else return null
      })
      .filter(item => item !== null)
    return usedAnniversaries
  }

  get incentiveAvailable(): ProvitionOptionItem[] {
    if (this.incentiveUsed.length === 0) return this.incentiveRaw || []
    return (
      this.incentiveRaw?.filter(incentiveRawProvision => {
        return !this.incentiveUsed.find(currentIncentiveProvision => {
          return incentiveRawProvision.id === currentIncentiveProvision?.id
        })
      }) || []
    )
  }

  get anniversaryAvailable(): ProvitionOptionItem[] {
    if (this.anniversaryUsed.length === 0) return this.anniversaryRaw || []

    return (
      this.anniversaryRaw?.filter(anniversaryRawProvision => {
        return !this.anniversaryUsed.find(currentAnniversaryProvision => {
          return anniversaryRawProvision.id === currentAnniversaryProvision?.id
        })
      }) || []
    )
  }
}
