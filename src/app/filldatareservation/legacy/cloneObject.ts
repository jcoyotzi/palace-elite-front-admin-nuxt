import {ChangeDateToOfficialZone} from './changeDateToOfficialZone'

export function cloneObject(Obj: any, AnalizeDateZone: boolean) {
  const Copy: any = {}
  let NewDate

  for (let key in Obj) {
    const value = Obj[key]

    if (value == null) {
      Copy[key] = value
    } else {
      // si es una fecha, construye un nuevo objeto de fecha
      if (typeof value.getFullYear == 'function') {
        NewDate = AnalizeDateZone ? ChangeDateToOfficialZone(value) : value
        Copy[key] = new Date(NewDate.getTime())
      }
      // si es un objeto, clona sus atributos
      else if (Array.isArray(value)) {
        const FixedArray = []

        for (let i = 0; i < value.length; i++) {
          FixedArray.push(cloneObject(value[i], true))
        }

        Copy[key] = value
      } else if (typeof value == 'object') Copy[key] = cloneObject(value, AnalizeDateZone)
      // clona sus atributos
      else {
        Copy[key] = value
      }
    }
  }
  return Copy
}
