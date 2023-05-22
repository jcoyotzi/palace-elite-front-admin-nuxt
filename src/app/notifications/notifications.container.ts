import { ContainerModule, interfaces } from "inversify";
import UseCase from "../common/application/UseCase";
import notificationTypes from "../common/types/notificationTypes";
import GetNotificationUseCase from "./application/getNotificationUseCase";
import GetSocioMorosoUseCase from "./application/getSocioMorosoUseCase";
import { NotificationEntity } from "./domain/entities/notificationEntity";
import { ParamsNotificationEntity } from "./domain/entities/paramsNotificationEntity";
import { ParamsSocioMorosoEntity } from "./domain/entities/paramsSocioMorosoEntity";
import { NotificationRepository } from "./domain/repositories/notificationRepository";
import NotificationServiceRepository from "./domain/repositories/notificationServiceRepository";


export default new ContainerModule((bind: interfaces.Bind) => {
  bind<NotificationRepository>(notificationTypes.notificationRepository).to(NotificationServiceRepository)
  bind<UseCase<ParamsNotificationEntity, NotificationEntity>>(notificationTypes.getNotificationUseCase).to(GetNotificationUseCase)
  bind<UseCase<ParamsSocioMorosoEntity, NotificationEntity>>(notificationTypes.getSocioMorosoUseCaseUseCase).to(GetSocioMorosoUseCase)
})
