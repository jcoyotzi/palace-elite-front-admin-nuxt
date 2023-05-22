export function GetModeReservation(
  Room: any,
  ModeReservation: any,
  _IsMultiCategoryEngine: any,
  CustomReservation: any
) {
  // var ModeReservation = GetVariables["mr"]; // 2,, 4 ,5
  //Si es preferencial y ademas ADVA, hacemos que devuelva 1
  //para que busque los contratos tipo adva
  /*if (ModeReservation === "2" && Adva) {
    ModeReservation = "1";
  }*/
  /*if (_IsMultiCategoryEngine && (Room != undefined || Room != null)) {
    //Ahora se obtiene la categoria segun la suite del motor
    // var CustomModeReservation = $(`#CustomModeReservation${Room}`).val();
    const CustomModeReservation = CustomReservation
    ModeReservation = CustomModeReservation != undefined ? CustomModeReservation : ModeReservation
  }*/
  return ModeReservation
}
