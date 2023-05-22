import {SaveBeneficiaryPayloadDto} from '../dto/saveBeneficiaryPayloadDto'
import {BeneficiarieDTO} from '../dto/beneficiarieDTO'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {UseAuth} from '~/src/ui/store/auth'
import {BeneficiaryStore} from '~/src/ui/store/beneficiaryStore'

export class SaveBeneficiaryAdapter {
  public store = new BeneficiaryStore()
  public authStore = new UseAuth()

  public getBeneficiariesPayload(): Payload<SaveBeneficiaryPayloadDto> | null {
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

  public mapDetails(): SaveBeneficiaryPayloadDto['infoMemberProfileDetails'] | null {
    if (this.store.readBeneficiaryDetails) {
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
      } = this.store.readBeneficiaryDetails

      if (this.store.readSelectedBeneficiary) {
        const beneficiaryTable = this.store.readSelectedBeneficiary
        const beneficiaryComplete: BeneficiarieDTO = this.store.readBeneficiariesComplete.filter(
          (item: any) =>
            item.MemberProfilesRelateds.idprofileopera ===
            beneficiaryTable.memberUtils.idprofileopera
        )[0]
        switch (typeOfPhone) {
        case 'Mobile':
          beneficiaryComplete.ClBenefi.CELL_PHONE = phone || ''
          break
        case 'Office':
          beneficiaryComplete.ClBenefi.OFFICE_PHONE = phone || ''
          break
        case 'Home':
          beneficiaryComplete.ClBenefi.HOME_PHONE = phone || ''
          break

        default:
          break
        }
        switch (typeofPhone2) {
        case 'Mobile':
          beneficiaryComplete.ClBenefi.CELL_PHONE = phone2 || ''
          break
        case 'Office':
          beneficiaryComplete.ClBenefi.OFFICE_PHONE = phone2 || ''
          break
        case 'Home':
          beneficiaryComplete.ClBenefi.HOME_PHONE = phone2 || ''
          break

        default:
          break
        }
        switch (typeofPhone3) {
        case 'Mobile':
          beneficiaryComplete.ClBenefi.CELL_PHONE = phone3 || ''
          break
        case 'Office':
          beneficiaryComplete.ClBenefi.OFFICE_PHONE = phone3 || ''
          break
        case 'Home':
          beneficiaryComplete.ClBenefi.HOME_PHONE = phone3 || ''
          break

        default:
          break
        }

        if (
          !beneficiaryComplete.MemberProfileSocialNetworks ||
          beneficiaryComplete.MemberProfileSocialNetworks.length < 1
        ) {
          beneficiaryComplete.MemberProfileSocialNetworks = []
        }

        const networks = [
          {value: facebook, title: 'FACE', checked: false},
          {value: instagram, title: 'INST', checked: false},
          {value: twitter, title: 'TWIT', checked: false},
          {value: youtube, title: 'YOUT', checked: false}
        ]

        const createSocialNetwork = (network: string, value: string) => {
          beneficiaryComplete.MemberProfileSocialNetworks.push({
            Company: beneficiaryComplete.MemberProfilesRelateds.company || 0,
            Application: beneficiaryComplete.MemberProfilesRelateds.application || '',
            CodeSocialNetwork: network,
            UserSocialNetwork: value,
            IdrelacionclubProfile:
              beneficiaryComplete.MemberProfilesEmail[0]?.IdrelacionclubProfile || 0
          })
        }

        networks.map((network, n) => {
          if (beneficiaryComplete.MemberProfileSocialNetworks.length > 0)
            return beneficiaryComplete.MemberProfileSocialNetworks.map((i, z) => {
              if (i.CodeSocialNetwork === network.title && !network.checked) {
                network.checked = true
                beneficiaryComplete.MemberProfileSocialNetworks[z].UserSocialNetwork =
                  network.value || ''

                return true
              }
              if (
                !network.checked &&
                z === beneficiaryComplete.MemberProfileSocialNetworks.length - 1
              ) {
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

        beneficiaryComplete.MemberProfilesRelated = beneficiaryComplete.MemberProfilesRelateds

        beneficiaryComplete.MemberProfilesRelated.name =
          beneficiaryTable.memberUtils.firstname + ' ' + beneficiaryTable.memberUtils.lastname

        beneficiaryComplete.MemberProfilesRelateds.name =
          beneficiaryTable.memberUtils.firstname + ' ' + beneficiaryTable.memberUtils.lastname

        // @ts-ignore
        return beneficiaryComplete
      }
    }
    return null
  }

  public async postBeneficiary(payload: Payload<SaveBeneficiaryPayloadDto>): Promise<void> {
    return await this.store.saveBeneficiary(payload)
  }

  public async saveBeneficiary(): Promise<Boolean> {
    const updated = this.getBeneficiariesPayload()
    if (updated) {
      await this.postBeneficiary(updated)
    }
    if (!this.store.readSaveBeneficiaryResponse) return Promise.resolve(false)
    return Promise.resolve(true)
  }
}
