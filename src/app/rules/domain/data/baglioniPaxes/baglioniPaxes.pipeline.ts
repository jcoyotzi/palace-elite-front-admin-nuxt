import * as policies from './index'

export const baglioniPaxes = [
  /*
  {
    policies: [],
    expressions: [
      {
        hasExpired: 'expirationDate'
      }
    ]
  },
  */
  {
    policies: [
      policies.infantsMinor2Policy,
      policies.infantsMinor3Policy,
      policies.childsMinor12Policy,
      policies.childsMinor16Policy,
      policies.PalacePolicy
    ]
  }
  /*
  {
    policies: [],
    rules: [policies.infantsRule]
  }
  */
]
