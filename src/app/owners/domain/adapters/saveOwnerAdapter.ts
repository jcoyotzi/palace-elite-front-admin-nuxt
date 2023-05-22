import {SaveOwnerPayloadDto} from '../dto/saveOwnerPayloadDto'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {OwnersStore} from '~/src/ui/store/ownersStore'
import {UseAuth} from '~/src/ui/store/auth'

export class SaveOwnerAdapter {
  public store = new OwnersStore()
  public authStore = new UseAuth()

  public getOwnersPayload(): Payload<SaveOwnerPayloadDto> | null {
    const updated = this.mapDetails()

    if (updated) {
      return {
        data: {
          infoMemberProfileDetails: updated,
          cities: null,
          paginaOrigen: '',
          isNational: false,
          isProcess: false
        }
      }
    }

    return null
  }

  public mapDetails(): SaveOwnerPayloadDto['infoMemberProfileDetails'] | null {
    if (this.store.readOwnerDetails) {
      const {
        phone,
        phone2,
        phone3,
        typeOfPhone,
        typeofPhone2,
        typeofPhone3,
        facebook,
        twitter,
        youtube,
        instagram
      } = this.store.readOwnerDetails
      if (this.store.readOwnerSelected) {
        const ownerTable = this.store.readOwnerSelected
        const ownerComplete = this.store.readOwners.filter(
          item =>
            item.MemberProfilesRelateds.idprofileopera === ownerTable.memberUtils.idprofileopera
        )[0]
        console.log('🚀 ~ file: saveOwnerAdapter.ts:49 ~ SaveOwnerAdapter ~ mapDetails ~ ownerComplete', ownerTable)

        if (ownerComplete.ClCowner) {
          switch (typeOfPhone) {
          case 'Mobile':
            ownerComplete.ClCowner.CELL_PHONE = phone || ''
            break
          case 'Office':
            ownerComplete.ClCowner.OFFICE_PHONE = phone || ''
            break
          case 'Home':
            ownerComplete.ClCowner.HOME_PHONE = phone || ''
            break

          default:
            break
          }

          switch (typeofPhone2) {
          case 'Mobile':
            ownerComplete.ClCowner.CELL_PHONE = phone2 || ''
            break
          case 'Office':
            ownerComplete.ClCowner.OFFICE_PHONE = phone2 || ''
            break
          case 'Home':
            ownerComplete.ClCowner.HOME_PHONE = phone2 || ''
            break

          default:
            break
          }
          switch (typeofPhone3) {
          case 'Mobile':
            ownerComplete.ClCowner.CELL_PHONE = phone3 || ''
            break
          case 'Office':
            ownerComplete.ClCowner.OFFICE_PHONE = phone3 || ''
            break
          case 'Home':
            ownerComplete.ClCowner.HOME_PHONE = phone3 || ''
            break

          default:
            break
          }
        } else {
          switch (typeOfPhone) {
          case 'Mobile':
            ownerComplete.MemberExtension._area_code = phone?.slice(0, 3) || ''
            ownerComplete.MemberExtension._contact_phone = phone?.slice(3, phone.length) || ''
            break
          case 'Office':
            ownerComplete.MemberExtension._lada_office = phone?.slice(0, 3) || ''
            ownerComplete.MemberExtension._office_phone = phone || ''
            break
          case 'Home':
            ownerComplete.MemberExtension._lada_home = phone?.slice(0, 3) || ''
            ownerComplete.MemberExtension._home_phone = phone || ''
            break

          default:
            break
          }
          switch (typeofPhone2) {
          case 'Mobile':
            ownerComplete.MemberExtension._area_code = phone2?.slice(0, 3) || ''
            ownerComplete.MemberExtension._contact_phone = phone2?.slice(3, phone2.length) || ''
            break
          case 'Office':
            ownerComplete.MemberExtension._lada_office = phone2?.slice(0, 3) || ''
            ownerComplete.MemberExtension._office_phone = phone2?.slice(3, phone2.length) || ''
            break
          case 'Home':
            ownerComplete.MemberExtension._lada_home = phone2?.slice(0, 3) || ''
            ownerComplete.MemberExtension._home_phone = phone2?.slice(3, phone2.length) || ''
            break

          default:
            break
          }
          switch (typeofPhone3) {
          case 'Mobile':
            ownerComplete.MemberExtension._area_code = phone3?.slice(0, 3) || ''
            ownerComplete.MemberExtension._contact_phone = phone3?.slice(3, phone3.length) || ''
            break
          case 'Office':
            ownerComplete.MemberExtension._lada_office = phone3?.slice(0, 3) || ''
            ownerComplete.MemberExtension._office_phone = phone3?.slice(3, phone3.length) || ''
            break
          case 'Home':
            ownerComplete.MemberExtension._lada_home = phone3?.slice(0, 3) || ''
            ownerComplete.MemberExtension._home_phone = phone3?.slice(3, phone3.length) || ''
            break

          default:
            break
          }
        }
        ownerComplete.MemberProfileSocialNetworks = []

        const createSocialNetwork = (network: string, value: string, _recnum?: string) => {
          const recnum = ownerTable.memberUtils.MemberProfileSocialNetwork?.find((social) => social.title === network)?.recnum
          const payloadSocialNetwork = {
            Company: ownerComplete.MemberProfilesRelateds.company || 0,
            Recnum: recnum ? Number(recnum) : 0,
            Application: ownerComplete.MemberProfilesRelateds.application || '',
            CodeSocialNetwork: network,
            UserSocialNetwork: value,
            IdrelacionclubProfile: ownerComplete.MemberProfilesEmail[0]?.IdrelacionclubProfile || 0,
          }

          if(value === 'DELETE' && recnum) {
            ownerComplete.MemberProfileSocialNetworks.push(payloadSocialNetwork)
          } else if (value !== 'DELETE') {
            ownerComplete.MemberProfileSocialNetworks.push(payloadSocialNetwork)
          }
        }


        facebook ? createSocialNetwork('FACE', facebook) : createSocialNetwork('FACE', 'DELETE')
        instagram ? createSocialNetwork('INST', instagram) : createSocialNetwork('INST', 'DELETE')
        twitter ? createSocialNetwork('TWIT', twitter) : createSocialNetwork('TWIT', 'DELETE')
        youtube ? createSocialNetwork('YOUT', youtube) : createSocialNetwork('YOUT', 'DELETE')



        if (!ownerComplete.MemberProfilesRelated)
          if (ownerComplete.MemberProfilesRelateds)
            ownerComplete.MemberProfilesRelated = ownerComplete.MemberProfilesRelateds

        ownerComplete.MemberProfilesRelated.name =
          ownerTable.memberUtils.firstname + ' ' + ownerTable.memberUtils.lastname

        ownerComplete.MemberProfilesRelateds.name =
          ownerTable.memberUtils.firstname + ' ' + ownerTable.memberUtils.lastname

        // @ts-ignore
        return ownerComplete
      }
    }
    return null
  }

  public async postOwner(payload: Payload<SaveOwnerPayloadDto>): Promise<void> {
    return await this.store.saveOwner(payload)
  }

  public async saveOwner(): Promise<Boolean> {
    const updated = this.getOwnersPayload()
    if (updated) {
      await this.postOwner(updated)
    }
    return Promise.resolve(this.store.readSaveOwnerResponse)
  }
}
