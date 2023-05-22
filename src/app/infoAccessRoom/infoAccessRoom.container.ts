import {ContainerModule, interfaces} from 'inversify'
import infoAccessRoom from '../common/types/infoAccessRoom'
import {InfoAccessRoomRepository} from './domain/repositories/infoAccessRoomRepository'
import infoAccessRoomServiceRepository from './domain/repositories/infoAccessRoomServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<InfoAccessRoomRepository>(infoAccessRoom.infoAccessRoomServiceRepository).to(
    infoAccessRoomServiceRepository
  )
})
