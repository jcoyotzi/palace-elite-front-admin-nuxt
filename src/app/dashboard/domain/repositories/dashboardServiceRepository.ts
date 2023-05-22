import {injectable, inject} from 'inversify'
import {MembershipPaymentsDto} from '../dto/membershipPaymentsDto'
import {MembershipPaymentsPayload} from '../dto/membershipPaymentsPayload'
import {DashboardRepository} from './dashboardRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/network/common/domain/entity/response'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class DashboardServiceRepository implements DashboardRepository {
  constructor(
    @inject(httpTypes.strapiHttpApi) private readonly httpStrapi: HttpApi,
    @inject(httpTypes.apiUrl) private readonly httpApi: HttpApi
  ) {}

  getStrapiDashboard(slug: string, locale: string): Promise<any> {
    return this.httpStrapi.get(`/api/base-pages?filters[slug][$eq]=${slug}&populate=deep,4&locale=${locale}`)
  }

  getPrivacyNoticies(): Promise<any> {
    return this.httpStrapi.get(`/api/privacy-notice?locale=${currentLocale()}`)
  }

  getMembershipPayments(
    payload: MembershipPaymentsPayload
  ): Promise<Response<MembershipPaymentsDto>> {
    const {application, company, isNational} = payload
    return this.httpApi.get(
      `/membership/api/v1/application/${application}/company/${company}/payment?isNational=${isNational}`
    )
  }
}
