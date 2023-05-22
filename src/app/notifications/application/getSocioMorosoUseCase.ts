import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import notificationTypes from '../../common/types/notificationTypes'
import { NotificationEntity } from '../domain/entities/notificationEntity'
import { NotificationRepository } from '../domain/repositories/notificationRepository'
import { ParamsSocioMorosoEntity } from '../domain/entities/paramsSocioMorosoEntity'


@injectable()
export default class GetSocioMorosoUseCase implements UseCase<ParamsSocioMorosoEntity, NotificationEntity> {
  constructor(
    @inject(notificationTypes.notificationRepository) private readonly notificationRepository: NotificationRepository
  ) {}

  async run(params: ParamsSocioMorosoEntity): Promise<NotificationEntity> {
    const notifications = await this.notificationRepository.getSocioMoroso(params)
    return notifications
  }
}
