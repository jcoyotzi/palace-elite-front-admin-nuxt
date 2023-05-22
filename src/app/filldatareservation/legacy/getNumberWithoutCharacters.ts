/*
[vcauich] Created 08/12/2016
Reemplaza multiples caracteres y lo convierte en nuemro
*/
function GetNumberWithoutCharacters(Value: any) {
  var Numero = 0

  if (Value == '') return 0

  var Pattern = /[$,]/gi
  var Number = 0
  var Result = (Value + '').replace(Pattern, '')
  Number = parseFloat(Result)

  if (isNaN(Number)) Numero = 0

  return Number
}
