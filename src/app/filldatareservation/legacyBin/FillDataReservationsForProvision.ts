import {Context} from "app/filldatareservation/legacyBin/fillDataReservations";
import {GetCurrentSuiteEngine} from "app/filldatareservation/legacyBin/getCurrentSuiteEngine";
import {RoomFolio} from "app/filldatareservation/domain/roomFolio";
import {GetRoomType} from "app/filldatareservation/legacyBin/GetRoomType";
import {InfoUserMember} from "app/filldatareservation/domain/infoUserMember";

export function FillDataReservationsForProvision(
  Context: Context,
  infoUserMember: InfoUserMember,
  _PreferentialRates: any,
  agency: string,
  IsMultiCategoryEngine: boolean,
  IsProvisionalReservation: boolean,
  _MultiSelectedProvision: any,
  isImperialsModeReservation: any,
  isBonusModeReservation: any,
  _PaxExtraIndexedReservation: any,
  _PaxIndexedReservation: any,
  reservationRateCodes: any,
  cleverContract: string,
) {
  const index = Context.Index;
  // TODO: MULTI ENGINE
  // var RoomInfoCollected = _ReservationsInfoCollected[(_IsMultiCategoryEngine) ? GetRoomType(index) : GetCurrentSuiteEngine()];
  const RoomInfoCollected = {
    Refundable: false,
  };

  const IsLockOff = Context.IsLockOff;

  const roomCurrentByEngine = GetCurrentSuiteEngine(
    IsMultiCategoryEngine,
    Context._CurrentSuiteMultiCategory,
    Context.rm_type,
  );

  const OriginalRoom = IsLockOff && Context.OriginalRmtype != undefined ? Context.OriginalRmtype : roomCurrentByEngine

  try {
    const reserva = new RoomFolio();

    const roomTypeResult = GetRoomType(
      Context.Index,
      Context.RoomAccess,
      Context.rm_type,
      IsMultiCategoryEngine,
      Context._RoomTypesRelated,
    )

    reserva.Rm_type = IsMultiCategoryEngine ? roomTypeResult : IsLockOff ? OriginalRoom : roomCurrentByEngine; // RoomRelated

    let ContractRoom = "";

    if (IsMultiCategoryEngine && IsProvisionalReservation) {
      ContractRoom = reserva.Rm_type + (RoomInfoCollected.Refundable ? "" : "_NR") + _MultiSelectedProvision[index - 1].TYPE;
    }
    else if (!IsMultiCategoryEngine && IsProvisionalReservation) {
      ContractRoom = reserva.Rm_type + (Context.Refundable ? "" : "_NR") + _MultiSelectedProvision[index - 1].TYPE;
    }
    else if (IsLockOff) {
      ContractRoom = OriginalRoom + (Context.Refundable ? "" : "_NR");
    }
    else {
      ContractRoom = roomTypeResult;
    }
    reserva.Index = index;
    reserva.Recnum = 0;
    // reserva.Folio = $(String.format("#hidFolio{0}",index)).val(); //Folio Part2
    reserva.Folio = Context.Folio;
    reserva.Hotel = Context.Hotel;
    reserva.Last_name = infoUserMember.UserMember.Last_name;
    reserva.First_name = infoUserMember.UserMember.First_name;
    reserva.Share = Context.Share;
    reserva.Type = "R";
    reserva.Status = "R";
    reserva.Guest_cd = "I";
    reserva.Mail_name = infoUserMember.UserMember.Email;
    reserva.Agency_cd = agency;
    reserva.Agency_name = 'SOCIOS PALACE ELITE';
    reserva.Ref = 'M';
    reserva.Bed = 'K';
    reserva.Rooms = 1;

    const AdultTmp = Context.adults;

    reserva.Adult = _PreferentialRates.IsActive ? AdultTmp : (AdultTmp > 2 ? 2 : AdultTmp);

    // TODO
    // var KidTmp = GetKids();
    const KidTmp = 0;

    reserva.Kid = _PreferentialRates.IsActive ? KidTmp : AdultTmp >= 2 ? 0 : KidTmp;

    const ChildTmp = Context.childs;

    reserva.Child = _PreferentialRates.IsActive ? ChildTmp : AdultTmp >= 2 ? 0 : ChildTmp;

    // reserva.Baby = GetBabys();
    reserva.Baby = 0

    if (IsMultiCategoryEngine) {
      // var MultiPax = _OriginalPaxIndexedReservation[reserva.Rm_type];
      // [efdiaz] 03/09/2020 - Si es BONO o IMPERIALES se toma configuacion de PAX EXTRA
      const MultiPax = isBonusModeReservation || isImperialsModeReservation ?
        _PaxExtraIndexedReservation[reserva.Rm_type] :
        _PaxIndexedReservation[reserva.Rm_type];

      reserva.Adult = MultiPax.Adults;
      reserva.Kid = MultiPax.Kids;
      reserva.Child = MultiPax.Childs;
      reserva.Baby = MultiPax.Babys;
      // --Extra's
      reserva.Xtra_adu = MultiPax.Xtra_adu;
      reserva.Xtra_chd = MultiPax.Xtra_chd;
      reserva.Xtra_kid = MultiPax.Xtra_kid;
    }

    reserva.Rel_folio = 0;
    reserva.Arv_date = Context.ArrivalDateStr;
    reserva.Nights = Context.Nights;
    reserva.Depart_dt = Context.DepartureDateStr;
    reserva.Year = Context.Year;
    reserva.Week = Context.Week;
    // reserva.Contract = GetContractProvision();

    reserva.Contract = IsProvisionalReservation ? cleverContract : "";
    // reserva.Contract = ContractMultiple == "" ? "" : ContractMultiple.Code;

    reserva.Co = Context.Company; //  ObtenerNumero(WCtrlSetMember_InfoUserMember.UserMember.Company);
    reserva.Member = Context.Member; //  WCtrlSetMember_InfoUserMember.UserMember.Application;
    reserva.UserMember = infoUserMember.UserMember;
    reserva.Vouch = "";

    reserva.ent_term = "public";

    return reserva;

  } catch (ex) {
    // PublishException(String.format('FillDataReservationsForProvision: {0}', ex.message));
  }
}
