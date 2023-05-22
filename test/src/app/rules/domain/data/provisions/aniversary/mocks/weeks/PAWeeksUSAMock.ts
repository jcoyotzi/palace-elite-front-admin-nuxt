/*
 * Copyright (c) 2022.
 * Author: Diego Ceron
 * Company: Palace Resorts
 * Created:  2022 / 11 / 18
 *
 */

import {
  ProvitionOptionType,
  ProvisionAniversaryRulePayload

} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const PAWeeksUSAHappiPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: [
    {
      id: '0',
      category: 'ANVWKS',
      name: 'Week 0',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: false
    }
  ]
}

export const PAWeeksUSAHappiPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 6,
  hotelHasGolf: false,
  provisions: [
    {
      id: '0',
      category: 'ANVWKS',
      name: 'Week 0',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: false
    }
  ]
}

export const PAWeeksUSABadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: []
}