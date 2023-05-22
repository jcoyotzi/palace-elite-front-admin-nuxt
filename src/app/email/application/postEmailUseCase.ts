import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import emailTypes from '../../common/types/emailTypes'
import {Emailentity} from '../domain/entities/emailEntity'
import {EmailRepository} from '../domain/repositories/emailRepository'

@injectable()
export default class PostEmailUseCase implements UseCase<Emailentity, Promise<any>> {
  constructor(
    @inject(emailTypes.emailRepository) private readonly emailRepository: EmailRepository
  ) {}

  async run(params: Emailentity): Promise<any> {
    const response = await this.emailRepository.postEmail(params)
    return response
  }
}
