import {Store, Pinia} from 'pinia-class-component'
import {lazyInject} from '../../../container'
import contactTypes from '~/src/app/common/types/contactTypes'
import GetContactPageUseCase from '~/src/app/contact/aplication/getContactPageUseCase'
import {ContactPageMapper} from '~/src/app/contact/domain/mapper/contactPageMapper'
import GetPropertiesUseCase from '~/src/app/contact/aplication/getPropertiesUseCase'
import {PropertyMapper} from '~/src/app/property/domain/mapper/propertyMapper'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'
import PostContactEmailUseCase from '~/src/app/contact/aplication/postContactEmailUseCase'
import {IContactForm, IDepartment} from '~/src/app/contact/domain/dto/contactFromDto'
import GetContactReasonUseCase from '~/src/app/contact/aplication/getContactReasonUseCase'

@Store({
  name: 'contactStore'
})
export class ContactStore extends Pinia {
  @lazyInject(contactTypes.getContactPageUseCase)
  private readonly getContactPageUseCase!: GetContactPageUseCase

  @lazyInject(contactTypes.getPropertiesUseCase)
  private readonly getPropertiesUseCase!: GetPropertiesUseCase

  @lazyInject(contactTypes.postContactEmailUseCase)
  private readonly postContactEmailUseCase!: PostContactEmailUseCase

  @lazyInject(contactTypes.getContactReasonUseCase)
  private readonly getContactReasonUseCase!: GetContactReasonUseCase

  private contactPage: any = null
  private properties: PropertyEntity[] | null = null

  private memberReason: IDepartment[] | null = null
  private notMemberReason: IDepartment[] | null = null

  async fetchContactPageStrapi() {
    const data = await this.getContactPageUseCase.run()

    if (data) {
      const pageMapper = ContactPageMapper.mapContactPage(data)
      this.contactPage = pageMapper
    }
    return data
  }

  async fetchPropetiesStrapi() {
    const data = await this.getPropertiesUseCase.run()

    if (data) {
      const propertyEntity = PropertyMapper.map(data.data)
      this.properties = propertyEntity ?? null
    }
    return data
  }

  async fetchContactReasonsStrapi() {
    try {
      const data = await this.getContactReasonUseCase.run()
      this.memberReason = data?.member!
      this.notMemberReason = data?.notMember!
    } catch (error) {
      this.memberReason = null
      this.notMemberReason = null
    }
  }

  async postContactForm(contactForm: IContactForm) {
    const data = await this.postContactEmailUseCase.run(contactForm)
    return data
  }

  get contactUsPage() {
    if (!this.contactPage) this.fetchContactPageStrapi()
    return this.contactPage
  }

  get propertiesArray() {
    if (!this.properties) this.fetchPropetiesStrapi()

    return this.properties
  }

  get contactReasons() {
    if (!this.memberReason) this.fetchContactReasonsStrapi()
    return {
      member: this.memberReason,
      notMember: this.notMemberReason,
      allReasons: [...(this.memberReason ?? []), ...(this.notMemberReason ?? [])]
    }
  }
}
