/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 10 / 7 2:3:20
 *
 */

import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {container} from '~/src/container'
import httpTypes from 'app/common/types/httpTypes'
import {isValidAxiosResponse} from '~/test/testUtils/assertions/axiosApi'

describe('ExampleAuthFakeApi', () => {
  it('GET with barer token', async () => {
    const api: HttpApi = container.get(httpTypes.exampleAuthFakeApi)
    const url = `/some/endpoint`
    const data = await api.get(url)
    expect(isValidAxiosResponse(data)).toBe(true)
    expect('Authorization' in data?.headers).toBe(true)
  })

  it('POST with barer token', async () => {
    const api: HttpApi = container.get(httpTypes.exampleAuthFakeApi)
    const url = `/some/endpoint`
    const data = await api.post(url)
    expect(isValidAxiosResponse(data)).toBe(true)
    expect('Authorization' in data?.headers).toBe(true)
  })
})
