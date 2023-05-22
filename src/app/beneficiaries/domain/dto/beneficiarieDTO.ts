export enum Type {
  SystemDecimal = 'System.Decimal',
  SystemInt32 = 'System.Int32',
  SystemString = 'System.String'
}

export interface EntityKeyValue {
  Key: string
  Type: Type
  Value: string
}

export interface EntityKey {
  $id: string
  EntitySetName: string
  EntityContainerName: string
  EntityKeyValues: EntityKeyValue[]
}

export interface ClBenefi {
  $id: string
  RECNUM: number
  BENEFICIARY_ID: number
  APPLICATION: string
  NAME: string
  FAMILY_REL: string
  ESTATUS: string
  FECHA_ALTA: string
  HORA_ALTA: string
  CVEALTA: string
  FECHA_BAJA: string
  HORA_BAJA: string
  CVEBAJA: string
  FECHA_MODIF: string
  HORA_MODIF: string
  CVEMODIF: string
  VIPUNLGOLF: string
  IDPROFILEOPERA: string
  FIRTS: string
  LAST: string
  EMAIL: string
  SocialSecurityNumber: string
  SSNReason: number
  PRIORITY: number
  ADDRESS: string
  CITY_CODE: number
  STATE_CODE: string
  COUNTRY_CODE: string
  ZIP: string
  NATIONALITY: string
  LADA_HOME: string
  HOME_PHONE: string
  LADA_OFFICE: string
  OFFICE_PHONE: string
  LADA_CELL: string
  CELL_PHONE: string
  COUNTRY_TEL_CODE: string
  EntityKey: EntityKey
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

export interface MemberProfilesRelated {
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

export interface MemberExtension {
  _recnum: number
  _application: string
  _company: number
  _rfc: string
  _num_exterior: string
  _num_interior: string
  _localidad: string
  _colonia: string
  _municipio: string
  _referencia: string
  _procesado_factura: string
  _clasificacion: string
  _email: string
  _autorizo_publicidad: number
  _razon_social: string
  _calle: string
  _clave_pais: string
  _clave_estado: string
  _codigo_postal: string
  _tiene_direccion_adicional: number
  _porcentaje_enganche_pagado: number
  _venta_anterior: number
  _venta_nueva: number
  _diferencia_venta_anterior_nueva: number
  _enganche_pendiente_anterior: number
  _enganche_pendiente_nuevo: number
  _porcentaje_enganche_pactado_nuevo: number
  _enganche_pactado_nuevo: number
  _monto_financiado_anterior: number
  _monto_financiado_nuevo: number
  _ajuste_dg: number
  _porcentaje_ajuste_dg: number
  _previous_sale_type: string
  _interval: string
  _interval_previous: string
  _interval_plus: string
  _interval_number: string
  _interval_platinum: string
  _sale_per: number
  _rci_platinum: string
  _resort_credit_validity: number
  _redemption_date: string
  _apartado: string
  _procesable: string
  _sale_type: string
  _tour_date: string
  _country_code: string
  _area_code: string
  _contact_phone: string
  _home_phone: string
  _office_phone: string
  _financiamiento_en_anualidades: number
  _rondas_golf_anterior: number
  _rondas_golf_nuevas: number
  _acceso_rondas_golf_anterior: number
  _acceso_rondas_golf_nuevas: number
  _VATREASON: string
  _rate_Type: string
  _title: string
  _amount_reinvestment: number
  _INCENTIVES_WEEKS: number
  _StayMinimumNights: boolean
  _AFFILIATESBENEFICIARIES: boolean
  _INVITED: boolean
  _REFERREND: boolean
  _PRESIDENCIALV: boolean
  _PRESIDENCIALF: false
  _DIAMOND_TRAVELOWNERS: boolean
  _DIAMOND_PERSONS: boolean
  _lada_home: string
  _lada_office: string
  _guest_program: string
  _guest_market: string
  _reservationcosttype: string
  _send_statement: string
  _markets_combination: string
  _social_security_number: string
  _ContinuePaying: boolean
  _Restricted: boolean
  _ID_MEMBER_GLOBAL: string
  _ReferralScheme: 2
  _IntervalUsed: boolean
  _IntervalUsedDate: string
  _NCCODE: string
  _RewardsScheme: number
  _IdPeriodicity: string
  _Wholesaler: boolean
  _Portfolio_id: string
}

export interface BeneficiarieDTO {
  Member: null
  MemberProfileSocialNetworks: MemberProfileSocialNetwork[]
  MemberProfilesEmail: any[]
  ClCowner: null
  ClBenefi: ClBenefi
  MemberProfilesRelated: MemberProfilesRelated
  MemberProfilesRelateds: MemberProfilesRelated
  MemberExtension: MemberExtension
  InfoCity: null
}
