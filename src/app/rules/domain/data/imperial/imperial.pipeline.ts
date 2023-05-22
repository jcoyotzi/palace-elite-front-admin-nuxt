import * as policies from './index'
export const stages = [
  {
    policies: [],
    expressions: [
      {
        hasExpired: 'expirationDate',
      }
    ]
  },
  {
    policies: [policies.imperialPolicy]
  }
]
