import {MembershipPaymentsDto} from '../dto/membershipPaymentsDto'
import {MembershipPaymentsPayload} from '../dto/membershipPaymentsPayload'
import {Response} from '~/src/app/network/common/domain/entity/response'

export interface DashboardRepository {
  getStrapiDashboard(slug: string, locale: string): Promise<any>
  getMembershipPayments(
    payload: MembershipPaymentsPayload
  ): Promise<Response<MembershipPaymentsDto>>
  getPrivacyNoticies(): Promise<any>
}
