/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 5 7:44:1
 *
 */

import {indexedRoomSorts} from 'app/ratesClever/infrastructure/indexedRoomSorts'

export interface RoomSort {
  orderPosition: number
  hotelCode: string
  hotel: string
  roomCode: string
  suiteType: string
  description: string
  maxPax: number
  isFamiliar: boolean
}

export const enum HotelCodes {
  PuntaCana = "Owner's Estate Punta Cana",
  BP = 'BP', // Beach Palace
  CZ = 'CZ', // Cozumel Palace
  LBC = 'LBC', // Le Blanc Spa Resort Cancun
  ZPLB = 'ZPLB', // Le Blanc Spa Resort Los Cabos
  ZCJG = 'ZCJG', // Moon Palace Jamaica
  MPC = 'MPC', // Moon Palace Nizuc
  MPS = 'MPS', // Moon Palace Sunrise
  MPG = 'MPG', //  Moon Palace The Grand Cancun
  PL = 'PL', // Playacar Palace
  SP = 'SP' // Sun Palace
}

export type PickKey<T, K extends keyof T> = Extract<keyof T, K>
/* 
  Zone Moon or Hotel Zone and playacar
*/
export type GolfHotelCodes = PickKey<
  typeof HotelCodes,
  'BP' | 'LBC' | 'MPC' | 'MPS' | 'MPG' | 'PL' | 'SP'
>

export type HotelRoomSorted = {[index: string]: RoomSort[]}

export const getRoomsSorted = (hotelCode: string): RoomSort[] => {
  const result = indexedRoomSorts[hotelCode]
  return result === undefined ? [] : result
}
