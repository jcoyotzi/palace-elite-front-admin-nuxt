import {AddGuestPayloadDto} from '../dto/addGuestPayloadDto'
import {GuestsStore} from '~/src/ui/store/guestsStore'
import {UseAuth} from '~/src/ui/store/auth'
import {Payload} from '~/src/app/common/domain/entities/payload'

export class AddGuestAdapter {
  public store = new GuestsStore()
  public authStore = new UseAuth()

  public addGuestPayload(): Payload<AddGuestPayloadDto> | null {
    const updated = this.mapDetails()
    if (updated) {
      return {
        data: updated
      }
    }

    return null
  }

  public mapDetails(): AddGuestPayloadDto | null {
    if (this.store.readGuestDetails) {
      const {
        firstName,
        lastName,
        email,
        zipCode,
        country,
        city,
        phone,
        facebook,
        instagram,
        youtube,
        twitter
      } = this.store.readGuestDetails

      const guest = {
        application: this.authStore.applicationUserMember || '',
        modulo: '',
        allowSimilarProfile: false,
        company: this.authStore.userCompany || 0,
        isNational: this.authStore.isNational || false,
        name: firstName + ' ' + lastName,
        idRelacionClub: 0,
        relationship: 0,
        idProfileOpera: '',
        statusMembresia: '',
        memberType: '',
        memberLevel: '',
        statusProfile: '',
        firstName: firstName || '',
        lastName: lastName || '',
        idProfileOperaJC: '',
        zip: zipCode || '',
        city: city || '',
        country: country || '',
        language: '',
        tel: phone || '',
        email: email || '',
        relationDescription: '',
        inReferral: 0,
        socialSecurityNumber: '',
        memberProfileSocialNetworks:
          facebook || twitter || instagram || youtube
            ? [
                {
                  CodeSocialNetwork: 'FACE',
                  UserSocialNetwork: facebook || ''
                },
                {
                  CodeSocialNetwork: 'INST',
                  UserSocialNetwork: instagram || ''
                },
                {
                  CodeSocialNetwork: 'TWIT',
                  UserSocialNetwork: twitter || ''
                },
                {
                  CodeSocialNetwork: 'YOUT',
                  UserSocialNetwork: youtube || ''
                }
              ]
            : []
      }
      // console.log(guest)
      return guest
    }
    return null
  }

  public async postGuest(payload: Payload<AddGuestPayloadDto>): Promise<void> {
    return await this.store.addGuest(payload)
  }

  public async addGuest(): Promise<boolean> {
    const updated = this.addGuestPayload()
    if (updated) {
      await this.postGuest(updated)
    }
    return Promise.resolve(this.store.readAddGuestResponse)
  }
}
