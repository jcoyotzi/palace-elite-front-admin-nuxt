import { BeneficiarieDTO, MemberProfileSocialNetwork } from '../dto/beneficiarieDTO'
import {MembershipTable, Roles} from '~/src/app/common/domain/entities/membershipTable';

export class BeneficiariesMapper {
  static map(beneficiaries: BeneficiarieDTO[]): MembershipTable[] {
    return beneficiaries.map((beneficiary) => {
      return this.transform(beneficiary)
    })
  }

  static transform(beneficiary: BeneficiarieDTO): MembershipTable {
    const socialNetworks = this.getSocialNetwoks(beneficiary.MemberProfileSocialNetworks);
    return {
      hasPin: false,
      name: `${beneficiary.ClBenefi.FIRTS} ${beneficiary.ClBenefi.LAST}`,
      // @ts-ignore
      memberUtils: {
        firstname: beneficiary.MemberProfilesRelateds.firstname,
        lastname: beneficiary.MemberProfilesRelateds.lastname,
        password: beneficiary.MemberProfilesRelateds.password,
        email: beneficiary.MemberProfilesRelateds.email,
        City: beneficiary.MemberProfilesRelateds.City,
        Country: beneficiary.MemberProfilesRelateds.Country,
        Zip: beneficiary.MemberProfilesRelateds.Zip,
        SocialSecurityNumber: beneficiary.MemberProfilesRelateds.SocialSecurityNumber,
        idprofileopera: beneficiary.MemberProfilesRelateds.idprofileopera,
        relationship: beneficiary.MemberProfilesRelateds.relationship,
        idrelacionclub: beneficiary.MemberProfilesRelateds.idrelacionclub,
        Language: beneficiary.MemberProfilesRelateds.Language,
        company: beneficiary.MemberProfilesRelateds.company,
        BIRTHDAY: "",
        mobilePhone: beneficiary.ClBenefi.CELL_PHONE,
        homePhone: beneficiary.ClBenefi.HOME_PHONE,
        officePhone: beneficiary.ClBenefi.OFFICE_PHONE,
        application: beneficiary.MemberProfilesRelateds.application,
        membertype: beneficiary.MemberProfilesRelateds.membertype,
        memberlevel: beneficiary.MemberProfilesRelateds.memberlevel,
        statusmembresia: beneficiary.MemberProfilesRelateds.statusmembresia,
        role: Roles.Beneficiary,
        isAdult: true,
        MemberProfileSocialNetwork: [
          {
            title: 'FACE',
            value: socialNetworks.get("FACE") ?? '',
          },
          {
            title: 'TWIT',
            value: socialNetworks.get("TWIT") ?? '',
          },
          {
            title: 'INST',
            value: socialNetworks.get("INST") ?? '',
          },
          {
            title: 'YOUT',
            value: socialNetworks.get("YOUT") ?? '',
          },
        ]
      },
      tableData: [
        {
          data: [
            {
              title: 'email',
              value: beneficiary.MemberProfilesRelateds.email ? beneficiary.MemberProfilesRelateds.email : '-',
            },
            {
              title: 'city, country',
              value: beneficiary.MemberProfilesRelateds.City && beneficiary.MemberProfilesRelateds.Country ?  `${beneficiary.MemberProfilesRelateds.City}, ${beneficiary.MemberProfilesRelateds.Country}` : '-',
            },

            {
              title: 'zip code',
              value: beneficiary.MemberProfilesRelateds.Zip ? beneficiary.MemberProfilesRelateds.Zip : '-',
            },
            {
              title:'',
              value:'',
            },
            {
              title: 'mobile phone',
              value: beneficiary.ClBenefi.CELL_PHONE ? beneficiary.ClBenefi.CELL_PHONE : '-',
            },
            {
              title: 'Office phone',
              value: beneficiary.ClBenefi.OFFICE_PHONE ? beneficiary.ClBenefi.OFFICE_PHONE : '-',
            },
          ],
        },{
          data:[
            {
              title: 'Facebook',
              value: socialNetworks.get("FACE") ?? '-',
            },
            {
              title: 'Twitter',
              value: socialNetworks.get("TWIT") ?? '-',
            },
            {
              title: 'Instagram',
              value: socialNetworks.get("INST") ?? '-',
            },
            {
              title: 'Youtube',
              value: socialNetworks.get("YOUT") ?? '-',
            },
          ]
        }
      ]
    }
  }

  static getSocialNetwoks(socialNetworksDTO: MemberProfileSocialNetwork[]): Map<string, string> {

    const socialNetworks = new Map<string, string>

    socialNetworksDTO.map(socialNetworkDTO => {
      socialNetworks.set(socialNetworkDTO.CodeSocialNetwork, socialNetworkDTO.UserSocialNetwork)
    });

    return socialNetworks;

  }
}
