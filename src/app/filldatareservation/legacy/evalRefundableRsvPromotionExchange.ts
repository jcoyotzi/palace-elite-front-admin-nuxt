//RefundableOrigin -> Refundable original de la reserva a crear
//[efdiaz] 13/05/2021 - Se aplica restriccion para FREENIGHTS, seran NR
//[efdiaz] 29/05/2021 - Se aplica restriccion para nuevas promociones
/*
function EvalRefundableRsvPromotionExchange(RefundableOrigin, PromotionId){
  try{
    var Refundable = false;
    var CurSelectedRsvPromo = FilterPromotionByRecNumPromotion(PromotionId);
    if( CurSelectedRsvPromo != undefined){
      //Verificamos segu el tipo de reserva que se vaya a generar
      if(__RsvPromotionTargetType == "exchange"){
        Refundable = !CurSelectedRsvPromo.PromotionExchange.NonRefundable;
      }
      else{
        Refundable = !CurSelectedRsvPromo.PromotionFree.NonRefundable;
      }
      //Si existe una promocion actual seleccionada
      return Refundable;
    }
    //si es promocion FREE, se retorna NR
    if(__APPLYFREENIGHTSPROMOTION){
      return false;
    }
    //Si se trata de las nuevas promociones
    if(HasPromotionActiveSelected()){
      //false -> respetamos el origne
      var check = ValidateYCheckIfPromoIsNoRefundableSelected(1);
      return (!check ? RefundableOrigin : false);
    }

    return RefundableOrigin;
  }catch(ex){
    //si es promocion FREE, se retorna NR
    if(__APPLYFREENIGHTSPROMOTION){
      return false;
    }
    return RefundableOrigin;
  }
}
*/
