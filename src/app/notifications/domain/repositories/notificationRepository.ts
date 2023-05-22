import { NotificationEntity } from "../entities/notificationEntity";
import { ParamsNotificationEntity } from "../entities/paramsNotificationEntity";
import { ParamsSocioMorosoEntity } from "../entities/paramsSocioMorosoEntity";

export interface NotificationRepository {
  getNotification(params: ParamsNotificationEntity): Promise<NotificationEntity>
  getSocioMoroso(params: ParamsSocioMorosoEntity): Promise<NotificationEntity>
}
