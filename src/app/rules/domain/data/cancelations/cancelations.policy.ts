import { EnumReservationIds, RefundableOptions, EnumRoomCategory, FamiliarHotelCodes, AdultHotelCodes } from '../../entities/enum/pipelinesEnum'

export const cancelations = {
  conditions: {
    any: [
      // Referal Bonus Reservations
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'equal',
            value: EnumReservationIds.BONO
          }
        ]
      },
      // NON-REFUNDABLE
      {
        all: [
          {
            fact: 'refundable',
            operator: 'equal',
            value: RefundableOptions.NO_REFUNDABLE
          }
        ]
      },
      // Villas & Residence Suites
      {
        all: [
          {
            fact: 'roomType',
            operator: 'in',
            value:[
              EnumRoomCategory.VILLA,
              EnumRoomCategory.RESIDENCE
            ]
          },
          {
            fact: 'daysToCheckIn',
            operator: 'lessThan',
            value: 31,
          },
        ]
      },
      // Preferential, Referral, Incentive or Anniversary reservations - Familiy oriented
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'in',
            value:[
              EnumReservationIds.PREFERENTIAL,
              EnumReservationIds.REFERRAL,
              EnumReservationIds.INCENTIVE,
              EnumReservationIds.ANIVERSARY,
            ]
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: [
              FamiliarHotelCodes.BP,
              FamiliarHotelCodes.CZ,
              FamiliarHotelCodes.MPC,
              FamiliarHotelCodes.MPG,
              FamiliarHotelCodes.MPS,
              FamiliarHotelCodes.PL,
              FamiliarHotelCodes.ZCJG,
            ]
          },
          {
            fact: 'arrivalInHightWeek',
            operator: 'equal',
            value: true,
          },
          {
            fact: 'daysToCheckIn',
            operator: 'lessThan',
            value: 31,
          },
        ]
      },
      // Imperial, Rewards reservations - Family oriented
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'in',
            value:[
              EnumReservationIds.IMP_NIGHT,
              EnumReservationIds.REWARDS,
              EnumReservationIds.IMP_WEEKS,
            ]
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: [
              FamiliarHotelCodes.BP,
              FamiliarHotelCodes.CZ,
              FamiliarHotelCodes.MPC,
              FamiliarHotelCodes.MPG,
              FamiliarHotelCodes.MPS,
              FamiliarHotelCodes.PL,
              FamiliarHotelCodes.ZCJG,
            ]
          },
          {
            fact: 'arrivalInHightWeek',
            operator: 'equal',
            value: true,
          },
          {
            fact: 'daysToCheckIn',
            operator: 'lessThan',
            value: 31,
          },
        ]
      },
      // Preferential, Referral, Incentive or Anniversary reservations - Adult oriented
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'in',
            value:[
              EnumReservationIds.PREFERENTIAL,
              EnumReservationIds.REFERRAL,
              EnumReservationIds.INCENTIVE,
              EnumReservationIds.ANIVERSARY,
            ]
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: [
              FamiliarHotelCodes.BP,
              FamiliarHotelCodes.CZ,
              FamiliarHotelCodes.MPC,
              FamiliarHotelCodes.MPG,
              FamiliarHotelCodes.MPS,
              FamiliarHotelCodes.PL,
              FamiliarHotelCodes.ZCJG,
              AdultHotelCodes.LBC,
              AdultHotelCodes.SP,
              AdultHotelCodes.ZPLB,
            ]
          },
          {
            fact: 'arrivalInHightWeek',
            operator: 'equal',
            value: false,
          },
          {
            fact: 'daysToCheckIn',
            operator: 'lessThan',
            value: 4,
          },
        ]
      },
      // Imperial, Rewards reservations - Family oriented
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'in',
            value:[
              EnumReservationIds.IMP_NIGHT,
              EnumReservationIds.REWARDS,
              EnumReservationIds.IMP_WEEKS,
            ]
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: [
              FamiliarHotelCodes.BP,
              FamiliarHotelCodes.CZ,
              FamiliarHotelCodes.MPC,
              FamiliarHotelCodes.MPG,
              FamiliarHotelCodes.MPS,
              FamiliarHotelCodes.PL,
              FamiliarHotelCodes.ZCJG,
              AdultHotelCodes.LBC,
              AdultHotelCodes.SP,
              AdultHotelCodes.ZPLB,
            ]
          },
          {
            fact: 'arrivalInHightWeek',
            operator: 'equal',
            value: false,
          },
          {
            fact: 'daysToCheckIn',
            operator: 'lessThan',
            value: 4,
          },
        ]
      },
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        applyCancelationPenalty: true
      }
    }
  }
}
