interface LegacyId {
  $id: string
}

interface EntityKeyValue {
  Key: string
  Type: string
  Value: string
}

interface EntityKey extends LegacyId {
  EntitySetName: string
  EntityContainerName: string
  EntityKeyValues: EntityKeyValue[]
}

export interface ReferralProgram extends LegacyId {
  recnum: number
  market: string
  year: number
  fee: number
  ent_date: string
  ent_user: string
  status: string
  feeInternet: number
  EntityKey: EntityKey
}

export interface ReferralPromotion {
  Company: number
  Application: string
  Promotion: number
  Quantity: number
  Benefit: string
  NumberOfCouples: number
  Redeemed: boolean
  DaysByRegularStay: number
  DaysByReferralRegularStay: number
  DaysByReferralMinimumStay: number
  DaysForAward: number
}
