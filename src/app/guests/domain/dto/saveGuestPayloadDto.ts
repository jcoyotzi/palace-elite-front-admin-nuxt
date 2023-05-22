export interface EntityKeyValue {
  Key: string
  Type: string
  Value: string
}
export interface EntityKey {
  $id: string
  EntitySetName: string
  EntityContainerName: string
  EntityKeyValues: EntityKeyValue[]
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

export interface InfoMemberProfileDetails {
  Member: null
  MemberProfileSocialNetworks: MemberProfileSocialNetwork[]
  MemberProfilesEmail: any[]
  ClCowner: null
  ClBenefi: null
  MemberProfilesRelated: MemberProfilesRelateds
  MemberProfilesRelateds: MemberProfilesRelateds
  MemberExtension: null
  InfoCity: null
}

export interface SaveGuestPayloadDto {
  infoMemberProfileDetails: InfoMemberProfileDetails
  cities: unknown
  paginaOrigen: string
  isNational: boolean
  isProcess: boolean
}
