import {UserMember} from './userMember'

export interface InfoUserMember {
  IsInternetUser: boolean
  Market: string
  MemberRateType: string | null
  Name: string
  ReservationCostType: string
  SaleDate: string
  UserMember: UserMember
}
