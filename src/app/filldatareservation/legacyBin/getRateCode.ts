import {FixDatesInObject} from './FixDatesInObject'
import moment from 'moment'
import {RmFolioRcDetail} from '../domain/RmFolioRcDetail'

export function getRateCode(Codes: any, Context: any) {
  var RateCodes: any = []

  Codes.forEach(function (Code: any) {
    RateCodes.push(FixDatesInObject(Code))
  })

  var ratesSet = new RmFolioRcDetail()
  var ratesSetArray = [],
    ratesDetails = []

  for (let i = 0; i < RateCodes.length; i++) {
    if (typeof ratesSet.Code == 'undefined') {
      //ratesSet.From = RateCodes[i].Arv_date;
      ratesSet.From = new Date(moment(RateCodes[i].Arv_date).format('YYYY/MM/DD'))
      ratesSet.Code = RateCodes[i].RateCodeCLV
      ratesSet.RateCode = RateCodes[i].RateCode
      ratesSet.CleverCodeBase = RateCodes[i].CleverCodeBase
      ratesSet.RateCodeCLV = RateCodes[i].RateCodeCLV
      ratesSet.Deposit = 0
    }

    //ratesSet.To = RateCodes[i].Depart_dt;
    ratesSet.To = new Date(moment(RateCodes[i].Depart_dt).format('YYYY/MM/DD'))

    ratesSet.Deposit += RateCodes[i].Rate

    ratesSet.Agency = RateCodes[i].Agency
    ratesSet.Market = RateCodes[i].Market
    ratesSet.RateType = RateCodes[i].RateType

    if (RateCodes[i].Category != '' && typeof RateCodes[i].Category != 'undefined')
      ratesSet.Category = RateCodes[i].Category //Imperiales ya devuelve la categoria
    else ratesSet.Category = 'S/CATEGORY'

    ratesDetails.push(RateCodes[i])
  }
  ratesSet.Details = ratesDetails
  ratesSetArray.push(ratesSet)
  return ratesSetArray
}
