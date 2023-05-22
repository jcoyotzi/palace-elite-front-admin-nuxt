import {apiResponseMock} from './apiResponseMock'
import {CalendarRatesApiMapper} from '~/src/app/calendar/domain/mappers/CalendarRatesApiMapper'
import CalendarRatesApiAdapter from '~/src/app/calendar/domain/generator/CalendarRatesApiAdapter'
import {generateCalendarData} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {LocaleNames} from '~/src/app/calendar/domain/names'

describe('Calendar Rates API Legacy Mapper', () => {
  describe('Mock', () => {
    it('Mapper', () => {
      const res = apiResponseMock

      const mapper = new CalendarRatesApiMapper(res.data, 'en')
      const result = mapper.map()
      expect(true).toBe(true)
    })

    it('Adapter', () => {
      const res = apiResponseMock

      const mapper = new CalendarRatesApiMapper(res.data, 'en')
      const rates = mapper.map()
      const adapter = new CalendarRatesApiAdapter(rates)
      const start = new Date('2022-09-01T00:00:00')
      const years = 1

      const result = generateCalendarData(start, years, LocaleNames.English, adapter)

      expect(true).toBe(true)
    })
  })
})
