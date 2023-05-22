import * as policies from '../maximumStay/index'

export const stages = [
  {
    policies: [
      policies.PresidentialSuiteMarketUKMaximumStay,
      policies.PresidentialSuiteMarketNationalMaximumStay,
      policies.PresidentialSuiteMarketUSAMaximumStay
    ]
  }
]
