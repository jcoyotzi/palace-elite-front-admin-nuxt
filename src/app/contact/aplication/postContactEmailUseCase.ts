import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import contactTypes from '../../common/types/contactTypes'
import {IContactForm} from '../domain/dto/contactFromDto'
import {ContactRepository} from '../domain/repositories/contactRepository'
import {contactUsEmailTemplate} from '../../../ui/emailTemplates/contactEmailTemplate'

@injectable()
export default class PostContactEmailUseCase implements UseCase<IContactForm, any> {
  constructor(
    @inject(contactTypes.contactRepository)
    private readonly contactRepository: ContactRepository
  ) {}

  private emailTemplate = contactUsEmailTemplate

  async run(formdata: IContactForm): Promise<any> {
    const template = this.emailTemplate(
      formdata.department?.name ?? '',
      formdata.message,
      formdata.affilliateId ?? ''
    )

    const response = await this.contactRepository.postContactEmail(formdata, template)

    return response.data
  }
}
