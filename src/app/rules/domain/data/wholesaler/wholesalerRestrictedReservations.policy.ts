import { EnumReservationIds } from '../../entities/enum/pipelinesEnum'

export const wholeSalerRestrictedReservations = {
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
            fact: 'isWholeSaler',
            operator: 'equal',
            value: true,
          },
        ]
      },
      {
        all: [
          {
            fact: 'reservationId',
            operator: 'equal',
            value: EnumReservationIds.BONO
          },
          {
            fact: 'isWholeSaler',
            operator: 'equal',
            value: true,
          },
        ]
      },
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        blockReserve: true
      }
    }
  }
}
