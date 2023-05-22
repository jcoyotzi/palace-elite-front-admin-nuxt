/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:56:31
 *
 */
export interface RoomRatesCleverNightPrice {
  date: string
  price: number
  regularPrice: number
}

export interface RoomRatesCleverNightPriceFormatted {
  date: string
  price: string
  dashedPrice: string
}

export interface RoomRefundableRate {
  label: string
  price: number
  value: string
  checked: boolean
}

export interface RoomRefundableRateFormated {
  rateLbl: string
  ratePrice: string
  value: string
  checked: boolean
}

export interface RoomRatesClever {
  currency: string
  pricesPerNight: RoomRatesCleverNightPrice[]
  refundable: RoomRefundableRate[]
  nonRefundable: RoomRefundableRate[]
  roomCode?: string
}

export interface RoomRatesCleverDailyRate {
  rate: number
  regularRate: number
  date: string
}

export interface RoomRatesCleverCategory {
  code: string
  rate: number
  regularRate: number
}

export interface RoomRatesCleverResponseDto {
  roomCode: string
  dailyRate: RoomRatesCleverDailyRate[]
  category: RoomRatesCleverCategory[]
  isLockOff?: boolean
}

export interface RoomRatesCleverResponse {
  data: {
    rooms: RoomRatesCleverResponseDto[]
  }
  errors: any
  warnings: any
}

export interface RoomRatesCleverFullResponseFull {
  refundableResponse: RoomRatesCleverResponse
  NonRefundableResponse: RoomRatesCleverResponse
}

export interface RoomRatesCleverFormatted {
  currency: string
  pricesPerNight: RoomRatesCleverNightPriceFormatted[]
  publicRate: string
  total: string
  preferentialRate: string
  refundable: RoomRefundableRateFormated[]
  nonRefundable: RoomRefundableRateFormated[]
}
