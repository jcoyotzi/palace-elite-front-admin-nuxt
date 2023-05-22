import {getPaxForReservation} from './getPaxForReservation'
import {IsFamilyProv} from './IsFamilyProv'
import {GetPaxFromRsvExchangeSelected} from './GetPaxFromRsvExchangeSelected'

export function GetPaxForRsvPromotionFree(
  Context: any,
  __PromoExchangeFreeselected: any,
  isImperialsModeReservation: boolean,
  isBonusModeReservation: boolean,
  isRsvFreeModeReservation: boolean,
  _FamilyProvs: any,
  ProvId: any,
  _reservationExchangesPromotion: any
) {
  Context.ComesFrom = 'engine'
  Context.OmitCheckPaxFree = true
  //Obtenemos distribucion de pax Original
  var CurrentPax = getPaxForReservation(
    Context,
    __PromoExchangeFreeselected,
    isImperialsModeReservation,
    isBonusModeReservation,
    isRsvFreeModeReservation,
    IsFamilyProv,
    ProvId,
    _reservationExchangesPromotion
  )

  var PaxExchange = GetPaxFromRsvExchangeSelected(_reservationExchangesPromotion)
  var Pax = {Adults: 0, Childs: 0, Kids: 0, Babys: 0, Xtra_adu: 0, Xtra_chd: 0, Xtra_kid: 0}
  if (Context.IsFamily && Context.Index == 2) {
    return Pax
  }
  //Si los adultos actuales exceden de los pax de Canje
  Pax.Adults = CurrentPax.Adults > PaxExchange.Adults ? PaxExchange.Adults : CurrentPax.Adults
  Pax.Xtra_adu = CurrentPax.Adults - Pax.Adults
  Pax.Kids = CurrentPax.Kids > PaxExchange.Kids ? PaxExchange.Kids : CurrentPax.Kids
  Pax.Xtra_kid = CurrentPax.Kids - Pax.Kids
  Pax.Childs = CurrentPax.Childs > PaxExchange.Childs ? PaxExchange.Childs : CurrentPax.Childs
  Pax.Xtra_chd = CurrentPax.Childs - Pax.Childs
  Pax.Babys = CurrentPax.Babys

  return Pax
}
