export enum Key {
  Application = 'Application',
  Company = 'Company',
  CoownerID = 'COOWNER_ID',
  Recnum = 'Recnum'
}

export enum Type {
  SystemDecimal = 'System.Decimal',
  SystemInt32 = 'System.Int32',
  SystemString = 'System.String'
}
export interface EntityKeyValue {
  Key: Key
  Type: Type
  Value: string
}
export enum EntityContainerName {
  CallcenterEntities = 'CallcenterEntities',
  HotelEntities = 'HotelEntities'
}
export enum EntitySetName {
  EFCLCOWNERs = 'EFCLCOWNERs',
  MemberProfileEmails = 'MemberProfileEmails',
  MemberProfileSocialNetworks = 'MemberProfileSocialNetworks'
}

export interface EntityKey {
  $id: string
  EntitySetName: EntitySetName
  EntityContainerName: EntityContainerName
  EntityKeyValues: EntityKeyValue[]
}
export interface ClCowner {
  $id: string
  RECNUM: number
  COOWNER_ID: number
  APPLICATION: string
  FIRST: string
  LAST: string
  ADDRESS: string
  COUNTRY_CODE: string
  STATE_CODE: string
  CITY_CODE: number
  ZIP: string
  HOME_PHONE: string
  CELL_PHONE: string
  OFFICE_PHONE: string
  FAX_PHONE: string
  EMAIL: string
  REC_ACC: string
  STATUS: string
  FECHA_ALTA: string
  HORA_ALTA: string
  CVEALTA: string
  FECHA_BAJA: string
  HORA_BAJA: string
  CVEBAJA: string
  FECHA_MODIF: string
  HORA_MODIF: string
  CVEMODIF: string
  COMPANY: number
  BIRTHDAY: string
  ELECTRONIC_SIGNATURE_ID: string
  IDPROFILEOPERA: string
  ADD_TO_INTERVAL: boolean
  COUNTRY_TEL_CODE: string
  AREA_CODE: string
  TITLE: string
  DIDREINVESTMENT: boolean
  SocialSecurityNumber: string
  SSNReason: number
  PRIORITY: number
  NATIONALITY: string
  LADA_HOME: string
  LADA_OFFICE: string
  LADA_CELL: string
  LADA_FAX: string
  EntityKey: EntityKey
}

export interface InfoCity {
  _RECNUM: number
  _IDPAIS: string
  _IDESTADO: string
  _IDCIUDAD: number
  _NOMBRE: string
  _ESTATUS: string
  _FECHA_ALTA: string
  _HORA_ALTA: string
  _CVEALTA: string
  _FECHA_BAJA: string
  _HORA_BAJA: string
  _CVEBAJA: string
  _FECHA_MODIF: string
  _HORA_MODIF: string
  _CVEMODIF: string
  _EstadoDescripcion: string
  _PaisDescripcion: string
  _CVE_LADA: string
  _CodeCountry: string
}

export interface Member {
  Recnum: number
  Application: string
  Interval: number
  Name: string
  Address: string
  City: string
  State: string
  Zip: string
  Country: string
  Tel1: string
  Tel2: string
  Tel3: string
  Purchase: string
  Sale: number
  Down: number
  Down_escrow: number
  Down_bal: number
  Remain: number
  Remain_prin: number
  Remain_int: number
  Remain_date: string
  Budget: number
  Fee: number
  Reduced: number
  First: string
  Unit: string
  Filler: number
  Last: string
  Cancel: string
  Refund: number
  Forfeit: number
  Paid: string
  Discount: number
  Discount_pct: number
  Discount_net: number
  Coupons: string
  Letter1: string
  Letter2: string
  Letter3: string
  Letter4: string
  Letter5: string
  Letter6: string
  Letter7: string
  Letter8: string
  Letter9: string
  Letter10: string
  Letter11: string
  Delinq_ltrs: number
  Collect: number
  Collect_prin: number
  Collect_int: number
  Delinq: number
  Notdelinq: number
  Delinq_mo: number
  Letter12: string
  Letter13: string
  Letter14: string
  Letter15: string
  Letter16: string
  Letter17: string
  Letter18: string
  Letter19: string
  Letter20: string
  Letter21: string
  Letter22: string
  Letter23: string
  Letter24: string
  Letter25: string
  Letter26: string
  Letter27: string
  Letter28: string
  Letter29: string
  Letter30: string
  Cop: string
  Suspense: number
  Pmts: number
  Slm: string
  St: string
  Ter: string
  Dc: string
  Tc: string
  Pc: string
  Xc: string
  Sc: string
  Last_bill: string
  Balance: number
  Sales_ytd: number
  Sales_last: number
  Status: string
  Bill_mo: number
  Fecha: string
  Last1: string
  First1: string
  Last2: string
  First2: string
  Pha1: string
  Pha2: string
  Pha3: string
  Promo: string
  Sal: string
  Season: string
  Rep: string
  Company: number
  No_int: string
  Lang: string
  Seas: string
  Tot_pmts: number
  Amt_fin: number
  Int_rate: number
  Down_pct: number
  Terms1: string
  Terms2: string
  Terms3: string
  Terms4: string
  Reinstate: string
  Prev_cancel: string
  Letter31: string
  Letter32: string
  Letter33: string
  Letter34: string
  Letter35: string
  A1: string
  A2: string
  A3: string
  A4: string
  A5: string
  A6: string
  A7: string
  A8: string
  A9: string
  N1: number
  N2: number
  N3: number
  N4: number
  N5: number
  D1: string
  D2: string
  D3: string
  D4: string
  D5: string
  Points: number
  Pts_earn: number
  Pts_used: number
  Cert: string
  Rel_applic: string
  Pax_amt: number
  Pax_cost: number
  Idrci: string
  Internet_Email: string
  E_mail: string
  Down_pay2_dt: string
  Down_pay3_dt: string
  Down_pay2_como: string
  Down_pay3_como: string
  Down_pay2: number
  Down_pay3: number
  Edad_menor: number
  Aiweeks: number
  Epweeks: number
  Spaweeks: number
  Rciweeks: number
  Golf: number
  Vat_golf: number
  Total_golf: number
  Golfrounds: number
  Gr_access: number
  Rg_earned: number
  Mem_exp: number
  Derecho: string
  Unlim_golf: number
  Ulg_used: number
  Ai_used: number
  Ep_used: number
  Spa_used: number
  Rci_used: number
  Ps_access: number
  Gob_access: number
  Jacb_access: number
  Jaccg_access: number
  Sale_glft: number
  Psm: number
  Psm_mpays: number
  Psm_earned: number
  Psm_used: number
  Equity: number
  Ref_co: number
  Ref_apl: string
  Paqte: number
  Ps2_access: number
  Psm_emis: string
  Iva_tax_rate: number
  Sidek_new_rate: string
  Access_htls: string
  Cta_monederop: string
  Access_cdg: string
  Welcome_kit: string
  Week52: string
  Week52_num: number
  Password: string
  Exch: number
  Address2: null
  Non_proc: null
  Pesodeal: null
  EdoFac: null
  Dos_edos_cta: null
  Rg_used: number
  info_golf_weeksRCI: null
  Expiration_date: string
}

export interface MemberExtension {
  _lada_home: string
  _lada_office: string
  _area_code: string
  _contact_phone: string
  _office_phone: string
  _home_phone: string
  _Wholesaler?: string
  _ReferralScheme?: number
}

export interface MemberProfileSocialNetwork {
  $id?: string
  Recnum?: number
  Company: number
  Application: string
  CodeSocialNetwork: string
  UserSocialNetwork: string
  IdrelacionclubProfile: number
  EntityKey?: EntityKey
}

export interface MemberProfilesEmail {
  $id: string
  Recnum: number
  Company: number
  Application: string
  Email: string
  IdrelacionclubProfile: number
  Principal: boolean
  AnexoA: boolean
  SendPromotions: boolean
  EntityKey: EntityKey
}

export interface MemberProfilesRelateds {
  Leveldescription: string
  text: string
  DescPromoRef: string
  LevelCodeDescription: string
  _recnum_profile: number
  company: number
  application: string
  name: string
  idrelacionclub: number
  relationship: number
  idprofileopera: string
  statusmembresia: string
  membertype: string
  memberlevel: string
  statusprofile: string
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

export interface Owner {
  Member: Member
  MemberProfileSocialNetworks: MemberProfileSocialNetwork[]
  MemberProfilesEmail: MemberProfilesEmail[]
  ClCowner: ClCowner | null
  ClBenefi: null
  MemberProfilesRelated: MemberProfilesRelateds
  MemberProfilesRelateds: MemberProfilesRelateds
  MemberExtension: MemberExtension
  InfoCity: InfoCity
}

export type GetOwnersResponseDto = Owner[]
