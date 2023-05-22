import dayjs from 'dayjs'

export type DateComatible = string | Date | dayjs.Dayjs

export interface DateRange<T extends DateComatible> {
  from: T
  to: T
}

export function dateRangesByDays(start: Date, daysInFuture: number): DateRange<string> {
  const formatDate = 'YYYY-MM-DD'
  const begin = dayjs(start)
  const end = begin.add(daysInFuture, 'day')
  const result: DateRange<string> = {
    from: begin.format(formatDate),
    to: end.format(formatDate)
  }
  return result
}

export function getRandomInt(min: number, max: number) {
  const min1 = Math.ceil(min)
  const max1 = Math.floor(max)
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1
}

export function selectedNightsFromStrDates(from: string, to: string): number {
  const start = dayjs(from)
  const end = dayjs(to)
  return end.diff(start, 'day', true)
}
