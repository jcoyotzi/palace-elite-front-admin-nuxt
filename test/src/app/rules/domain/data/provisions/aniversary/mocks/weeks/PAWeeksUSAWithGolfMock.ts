/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 7:8:3
 *
 */

import {
  ProvisionAniversaryRulePayload,
  ProvitionOptionType
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const PAWeeksUSAWithGolfHappiPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
    }
  ]
}

export const PAWeeksUSAWithGolfHappiPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
    },
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

export const PAWeeksUSAWithGolfHappiPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 15,
  hotelHasGolf: true,
  provisions: [
    {
      id: '0',
      category: 'ANVWKS',
      name: 'Week 0 Golf',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: true
    },
    {
      id: '1',
      category: 'ANVWKS',
      name: 'Week 1 Golf',
      nights: null,
      validTo: {
        date: '2022-11-19T00:00:00',
        human: 'Nov 19, 2022',
      },
      daysToExpire: 4,
      type: ProvitionOptionType.Week,
      hasGolf: true
    },

    {
      id: '2',
      category: 'ANVWKS',
      name: 'Week 2',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: false
    },
    {
      id: '3',
      category: 'ANVWKS',
      name: 'Week 3',
      nights: null,
      validTo: {
        date: '2022-11-19T00:00:00',
        human: 'Nov 19, 2022',
      },
      daysToExpire: 4,
      type: ProvitionOptionType.Week,
      hasGolf: false
    }
  ]
}

export const PAWeeksUSAWithGolfBadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
    }
  ]
}

export const PAWeeksUSAWithGolfBadPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
    },
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

export const PAWeeksUSAWithGolfBadPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 15,
  hotelHasGolf: true,
  provisions: [
    {
      id: '0',
      category: 'ANVWKS',
      name: 'Week 0 Golf',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: true
    },
    {
      id: '1',
      category: 'ANVWKS',
      name: 'Week 1 Golf',
      nights: null,
      validTo: {
        date: '2022-11-19T00:00:00',
        human: 'Nov 19, 2022',
      },
      daysToExpire: 4,
      type: ProvitionOptionType.Week,
      hasGolf: true
    },

    {
      id: '2',
      category: 'ANVWKS',
      name: 'Week 2',
      nights: null,
      validTo: {
        date: '2022-11-18T00:00:00',
        human: 'Nov 18, 2022',
      },
      daysToExpire: 3,
      type: ProvitionOptionType.Week,
      hasGolf: false
    },
    {
      id: '3',
      category: 'ANVWKS',
      name: 'Week 3',
      nights: null,
      validTo: {
        date: '2022-11-19T00:00:00',
        human: 'Nov 19, 2022',
      },
      daysToExpire: 4,
      type: ProvitionOptionType.Week,
      hasGolf: false
    }
  ]
}
