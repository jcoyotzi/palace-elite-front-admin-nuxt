import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import contactTypes from '../../common/types/contactTypes'
import ContactPageDto from '../domain/dto/contactPageDto'
import {ContactRepository} from '../domain/repositories/contactRepository'

@injectable()
export default class GetContactPageUseCase implements UseCase<null, any> {
  constructor(
    @inject(contactTypes.contactRepository)
    private readonly contactRepository: ContactRepository
  ) {}

  async run(): Promise<ContactPageDto | undefined> {
    const response = await this.contactRepository.getContactPage()
    return response.data
  }
}
