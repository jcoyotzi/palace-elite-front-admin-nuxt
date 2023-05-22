import dayjs from 'dayjs'
import {monthName, weekdayName} from '../names'
import {CalendarDay} from '../entities/CalendarDay'
import {CalendarMonth} from '../entities/CalendarMonth'
import {CalendarRatesAdapter, ENGLIS_DATE_FORMAT} from '../generator/CalendarRatesAdapter'

export function zeroFilledNumber(number: number): string {
  return number < 10 ? `${number.toString()}` : number.toString()
}

export const addDays = (date: Date, days: number): Date => {
  return dayjs(date).add(days, 'day').toDate()
}

export function dateFromString(date: string): Date {
  return dayjs(date).toDate()
}

function processStartDate(dateStart: Date) {
  const month = zeroFilledNumber(dateStart.getMonth() + 1)
  const year = dateStart.getFullYear().toString()
  const start = dayjs(`${year}-${month}-01`)
  return {
    month,
    year,
    start
  }
}

export function dayOfMont(date: Date) {
  return dayjs(date).date()
}

export function selectedNights(from: Date | string, to: Date | string): number {
  const start = dayjs(from)
  const end = dayjs(to)
  return end.diff(start, 'day', true)
}

export function mapDay(
  date: dayjs.Dayjs,
  locale: string,
  adapter: CalendarRatesAdapter
): CalendarDay {
  const dayNum = date.day()
  const monthDay = date.date()
  const meta = adapter.findDayMetadata(date.format(ENGLIS_DATE_FORMAT))
  return {
    day: zeroFilledNumber(dayNum),
    dayName: weekdayName(dayNum, locale),
    monthDay: zeroFilledNumber(monthDay),
    date: date.format(ENGLIS_DATE_FORMAT),
    meta
  }
}

export function generateCalendarMonth(
  dateStart: Date,
  locale: string,
  adapter: CalendarRatesAdapter
): CalendarMonth {
  const {start, month, year} = processStartDate(dateStart)
  const end = start.add(1, 'month')
  let current = start
  const daysOfMonth = []
  let isNotEndOfMonth = true
  while (isNotEndOfMonth) {
    daysOfMonth.push(mapDay(current, locale, adapter))
    current = current.add(1, 'day')
    isNotEndOfMonth = current.toDate().getTime() !== end.toDate().getTime()
  }
  return {
    year,
    month: monthName(parseInt(month, 10), locale),
    days: daysOfMonth
  }
}

export function generateCalendarData(
  dateStart: Date,
  years: number,
  locale: string,
  adapter: CalendarRatesAdapter,
  extraMonth = false
) {
  const {start} = processStartDate(dateStart)
  const end = start.add(years, 'year')
  let current = start
  let isNotEndOfYears = true
  const monthsOfYear = []
  while (isNotEndOfYears) {
    monthsOfYear.push(generateCalendarMonth(current.toDate(), locale, adapter))
    current = current.add(1, 'month')
    const isEndOfYears = current.month() === end.month() && current.year() === end.year()
    isNotEndOfYears = !isEndOfYears
  }
  if (extraMonth) {
    monthsOfYear.push(generateCalendarMonth(current.toDate(), locale, adapter))
    current.add(1, 'month')
  }
  return monthsOfYear
}
