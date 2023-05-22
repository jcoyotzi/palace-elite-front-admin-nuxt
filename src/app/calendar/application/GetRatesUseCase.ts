import {inject, injectable} from 'inversify'
import dayjs from 'dayjs'
import UseCase from '../../common/application/UseCase'
import calendarTypes from '../../common/types/calendarTypes'
import {CalendarRatesRepository} from '../domain/repositories/CalendarRatesRepository'
import {RateServicePayloadDto} from '../domain/dto/RateServicePayloadDto'
import {Payload} from '../../common/domain/entities/payload'
import {CalendarRatesApiMapper} from '../domain/mappers/CalendarRatesApiMapper'
import CalendarRatesApiAdapter from '../domain/generator/CalendarRatesApiAdapter'
import {generateCalendarData} from '../domain/generator/CalendarDataGenerator'
import {LocaleNames} from '../domain/names'
import {CalendarMonth} from '../domain/entities/CalendarMonth'
import {baglioniCodes} from '../../property/domain/data/baglioniCodes'

type getRatesPayload = {resort: string; from: string; typeRo?: string; roomTemplate?: string}

@injectable()
export default class GetRatesUseCase implements UseCase<getRatesPayload, CalendarMonth[]> {
  constructor(
    @inject(calendarTypes.CalendarRatesRepository)
    private readonly ratesRepository: CalendarRatesRepository
  ) {}

  async run(port: getRatesPayload): Promise<any> {
    const start = new Date(port.from)
    const years = 2
    const end = dayjs(start).add(years, 'year')

    const payloadData: RateServicePayloadDto = {
      resort: port.resort,
      system_id: '1',
      roomTemplate: port.roomTemplate || 'CLT',
      travelBegin: port.from,
      travelEnd: end.toISOString(),
      typeRo: port.typeRo || 'ROH'
    }

    const payload: Payload<RateServicePayloadDto> = {
      data: payloadData
    }
    const language = LocaleNames.English
    const response = await this.ratesRepository.getRates(payload, language)
    const responseData = response.data
    if (responseData === undefined) {
      throw new Error("UseCaseException: The endpoint don't response with right data!")
    }

    const isBaglioni = baglioniCodes.includes(port.resort)

    const mapper = new CalendarRatesApiMapper(responseData, language, isBaglioni)
    const rates = mapper.map()
    const adapter = new CalendarRatesApiAdapter(rates)
    return generateCalendarData(start, years, language, adapter)
  }
}
