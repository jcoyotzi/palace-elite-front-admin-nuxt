import {CloneObject} from './CloneObject'

export function FixDatesInObject(Obj: any) {
  if (Obj == null) return Obj
  // Primero verificaremos si estamos en la zona horaria correcta
  // Y si es así... solo regresamos el objeto tal cual
  // var TestDate = new Date();
  //if (TestDate.getTimezoneOffset() == __OfficialOffset) return Obj;
  // Si es un arreglo... debemos de tratarlo como tal
  if (Array.isArray(Obj)) {
    var FixedArray = new Array()
    for (let i = 0; i < Obj.length; i++) FixedArray.push(CloneObject(Obj[i], true))

    return FixedArray
  } // si resulta que no es la correcta... creamos una copia del mismo con las fechas corregidas
  else return CloneObject(Obj, true)
}
