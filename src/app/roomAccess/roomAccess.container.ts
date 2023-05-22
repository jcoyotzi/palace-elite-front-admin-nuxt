import {ContainerModule, interfaces} from 'inversify'
import roomAccessTypes from '../common/types/roomAccessTypes'
import UseCase from '../common/application/UseCase'
import {RoomAccessRepository} from './domain/repositories/roomAccessRepository'
import {RoomAccessServiceRepository} from './domain/repositories/roomAccessServiceRepository'
import {GetRoomTypeAccessByHotelAffiliation} from './application/getRoomTypeAccessByHotelAffiliation'
import GetRoomAccessWithDoubleCategoriesJoined from './application/getRoomAccessWithDoubleCategoriesJoined'
import {GetRoomAccessRelated} from './application/getRoomAccessRelated'
import {GetRoomTypeAccessDto} from './domain/dto/getRoomTypeAccessDto'
import {RoomAccess} from './domain/entities/roomAccess'
import GetRoomAvailableToBooking from './application/getRoomAvailableToBooking'
import {GetRoomNoRelated} from './application/getRoomNoRelated'
import {CreateLockOffRoomAccess} from './application/createLockOffRoomAccess'
import GetRoomArrayToBook from './application/getRoomArrayToBook'
import { getValidatePromotionActive } from './application/getValidatePromotionActive'
import { ValidatePromotionDto } from './domain/dto/validatePromotionDto'
import ValidatePromotion from './application/validatePromotion'
import { ValidatePromotionRepository } from './domain/repositories/validatePromotionRepository'
import { ValidatePromotionServiceRepository}  from './domain/repositories/validatePromotionServiceRepository'
import {GetArrayToBookPayload} from "app/roomAccess/domain/getArrayToBookPayload";

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<RoomAccessRepository>(roomAccessTypes.roomAccessRepository).to(RoomAccessServiceRepository)
  bind<UseCase<GetRoomTypeAccessDto, RoomAccess[]>>(
    roomAccessTypes.getRoomTypeAccessByHotelAffiliation
  ).to(GetRoomTypeAccessByHotelAffiliation)
  bind<UseCase<RoomAccess[], RoomAccess[]>>(
    roomAccessTypes.getRoomAccessWithDoubleCategoriesJoined
  ).to(GetRoomAccessWithDoubleCategoriesJoined)
  bind<UseCase<RoomAccess[], RoomAccess[]>>(roomAccessTypes.getJoinedRoomsByRealCode).to(
    GetRoomAccessRelated
  )
  bind<UseCase<GetRoomTypeAccessDto, RoomAccess[]>>(roomAccessTypes.getRoomAvailableToBooking).to(
    GetRoomAvailableToBooking
  )
  bind<UseCase<RoomAccess[], RoomAccess[]>>(roomAccessTypes.getRoomNoRelated).to(GetRoomNoRelated)
  bind<UseCase<RoomAccess[], RoomAccess[]>>(roomAccessTypes.createLockOffRoomAccess).to(
    CreateLockOffRoomAccess
  )
  bind<UseCase<GetArrayToBookPayload, RoomAccess[]>>(roomAccessTypes.getRoomArrayToBook).to(
    GetRoomArrayToBook
  )
  bind<UseCase<ValidatePromotionDto, RoomAccess[]>>(roomAccessTypes.getValidatePromotionActive).to(getValidatePromotionActive)

  bind<UseCase<ValidatePromotionDto, RoomAccess[]>>(roomAccessTypes.validatePromotion).to(ValidatePromotion)

  bind<ValidatePromotionRepository>(roomAccessTypes.validatePromotionRepository).to(ValidatePromotionServiceRepository)
})
