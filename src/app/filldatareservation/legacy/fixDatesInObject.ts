import {cloneObject} from './cloneObject'

export function FixDatesInObject(Obj: any) {
  if (Obj === null) return Obj
  // Primero verificaremos si estamos en la zona horaria correcta
  // Y si es así... solo regresamos el objeto tal cual
  //if (TestDate.getTimezoneOffset() == __OfficialOffset) return Obj;
  // Si es un arreglo... debemos de tratarlo como tal
  if (Array.isArray(Obj)) {
    const FixedArray = []

    for (let i = 0; i < Obj.length; i++) {
      FixedArray.push(cloneObject(Obj[i], true))
    }

    return FixedArray
  } else {
    // Si resulta que no es la correcta... creamos una copia del mismo con las fechas corregidas
    return cloneObject(Obj, true)
  }
}
