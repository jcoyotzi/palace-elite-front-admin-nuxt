import ContactPageDto from '../dto/contactPageDto'
import {PropertiesDto} from '../dto/propertiesDto'
import {ContactReasonDto, IContactForm} from '../dto/contactFromDto'
import {Response} from '@/src/app/common/domain/entities/response'

export interface ContactRepository {
  getContactPage(): Promise<Response<ContactPageDto>>
  getProperties(): Promise<Response<PropertiesDto>>
  getContactReason(): Promise<Response<ContactReasonDto>>
  postContactEmail(formdata: IContactForm, template: string): Promise<Response<any>>
}
