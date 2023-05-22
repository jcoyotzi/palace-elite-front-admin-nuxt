/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16 9:11:7
 *
 */

import {
  ProvisionAniversaryRulePayload, ProvitionOptionItem,
  ProvitionOptionType
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";


export interface ProvisionReducerResponse {
  nights?: ProvitionOptionItem[]
  nightsGolf?: ProvitionOptionItem[]
  week?: ProvitionOptionItem | null | undefined
  weekWithGolf?: ProvitionOptionItem | null | undefined
}

export default class ProvisionAniversaryReducer {
  constructor(
    private readonly rawFact:ProvisionAniversaryRulePayload,
    private readonly onlyNightsMarkets: string[]
  ) {
  }

  run(): ProvisionReducerResponse {
    // return ProvisionAniversaryRulePayload cleaned
    const {
      market,
      nightsToBook,
      hotelHasGolf,
      provisions,
    } = this.rawFact
    // Reduct
    let weeksWithGolf: any[] = []
    let nightsGolf: any[]  = []
    let week: ProvitionOptionItem | null | undefined
    let weekWithGolf: ProvitionOptionItem | null | undefined
    let nightsSingle: ProvitionOptionItem[] = []
    let nightsWithGolf: ProvitionOptionItem[] = []
    let resultItems = []

    const weeksRaw = provisions.filter( item => item.type === ProvitionOptionType.Week )
    const nightsRaw = provisions.filter( item => item.type === ProvitionOptionType.Night )
    const weeks = weeksRaw.filter( item => !item.hasGolf)
    const nights = nightsRaw.filter(item => !item.hasGolf)

    if(hotelHasGolf) {
      weeksWithGolf = weeksRaw.filter( item => item.hasGolf)
      nightsGolf = nightsRaw.filter(item => item.hasGolf)
    }

    //  Weeks only one next to expire
    if(weeks !== undefined) {
      week = weeks[0] as ProvitionOptionItem
      resultItems.push(week)
    }
    //  Weeks Golf only one
    if(weeksWithGolf !== undefined) {
      weekWithGolf = weeksWithGolf[0] as ProvitionOptionItem
      resultItems.push(weekWithGolf)
    }

    //  Nights only N nightsToBook
    for(let i = 0; i < nightsToBook; i++) {
      nightsSingle.push(nights[i])
      nightsWithGolf.push(nightsGolf[i])
    }
    resultItems = this.clearDuplicatedUndefinedItems(resultItems)
    nightsSingle = this.clearDuplicatedUndefinedItems(nightsSingle)
    nightsWithGolf = this.clearDuplicatedUndefinedItems(nightsWithGolf)
    //  Nights Golf only N nightsToBook
    if (this.onlyNightsMarkets.includes(market.toUpperCase())) {
      week = null
      weekWithGolf = null
    }

    const result = {
      nights: nightsSingle.length === nightsToBook ? nightsSingle : [],
      nightsGolf: nightsWithGolf.length === nightsToBook ? nightsWithGolf : [],
      week: nightsToBook <= 7 ? week : null,
      weekWithGolf: nightsToBook <= 7 ? weekWithGolf : null
    }
    return result
  }

  private static enoughNightsConcat(nights: any[], nightsToBook: number, resultItems: any[]) {
    if (nights.length === nightsToBook) {
      resultItems = resultItems.concat(nights)
    }
    return resultItems
  }

  private clearDuplicatedUndefinedItems(list: any[]) {
    // Clear Duplicated
    const itemsSet = new Set(list)
    const items = []
    for(const item of itemsSet.values()) {
      if(item !== undefined && item !== null) {
        items.push(item)
      }
    }

    return items
  }
}
