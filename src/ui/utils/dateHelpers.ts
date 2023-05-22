import dayjs, {extend} from 'dayjs'
import dayjsDurationPlugin from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

import {GetTimeParams} from '~/src/app/bookings/domain/entities/getTimeParams'

extend(dayjsDurationPlugin)
extend(utc)
extend(timezone)

export const getFormattedDate = (date: Date) => dayjs(date).format('MMM D')
export const getYear = (date: Date) => date.getFullYear()
export const yearsBridge = (startDate: Date, endDate: Date): boolean =>
  getYear(startDate) !== getYear(endDate)
export const sortedDatesRange = (startDate: Date | number, endDate: Date | number): Date[] =>
  [new Date(startDate), new Date(endDate)].sort(
    (firstDate: Date, last: Date) => firstDate.getTime() - last.getTime()
  )

export const zeroFill = (number: string, width = 2) => {
  let mutableWidth = width
  mutableWidth -= String(number).length
  const zeros = /\./.test(number) ? 2 : 1
  return mutableWidth ? new Array(mutableWidth + zeros).join('0') + number : `${number}`
}

export const getTime = (params: GetTimeParams) => {
  const {type, time, currentDate} = params

  const difference = dayjs(time).diff(dayjs(currentDate), type)

  return Number(difference) < 0 ? '00' : difference
}

export const daysToCheckIn = (checkInDate: string): number  => {
  const checkIn = dayjs.tz(checkInDate, 'Europe/London')
  const today = dayjs.tz(dayjs().format('YYYY-MM-DD'), 'Europe/London')
  return checkIn.diff(today, 'day')
}
