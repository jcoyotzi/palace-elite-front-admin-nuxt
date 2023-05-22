/*
function GetModeReservation(Room: string | undefined | null, _IsMultiCategoryEngine: boolean, Adva: boolean = false) {
  let ModeReservation = GetVariables['mr'];
  //Si es preferencial y ademas ADVA, hacemos que devuelva 1
  //para que busque los contratos tipo adva
  if (ModeReservation === "2" && Adva) {
    ModeReservation = "1";
  }
  if (_IsMultiCategoryEngine && (Room != undefined || Room != null)) {
    //Ahora se obtiene la categoria segun la suite del motor
    var CustomModeReservation = $(`#CustomModeReservation${Room}`).val();
    ModeReservation = CustomModeReservation != undefined ? CustomModeReservation : ModeReservation;
  }
  return ModeReservation;
}
*/
