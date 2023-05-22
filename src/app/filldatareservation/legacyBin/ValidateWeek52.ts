// eslint-disable-next-line camelcase
import {AgregarDias} from "app/filldatareservation/legacyBin/AgregarDias";

export function ValidateWeek52(Arv_date: Date, Depart_dt: Date, Nights: number){

  var dtIni = new Date(Arv_date.getFullYear(), 11, 24);
  var dtFin = new Date(Arv_date.getFullYear(), 11, 31);

  var week52Counter = 0;

  if (Depart_dt < dtIni)
    return 0;
  if (Arv_date > dtFin)
    return 0;

  for (var i = 0; i <= Nights; i++) {
    var Arv_dateAux = AgregarDias(Arv_date, i);

    if (Arv_dateAux >= dtIni && Arv_dateAux <= dtFin)
      week52Counter += 1;
  }
  return week52Counter;
}
