import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'

export interface TransportationPromoMapperPayload {
  room: ReservationInfo
  provitionsPromotions: any
}

export function mapTransportationPromo({
  room,
  provitionsPromotions
}: TransportationPromoMapperPayload): Array<any> {
  if (room && room.benefits) {
    const returned = room.benefits.map(itemBenefit => {
      if (itemBenefit?.recNumPromo === '') {
        return
      }
      const benefit = provitionsPromotions?.find((itemPromo: any) => {
        return itemPromo.Recnum === Number(itemBenefit.recNumPromo)
      })
      const promo = {
        RecNumPromo: benefit.Recnum,
        CodePromo: benefit.Code,
        Status: 1,
        PromotionsPackage: null,
        PromotionByRsvBloqued: null,
        AdditionalBenefitSelected: [
          // Aqui push el selected BENEFIT
          {
            RecnumPromotionBenefit: itemBenefit.benefitId,
            RecnumPromo: itemBenefit.recNumPromo,
            Amount: itemBenefit.unitPrice * itemBenefit.roomData.units!,
            RatesDetail: [
              {
                Rate: itemBenefit.unitPrice,
                PaxType: 'Adult',
                RateType: 'Base'
              }
            ]
          }
        ]
      }
      return promo
    })
    return returned
  }
  return []
}
