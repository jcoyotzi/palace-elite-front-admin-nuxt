import {EnumMarkets} from '~/src/app/common/domain/enums/markets'
import {EnumReservationCategory, EnumReservationIds, EnumRoomCategory} from '../../entities/enum/pipelinesEnum'

export const referralMinPax = {
  conditions: {
    any: [
      {
        all: [
            {
                fact: 'reservationId',
                operator: 'equal',
                value: EnumReservationIds.REFERRAL
            },
            {
                fact: 'adults',
                operator: 'greaterThanInclusive',
                value: 2
            }
        ]
      },
      {
        all: [
            {
                fact: 'reservationId',
                operator: 'notEqual',
                value: EnumReservationIds.REFERRAL
            },
            {
                fact: 'adults',
                operator: 'greaterThanInclusive',
                value: 1
            }
        ]
      },
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        canTravel: true
      }
    }
  }
}
