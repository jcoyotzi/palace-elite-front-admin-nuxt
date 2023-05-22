/* eslint-disable no-use-before-define */

export interface GetBookingDto {
  data?: Data
  errors?: any
  warnings?: any
}
export interface Data {
  _Reservation: Reservation
  _Balance: number
  _Cia: string
  _IsIHR: boolean
}

export interface Reservation {
  Recnum: number
  Hotel: string
  Hotel_Name: string
  Folio: number
  Last_name: string
  First_name: string
  Type: string
  Guest_cd: string
  Mail_name: string
  Resv_org: string
  Group_cd: string
  Group_desc: string
  Group: string
  Agency_cd: string
  Agency_name: string
  Ded_comm: string
  Mkt_seg: string
  Company: string
  Member: string
  Geo_seg: string
  Nationality: string
  Id: string
  Arv_date: string
  Nights: number
  Depart_dt: string
  Rooms: number
  Rm_type: string
  Rm_desc: string
  Room: string
  Share: string
  Rel_folio: number
  Rate: number
  Adult: number
  Child: number
  Guar: string
  Pay_opt: string
  Credit_lmt: number
  Lmt_date: string
  Address: string
  City: string
  State: string
  Country: string
  Zip: string
  Phone: string
  Co_address: string
  Co_city: string
  Co_state: string
  Co_country: string
  Co_zip: string
  Co_phone: string
  Deposit: number
  Lst_pmt: string
  Balance: number
  Status: string
  Time_in: string
  Chk_out_dt: string
  Time_out: string
  Resv_date: string
  Ent_date: string
  Ent_oper: string
  Ent_time: string
  Ent_term: string
  Chg_date: string
  Chg_oper: string
  Chg_time: string
  Chg_term: string
  Co: number
  Bill_to: BillTo
  Contract: string
  Cc: string
  Cc_exp: string
  Co_fax: string
  Co_id: string
  Kid: number
  Last_rm_upd: string
  Bill_freq: string
  All_incl: string
  Vouch: string
  Grat_bell_cd: string
  Grat_bell_amt: number
  Grat_bell_kids: string
  Chg_cd1: string
  Chg_amt1: number
  Chg_bill1: string
  Chg_cd2: string
  Chg_amt2: number
  Chg_bill2: string
  Chg_cd3: string
  Chg_amt3: number
  Chg_bill3: string
  Pay_cd1: string
  Pay_amt1: number
  Pay_bill1: string
  Pay_cd2: string
  Pay_amt2: number
  Pay_bill2: string
  Pay_cd3: string
  Pay_amt3: number
  Pay_bill3: string
  Grat_bell_bill: string
  Cnx_cd: string
  Rate1: number
  Rate1_from: string
  Rate1_to: string
  Rate2: number
  Rate2_from: string
  Rate2_to: string
  Rate3: number
  Rate3_from: string
  Rate3_to: string
  Arv_chg_upd: string
  Rm_assign: number
  Cnx_date: string
  Cnx_time: string
  Cfm_date: string
  Mod_date: string
  Mod_oper: string
  Mod_cd: string
  Pre_pay: string
  Cnx_oper: string
  Ar_type: string
  Ar_co: number
  Ar_cust: string
  Chkin_date: string
  Refund: number
  Iata: string
  Co_dedcomm: string
  Co_comm: number
  Co_addr2: string
  Orig_arv_date: string
  Ref: string
  Year: number
  Week: number
  Lang: string
  Points: number
  Mult_resv: string
  Club_stat: string
  Ai_code: string
  Extra: string
  Pts_upd: string
  Prev_room: string
  Trf_date: string
  Trf_oper: string
  Trf_time: string
  Trf_term: string
  Grat_maid: number
  Ack_date: string
  Cfm_prt_dt: string
  Agency_resv: string
  No_cnx: string
  Rfcgpo: number
  Bed: string
  Fol_cta: number
  Baby: number
  Xtra_adu: number
  Xtra_chd: number
  Xtra_kid: number
  Xtra_ctk: string
  Sharef: string
  Share2: string
  Sharef2: string
  Share3: string
  Sharef3: string
  ContractCategory: string
  ContractCategoryId: number
  Promo_cd: string
  Extension: Extension
  RateCodeDetails: RateCodeDetail[]
  Companions: Companion[]
  RateCodeRsvPromotion: RateCodeRsvPromotion[]
  RateType: string
  ChristmasBonus: boolean
  ReservationBonoValid: null
  ExpirationDate: string
  Documents: any[]
  FreeKids: boolean
  PromoReferral: null
  LogSpecific: null
  ExtensionRsv: any[]
  IsLookOff: boolean
  IsModificable: boolean
  PromotionFree: ReservationPromotionFree
  RsvPromotionExchange: RsvPromotionExchange
  listRsvExchangeForFree: null
  ListRsvExchangeUpdate: null
  ListTemporalBenefit: null
  CreditCardInfo: null
  RoomInfo: null
  ReferidosBonpel: null
  ListTemporalBenefits: any[]
  RsvTemporalBenefits: any[]
  PromotionByRsv: PromotionByRsv[]
  PromotionsInfo: PromotionsInfo[]
  CodePackages: null
  Rewards: Rewards
  AdditionalBenefitSelected: any[]
  PromotionByRsvBloqued: any[]
}

export enum BillTo {
  A = 'A'
}

export interface Companion {
  Recnum: number
  Hotel: string
  IdProfile: string
  Type: string
  Folio: string
  _recnum_profile: number
  company: number
  application: string
  name: string
  idrelacionclub: number
  relationship: number
  idprofileopera: string
  statusmembresia: BillTo
  membertype: string
  memberlevel: string
  statusprofile: BillTo
  firstname: string
  lastname: string
  IsNational: boolean
  idprofileoperajc: string
  Zip: string
  City: string
  Country: string
  Language: string
  Tel: string
  email: string
  relationdescription: string
  InReferral: number
  confirmationemail: number
  password: string
  MemberProfileImage: string
  resetpassword: number
  SocialSecurityNumber: string
}

export interface Extension {
  Hotel: string
  Folio: number
  Company: number
  Application: string
  AditionalCharges: number
  GolfRateType: string
  GolfRate: number
  GolfRate1: number
  GolfRateFrom1: string
  GolfRateTo1: string
  GolfRate2: number
  GolfRateFrom2: string
  GolfRateTo2: string
  GolfRate3: number
  GolfRateFrom3: string
  GolfRateTo3: string
  IsUSAMarket: boolean
  StatusOpera: string
  RecnumDiamondPromotion: number
  MarketFee: number
  AmountThankGiving: number
  AmountOutOfSeason: number
  MarketExtra: string
  RateTypeExtra: string
  IsUpSell: boolean
  Refundable: boolean
  FolioOprShare: string
  ProvisionToChange: string
  TotalProvisToChange: number
  RsvCategory: number
  AdditionalCost: number
  TypeCombination: string
  IsInhouse: boolean
  TemporalBenefit: string
  RsvPromotion: string
  ProvisionToChangeComplement: string
  TotalProvisToChangeComplement: number
  TypeGolf: string
  ProvitionsOrigen: null
  TypeRW: string
  FreeUpGrade: boolean
  TypeBooking: number
  ProductType: string
  OriginRsv: string
  RsvPromotionId: number
  IsLockOff: string
  FeeResidence: number
  PreArvDate: string
  IsCID: boolean
  FeeCID: number
  PendingPosting: boolean
  PendingPostingDate: string
}

export interface PromotionByRsv {
  Recnum: number
  Company: number
  Application: number
  CodePromo: string
  RecnumPromo: number
  Hotel: string
  Folio: string
  InsertedAt: string
  InsertUser: string
  UpdatedAt: string
  UpdateUser: string
  Status: number
  PromotionsPackage: null
  AdditionalBenefitSelected: null
  PromotionByRsvBloqued: null
}

export interface ReservationPromotionFree {
  Recnum: number
  Name: string
  PromotionBegin: string
  PromotionEnd: string
  Status: boolean
  TotalExchange: number
  RsvExchangeRequired: number
  TotalFree: number
  TemplateContent: any[]
  PromotionExchange: PromotionExchange
  PromotionFree: PromotionFreePromotionFree
  Markets: any[]
  Presale: any[]
  Blackout: any[]
}

export interface PromotionExchange {
  Recnum: number
  RsvPromotionConfigCode: string
  TargetType: string
  BWBegin: string
  BWEnd: string
  TWBegin: string
  TWEnd: string
  AllowModify: boolean
  AllowCancel: boolean
  NonRefundable: boolean
  ApplyInRefundableRate: boolean
  ApplyInNonRefundableRate: boolean
  Available: number
  TemplateContent: any[]
  ResortRoomMapping: any[]
}

export interface PromotionFreePromotionFree {
  Recnum: number
  RsvPromotionConfigCode: string
  TargetType: string
  BWBegin: string
  BWEnd: string
  TWBegin: string
  TWEnd: string
  AllowModify: boolean
  AllowCancel: boolean
  NonRefundable: boolean
  SameResort: boolean
  PropertyLevel: boolean
  AllowTransfers: boolean
  AllowWithOutExchangePayment: boolean
  AllowTravelExchangeSimul: boolean
  AllowTransportation: boolean
  AllowRsvConsecutive: boolean
  RsvConsecutiveNights: number
  ApplyInRefundableRate: boolean
  ApplyInNonRefundableRate: boolean
  Available: number
  TemplateContent: any[]
  ResortRoomMapping: any[]
  ForceExtension: boolean
}

export interface PromotionsInfo {
  Recnum: number
  Code: string
  Description: string
  Message: string
  MinNights: number
  MaxNights: number
  MaxUses: number
  TypePromotion: string
  GroupPromotion: string
  OutTravelWindow: boolean
  MinNightsIntoPromotion: number
  IsExternal: boolean
  PriorityGroup: number
  Status: BillTo
  OnlyNew: number
  UsesAvailables: number
  PromotionDetail: null
  PromotionBookingWindow: PromotionWindow[]
  PromotionTravelWindow: PromotionWindow[]
  PromotionHotels: PromotionHotel[]
  PromotionRooms: null
  PromotionIsNotRefundable: null
  PromotionMarkets: PromotionMarket[]
  PromotionFriendly: PromotionFriendly[]
  PromotionBlackOuts: null
  PromotionCondYUses: null
  PromotionCategoriesReservation: null
  PromotionMemberType: null
  PromotionCountries: null
  PromotionConfiguration: null
  PromotionProductType: null
  PromotionByProvitionInCategory: null
  PackageByPromotion: any[]
  PromotionFriendBlocked: null
  PromotionInfoSettings: PromotionInfoSettings | null
  PromotionLevelMember: null
  PromotionTransferibleOptions: null
  PromotionAddittionalBenefit: null
}

export interface PromotionWindow {
  Recnum: number
  RecnumPromo: number
  InitDate: string
  EndDate: string
  Status: BillTo
  PromotionLevelMemberInPresale?: null
}

export interface PromotionFriendly {
  Recnum: number
  RecnumPromo: number
  RecnumPromoFriendly: number
  Status: BillTo
}

export interface PromotionHotel {
  Recnum: number
  RecnumPromo: string
  Hotel: string
  Status: BillTo
}

export interface PromotionInfoSettings {
  Recnum: number
  RecnumPromo: number
  IsBookngWindow: boolean
  IsTravelWindow: boolean
  IsCompareRates: boolean
  AutoAssign: boolean
  NoExchangeRewards: boolean
  IsByApplication: boolean
  IsGroupMaxUses: boolean
}

export interface PromotionMarket {
  Recnum: number
  RecnumPromo: number
  Market: string
  MaxUses: number
  MinNights: number
  Status: BillTo
}

export interface RateCodeDetail {
  Recnum: number
  Hotel: string
  Folio: number
  Application: string
  Company: number
  RateCode: string
  Arv_date: string
  Depart_dt: string
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
  Contract: null
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
  CreationDate: string
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
  _creation_date: string
  _IsDelete: boolean
  _promotion_type: string
  _pax_type: string
}

export interface RateCodeRsvPromotion {
  Name: string
  PublicDiscount: number
  Recnum: number
  Hotel: string
  Folio: number
  IdPromo: string
  ArvDate: string
  DeptDate: string
  Nights: number
  CreateDate: string
}

export interface Rewards {
  ReferidosRewards: null
  MainReservation: null
  VirtualRewards: number
  UserOverride: null
}

export interface RsvPromotionExchange {
  Recnum: number
  RsvPromotionCode: number
  Company: number
  Application: number
  Hotel: string
  Folio: string
  RsvLink: string
  Status: string
  InsertedAt: string
  UpdatedAt: string
  InsertUser: string
  UpdateUser: string
  ArrivalDate: string
  DepartDate: string
  NamePromo: string
  Adult: number
  Child: number
  Kid: number
  Baby: number
  Xtra_adu: number
  Xtra_kid: number
  Xtra_chd: number
}
