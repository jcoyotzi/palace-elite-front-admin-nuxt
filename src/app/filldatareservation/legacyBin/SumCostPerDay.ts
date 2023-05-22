export function SumCostPerDay(Data: any) {
  var DataArray = []
  for (var h = 0; h < Data.length; h++) {
    var TotalResortAccess = 0,
      TotalAmountWeek52 = 0,
      TotalOutOfSeason = 0,
      TotalThanksGivingDay = 0,
      TotalChargeUpgrade = 0,
      TotalAdditionalCost = 0,
      TotalAditionalCharges = 0,
      TotalGolfRate = 0
    var DataAmount = Data[h]
    //for (var i = 0; i < DataAmount.Details.length; i++) {
    //$.each(DataAmount.Details[i].RmfolioRc,function(index,value){
    DataAmount.Details.forEach(function (value: any, index: any) {
      TotalResortAccess += value.AmountResortAccess
      TotalAmountWeek52 += value.AmountWeek52
      TotalOutOfSeason += value.AmountOutOfSeason
      TotalThanksGivingDay += value.AmountThanksGivingDay
      TotalChargeUpgrade += value.AmountChargeUpgrade
      TotalAdditionalCost += value.AdditionalCost

      //DataAmount.Details[i].AditionalCharges = 0 ;
      //DataAmount.Details[i].Category = DataAmount.Category;
      DataAmount.Details[index].AditionalCharges = 0
      DataAmount.Details[index].Category = DataAmount.Category
    })
    //}
    DataAmount.AmountResortAccess = TotalResortAccess
    DataAmount.AmountWeek52 = TotalAmountWeek52
    DataAmount.AmountOutOfSeason = TotalOutOfSeason
    DataAmount.AmountThanksGivingDay = TotalThanksGivingDay
    DataAmount.AmountChargeUpgrade = TotalChargeUpgrade
    DataAmount.AditionalCharges = 0
    DataAmount.AdditionalCost = TotalAdditionalCost
    Data[h] = DataAmount
    Data[h].__type = new Object()
    DataArray.push(Data[h])
  }
  return DataArray
}
