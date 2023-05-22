/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:12:50
 *
 */
//
// import {inject, injectable} from 'inversify'
// import {RatesCleverRepository} from '~/src/app/ratesClever/domain/repositories/ratesCleverRepository'
// import {Pagination} from '~/src/app/network/common/domain/entity/pagination'
// import {Response} from '~/src/app/network/common/domain/entity/response'
// import httpTypes from '~/src/app/common/types/httpTypes'
// import {getRandomInt} from '~/src/app/common/helpers/dateRanges'
// import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
//
// import {RoomRatesCleverResponseDto} from 'app/ratesClever/domain/dto/RoomRatesCleverResponseDto'
// import {RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
//
// @injectable()
// export default class RatesCleverServiceFakeRepository implements RatesCleverRepository {
//   constructor(@inject(httpTypes.ratesCleverFakeApi) private readonly http: HttpApi) {}
//
//   async get(
//     payload: RatesCleverPayloadDto
//   ): Promise<Response<Pagination<RoomRatesCleverResponseDto>>> {
//     const response: Response<Pagination<RoomRatesCleverResponseDto>> = await this.http.get(
//       `/rates/`
//     )
//     // @ts-ignore
//     response.data?.data.total = getRandomInt(3000, 3900)
//     return response
//   }
// }
