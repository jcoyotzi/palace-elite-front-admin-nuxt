/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 2:59:40
 *
 */

import {RoomRatesClever} from '~/src/app/ratesClever/domain/entities/roomRatesClever'

export interface RoomRatesCleverResponseDto {
  status: string
  code: number
  message: string
  data: RoomRatesClever
}
