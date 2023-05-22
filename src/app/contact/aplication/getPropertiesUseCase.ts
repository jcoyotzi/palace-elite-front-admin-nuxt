import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import contactTypes from '../../common/types/contactTypes'
import {PropertiesDto} from '../domain/dto/propertiesDto'
import {ContactRepository} from '../domain/repositories/contactRepository'

@injectable()
export default class GetPropertiesUseCase implements UseCase<null, any> {
  constructor(
    @inject(contactTypes.contactRepository)
    private readonly contactRepository: ContactRepository
  ) {}

  async run(): Promise<PropertiesDto | undefined> {
    const response = await this.contactRepository.getProperties()
    return response.data
  }
}
