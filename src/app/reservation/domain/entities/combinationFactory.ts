export function CombinationFactory() {
  return {
    Idcombination: 0,
    ProvisionId: '',
    ProvisionToChange: '',
    ProvisionToChangeComplement: '',
    TotalProvisToChange: 0,
    TotalProvisToChangeComplement: 0,
    TypeCombination: '',
    AdditionalCost: 0,
    GolfType: 'AINC',
    ULGAMOUNT: 0,
    TypeProvision: '',
    PromotionId: 0
  }
}

export function Combinations() {
  return [CombinationFactory(), CombinationFactory(), CombinationFactory(), CombinationFactory()]
}
