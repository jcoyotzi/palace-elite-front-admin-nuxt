/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 23 11:27:13
 *
 */

export const isFakeContext = true

export const hasAllKeys = (data: any, keys: string[]) => {
  for (const key of keys) {
    const inData = key in data
    if (!inData) {
      return false
    }
  }
  return true
}

export const isRoomRateClever = (data: any): boolean => {
  const requiredKeys = ['currency', 'pricesPerNight', 'publicRate', 'total', 'preferentialRate']
  return hasAllKeys(data, requiredKeys)
}
