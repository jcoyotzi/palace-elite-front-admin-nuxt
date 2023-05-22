/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16 7:38:5
 *
 */

import {
  ProvitionOptionItem,
  ProvitionOptionNight
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const nightsAreNotEmpty = (nights: any | null): boolean => {
  if (nights !== undefined && nights !== null) {
    // @ts-ignore
    if (nights.length > 0) {
      return true;
    }
  }
  return false;
}
export const mergeNights = (items: ProvitionOptionItem[]): ProvitionOptionItem => {
  const nights: ProvitionOptionNight[] = items.map(item => {
    return {
      name: item.name!,
      validTo: item.nights![0].validTo,
      raw: item.raw
    }
  })

  const fact = items[0]

  return {
    id: fact.id + '_nightSingle',
    category: fact.category,
    name: null,
    nights,
    validTo: null,
    daysToExpire: fact.daysToExpire,
    type: fact.type,
    hasGolf: fact.hasGolf,
  }
}
