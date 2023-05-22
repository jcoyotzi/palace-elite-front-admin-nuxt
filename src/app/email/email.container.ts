import {ContainerModule, interfaces} from 'inversify'
import UseCase from '../common/application/UseCase'
import emailTypes from '../common/types/emailTypes'
import PostEmailUseCase from './application/postEmailUseCase'
import {EmailRepository} from './domain/repositories/emailRepository'
import EmailServiceRepository from './domain/repositories/emailServiceRepository'
import {Emailentity} from './domain/entities/emailEntity'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<EmailRepository>(emailTypes.emailRepository).to(EmailServiceRepository)
  bind<UseCase<Emailentity, Promise<any>>>(emailTypes.postEmailUseCase).to(PostEmailUseCase)
})
