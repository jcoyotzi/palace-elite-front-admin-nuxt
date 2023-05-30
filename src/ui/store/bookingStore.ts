import {Pinia, Store} from 'pinia-class-component'
import dayjs from 'dayjs'
import { getRoomType } from '../utils/evaluate/roomType'
import { BPGStore } from './bpgStore'
import { BookingEntity } from '~/src/app/booking/domain/entities/bookingEntity'
import BookingFactory from '~/src/app/booking/domain/factories/bookingFactory'
import { MethodsStay } from '~/src/app/bpg/domain/enum/methodsStay'
import { PipelinesEnum } from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import UseCase from '~/src/app/common/application/UseCase'
import { lazyInject } from '~/src/container'
import { MinimunStay } from '~/src/app/booking/domain/entities/minimunStay'
import { RuleEngineRequest, RuleEngineResponse } from '~/src/app/rules/application/runEngineUseCase'
import bookingTypes from '~/src/app/common/types/bookingTypes'
import { GetMinimumStay } from '~/src/app/booking/application/getMinimumStayUseCase'

@Store({
  name: 'BookingStore'
})
export class BookingStore extends Pinia {
  @lazyInject(rulesTypes.runEngineUseCase)
  private readonly runEngine!: UseCase<RuleEngineRequest, RuleEngineResponse>

  @lazyInject(bookingTypes.getMinimumStay)
  private readonly getMinimumStayUseCase!: GetMinimumStay

  private booking: BookingEntity = BookingFactory()

  public minStays: MinimunStay | null = null
  public nigth: number = 1
  public daysminimalStay: number = 1

  // get userInfo() {
  //   return this.$nuxt.$pinia.state.value.authStore.user
  // }

  public async validateRuleMinimalStay(
    pipeline: PipelinesEnum,
    roomCode: string,
    reservationType: string | undefined,
    productType: string,
    method: number = MethodsStay.VALIDATE
  ) {
    const booking = this.booking
    const roomType = getRoomType({
      hotelCode: booking.propertyCode,
      roomCode,
    })

    const bpgStore = new BPGStore()
    const market = bpgStore.affiliateInfo.market

    const fact = {
      reservationType,
      roomType,
      market,
      stayMinimal: this.minStays?.MinimiumStay,
      stayMinimalPresidential: this.minStays?.PresidentialVariables,
      stayMinimalReferral: this.minStays?.Referrend,
      productType
    }

    const response = await this.runEngine.run({fact, pipeline})
    let minimalStay = response.events.stayMinimal
    if (minimalStay === undefined) minimalStay = 0

    if (method === MethodsStay.GET) return minimalStay

    this.daysminimalStay = minimalStay
    const {checkIn, checkOut} = booking
    const nights = this.selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    this.nigth = nights
    return nights >= minimalStay
  }

  selectedNights(from: Date | string, to: Date | string): number {
    const start = dayjs(from)
    const end = dayjs(to)
    return end.diff(start, 'day', true)
  }

  async getMinStay(application: string) {
    const response = await this.getMinimumStayUseCase.run({application})
    return (this.minStays = response.data.data)
  }
}
