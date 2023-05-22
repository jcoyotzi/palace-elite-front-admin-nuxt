export interface EliteProductRuleEntity {
  events?: SuitedEliteProduct
}

export interface SuitedEliteProduct {
  compliance: boolean
  message: string
  code: string
  type: string
}

export enum EliteProductCodes {
  allInclusiveCodeWeeks = 'AIWK', // ALL INCLUSIVE WEEKS
  paidGolfCodeWeeks = 'ULGAPWK', // UNLIMITED GOLF WITH ADDITIONAL PAYMENT WEEKS
  freeGolfCodeWeeks = 'ULGHFWK', //UNLIMITED GOLF MEMBERS AND BENEFICIARIES WEEKS
  allInclusiveCodeNights = 'AING', //ALL INCLUSIVE NIGHTS
  paidGolfCodeNights = 'ULGAPNG', // UNLIMITED GOLF WITH ADDITIONAL PAYMENT NIGHTS
  freeGolfCodeNights = 'ULGHFNG' //UNLIMITED GOLF MEMBERS AND BENEFICIARIES NIGHTS
}

export interface EliteProductFact {
  hotel: string
  reserveType: string
  AIWK: number // ALL INCLUSIVE WEEKS
  ULGAPWK: number // UNLIMITED GOLF WITH ADDITIONAL PAYMENT WEEKS
  ULGHFWK: number //UNLIMITED GOLF MEMBERS AND BENEFICIARIES WEEKS
  AING: number // ALL INCLUSIVE NIGHTS
  ULGAPNG: number // UNLIMITED GOLF WITH ADDITIONAL PAYMENT NIGHTS
  ULGHFNG: number //UNLIMITED GOLF MEMBERS AND BENEFICIARIES NIGHTS
  travelWithBeneficiary: boolean
  selectedGolfOption: boolean
  nights: number
}

export interface EliteProductRuleRunRequest {
  fact: EliteProductFact
  policies: Policies | Array<Policies>
}

export interface Policies {
  conditions: {
    any: any[]
  }
  event: {
    type: string
    params: {
      policy: {
        compliance: boolean
        message: string
        code: string
      }
    }
  }
}
