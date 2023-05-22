import {injectable, inject} from 'inversify'
import httpTypes from '../../../../../src/app/common/types/httpTypes'
import { NotificationEntity } from '../entities/notificationEntity'
import { ParamsNotificationEntity } from '../entities/paramsNotificationEntity'
import { ParamsSocioMorosoEntity } from '../entities/paramsSocioMorosoEntity'
import { NotificationRepository } from './notificationRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class NotificationServiceRepository implements NotificationRepository {
  constructor(
    @inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpApi,
    @inject(httpTypes.apiUrl) private readonly other: HttpApi
  ) { }

  async getNotification(params: ParamsNotificationEntity): Promise<NotificationEntity> {
    const response = await this.httpJs.get(`/membership/notifications?request.ssn=${params.ssn}&request.application=${params.affiliationId}&request.idPerfilClub=${params.idPerfilClub}&request.relationship=${params.relationship}&request.desencriptar=${params.desencriptar}&request.company=${params.company}&request.isNational=${params.isNational}`)
    return response.data as NotificationEntity
  }

  async getSocioMoroso(params: ParamsSocioMorosoEntity): Promise<NotificationEntity> {
    const response = await this.other.get(`/affiliation/api/v1/socio-moroso/application/${params.application}/company/${params.company}?isNational=${params.isNational}`)
    return response.data as NotificationEntity
  }
}
