import dayjs from 'dayjs'
import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '../../container'
import calendarTypes from '../../app/common/types/calendarTypes'
import GetRatesUseCase from '../../app/calendar/application/GetRatesUseCase'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'

@Store({
  name: 'calendarStore'
})
export class CalendarStore extends Pinia {
  @lazyInject(calendarTypes.getRatesUseCase)
  private readonly getRatesUseCase!: GetRatesUseCase

  rates: any = null
  loadingRates: boolean = false

  async getRatesLegacyApi(resort: string) {
    const hotelReference: any = {
      BP: 'ZHBP',
      CZ: 'ZRCZ',
      LBC: 'ZHLB',
      MP: 'ZMNI',
      MPG: 'ZMGR',
      MPS: 'ZMSU',
      PL: 'ZRPL',
      SP: 'ZHSP',
      ZCJG: 'ZCJG',
      ZPLB: 'ZPLB',
      BALO: 'BALO',
      LUVE: 'LUVE',
      RERO: 'RERO',
      BAMA: 'BAMA',
      BAPU: 'BAPU',
      BASA: 'BASA',
      CABA: 'CABA',
      SAFI: 'SAFI'
    }

    const now = dayjs()
    const currentMonthBegin = dayjs(`${now.year()}-${now.month() + 1}-01`).toISOString()
    this.loadingRates = true
    this.rates = await this.getRatesUseCase.run({
      resort: hotelReference[resort],
      from: currentMonthBegin,
      roomTemplate: baglioniCodes.includes(resort) ? 'ELITE' : 'CLT',
      typeRo: baglioniCodes.includes(resort) ? 'ROH' : 'ROH'
    })
    this.loadingRates = false
  }

  get calendarData() {
    return this.rates === null ? [] : this.rates
  }
}
