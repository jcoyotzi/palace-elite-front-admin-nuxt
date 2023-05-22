import {MembershipTable, Roles} from 'app/common/domain/entities/membershipTable'
import {AddCompanionPayload, AddCompanionPayloadDto} from 'app/companion/domain/dto/addCompanionPayloadDto'

export class CompanionAdapter {
  static map(companion: AddCompanionPayload, isAdult: boolean): MembershipTable {
    return this.transform(companion as AddCompanionPayloadDto, isAdult)
  }

  static transform(companion: AddCompanionPayloadDto, isAdult: boolean): MembershipTable {
    return {
      name: `${companion.firstName} ${companion.lastName}`,
      tableData: [],
      // @ts-ignore
      memberUtils: {
        firstname: companion.firstName,
        lastname: companion.lastName,
        password: '',
        email: companion.email,
        City: companion.city,
        Country: companion.country,
        Zip: companion.zip,
        SocialSecurityNumber: companion.socialSecurityNumber,
        idprofileopera: companion.idProfileOpera,
        relationship: companion.relationship,
        idrelacionclub: companion.idRelacionClub,
        Language: '',
        company: companion.company,
        BIRTHDAY: '',
        mobilePhone: companion.tel,
        homePhone: '',
        officePhone: '',
        application: '',
        InReferral: companion.inReferral,
        isGuest: true,
        IsNational: companion.isNational,
        role: Roles.Guest,
        isAdult,
        MemberProfileSocialNetwork: []
      }
    }
  }
}
