/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 6:48:19
 *
 */

import {
  ProvisionAniversaryRulePayload,
  ProvitionOptionType
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const PAWeeksAndNightsUKHappiPathMock: ProvisionAniversaryRulePayload = {
  market: 'UK',
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
    },
    {
      id: '1',
      category: 'ANVWKS',
      name: 'Week 1',
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
      category: 'NOCHE',
      name: null,
      nights: [

        {
          name: 'Night 1',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '3',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 2',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '4',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 3',
          validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 4,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '5',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 4',
          validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 5,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '6',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 5',
          validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 5,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 5',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '8',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 7,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 7',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 7,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '10',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 7,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '11',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 9',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 7,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
  ]
}

export const PAWeeksAndNightsUKBadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'UK',
  nightsToBook: 8,
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
    },
    {
      id: '1',
      category: 'ANVWKS',
      name: 'Week 1',
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
      category: 'NOCHE',
      name: null,
      nights: [

        {
          name: 'Night 1',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '3',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 2',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '4',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 3',
          validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 4,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '5',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 4',
          validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 5,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
  ]
}

export const PAWeeksAndNightsUKBadPathBMock: ProvisionAniversaryRulePayload = {
  market: 'UK',
  nightsToBook: 8,
  hotelHasGolf: false,
  provisions: [
    {
      id: '2',
      category: 'NOCHE',
      name: null,
      nights: [

        {
          name: 'Night 1',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '3',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 2',
          validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 3,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '4',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 3',
          validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 4,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
    {
      id: '5',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 4',
          validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 5,
      type: ProvitionOptionType.Night,
      hasGolf: false
    },
  ]
}
