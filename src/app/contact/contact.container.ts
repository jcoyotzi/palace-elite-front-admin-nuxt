import {ContainerModule, interfaces} from 'inversify'
import contactTypes from '../common/types/contactTypes'
import GetContactPageUseCase from './aplication/getContactPageUseCase'
import GetContactReasonUseCase from './aplication/getContactReasonUseCase'
import GetPropertiesUseCase from './aplication/getPropertiesUseCase'
import PostContactEmailUseCase from './aplication/postContactEmailUseCase'
import {ContactRepository} from './domain/repositories/contactRepository'
import ContactServiceRepository from './domain/repositories/contactServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ContactRepository>(contactTypes.contactRepository).to(ContactServiceRepository)
  bind<GetContactPageUseCase>(contactTypes.getContactPageUseCase).to(GetContactPageUseCase)
  bind<GetPropertiesUseCase>(contactTypes.getPropertiesUseCase).to(GetPropertiesUseCase)
  bind<GetContactReasonUseCase>(contactTypes.getContactReasonUseCase).to(GetContactReasonUseCase)
  bind<PostContactEmailUseCase>(contactTypes.postContactEmailUseCase).to(PostContactEmailUseCase)
})
