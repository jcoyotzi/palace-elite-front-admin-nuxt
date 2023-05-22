import {SaveGuestPayloadDto} from '../dto/saveGuestPayloadDto'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {GuestsStore} from '~/src/ui/store/guestsStore'
import {UseAuth} from '~/src/ui/store/auth'

export class SaveGuestAdapter {
  public store = new GuestsStore()
  public authStore = new UseAuth()

  public getGuestsPayload(): Payload<SaveGuestPayloadDto> | null {
    const updated = this.mapDetails()
    if (updated) {
      return {
        data: {
          infoMemberProfileDetails: updated,
          cities: null,
          paginaOrigen: '',
          isNational: updated.MemberProfilesRelateds.IsNational,
          isProcess: false
        }
      }
    }

    return null
  }

  public mapDetails(): SaveGuestPayloadDto['infoMemberProfileDetails'] | null {
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
        twitter,
        instagram,
        youtube
      } = this.store.readGuestDetails

      if (this.store.readGuestSelected) {
        const guestTable = this.store.readGuestSelected
        const guestComplete = this.store.readGuests.filter(
          item =>
            item.MemberProfilesRelateds.idprofileopera === guestTable.memberUtils.idprofileopera
        )[0]

        if (guestComplete.MemberProfilesRelateds) {
          guestComplete.MemberProfilesRelateds.firstname = firstName || ''
          guestComplete.MemberProfilesRelateds.lastname = lastName || ''
          guestComplete.MemberProfilesRelateds.email = email || ''
          guestComplete.MemberProfilesRelateds.Zip = zipCode || ''
          guestComplete.MemberProfilesRelateds.Country = country || ''
          guestComplete.MemberProfilesRelateds.City = city || ''
          guestComplete.MemberProfilesRelateds.Tel = phone || ''
        }

        if (
          !guestComplete.MemberProfileSocialNetworks ||
          guestComplete.MemberProfileSocialNetworks.length < 1
        ) {
          guestComplete.MemberProfileSocialNetworks = []
        }

        const networks = [
          {value: facebook, title: 'FACE', checked: false},
          {value: instagram, title: 'INST', checked: false},
          {value: twitter, title: 'TWIT', checked: false},
          {value: youtube, title: 'YOUT', checked: false}
        ]

        const createSocialNetwork = (network: string, value: string) => {
          guestComplete.MemberProfileSocialNetworks.push({
            Company: guestComplete.MemberProfilesRelateds.company || 0,
            Application: guestComplete.MemberProfilesRelateds.application || '',
            CodeSocialNetwork: network,
            UserSocialNetwork: value,
            IdrelacionclubProfile: guestComplete.MemberProfilesEmail[0]?.IdrelacionclubProfile || 0
          })
        }

        networks.map((network, n) => {
          if (guestComplete.MemberProfileSocialNetworks.length > 0)
            return guestComplete.MemberProfileSocialNetworks.map((i, z) => {
              if (i.CodeSocialNetwork === network.title && !network.checked) {
                network.checked = true
                guestComplete.MemberProfileSocialNetworks[z].UserSocialNetwork = network.value || ''

                return true
              }
              if (!network.checked && z === guestComplete.MemberProfileSocialNetworks.length - 1) {
                createSocialNetwork(network.title, network.value || '')
                network.checked = true
                return true
              }
              return false
            })
          createSocialNetwork(network.title, network.value || '')
          network.checked = true
          return true
        })

        guestComplete.MemberProfilesRelateds.name =
          guestTable.memberUtils.firstname + ' ' + guestTable.memberUtils.lastname

        if (!guestComplete.MemberProfilesRelated)
          guestComplete.MemberProfilesRelated = guestComplete.MemberProfilesRelateds

        // console.log(guestComplete)

        return guestComplete
      }
    }
    return null
  }

  public async postGuest(payload: Payload<SaveGuestPayloadDto>): Promise<void> {
    return await this.store.saveGuest(payload)
  }

  public async saveGuest(): Promise<boolean> {
    const updated = this.getGuestsPayload()
    if (updated) {
      await this.postGuest(updated)
    }
    return Promise.resolve(this.store.readSaveGuestResponse)
  }
}
