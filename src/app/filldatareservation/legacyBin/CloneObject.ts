import {ChangeDateToOfficialZone} from './ChangeDateToOfficialZone'

export function CloneObject(Obj: any, AnalizeDateZone: boolean) {
  var Copy: any = {}
  var NewDate
  for (var key in Obj) {
    var value = Obj[key]
    if (value == null) Copy[key] = value
    else {
      // si es una fecha, construye un nuevo objeto de fecha
      if (typeof value.getFullYear == 'function') {
        NewDate = AnalizeDateZone ? ChangeDateToOfficialZone(value) : value
        Copy[key] = new Date(NewDate.getTime())
      }
      // si es un objeto, clona sus atributos
      else if (Array.isArray(value)) {
        var FixedArray = new Array()
        for (let i = 0; i < value.length; i++) FixedArray.push(CloneObject(value[i], true))
        Copy[key] = value
      } else if (typeof value == 'object') Copy[key] = CloneObject(value, AnalizeDateZone)
      // clona sus atributos
      else Copy[key] = value
    }
  }
  return Copy
}
