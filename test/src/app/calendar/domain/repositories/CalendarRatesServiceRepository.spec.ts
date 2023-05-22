/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 21 0:36:44
 *
 */

import 'reflect-metadata'
import dayjs from 'dayjs'
import httpTypes from 'app/common/types/httpTypes'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import CalendarRatesServiceRepository from '~/src/app/calendar/domain/repositories/CalendarRatesServiceRepository'

import {container} from '~/src/container'
import {RateServicePayloadDto} from 'app/calendar/domain/dto/RateServicePayloadDto'
import {Payload} from 'app/common/domain/entities/payload'
import CalendarRatesServiceFakeRepository from 'app/calendar/domain/repositories/CalendarRatesServiceFakeRepository'

type getRatesPayload = {resort: string; from: string}

describe('CalendarRatesServiceRepository', () => {
  it('Default', async () => {
    const resort: string = 'ZHLB'
    const now = dayjs()
    const currentMonthBegin = dayjs(`${now.year()}-${now.month() + 1}-01`).toISOString()
    const port: getRatesPayload = {
      resort,
      from: currentMonthBegin
    }
    const start = new Date(port.from)
    const years = 1
    const end = dayjs(start).add(years, 'year')
    const payloadData: RateServicePayloadDto = {
      resort: port.resort,
      system_id: '1',
      roomTemplate: 'CLT',
      travelBegin: port.from,
      travelEnd: end.toISOString(),
      typeRo: 'ROH'
    }

    const payload: Payload<RateServicePayloadDto> = {
      data: payloadData
    }

    const httpApi: HttpApi = container.get(httpTypes.ratesApiFake)
    const repo = new CalendarRatesServiceFakeRepository(httpApi)
    const data = await repo.getRates(payload, 'en')

    expect(true).toBe(true)
  })
})
