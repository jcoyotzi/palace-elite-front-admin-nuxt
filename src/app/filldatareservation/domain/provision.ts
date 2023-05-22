import {GolfType} from './golfType'

export interface Provision {
  Idcombination: number
  ProvisionId: string
  ProvisionToChange: string
  ProvisionToChangeComplement: string
  TotalProvisToChange: number
  TotalProvisToChangeComplement: number
  TypeCombination: string
  AdditionalCost: number
  GolfType: GolfType
  ULGAMOUNT: number
  TypeProvision: string
  PromotionId: number
}
