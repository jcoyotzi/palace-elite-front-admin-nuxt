import {CalendarDayMetadata} from '../entities/CalendarDayMetadata'

export const ENGLIS_DATE_FORMAT = 'YYYY-MM-DD'

export interface CalendarRatesAdapter {
  /*
   * * date format should be ENGLIS_DATE_FORMAT = 'YYYY-MM-DD'
   * */
  findDayMetadata(date: string): CalendarDayMetadata
}
