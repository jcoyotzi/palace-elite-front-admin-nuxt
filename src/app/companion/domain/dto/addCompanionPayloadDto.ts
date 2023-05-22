export interface AddCompanionPayloadDto {
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
}

export type AddCompanionPayload = Pick<AddCompanionPayloadDto, 'application' | 'allowSimilarProfile' | 'company' | 'isNational' | 'name' | 'firstName' | 'lastName' | 'zip' | 'city' | 'country' | 'language' | 'tel' | 'email' | 'socialSecurityNumber'>
