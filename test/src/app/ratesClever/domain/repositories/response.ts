/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 10 / 13 3:16:48
 *
 */

import {RoomRatesCleverResponse} from 'app/ratesClever/domain/entities/roomRatesClever'

export const r0: RoomRatesCleverResponse = {
  data: {
    rooms: [
      {
        roomCode: 'SUP',
        dailyRate: [
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-06T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-07T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-08T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-09T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-10T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-11T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-12T00:00:00'
          }
        ],
        category: [
          {
            code: 'INCENTIVA',
            rate: -1,
            regularRate: -1
          },
          {
            code: 'PREFERENCIAL',
            rate: 2644.53,
            regularRate: 0
          }
        ]
      },
      {
        roomCode: 'HUP',
        dailyRate: [
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-06T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-07T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-08T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-09T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-10T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-11T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-12T00:00:00'
          }
        ],
        category: [
          {
            code: 'INCENTIVA',
            rate: 898989,
            regularRate: 999999
          },
          {
            code: 'PREFERENCIAL',
            rate: 2644.53,
            regularRate: 0
          }
        ]
      }
    ]
  },
  errors: null,
  warnings: null
}

export const r1: RoomRatesCleverResponse = {
  data: {
    rooms: [
      {
        roomCode: 'SUP',
        dailyRate: [
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-06T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-07T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-08T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-09T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-10T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-11T00:00:00'
          },
          {
            rate: 377.79,
            regularRate: 0,
            date: '2023-07-12T00:00:00'
          }
        ],
        category: [
          {
            code: 'INCENTIVA NON',
            rate: 10000,
            regularRate: -1
          },
          {
            code: 'PREFERENCIAL NON',
            rate: 2644.53,
            regularRate: 0
          }
        ]
      }
    ]
  },
  errors: null,
  warnings: null
}
