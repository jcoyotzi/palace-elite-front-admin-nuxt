import {CalendarDayMetadata} from './CalendarDayMetadata'

export interface CalendarDay {
  day: string
  dayName: string
  monthDay: string
  date: string
  meta: CalendarDayMetadata
}
