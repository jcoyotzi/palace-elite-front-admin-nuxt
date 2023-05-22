export interface ContractByPromotion {
  RoomType: string
  IsNoRefundable: boolean
  Hotel: string
  Category: number
  CostType: string
  RCDetail: RCDetail[]
  OTASContract: OTASContract[]
  CustomRoomType: null
}

export interface OTASContract {
  _Recnum: number
  _RateCode: string
  _Name: string
  _Percent: number
  _Market: string
  _Hotel: string
  _TotalReservation: number
  _RateCodeRollOver: string
  _BWRollOverBegin: Date
  _BWRollOverEnd: Date
  _TWRollOverBegin: Date
  _TWRollOverEnd: Date
}

export interface RCDetail {
  Message: null
  PublicDesc: number
  NoRefund: number
  RmfolioRc: RmfolioRC[]
  RealDesc: number
  bookingWindow: Date
  ContractPromotion: ContractPromotion[]
  ProvisionId: string
  IsLockOff: boolean
}

export interface ContractPromotion {
  _promo: string
  _arrvDate: Date
  _deptDate: Date
  _nights: string
  _discount: string
  _contract: string
  _refundablediscount: number
  _realdiscount: number
  _publicdiscount: number
  _ratetype: string
  _reservationcosttype: string
  _name: string
  _isrefundable: boolean
  _clevercode: string
}

export interface RmfolioRC {
  Recnum: number
  Hotel: string
  Folio: number
  Application: string
  Company: number
  RateCode: string
  Arv_date: Date
  Depart_dt: Date
  Rate: number
  ProvisionID: string
  ProvisionFol: number
  AmountOutOfSeason: number
  AmountThanksGivingDay: number
  AmountWeek52: number
  AmountResortAccess: number
  AmountChargeUpgrade: number
  AditionalCharges: number
  GolfRate: number
  Deposit: number
  HasChanged: boolean
  IsDeleted: boolean
  IsImperialWeek: boolean
  Contract: string
  Agency: string
  Category: string
  Market: string
  RateType: string
  IsPackExtra: boolean
  PriceWithoutDiscount: number
  Discount: number
  RateOpera: number
  AdditionalCost: number
  RateOperaUpdated: number
  PackageCode: string
  PackageUnitAmount: number
  PromotionCode: string
  Description: string
  FactorValue: number
  IdRateFactorType: string
  AmountPromotion: number
  RateCodeCLV: string
  CleverCodeBase: string
  HasError: boolean
  Exception: null
  Layer: number
  CostDayResidenceFee: number
  FeeCID: number
  PromotionList: PromotionList[]
  CreationDate: Date
}

export interface PromotionList {
  _Recnum: number
  _RecnumRcDetail: number
  _Folio: number
  _Hotel: string
  _promotion_code: string
  _description: string
  _factor_value: number
  _idrate_factor_type: string
  _amount_promotion: number
  _idrate_promotion: number
  _creation_date: Date
  _IsDelete: boolean
  _promotion_type: string
  _pax_type: string
}
