import * as policies from '../estanciasMinimas/index'

export const stages = [
  {
    policies: [
      policies.StandardSuite,
      policies.WithMinimal,
      policies.SpecialSuiteMarketUSA,
      policies.SpecialSuiteMarketNational,
      policies.SpecialSuiteMarketUK,
      policies.PresidentialSuiteMarketUSA,
      policies.PresidentialSuiteMarketNational,
      policies.PresidentialSuiteMarketUK,
      policies.ResidenceSuiteMarketUSA,
      policies.ResidenceSuiteMarketNational,
      policies.ResidenceSuiteMarketUK,
      policies.VillaSuiteMarketUSA,
      policies.VillaSuiteMarketNational,
      policies.VillaSuiteMarketUK,
      policies.ReferralMarketUSA,
      policies.ReferralMarketNational,
      policies.ReferralMarketUK
    ]
  }
]
