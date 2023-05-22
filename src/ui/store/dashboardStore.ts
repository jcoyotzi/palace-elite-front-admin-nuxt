import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import UseCase from '~/src/app/common/application/UseCase'
import dashboardTypes from '~/src/app/common/types/dashboardTypes'
import {StrapiDashboardAdapter} from '~/src/app/dashboard/domain/adapters/strapiDashboardAdapter'
import {MembershipPaymentsAdapter} from '~/src/app/dashboard/domain/adapters/membershipPaymentsAdapter'
import {MembershipPaymentsPayload} from '~/src/app/dashboard/domain/dto/membershipPaymentsPayload'
import {Response} from '~/src/app/network/common/domain/entity/response'
import {MembershipPaymentsDto} from '~/src/app/dashboard/domain/dto/membershipPaymentsDto'
import notificationTypes from '~/src/app/common/types/notificationTypes'
import {NotificationEntity} from '~/src/app/notifications/domain/entities/notificationEntity'
import PrivacyNoticies from '~/src/app/dashboard/domain/dto/privacyNoticies'
import GetSocioMorosoUseCase from '~/src/app/notifications/application/getSocioMorosoUseCase'
import { ParamsSocioMorosoEntity } from '~/src/app/notifications/domain/entities/paramsSocioMorosoEntity'

@Store({
  name: 'dashboardStore'
})
export class DashboardStore extends Pinia {
  @lazyInject(dashboardTypes.getStrapiDashboardUseCase)
  private readonly getStrapiDashboard!: UseCase<any, any>

  @lazyInject(dashboardTypes.getDashboardPrivacyNoticies)
  private readonly getDashboardPrivacyNoticies!: UseCase<any, any>

  @lazyInject(dashboardTypes.getMembershipPaymentsUseCase)
  private readonly getMembershipPayments!: UseCase<
    MembershipPaymentsPayload,
    Response<MembershipPaymentsDto>
  >

  @lazyInject(notificationTypes.getNotificationUseCase)
  private readonly getNotificationUSeCase!: UseCase<any, any>

  @lazyInject(notificationTypes.getSocioMorosoUseCaseUseCase)
  private readonly getSocioMorosoUseCaseUseCase!: GetSocioMorosoUseCase

  private strapiDashboard: any = null

  public strapiPrivacyNoticies: PrivacyNoticies | null = {
    attributes: {
      title: '',
      content: '',
      createdAt: '',
      locale: '',
      publishedAt: '',
      updatedAt: ''
    },
    id: 0
  }

  private membershipPayments: any | null = null

  public notifications: NotificationEntity | null = null

  public currentOwner: any | null = null

  public notificationsPayload: any | null = null

  // Getters

  public get readStrapiDashboard(): any {
    return this.strapiDashboard
  }

  public get readMembershipPayments(): any {
    return this.membershipPayments
  }

  public get isSocioMoroso(): boolean | null | undefined {
    return this.notifications !== null ? this.notifications.isSocioMoroso : null
  }

  setCurrentOwner(owner: any) {
    this.currentOwner = owner
  }

  setNotificatiosnPayload(payload: any) {
    this.notificationsPayload = payload
  }

  // Actions

  public async fetchStrapiDashboard(slug: string, locale: string) {
    try {
      const response: any = await this.getStrapiDashboard.run({slug, locale})
      // console.log('dashboard', {response})
      if (response) this.strapiDashboard = StrapiDashboardAdapter.mapDashboardPage(response.data)
    } catch (e: any) {
      // const error = new Exception(0, [e.message], [])
      console.error(e)
    }
  }

  public async getPrivacyNoticie() {
    try {
      const response = await this.getDashboardPrivacyNoticies.run(null)
      // console.log('privacy', {response})
      this.strapiPrivacyNoticies = response.data
    } catch (e: any) {
      // const error = new Exception(0, [e.message], [])
      console.error(e)
    }
  }

  public async fetchMembershipPayments(payload: MembershipPaymentsPayload) {
    try {
      const {data}: any = await this.getMembershipPayments.run(payload)
      if (data) this.membershipPayments = MembershipPaymentsAdapter.mapCard(data)
    } catch (e: any) {
      // const error = new Exception(0, [e.message], [])
      console.error(e)
    }
  }

  public async getNotifications() {
    try {
      const {data} = await this.getNotificationUSeCase.run(this.notificationsPayload)
      this.notifications = data
    } catch (e: any) {
      // const error = new Exception(0, [e.message], [])
      console.error(e)
    }
  }

  public async getSocioMoroso(params: ParamsSocioMorosoEntity) {
    try {// @ts-ignore
      const {data} = await this.getSocioMorosoUseCaseUseCase.run(params)
      this.notifications = data
    } catch (e: any) {
      // const error = new Exception(0, [e.message], [])
      console.error(e)
    }
  }
}
