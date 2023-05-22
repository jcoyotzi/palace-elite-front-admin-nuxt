/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 8:31:50
 *
 */

import {
  ProvisionAniversaryRulePayload,
  ProvitionOptionType
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const PANightsUSAWithGolfHappiPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },
  ]
}

export const PANightsUSAWithGolfHappiPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

    {
      id: '22',
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
      id: '23',
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
      id: '24',
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
      id: '25',
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
      id: '26',
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
      id: '27',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
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
      id: '28',
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
  ]
}

export const PANightsUSAWithGolfHappiPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 8,
  hotelHasGolf: true,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '11',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 11',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '12',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 12',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

  ]
}

export const PANightsUSAWithGolfHappiPathDMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 8,
  hotelHasGolf: true,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '11',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 11',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '12',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 12',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

    {
      id: '22',
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
      id: '23',
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
      id: '24',
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
      id: '25',
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
      id: '26',
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
      id: '27',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
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
      id: '28',
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
      id: '29',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 29',
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
      id: '30',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 30',
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
      id: '31',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 31',
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


export const PANightsUSAWithGolfBadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },
  ]
}

export const PANightsUSAWithGolfBadPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

    {
      id: '22',
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
      id: '23',
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
      id: '24',
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
      id: '25',
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
      id: '26',
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
      id: '27',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
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
      id: '28',
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
  ]
}

export const PANightsUSAWithGolfBadPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '11',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 11',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '12',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 12',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

  ]
}

export const PANightsUSAWithGolfBadPathDMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
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
      hasGolf: true
    },
    {
      id: '7',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
          validTo: {
            date: '2022-11-21T00:00:00',
            human: 'Nov 21, 2022',
          }
        }
      ],
      validTo: null,
      daysToExpire: 6,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '8',
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
      hasGolf: true
    },
    {
      id: '9',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 8',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '11',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 11',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '12',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 12',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Night,
      hasGolf: true
    },
    {
      id: '10',
      category: 'PEPA_PIG',
      name: null,
      nights: [
        {
          name: 'Unknown 666',
          validTo: {
            date: '2022-11-22T00:00:00',
            human: 'Nov 22, 2024',
          }
        }
      ],
      validTo: null,
      daysToExpire: 737,
      type: ProvitionOptionType.Unkown,
      hasGolf: true
    },

    {
      id: '22',
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
      id: '23',
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
      id: '24',
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
      id: '25',
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
      id: '26',
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
      id: '27',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 6',
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
      id: '28',
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
      id: '29',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 29',
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
      id: '30',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 30',
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
      id: '31',
      category: 'NOCHE',
      name: null,
      nights: [
        {
          name: 'Night 31',
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
