export function GetTemporalBenefitByCode(_MemberPromotionsEngine: any, Code: any) {
  //Recorremos
  var temporal_benefit = undefined
  if (_MemberPromotionsEngine.TemporalBenefits.length > 0) {
    temporal_benefit = _MemberPromotionsEngine.TemporalBenefits.filter(
      (x: any) => x.IdBenefit == Code
    )[0]
  }
  return temporal_benefit
}
