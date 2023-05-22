import {Guest} from '../dto/getGuestsResponseDto'
import {GuestsStore} from '~/src/ui/store/guestsStore'
import {UseAuth} from '~/src/ui/store/auth'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {GetGuestsPayloadDto} from '~/src/app/guests/domain/dto/getGuestsPayloadDto'
import {MembershipTable, Roles} from '~/src/app/common/domain/entities/membershipTable'

export class GetGuestsAdapter {
  public store = new GuestsStore()
  public authStore = new UseAuth()

  public getGuestsPayload: Payload<GetGuestsPayloadDto> = {
    params: {
      application: this.authStore.userAffiliationId,
      company: this.authStore.userCompany,
      isNational: this.authStore.isNational
    }
  }

  public mapGuests(): MembershipTable[] {
    return this.store.readGuests.map((item: Guest): MembershipTable => {
      const {
        firstname,
        lastname,
        password,
        email,
        City,
        Country,
        Zip,
        idprofileopera,
        relationship,
        idrelacionclub,
        Language,
        company,
        application,
        Tel,
        InReferral,
        membertype,
        memberlevel,
        statusmembresia
      } = item.MemberProfilesRelateds

      const socialNetworks = item.MemberProfileSocialNetworks.map((network: any) => ({
        title: network.CodeSocialNetwork,
        value: network.UserSocialNetwork,
        recnum: network.Recnum
      }))

      const getSocialNetwork = (title: any) =>
        socialNetworks.filter((network: any) => network.title === title)

      const guest: MembershipTable = {
        name: firstname + ' ' + lastname,
        tableData: [
          {
            data: [
              {
                title: 'email',
                value: email
              },
              {
                title: 'city, country',
                value: City + ', ' + Country
              },
              {
                title: 'zip code',
                value: Zip
              },
              {
                title: '',
                value: ''
              },
              {
                title: 'Mobile Phone',
                value: Tel
              }
            ]
          }
        ],
        hasPin: !!password,
        // @ts-ignore
        memberUtils: {
          firstname,
          lastname,
          password,
          email,
          City,
          Country,
          Zip,
          SocialSecurityNumber: '',
          idprofileopera,
          relationship,
          idrelacionclub,
          Language,
          company,
          BIRTHDAY: '',
          MemberProfileSocialNetwork: socialNetworks,
          mobilePhone: Tel,
          homePhone: '',
          officePhone: '',
          application,
          InReferral,
          isGuest: true,
          membertype,
          memberlevel,
          statusmembresia,
          role: Roles.Guest,
          isAdult: true
        }
      }

      guest.tableData.push({
        data: [
          {
            title: 'Facebook',
            value: getSocialNetwork('FACE')[0]?.value || ''
          },
          {title: 'Twitter', value: getSocialNetwork('TWIT')[0]?.value || ''},
          {
            title: 'Instagram',
            value: getSocialNetwork('INST')[0]?.value || ''
          },
          {title: 'Youtube', value: getSocialNetwork('YOUT')[0]?.value || ''}
        ]
      })
      return guest
    })
  }

  public mapGuestses(readGuests: any): MembershipTable[] {
    return readGuests.map((item: Guest): MembershipTable => {
      const {
        firstname,
        lastname,
        password,
        email,
        City,
        Country,
        Zip,
        idprofileopera,
        relationship,
        idrelacionclub,
        Language,
        company,
        application,
        Tel,
        InReferral,
        membertype,
        memberlevel,
        statusmembresia
      } = item.MemberProfilesRelateds

      const socialNetworks = item.MemberProfileSocialNetworks.map((network: any) => ({
        title: network.CodeSocialNetwork,
        value: network.UserSocialNetwork,
        recnum: network.Recnum
      }))

      const getSocialNetwork = (title: any) =>
        socialNetworks.filter((network: any) => network.title === title)

      const guest: MembershipTable = {
        name: firstname + ' ' + lastname,
        tableData: [
          {
            data: [
              {
                title: 'email',
                value: email
              },
              {
                title: 'city, country',
                value: City + ', ' + Country
              },
              {
                title: 'zip code',
                value: Zip
              },
              {
                title: '',
                value: ''
              },
              {
                title: 'Mobile Phone',
                value: Tel
              }
            ]
          }
        ],
        hasPin: !!password,
        // @ts-ignore
        memberUtils: {
          firstname,
          lastname,
          password,
          email,
          City,
          Country,
          Zip,
          SocialSecurityNumber: '',
          idprofileopera,
          relationship,
          idrelacionclub,
          Language,
          company,
          BIRTHDAY: '',
          MemberProfileSocialNetwork: socialNetworks,
          mobilePhone: Tel,
          homePhone: '',
          officePhone: '',
          application,
          InReferral,
          isGuest: true,
          membertype,
          memberlevel,
          statusmembresia,
          role: Roles.Guest,
          isAdult: true
        }
      }

      guest.tableData.push({
        data: [
          {
            title: 'Facebook',
            value: getSocialNetwork('FACE')[0]?.value || ''
          },
          {title: 'Twitter', value: getSocialNetwork('TWIT')[0]?.value || ''},
          {
            title: 'Instagram',
            value: getSocialNetwork('INST')[0]?.value || ''
          },
          {title: 'Youtube', value: getSocialNetwork('YOUT')[0]?.value || ''}
        ]
      })
      return guest
    })
  }


  public async fetchGuests(payload: Payload<GetGuestsPayloadDto>): Promise<void> {
    return await this.store.getGuests(payload)
  }

  public async getGuests(): Promise<MembershipTable[]> {
    await this.fetchGuests(this.getGuestsPayload)
    this.store.$patch({
      guestsTables: this.mapGuests()
    })
    return Promise.resolve(this.mapGuests())
  }
}
