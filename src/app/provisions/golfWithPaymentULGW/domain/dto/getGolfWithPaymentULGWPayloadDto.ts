/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 24 11:17:30
 *
 */

export const enum GolfTypes {
  WEEK = 'W',
  NIGHT = 'N'
}

export interface GetGolfWithPaymentULGWPayloadDto {
  checkIn: string
  checkOut: string
  type: string
}
