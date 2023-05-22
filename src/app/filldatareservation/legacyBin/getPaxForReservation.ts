import {IsFamilyProv} from './IsFamilyProv'
import {GetPaxForRsvPromotionFree} from './GetPaxForRsvPromotionFree'

export function getPaxForReservation(
  Context: {
    IsFamily: boolean
    ProvisionId: string
    Index: number
    roomCode: string
    OmitCheckPaxFree: boolean
    OmitModeReservation: boolean
    RoomCode: string
    totalPax: number
    Adults: number
    Childs: number
    Kids: number
    Babys: number
  },
  __PromoExchangeFreeselected: any,
  isImperialsModeReservation: boolean,
  isBonusModeReservation: boolean,
  isRsvFreeModeReservation: boolean,
  _FamilyProvs: any,
  ProvId: any,
  _reservationExchangesPromotion: any
) {
  let OmitCheckPaxFree = Context.OmitCheckPaxFree == undefined ? false : Context.OmitCheckPaxFree // false
  let OmitModeReservation =
    Context.OmitModeReservation == undefined ? false : Context.OmitModeReservation // false
  let CurRoomCode = Context.RoomCode == undefined ? '' : Context.RoomCode

  //Obtenemos de manera general los pax para posteriormente realizar la segmentacion
  let Pax = {
    Adults: 0,
    Childs: 0,
    Kids: 0,
    Babys: 0,
    Xtra_adu: 0,
    Xtra_chd: 0,
    Xtra_kid: 0
  }

  //Verificamos primero si se trata de reservas gratis con promocion
  if (
    isRsvFreeModeReservation &&
    __PromoExchangeFreeselected[0].PromotionFree != undefined &&
    !OmitCheckPaxFree
  ) {
    return GetPaxForRsvPromotionFree(
      Context,
      __PromoExchangeFreeselected,
      isImperialsModeReservation,
      isBonusModeReservation,
      isRsvFreeModeReservation,
      _FamilyProvs,
      ProvId,
      _reservationExchangesPromotion
    )
  }
  //Para combinacion de semanas solo se permite 2 adultos -> el resto en pax extras
  //Para reservas Bono misma logica de pax que imperiales
  if ((isImperialsModeReservation || isBonusModeReservation) && !OmitModeReservation) {
    //Pendiente aplicacion de logica para PFAM 3.3 con provisiones regulares
    //Si es una habitacion Familiar permitir pax en childs
    if (Context.IsFamily) {
      //Logica 2.2
      //No aplica para las Bono
      if (IsFamilyProv(_FamilyProvs, Context.ProvisionId, ProvId) && isImperialsModeReservation) {
        if (Context.Adults > 2) {
          Pax.Adults = 2
          Pax.Xtra_adu = Context.Adults - 2
        }
        if (Context.Adults > 2 || Context.Kids + Context.Childs > 2) {
          Pax.Adults = Context.Adults > 2 ? 2 : Context.Adults
          Pax.Xtra_adu = Context.Adults - 2 < 0 ? 0 : Context.Adults - 2
          //var TwoChildren = Context.Kids >= 2?'kids':Context.Childs>=2?'childs':'';
          var TwoChildren = Context.Childs >= 2 ? 'childs' : Context.Kids >= 2 ? 'kids' : ''
          //kids > 2
          switch (TwoChildren) {
            case 'kids': {
              Pax.Kids = 2
              Pax.Xtra_kid = Context.Kids - 2 < 0 ? 0 : Context.Kids - 2
              Pax.Childs = 0
              Pax.Xtra_chd = Context.Childs
              Pax.Babys = Context.Babys
              break
            }
            case 'childs': {
              Pax.Kids = 0
              Pax.Xtra_kid = Context.Kids
              Pax.Childs = 2
              Pax.Xtra_chd = Context.Childs - 2 < 0 ? 0 : Context.Childs - 2
              Pax.Babys = Context.Babys
              break
            }
            default: {
              Pax.Kids = Context.Kids
              Pax.Xtra_kid = 0
              Pax.Childs = Context.Childs
              Pax.Xtra_chd = 0
              Pax.Babys = Context.Babys
              break
            }
          }
        } else {
          Pax.Adults = 2
          Pax.Xtra_adu = 0
          Pax.Kids = Context.Kids
          Pax.Xtra_kid = 0
          Pax.Childs = Context.Childs
          Pax.Xtra_chd = 0
          Pax.Babys = Context.Babys
        }
      }
      //Logica 3.3
      else {
        const childs = Context.Childs + Context.Kids + Context.Babys

        if (Context.Adults < 3 && (childs === 0 || Context.Childs + Context.Kids + Context.Babys < 3)) {
          Pax.Adults = Context.Adults
          Pax.Childs = Context.Childs
          Pax.Kids = Context.Kids
          Pax.Babys = Context.Babys
        }

        if (Context.Adults >= 3) {
          Pax.Adults = 3
          Pax.Xtra_adu = Context.Adults - 3
          Pax.Childs = Context.Childs
          Pax.Kids = Context.Kids
          Pax.Babys = Context.Babys
        }

        if (Context.Adults < 3 && Context.Childs + Context.Kids + Context.Babys > 3) {
          Pax.Adults = Context.Adults
          Pax.Childs = Context.Childs
          Pax.Kids = Context.Kids
          Pax.Babys = Context.Babys
        }
      }
    } else {
      //Verificamos si tenemos alguina habitacion en el Context
      //Aplicamos los pax base dependiendo de la habitacion.
      var BasePax = CurRoomCode == 'RES' ? 8 : 2
      if (Context.totalPax > BasePax) {
        Pax.Adults = BasePax
        Pax.Xtra_adu = Context.Adults - BasePax
      } else {
        Pax.Adults = BasePax
        Pax.Xtra_adu = 0
      }
      Pax.Babys = Context.Babys
      Pax.Xtra_chd = Context.Childs
      Pax.Xtra_kid = Context.Kids
    }
  } else {
    Pax.Adults = Context.Adults
    Pax.Childs = Context.Childs
    Pax.Kids = Context.Kids
    Pax.Babys = Context.Babys
  }

  //Si es familiar y el index == 2
  if (Context.IsFamily && Context.Index == 2) {
    Pax = {Adults: 0, Childs: 0, Kids: 0, Babys: 0, Xtra_adu: 0, Xtra_chd: 0, Xtra_kid: 0}
  }

  return Pax
}
