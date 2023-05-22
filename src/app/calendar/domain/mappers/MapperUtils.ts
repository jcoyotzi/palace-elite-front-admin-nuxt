import dayjs from 'dayjs'

export function zeroFilledNumber(number: number): string {
  return number < 10 ? `0${number.toString()}` : number.toString()
}

export const setTimeToZero = (date: Date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export const dateDiffInDays = (start: Date, end: Date) => {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  return endDate.diff(startDate, 'day')
}

export const addDays = (date: Date, days: number): Date => {
  return dayjs(date).add(days, 'day').toDate()
}

export function dateRangeSplit(start: string, end: string): Date[] {
  const start0 = setTimeToZero(dayjs(start).toDate())
  const diff = dateDiffInDays(start0, setTimeToZero(dayjs(end).toDate()))
  const result = [start0]
  for (let i = 0; i < diff; i += 1) {
    result.push(addDays(result[i], 1))
  }
  return result
}
