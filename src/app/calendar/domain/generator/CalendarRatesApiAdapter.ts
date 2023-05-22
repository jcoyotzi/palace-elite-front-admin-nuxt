import {CalendarRatesAdapter} from '../generator/CalendarRatesAdapter'
import {CalendarDay} from '../entities/CalendarDay'
import {CalendarDayMetadata} from '../entities/CalendarDayMetadata'

export default class CalendarRatesApiAdapter implements CalendarRatesAdapter {
  constructor(private readonly rates: Map<string, CalendarDay>) {}

  findDayMetadata(date: string): CalendarDayMetadata {
    const day = this.rates.get(date)
    if (day === undefined) {
      return {
        isBestPrice: false,
        isRestriction: false,
        isAvailable: false,
        tag: '',
        price: '$0'
      }
    }
    return day.meta
  }
}
