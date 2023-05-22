import {EnumMarkets} from '~/src/app/common/domain/enums/markets'
import {EnumReservationCategory, EnumRoomCategory} from '../../entities/enum/pipelinesEnum'

export const PresidentialSuiteMarketUKMaximumStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'in',
        value: [EnumRoomCategory.PRESIDENTIAL, EnumRoomCategory.RESIDENCE, EnumRoomCategory.VILLA]
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMaximal: 14
      }
    }
  }
}

export const PresidentialSuiteMarketNationalMaximumStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'in',
        value: [EnumRoomCategory.PRESIDENTIAL, EnumRoomCategory.RESIDENCE, EnumRoomCategory.VILLA]
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMaximal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketUSAMaximumStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'in',
        value: [EnumRoomCategory.PRESIDENTIAL, EnumRoomCategory.RESIDENCE, EnumRoomCategory.VILLA]
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMaximal: 10
      }
    }
  }
}
