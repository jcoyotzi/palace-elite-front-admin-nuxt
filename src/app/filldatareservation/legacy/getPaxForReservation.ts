/*
function getPaxForReservation(Context) {
  var ComesFrom = Context.ComesFrom == undefined ? "engine" : Context.ComesFrom;
  var OmitCheckPaxFree = Context.OmitCheckPaxFree == undefined ? false : Context.OmitCheckPaxFree;
  var OmitModeReservation = Context.OmitModeReservation == undefined ? false : Context.OmitModeReservation;
  var CurRoomCode = Context.RoomCode == undefined ? "" : Context.RoomCode;
  var totalPax = GetTotalPax();
  //Obtenemos de manera general los pax para posteriormente realizar la segmentacion
  var Pax = { Adults: 0, Childs: 0, Kids: 0, Babys: 0, Xtra_adu: 0, Xtra_chd: 0, Xtra_kid: 0 };
  //Verificamos primero si se trata de reservas gratis con promocion
  if (RsvFreeModeReservation() && __PromoExchangeFreeselected[0].PromotionFree != undefined && !OmitCheckPaxFree) {
    return GetPaxForRsvPromotionFree(Context);
  }
  //Para combinacion de semanas solo se permite 2 adultos -> el resto en pax extras
  //Para reservas Bono misma logica de pax que imperiales
  if ((ImperialsModeReservation() || BonusModeReservation()) && !OmitModeReservation) {
    //Pendiente aplicacion de logica para PFAM 3.3 con provisiones regulares
    //Si es una habitacion Familiar permitir pax en childs
    if (Context.IsFamily) {
      //Logica 2.2
      //No aplica para las Bono
      if (IsFamilyProv(Context.ProvisionId) && ImperialsModeReservation()) {
        if (GetAdults() > 2) {
          Pax.Adults = 2;
          Pax.Xtra_adu = GetAdults() - 2;
        }
        if (GetAdults() > 2 || (GetKids() + GetChilds()) > 2) {
          Pax.Adults = GetAdults() > 2 ? 2 : GetAdults();
          Pax.Xtra_adu = (GetAdults() - 2 < 0) ? 0 : GetAdults() - 2;
          //var TwoChildren = GetKids() >= 2?'kids':GetChilds()>=2?'childs':'';
          var TwoChildren = GetChilds() >= 2 ? 'childs' : GetKids() >= 2 ? 'kids' : '';
          //kids > 2
          switch (TwoChildren) {
            case 'kids': {
              Pax.Kids = 2;
              Pax.Xtra_kid = (GetKids() - 2) < 0 ? 0 : (GetKids() - 2);
              Pax.Childs = 0;
              Pax.Xtra_chd = GetChilds();
              Pax.Babys = GetBabys();
              break;
            }
            case 'childs': {
              Pax.Kids = 0;
              Pax.Xtra_kid = GetKids();
              Pax.Childs = 2;
              Pax.Xtra_chd = (GetChilds() - 2) < 0 ? 0 : (GetChilds() - 2);
              Pax.Babys = GetBabys();
              break;
            }
            default: {
              Pax.Kids = GetKids();
              Pax.Xtra_kid = 0;
              Pax.Childs = GetChilds();
              Pax.Xtra_chd = 0;
              Pax.Babys = GetBabys();
              break;
            }
          }

        }
        else {
          Pax.Adults = 2;
          Pax.Xtra_adu = 0;
          Pax.Kids = GetKids();
          Pax.Xtra_kid = 0;
          Pax.Childs = GetChilds();
          Pax.Xtra_chd = 0;
          Pax.Babys = GetBabys();
        }
      }
      //Logica 3.3
      else {
        if (GetAdults() >= 3) {
          Pax.Adults = 3;
          Pax.Xtra_adu = GetAdults() - 3;
          Pax.Childs = GetChilds();
          Pax.Kids = GetKids();
          Pax.Babys = GetBabys();
        }
        if (GetAdults() < 3 && GetTotalMinors() > 3) {
          Pax.Adults = GetAdults();
          Pax.Childs = GetChilds();
          Pax.Kids = GetKids();
          Pax.Babys = GetBabys();

        }
      }

    }
    else {
      //Verificamos si tenemos alguina habitacion en el Context
      //Aplicamos los pax base dependiendo de la habitacion.
      var BasePax = CurRoomCode == "RES" ? 8 : 2;
      if (totalPax > BasePax) {
        Pax.Adults = BasePax;
        Pax.Xtra_adu = GetAdults() - BasePax;
      }
      else {
        Pax.Adults = BasePax;
        Pax.Xtra_adu = 0;
      }
      Pax.Babys = GetBabys();
      Pax.Xtra_chd = GetChilds();
      Pax.Xtra_kid = GetKids();
    }

  }
  else {
    Pax.Adults = GetAdults();
    Pax.Childs = GetChilds();
    Pax.Kids = GetKids();
    Pax.Babys = GetBabys();
  }

  //Si es familiar y el index == 2
  if (Context.IsFamily && Context.Index == 2) {
    Pax = { Adults: 0, Childs: 0, Kids: 0, Babys: 0, Xtra_adu: 0, Xtra_chd: 0, Xtra_kid: 0 };
  }

  return Pax;
}
*/
