import {GetTotalPaxWoBabies} from './GetTotalPaxWoBabys'

export function getRewFullPax(adults = 0, childs = 0) {
  var infants = 0
  var kids = 0
  var xtra_adu = 0
  var xtra_chd = 0
  var xtra_kid = 0

  //Verifica si tiene mas de dos pax
  if (GetTotalPaxWoBabies(adults, childs, kids) > 2) {
    //Validamos que vengan mas de dos adultos
    if (adults > 2) {
      var aux_adu = adults - 2
      adults = 2
      xtra_adu = aux_adu
    } else if (adults == 1) {
      adults = 1
      xtra_adu = 0
    } else {
      adults = adults
    }
    //Si solo tiene un adulto, igual lo demas lo pasamos como extras
  } else {
    adults = adults
  }
  //Asigna la diferencia a pax extra
  //y los demas pax los pasamos como extra
  xtra_kid = kids
  xtra_chd = childs
  //Asigna babys
  infants = infants

  var FullPaxArray = {
    adults: adults,
    infants: infants,
    childs: childs,
    kids: kids,
    xtra_adu: xtra_adu,
    xtra_chd: xtra_chd,
    xtra_kid: xtra_kid
  }
  return FullPaxArray
}
