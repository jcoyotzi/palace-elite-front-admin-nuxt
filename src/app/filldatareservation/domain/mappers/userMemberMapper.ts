import {injectable} from 'inversify'
import {InfoUserMember} from 'app/filldatareservation/domain/infoUserMember'
import {LegacyUser} from 'app/user/domain/entities/user'

@injectable()
export class userMemberMapper {
  public map(legacyUser: LegacyUser): InfoUserMember {
    const UserMember = legacyUser._UserMember
    return {
      IsInternetUser: legacyUser._IsInternetUser,
      Market: legacyUser._Market,
      MemberRateType: legacyUser._MemberRateType,
      Name: legacyUser._Name,
      ReservationCostType: legacyUser._ReservationCostType,
      SaleDate: legacyUser._SaleDate as any,
      UserMember: {
        Recnum: UserMember._recnum,
        Application: UserMember._application,
        Company: UserMember._company,
        Project: UserMember._project,
        Password: UserMember._password,
        First_name: UserMember._first_name,
        Last_name: UserMember._last_name,
        Birth_string: UserMember._birth_string,
        Membership_status: UserMember._membership_status,
        Physical_address: UserMember._physical_address,
        Marital_status: UserMember._marital_status,
        Spouse_name: UserMember._spouse_name,
        Spouse_birth: UserMember._spouse_birth,
        Spouse_email: UserMember._spouse_email,
        Child_name: UserMember._child_name,
        Child_birth: UserMember._child_birth,
        Favourite_palace_resort: UserMember._favourite_palace_resort,
        Best_time_travel: UserMember._best_time_travel,
        Rank_preference_1: UserMember._rank_preference_1,
        Rank_preference_2: UserMember._rank_preference_2,
        Rank_preference_3: UserMember._rank_preference_3,
        Rank_preference_4: UserMember._rank_preference_4,
        Rank_preference_5: UserMember._rank_preference_5,
        Rank_preference_6: UserMember._rank_preference_6,
        Rank_preference_7: UserMember._rank_preference_7,
        Rank_preference_8: UserMember._rank_preference_8,
        Rank_preference_9: UserMember._rank_preference_9,
        Rank_preference_10: UserMember._rank_preference_10,
        Profile_photo: UserMember._profile_photo,
        Background_set: UserMember._background_set,
        Style_set: UserMember._style_set,
        Lastlogin: UserMember._lastlogin,
        Email: UserMember._email,
        Sendpromotions: UserMember._sendpromotions,
        Createstring: UserMember._createstring,
        Isnational: UserMember._isnational,
        Status: UserMember._status,
        Modif_fecha: UserMember._modif_fecha,
        Modif_user: UserMember._modif_user,
        ReservationAllowed: UserMember._ReservationAllowed,
        Culture: UserMember._culture,
        CancelDesc: UserMember._cancelDesc,
        Membershiplevel: UserMember._membershiplevel,
        Leveldescription: UserMember._leveldescription,
        Lang: UserMember._lang
      }
    }
  }
}
