import {FixDatesInObject} from './FixDatesInObject'
import moment from 'moment'
import {RmFolioRcDetail} from '../domain/RmFolioRcDetail'

export function getRateCodeModify(Codes: any, Context: any) {
  //var RateCodes =[];
  var Promotions: any = []

  Codes.forEach(function (i: any, Code: any) {
    var rcInCodes: any = []

    Code.RmfolioRc.forEach(function (ratecode: any) {
      rcInCodes.push(FixDatesInObject(ratecode))
    })
    Promotions.push(rcInCodes)
  })

  var ratesSet: any = new RmFolioRcDetail()
  var ratesSetArray = [],
    ratesDetails = []

  //Realizamos un ciclo para las promociones recibidas
  for (let r = 0; r < Promotions.length; r++) {
    //Guardamos el contenido de rmfoliorc de la promo
    var RateCodes = Promotions[r]
    if (RateCodes != undefined) {
      //Recorremos los elementos de RmfolioRc
      for (let i = 0; i < RateCodes.length; i++) {
        //Dejamos la logica anterior
        if (RateCodes.length >= 1) {
          //Siempre primer elemento, asigna fecha de llegada
          if (i == 0) {
            //ratesSet.From = RateCodes[i].Arv_date;
            ratesSet.From = new Date(moment(RateCodes[i].Arv_date).format('YYYY/MM/DD'))
            //ratesSet.Code = RateCodes[i].RateCode;
            //ratesSet.RateCode = RateCodes[i].RateCode;
          }

          if (ratesSet.Code != undefined) {
            if (ratesSet.Code != RateCodes[i].RateCodeCLV) {
              ratesSet.Details = ratesDetails
              ratesSet.Agency = RateCodes[i].Agency
              ratesSet.Market = RateCodes[i].Market
              ratesSet.RateType = RateCodes[i].RateType
              if (RateCodes[i].Category != '' && typeof RateCodes[i].Category != 'undefined')
                ratesSet.Category = RateCodes[i].Category
              else ratesSet.Category = 'S/CATEGORY'

              ratesSetArray.push(ratesSet)
              ratesSet = {}
              ratesDetails = []
              //ratesSet.From = RateCodes[i].Arv_date;
              ratesSet.From = new Date(moment(RateCodes[i].Arv_date).format('YYYY/MM/DD'))
              ratesSet.Deposit = RateCodes[i].Deposit
            }
          } else {
            ratesSet.Code = RateCodes[i].RateCodeCLV
            ratesSet.RateCode = RateCodes[i].RateCode
            ratesSet.CleverCodeBase = RateCodes[i].CleverCodeBase
            ratesSet.RateCodeCLV = RateCodes[i].RateCodeCLV
            //ratesSet.From = RateCodes[i].Arv_date;
            ratesSet.Deposit = RateCodes[i].Deposit
          }
        } else {
          ratesSet.Code = RateCodes[i].RateCodeCLV
          ratesSet.RateCode = RateCodes[i].RateCode
          ratesSet.CleverCodeBase = RateCodes[i].CleverCodeBase
          ratesSet.RateCodeCLV = RateCodes[i].RateCodeCLV
          //ratesSet.From = RateCodes[i].Arv_date;
        }

        //ratesSet.To = RateCodes[i].Depart_dt;
        ratesSet.To = new Date(moment(RateCodes[i].Depart_dt).format('YYYY/MM/DD'))
        ratesSet.Code = RateCodes[i].RateCodeCLV
        ratesSet.RateCode = RateCodes[i].RateCode
        ratesSet.CleverCodeBase = RateCodes[i].CleverCodeBase
        ratesSet.RateCodeCLV = RateCodes[i].RateCodeCLV
        ratesSet.Deposit = RateCodes[i].Deposit
        ratesSet.Agency = RateCodes[i].Agency
        ratesSet.Market = RateCodes[i].Market
        ratesSet.RateType = RateCodes[i].RateType
        if (RateCodes[i].Category != '' && typeof RateCodes[i].Category != 'undefined')
          ratesSet.Category = RateCodes[i].Category
        else ratesSet.Category = 'S/CATEGORY'

        if (RateCodes[i].PromotionList != undefined && RateCodes[i].PromotionList != null)
          RateCodes[i].PromotionList = Object.values(RateCodes[i].PromotionList)

        ratesDetails.push(RateCodes[i])
      }
    }

    ratesSet.Details = ratesDetails
    ratesSetArray.push(ratesSet)
    ratesSet = {}
    ratesDetails = []
  }
  //Devuelve un array con promociones de tarifas
  return ratesSetArray
}
