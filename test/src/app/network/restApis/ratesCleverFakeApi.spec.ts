/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 10:26:10
 *
 */
import {RatesCleverFakeApi} from 'app/network/restApis/ratesCleverFakeApi'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {container} from '~/src/container'
import httpTypes from 'app/common/types/httpTypes'
import {isValidAxiosResponse} from '~/test/testUtils/assertions/axiosApi'

describe('RatesCleverFakeApi', () => {
  it('GET rates clever', async () => {
    // GIVEN I have a room ID 'CHRO898'
    const api: HttpApi = container.get(httpTypes.ratesCleverFakeApi)
    const room = 'CHRO898'
    // WHEN GET a response from `/rates/CHRO898`
    const data = await api.get(`/rates/${room}`)
    // THEN I have a valid Axios Response
    expect(isValidAxiosResponse(data)).toBe(true)
  })
})
