import {UserMember} from './userMember'

export interface User {
  affiliationId: string
  name: string
  lastname: string
  email: string
  countryResident?: string
  bussinessName?: string
  company?: number
  isNational?: boolean
}

export interface LegacyUser {
  _IsInternetUser: boolean
  _Market: string
  _MemberRateType: string | null
  _Name: string
  _ReservationCostType: string
  _SaleDate: Date
  _UserMember: UserMember
}
