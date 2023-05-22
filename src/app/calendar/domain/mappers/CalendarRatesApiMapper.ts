import dayjs from 'dayjs'
import {RateServiceItem, RateServiceRate} from '../entities/RateServiceItem'

import {CalendarDayMetadata} from '../entities/CalendarDayMetadata'
import {ENGLIS_DATE_FORMAT} from '../generator/CalendarRatesAdapter'

import {weekdayName} from '../names'
import {CalendarDay} from '../entities/CalendarDay'
import {dateRangeSplit, zeroFilledNumber} from './MapperUtils'
import {ResponseWithCollection} from './ResponseWithCollection'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import {BookingStore} from '~/src/ui/store/bookingStore'

export function mapDay(date: dayjs.Dayjs, locale: string, meta: CalendarDayMetadata): CalendarDay {
  const dayNum = date.day()
  const monthDay = date.date()
  return {
    day: zeroFilledNumber(dayNum),
    dayName: weekdayName(dayNum, locale),
    monthDay: zeroFilledNumber(monthDay),
    date: date.format(ENGLIS_DATE_FORMAT),
    meta
  }
}

// eslint-disable-next-line import/prefer-default-export
export class CalendarRatesApiMapper {
  constructor(
    private readonly response: ResponseWithCollection<RateServiceItem>,
    private readonly locale: string,
    private readonly isBaglioni: boolean = false
  ) {}

  // eslint-disable-next-line class-methods-use-this
  map(): Map<string, CalendarDay> {
    const {rates} = this.response.data[0].rooms[0]
    const flat = rates
      .map(rateItem => CalendarRatesApiMapper.flatRate(rateItem, this.locale, this.isBaglioni))
      .flat(1)
    const result: Map<string, CalendarDay> = new Map()

    // eslint-disable-next-line no-restricted-syntax
    for (const element of flat) {
      const item = element
      result.set(item.date, item)
    }
    return result
  }

  private static flatRate(
    rate: RateServiceRate,
    locale: string,
    isBaglioni: boolean
  ): CalendarDay[] {
    // build range
    const dates = dateRangeSplit(rate.date_from, rate.date_to)
    const meta = CalendarRatesApiMapper.getRateMetadata(rate, locale, isBaglioni)
    return dates.map(x => mapDay(dayjs(x), locale, meta))
  }

  private static getRateMetadata(
    rate: RateServiceRate,
    locale: string,
    isBaglioni: boolean = false
  ): CalendarDayMetadata {
    const {prices} = rate
    const biggerPrice = prices.find(item => item.pax_type === 'DBL')

    if (biggerPrice === undefined) {
      throw new Error('This rate has not price')
    }
    let amount = biggerPrice.amount_base
    // acceder al store
    if (isBaglioni) {
      amount = biggerPrice.amount_final
      // if (biggerPrice.promotions.length > 0) {
      //   const basePromotion = biggerPrice.promotions.find(promotion => promotion.description === "PROMOCION DBA")
      //   const bpgPromotion = biggerPrice.promotions.find(promotion => promotion.description === "BAGLIONI BPG")
      //   const allInclusivePromotion = biggerPrice.promotions.find(promotion => promotion.description === "ALL INCLUSIVE")

      //   const baseAmountPromotion = basePromotion?.amount_promotion ?? 0
      //   const bpgAmountPromotion = bpgPromotion?.amount_promotion ?? 0
      //   const allInclusiveAmountPromotion = allInclusivePromotion?.amount_promotion ?? 0

      //   amount = amount + bpgAmountPromotion + baseAmountPromotion + allInclusiveAmountPromotion
      // }
    }
    return {
      isBestPrice: false,
      isRestriction: false,
      isAvailable: true,
      tag: '',
      price: usdFormatter.format(amount)
    }
  }
}
