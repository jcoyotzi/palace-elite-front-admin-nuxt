import {Owner} from '../dto/getOwnersResponseDto'
import {OwnersStore} from '~/src/ui/store/ownersStore'
import {UseAuth} from '~/src/ui/store/auth'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {GetOwnersPayloadDto} from '~/src/app/owners/domain/dto/getOwnersPayloadDto'
import {MembershipTable, Roles} from '~/src/app/common/domain/entities/membershipTable'

export class GetOwnersAdapter {
  public store = new OwnersStore()
  public authStore = new UseAuth()

  public getOwnersPayload: Payload<GetOwnersPayloadDto> = {
    params: {
      application: this.authStore.userAffiliationId,
      company: this.authStore.userCompany,
      isNational: this.authStore.isNational
    }
  }

  public mapOwners(): MembershipTable[] {
    return this.store.readOwners.map((item: Owner): MembershipTable => {
      const {
        firstname,
        lastname,
        password,
        email,
        // City,
        // Country,
        // Zip,
        SocialSecurityNumber,
        idprofileopera,
        relationship,
        idrelacionclub,
        Language,
        company,
        application,
        membertype,
        memberlevel,
        statusmembresia
      } = item?.MemberProfilesRelateds || {}

      const memberExtension = item?.MemberExtension || {}

      const IsNational =  this.authStore.isNational
      
      const {_PaisDescripcion, _NOMBRE} = item?.InfoCity || {}

      let BIRTHDAY = ''
      let homePhone = ''
      let mobilePhone = ''
      let officePhone = ''
      let Zip = ''

      if (item.ClCowner) {
        BIRTHDAY = item.ClCowner.BIRTHDAY
        homePhone = item.ClCowner.HOME_PHONE
        mobilePhone = item.ClCowner.CELL_PHONE
        officePhone = item.ClCowner.OFFICE_PHONE
        Zip = item.ClCowner.ZIP
      } else {
        mobilePhone = `${memberExtension._area_code}${item.MemberExtension._contact_phone}`
        officePhone = `${memberExtension._lada_office}${item.MemberExtension._office_phone}`
        homePhone = `${memberExtension._lada_home}${item.MemberExtension._home_phone}`
        Zip = item.Member.Zip
      }

      const socialNetworks = item.MemberProfileSocialNetworks.map((network: any) => ({
        title: network.CodeSocialNetwork,
        value: network.UserSocialNetwork,
        recnum: network.Recnum
      }))

      const fullName = firstname + ' ' + lastname

      const getSocialNetwork = (title: any) =>
        socialNetworks.filter((network: any) => network.title === title)

      const owner: MembershipTable = {
        email,
        isOwnerAuthenticated: this.authStore.getLoggedUser?.MemberProfilesRelateds.email === email,
        name: fullName,
        tableData: [
          {
            data: [
              {
                title: 'email',
                value: email
              },
              {
                title: 'city, country',
                value: `${_NOMBRE}, ${_PaisDescripcion}`
              },
              {
                title: 'zip code',
                value: Zip
              },
              // {
              //   title: 'SSN',
              //   value: SocialSecurityNumber
              // },
              {
                title: 'mobile phone',
                value: mobilePhone
              },
              {
                title: 'Office phone',
                value: officePhone
              }
            ]
          }
        ],
        hasPin: !!password,
        memberUtils: {
          firstname,
          lastname,
          password,
          email,
          City: _NOMBRE,
          Country: _PaisDescripcion,
          Zip,
          SocialSecurityNumber,
          idprofileopera,
          relationship,
          idrelacionclub,
          Language,
          company,
          MemberProfileSocialNetwork: socialNetworks,
          application,
          BIRTHDAY,
          mobilePhone,
          homePhone,
          officePhone,
          isGuest: false,
          IsNational,
          membertype,
          memberlevel,
          statusmembresia,
          role: Roles.Owner,
          MemberExtension: {
            _lada_home: '',
            _lada_office: '',
            _area_code: '',
            _contact_phone: '',
            _office_phone: '',
            _home_phone: '',
            _ReferralScheme: item.MemberExtension?._ReferralScheme
          },
          isAdult: true
        }
      }

      owner.tableData.push({
        data: [
          {
            title: 'Facebook',
            value: getSocialNetwork('FACE')[0]?.value || ''
          },
          {
            title: 'Twitter',
            value: getSocialNetwork('TWIT')[0]?.value || ''
          },
          {
            title: 'Instagram',
            value: getSocialNetwork('INST')[0]?.value || ''
          },
          {
            title: 'Youtube',
            value: getSocialNetwork('YOUT')[0]?.value || ''
          }
        ]
      })

      return owner
    })
  }

  public async fetchOwners(payload: Payload<GetOwnersPayloadDto>): Promise<void> {
    return await this.store.getOwners(payload)
  }

  public async getOwners(): Promise<MembershipTable[]> {
    await this.fetchOwners(this.getOwnersPayload)
    this.store.$patch({
      ownersTables: this.mapOwners()
    })
    return Promise.resolve(this.mapOwners())
  }
}
