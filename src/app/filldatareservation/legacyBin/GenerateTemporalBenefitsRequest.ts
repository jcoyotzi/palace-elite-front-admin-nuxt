import {GetTemporalBenefitByCode} from './GetTemporalBenefitByCode'

export function GenerateTemporalBenefitsRequest(
  _MemberPromotionEngine: any,
  _TemporalBenefitSelected: any
) {
  var request = new Array()
  try {
    if (_TemporalBenefitSelected[0].length > 0) {
      //Recorremos los elementos
      _TemporalBenefitSelected[0].forEach((element: any) => {
        /*
        var data = {
          'IdBenefit' : element
        }*/
        var data = GetTemporalBenefitByCode(_MemberPromotionEngine, element)
        request.push(data)
      })
    }
    return request
  } catch (error) {
    return request
  }
}
