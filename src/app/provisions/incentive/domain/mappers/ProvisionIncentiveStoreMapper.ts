/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16 5:21:47
 *
 */

import dayjs from "dayjs";
import {
  ProvitionOptionDate, ProvitionOptionItem, ProvitionOptionNight, ProvitionOptionType
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";


function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

export interface ProvisionStore {
  valitTo: ProvitionOptionDate,
  daysToExpire: number,
  hasGolf: boolean,
  category: string,
  type: number,
  raw?: any
}

enum Status {
  AVAILABLE = 'A'
}

const getDaysToExpire = (date: string) => {
  const expDate = dayjs(date)
  const now = dayjs()
  return expDate.diff(now, 'days')
}

const humanize = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const cleanStoreProvitions = (provisions: any[]): ProvisionStore[] => {
  return provisions.map( item => ({
    valitTo: {
      date: item.VALIDDTE,
      human: humanize(item.VALIDDTE)
    },
    daysToExpire: getDaysToExpire(item.VALIDDTE),
    hasGolf: item.ULG_INCLUDE !== 'N',
    category: item.Category,
    type: 0,
    raw: item
  }))
    .filter((item) => item.raw.STATUS === Status.AVAILABLE)
}

const filterStoreProvitions = (provisions: ProvisionStore[]): ProvisionStore[] => {

  // traer los más cerca de caducar - 1 week, 1 week golf, 7 no_week, 7 no_week_golf
  let weeks = provisions.filter( item =>  item.category === 'INCWKS')
  weeks = weeks.map( item => {
    let self = deepCopy(item)
    self.type = ProvitionOptionType.Week
    return self
  } )

  let nights = provisions.filter( item => item.category !== 'INCWKS' )
  nights = nights.map( item => {
    let self = deepCopy(item)
    self.type = ProvitionOptionType.Night
    return self
  } )
  let result:ProvisionStore[] = []

  type ProvitionStoreMaybe = ProvisionStore[] | undefined

  if(weeks === undefined && nights === undefined) {
    return result
  }
  if(weeks !== undefined) {
    let weeksOnly: ProvitionStoreMaybe = weeks.filter( item =>  !item.hasGolf)
    const weeksGolf: ProvitionStoreMaybe = weeks.filter( item =>  item.hasGolf)
    result = weeksOnly !== undefined ? result.concat(weeksOnly) : result
    result = weeksGolf !== undefined ? result.concat(weeksGolf) : result
  }

  if( nights !== undefined) {
    const nightsOnly: ProvitionStoreMaybe = nights.filter( item => !item.hasGolf)
    const nightsGolf = nights.filter( item => item.hasGolf)
    result = nightsOnly !== undefined ? result.concat(nightsOnly) : result
    result = nightsGolf !== undefined ? result.concat(nightsGolf) : result
  }

  return result
}

export const provisionIncentiveStoreMapper = (provition: any[]): ProvitionOptionItem[] => {

  const provisionsStore = cleanStoreProvitions(provition)
  const cleanProvisions = filterStoreProvitions(provisionsStore)

  const buildName = (item: ProvisionStore, index: number): string => {
    let result = ''
    switch (item.type) {
      case ProvitionOptionType.Week:
        result = 'Week'
        break
      case ProvitionOptionType.Night:
        result = 'Night'
        break
      default:
        result = 'Unknown'
        break
    }

    result = item.hasGolf ? `Incentive ${result} Unlimited Golf With Additional Payment` : result
    return `Incentive ${result}`
  }

  const buildNight = (item: ProvisionStore, index: number): ProvitionOptionNight => {
    return {
      name: buildName(item, index),
      validTo: item.valitTo
    }
  }
  // ordenar del menor al mayor menos dias = expira pronto
  const data = cleanProvisions.map( (item, index): ProvitionOptionItem => ({
    id: index.toString(),
    category: item.category,
    daysToExpire: item.daysToExpire,
    name: item.type === ProvitionOptionType.Week ? buildName(item, index) : null,
    nights:item.type === ProvitionOptionType.Night ? [buildNight(item, index)] : null,
    validTo: item.type === ProvitionOptionType.Week ? item.valitTo : null,
    type: item.type,
    hasGolf: item.hasGolf,
    raw: item.raw
  }))

  const r =  data.sort(function (a, b) {
    if (a.daysToExpire > b.daysToExpire) {
      return 1;
    }
    if (a.daysToExpire < b.daysToExpire) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });


  return r
}
