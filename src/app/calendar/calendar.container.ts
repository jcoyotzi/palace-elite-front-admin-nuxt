import {ContainerModule, interfaces} from 'inversify'
import calendarTypes from '../common/types/calendarTypes'
import GetRatesUseCase from './application/GetRatesUseCase'
import {CalendarRatesRepository} from './domain/repositories/CalendarRatesRepository'
import CalendarRatesServiceRepository from './domain/repositories/CalendarRatesServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<CalendarRatesRepository>(calendarTypes.CalendarRatesRepository).to(
    CalendarRatesServiceRepository
  )
  bind<GetRatesUseCase>(calendarTypes.getRatesUseCase).to(GetRatesUseCase)
})
