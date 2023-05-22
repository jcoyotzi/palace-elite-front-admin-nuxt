//Funcion que obtiene pax de reserva canje()
import {GetBaseReservationExchangeByMinNights} from './GetBaseReservationExchangeByMinNights'

export function GetPaxFromRsvExchangeSelected(_reservationExchangesPromotion: any) {
  var Pax = {Adults: 0, Childs: 0, Kids: 0, Babys: 0, Xtra_adu: 0, Xtra_chd: 0, Xtra_kid: 0}
  Pax.Adults = 1

  var BaseRsvExchange: any = GetBaseReservationExchangeByMinNights(_reservationExchangesPromotion)

  if (BaseRsvExchange != null) {
    Pax.Adults = BaseRsvExchange.adult
    Pax.Xtra_adu = BaseRsvExchange.xtra_adu
    Pax.Kids = BaseRsvExchange.kid
    Pax.Xtra_kid = BaseRsvExchange.xtra_kid
    Pax.Childs = BaseRsvExchange.child
    Pax.Xtra_chd = BaseRsvExchange.xtra_chd
    Pax.Babys = BaseRsvExchange.baby
  }

  return Pax
}
