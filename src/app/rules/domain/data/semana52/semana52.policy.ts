import {EnumMarkets} from '~/src/app/common/domain/enums/markets'
import {lastWeeks} from './semana52'
import {EnumReservationCategory, EnumRoomCategory} from '../../entities/enum/pipelinesEnum'

export const Semana52Reservation = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            operator: 'in',
            value: [
              EnumReservationCategory.REFERIDOS,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.BONO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'arrivalDate',
            operator: 'in',
            value: lastWeeks
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            operator: 'in',
            value: [
              EnumReservationCategory.REFERIDOS,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.BONO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'departureDate',
            operator: 'in',
            value: lastWeeks
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        semana52: true
      }
    }
  }
}
