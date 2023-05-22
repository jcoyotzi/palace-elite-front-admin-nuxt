import {RmFolioRcDetail} from '../domain/RmFolioRcDetail'
import {AgregarDias} from './AgregarDias'
import {GetRateCodeBase} from './GetRateCodeBase'
import {getRateCode} from './getRateCode'
import {getRateCodeModify} from './getRateCodeModify'
import {SumCostPerDay} from './SumCostPerDay'

export function SetRatesRmFolioRC(Context: {
  Rm_type: string
  selectedRoom: string
  Index: number
  Nights: number
  ArvDate: Date
  Isnational: boolean
  _RateForSecondFamilyRoom: any
  _currentRateInfo: any
  callback: any
  ReservationCostType: any
  market: any
  _MultiSelectedProvision: any
  _ReservationsRateCodes: any
  selectedRoomRefundable: boolean
  isProvisionalReservation: boolean
}) {
  //Index:Context.Index, Rm_type : reserva.Rm_type

  var Index = Context.Index
  var CurrentRoom = Context.selectedRoom
  if (Context != undefined) {
    Index = Context.Index != undefined ? Context.Index : 1
    CurrentRoom = Context.Rm_type != undefined ? Context.Rm_type : Context.selectedRoom
  }

  var ratesSet = new RmFolioRcDetail()
  var FolioDetails = []

  for (let i = 0; i < Context.Nights; i++) {
    ratesSet.Arv_date = Context.ArvDate
    ratesSet.Depart_dt = Context.ArvDate
    //ratesSet.RateCode = GetRateCodeBase();
    ratesSet.RateCode = 'SOCIOS'
    ratesSet.CleverCodeBase = GetRateCodeBase(Context.ReservationCostType, Context.market)
    ratesSet.RateCodeCLV = GetRateCodeBase(Context.ReservationCostType, Context.market)
    ratesSet.Rate = 0
    ratesSet.Deposit = 0
    //ratesSet.Agency =  GetAgency(1);
    ratesSet.Agency = Context.Isnational ? 'M/PR-ELI' : 'PR-ELITE'
    ratesSet.Category = 'EP'
    ratesSet.AmountResortAccess = 0
    ratesSet.AmountWeek52 = 0
    ratesSet.AmountOutOfSeason = 0
    ratesSet.AmountThanksGivingDay = 0
    ratesSet.AmountChargeUpgrade = 0
    ratesSet.AmountChargeUpgrade = 0
    ratesSet.AditionalCharges = 0
    ratesSet.IsPackExtra = false
    ratesSet.Market = ''
    ratesSet.RateType = ''
    FolioDetails.push(ratesSet)
    Context.ArvDate = AgregarDias(Context.ArvDate, 1) // TODO
  }
  var CodesRatesItem = []
  var CodeRatesArrayTemp = []
  //Si no se obtubo la tarifa de la segunda parte, tomamos los genericos
  if (Context._RateForSecondFamilyRoom == null) {
    CodesRatesItem = getRateCode(FolioDetails, {Index: 2})
  } else {
    if (Context._RateForSecondFamilyRoom[0].RmfolioRc == null) {
      CodesRatesItem = getRateCode(FolioDetails, {Index: 2})
    } else {
      CodesRatesItem = getRateCodeModify(Context._RateForSecondFamilyRoom, {Index: 2})
    }
  }

  CodeRatesArrayTemp = SumCostPerDay(CodesRatesItem)
  Context.callback(CodeRatesArrayTemp)
  // TODO:
  // _currentRateInfo[1] = CodeRatesArrayTemp;

  var RoomDefined = ''

  if (Context.isProvisionalReservation) {
    RoomDefined = Context.selectedRoomRefundable
      ? CurrentRoom +
        (Context._MultiSelectedProvision[Index - 1] != undefined &&
        Context._MultiSelectedProvision[Index - 1].TYPE != undefined &&
        Context._MultiSelectedProvision[Index - 1].TYPE != ''
          ? Context._MultiSelectedProvision[Index - 1].TYPE
          : '')
      : CurrentRoom + '_NR' + Context._ReservationsRateCodes
  } else {
    RoomDefined = Context.selectedRoomRefundable ? CurrentRoom : CurrentRoom + '_NR'
  }
  Context._ReservationsRateCodes[RoomDefined] == undefined
    ? (Context._ReservationsRateCodes[RoomDefined] = new Array())
    : ''
  Context._ReservationsRateCodes[RoomDefined][0] = CodeRatesArrayTemp[0].Details
}
