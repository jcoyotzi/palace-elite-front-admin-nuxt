import {DateDiff} from './DateDiff'

export function GetBaseReservationExchangeByMinNights(_reservationExchangesPromotion: any) {
  var rsv = null

  if (_reservationExchangesPromotion[0].length > 0) {
    var Nights = DateDiff(
      _reservationExchangesPromotion[0][0].Arv_date,
      _reservationExchangesPromotion[0][0].Depart_dt
    )

    _reservationExchangesPromotion[0].forEach(function (r: any) {
      var CurMktNights = DateDiff(r.Arv_date, r.Depart_dt)

      if (Nights! <= CurMktNights!) {
        rsv = r
      }
    })
  }
  return rsv
}
