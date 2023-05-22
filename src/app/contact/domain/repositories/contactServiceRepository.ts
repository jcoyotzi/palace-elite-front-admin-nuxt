import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {PropertiesDto} from '../dto/propertiesDto'
import contactPageDto from '../dto/contactPageDto'
import {ContactReasonDto, IContactForm} from '../dto/contactFromDto'
import {ContactRepository} from './contactRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

// import mockDepartaments from '~/src/ui/store/contactUs/mockDepartaments'

@injectable()
export default class ContactServiceRepository implements ContactRepository {
  constructor(
    @inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi,
    @inject(httpTypes.intelligenceXHttpApi) private readonly httpApi: HttpApi
  ) {}

  getContactPage(): Promise<Response<contactPageDto>> {
    return this.httpJs.get(
      '/api/base-pages?populate=deep,5&filters[slug][$eq]=contact-us'
    )
  }

  getProperties(): Promise<Response<PropertiesDto>> {
    return this.httpJs.get(`/api/properties?populate=link.page,media.media&locale=${currentLocale()}`)
  }

  getContactReason(): Promise<Response<ContactReasonDto>> {
    return this.httpJs.get(`/api/contact-us-email?populate=deep,4&locale=${currentLocale()}`)
  }

  postContactEmail(formdata: IContactForm, template: string): Promise<Response<any>> {
    const emails = formdata.department?.emails ? formdata.department?.emails.replaceAll('\n', ';') : formdata.resort?.emails.replaceAll('\n', ';')
    const response = this.httpApi.post('/membership/send-mail', {
      data: {
        recipientsMail: emails,
        subject: 'Contact',
        message: template,
        type: 0,
      }
    })

    return response
  }
}
