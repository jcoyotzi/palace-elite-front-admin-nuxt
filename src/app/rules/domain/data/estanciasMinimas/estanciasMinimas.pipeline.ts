import * as policies from '../estanciasMinimas/index'

export const stages = [
  {
    policies: [
      policies.StandardSuite,
      policies.StandardSuiteWeekProvision,
      // policies.WithMinimal,
      policies.SpecialSuiteMarketUSA,
      policies.SpecialSuiteMarketNational,
      policies.SpecialSuiteMarketNationalWeekProvision,
      policies.SpecialSuiteMarketUK,
      policies.PresidentialSuiteMarketUSA,
      policies.PresidentialSuiteMarketNational,
      policies.PresidentialSuiteMarketNationalWeekProvision,
      policies.PresidentialSuiteMarketUK,
      policies.ResidenceSuiteMarketUSA,
      policies.ResidenceSuiteMarketNational,
      policies.ResidenceSuiteMarketUK,
      policies.VillaSuiteMarketUSA,
      policies.VillaSuiteMarketNational,
      policies.VillaSuiteMarketUK,
      policies.ReferralMarketUSA,
      policies.ReferralMarketNational,
      policies.ReferralMarketUK,
      // agregando minimals by contract
      policies.SpecialSuiteMarketUSAWithMinimalStay,
      policies.SpecialSuiteMarketUSAWithMinimalStayWeekProvision,
      policies.SpecialSuiteMarketNationalWithMinimalStay,
      policies.SpecialSuiteMarketNationalWeekProvisionWithMinimalStay,
      policies.SpecialSuiteMarketUKWithMinimalStay,
      policies.PresidentialSuiteMarketUSAWithMinimalStay,
      policies.PresidentialSuiteMarketUSAWeekProvisionWithMinimalStay,
      policies.PresidentialSuiteMarketNationalWithMinimalStay,
      policies.PresidentialSuiteMarketNationalWeekProvisionWithMinimalStay,
      policies.PresidentialSuiteMarketUKWithMinimalStay,
      policies.PresidentialSuiteMarketUKWeekProvisionWithMinimalStay,
      policies.ReferralMarketNationalWithAuth,
      policies.ReferralMarketUKWithAuth,
      policies.ReferralMarketUSAWithAuth
    ]
  }
]
