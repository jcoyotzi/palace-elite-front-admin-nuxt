/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 14 3:6:44
 *
 */

export interface ProvitionOptionDate {
  date: string
  human: string
}

export interface ProvitionOptionNight {
  name: string
  validTo: ProvitionOptionDate
  raw?: any
}

export interface ProvitionOptionItem {
  id: string
  category: string
  name: string | null
  nights: ProvitionOptionNight[] | null
  validTo: ProvitionOptionDate | null
  daysToExpire: number
  type: number
  hasGolf: boolean
  raw?: any
}

export interface ProvitionOption {
  id: string
  name: string
  hasGolf: boolean
  provision: ProvitionOptionItem
}

export interface ProvisionAniversaryRulePayload {
  market: string
  nightsToBook: number
  hotelHasGolf: boolean
  provisions: ProvitionOptionItem[]
  onlyNightsMarkets?: string[]
}

export interface ProvitionOptionDescription {
  name: string
  expirationDate: string
}

export const enum ProvitionOptionType {
  Week,
  Night,
  Unkown
}

export const provitionType = (item: ProvitionOption) => {
  if (item.provision?.nights === null && item.provision?.validTo !== null) {
    return ProvitionOptionType.Week
  }
  if (item.provision?.nights !== null && item.provision?.validTo === null) {
    return ProvitionOptionType.Night
  }
  return ProvitionOptionType.Unkown
}
