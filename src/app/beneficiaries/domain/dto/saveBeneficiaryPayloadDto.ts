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

export interface InfoMemberProfileDetails {
  Member: null
  MemberProfileSocialNetworks: MemberProfileSocialNetwork[]
  MemberProfilesEmail: any[]
  ClCowner: null
  ClBenefi: ClBenefi
  MemberProfilesRelated: MemberProfilesRelated
  MemberProfilesRelateds: MemberProfilesRelated
  MemberExtension: null
  InfoCity: null
}

export interface SaveBeneficiaryPayloadDto {
  infoMemberProfileDetails: InfoMemberProfileDetails
  cities: null
  paginaOrigen: string
  isNational: boolean
  isProcess: boolean
}
