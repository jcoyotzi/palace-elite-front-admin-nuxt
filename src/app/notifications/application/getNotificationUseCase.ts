import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import notificationTypes from '../../common/types/notificationTypes'
import { ParamsNotificationEntity } from '../domain/entities/paramsNotificationEntity'
import { NotificationEntity } from '../domain/entities/notificationEntity'
import { NotificationRepository } from '../domain/repositories/notificationRepository'


@injectable()
export default class GetNotificationUseCase implements UseCase<ParamsNotificationEntity, NotificationEntity> {
  constructor(
    @inject(notificationTypes.notificationRepository) private readonly notificationRepository: NotificationRepository
  ) {}

  async run(params: ParamsNotificationEntity): Promise<NotificationEntity> {
    const notifications = await this.notificationRepository.getNotification(params)
    return notifications
  }
}
