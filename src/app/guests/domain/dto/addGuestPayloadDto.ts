export interface MemberProfileSocialNetwork {
  CodeSocialNetwork: string
  UserSocialNetwork: string
}

export interface AddGuestPayloadDto {
  application: string
  modulo: string
  allowSimilarProfile: boolean
  company: number
  isNational: boolean
  name: string
  idRelacionClub: number
  relationship: number
  idProfileOpera: string
  statusMembresia: string
  memberType: string
  memberLevel: string
  statusProfile: string
  firstName: string
  lastName: string
  idProfileOperaJC: string
  zip: string
  city: string
  country: string
  language: string
  tel: string
  email: string
  relationDescription: string
  inReferral: number
  socialSecurityNumber: string
  memberProfileSocialNetworks: MemberProfileSocialNetwork[]
}
