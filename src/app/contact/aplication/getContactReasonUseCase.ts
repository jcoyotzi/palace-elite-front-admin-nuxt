import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import contactTypes from '../../common/types/contactTypes'
import {IDepartment} from '../domain/dto/contactFromDto'
import {ContactReasonsMapper} from '../domain/mapper/contactReasonsMapper'
import {ContactRepository} from '../domain/repositories/contactRepository'

@injectable()
export default class GetContactReasonUseCase implements UseCase<null, any> {
  constructor(
    @inject(contactTypes.contactRepository)
    private readonly contactRepository: ContactRepository
  ) {}

  async run(): Promise<{member: IDepartment[]; notMember: IDepartment[]} | undefined> {
    const response = await this.contactRepository.getContactReason()

    return ContactReasonsMapper.mapReasons(response.data!)
  }
}
