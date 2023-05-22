import {Provision} from './provision'
import {GolfType} from './golfType'

export function provisionFactory(): Provision {
  return {
    AdditionalCost: 0,
    GolfType: GolfType.WULG,
    Idcombination: 0,
    PromotionId: 0,
    ProvisionId: '',
    ProvisionToChange: '',
    ProvisionToChangeComplement: '',
    TotalProvisToChange: 0,
    TotalProvisToChangeComplement: 0,
    TypeCombination: '',
    TypeProvision: '',
    ULGAMOUNT: 0
  }
}
