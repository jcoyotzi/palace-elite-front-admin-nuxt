import {MemberExtension} from '~/src/app/owners/domain/dto/getOwnersResponseDto'

export const enum Roles {
  Owner = 'owner',
  Guest = 'guest',
  Beneficiary = 'beneficiary'
}

export type RoleTypes = `${Roles}`

export interface colData {
  title: string
  value?: any
}

interface tableData {
  data: colData[]
}

export enum SocialNetworks {
  FACE = 'FACE',
  INST = 'INST',
  TWIT =  'TWIT',
  YOUT = 'YOUT',
 }
 
export interface MemberProfileSocialNetwork {
   Recnum?: number
   Company: number
   Application: string
   CodeSocialNetwork: SocialNetworks
   UserSocialNetwork: string
   IdrelacionclubProfile: number
 }

export interface MemberUtils {
  firstname: string
  lastname: string
  password: string
  email: string
  City: string
  Country: string
  Zip: string
  SocialSecurityNumber: string
  idprofileopera: string
  relationship: number
  idrelacionclub: number
  Language: string
  company: number
  BIRTHDAY: string
  MemberProfileSocialNetwork?: {
    recnum?: string
    title: string
    value: string
  }[]
  mobilePhone: string
  homePhone: string
  officePhone: string
  application: string
  InReferral?: number
  isGuest?: boolean
  IsNational?: boolean | null
  membertype: string
  memberlevel: string
  statusmembresia: string
  MemberExtension: MemberExtension
  role?: RoleTypes
  isAdult?: boolean
}

export interface MembershipTable {
  name: string
  tableData: tableData[]
  hasPin?: boolean
  email?: string
  isOwnerAuthenticated?: boolean
  memberUtils: MemberUtils
}

