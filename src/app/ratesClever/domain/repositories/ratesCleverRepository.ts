/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:6:37
 *
 */

import {Response} from '~/src/app/network/common/domain/entity/response'
import {Pagination} from '~/src/app/network/common/domain/entity/pagination'
import {RoomRatesCleverResponseDto} from '~/src/app/ratesClever/domain/dto/RoomRatesCleverResponseDto'
import {RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {RoomRatesCleverResponse} from 'app/ratesClever/domain/entities/roomRatesClever'
import { GetAvailableCategoriesDTO } from '../dto/GetAvailableCategoriesDTO'
import { GetAvailableCategoriesResponseDTO } from '../dto/GetAvailableCategoriesResponseDTO'

export interface RatesCleverRepository {
  get(payload: RatesCleverPayloadDto): Promise<Response<Pagination<RoomRatesCleverResponse>>>
  getAvailableCategories(params: GetAvailableCategoriesDTO): Promise<GetAvailableCategoriesResponseDTO[]>
}
