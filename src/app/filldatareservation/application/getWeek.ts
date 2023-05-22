import dayjs, {extend} from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import {DateDiff} from 'app/filldatareservation/legacyBin/DateDiff'
extend(weekOfYear)

export function GetWeek(arrivalDate: string) {
  var anio = 0
  var day = 1
  var dateFirstSaturday = null
  var isSaturday = false
  var week = 0
  anio = dayjs().get('year')
  var firstDateYear = new Date(anio, 0, 1, 0, 0, 0, 0)
  // 01 enero año de reserva 0 horas

  // obtenemos el primer sabado(6 del año
  // si el primer dia del año es sabado
  if (firstDateYear.getDay() === 6) {
    dateFirstSaturday = firstDateYear
  } else {
    while (!isSaturday || day < 7) {
      dateFirstSaturday = dayjs(firstDateYear).add(day, 'day').toDate()
      // verificamos si el siguiente dia es sabado
      if (dateFirstSaturday.getDay() === 6) {
        isSaturday = true
        break
      }
      isSaturday = false
      day++
    }
  }

  var days = DateDiff(dateFirstSaturday!, dayjs(arrivalDate).toDate())
  /// redondeamos al numero superior
  week = days ? Math.ceil(days / 7) : 1
  // }
  if (week < 1) week = 1
  return week
}

export function GetWeekOfYear(arrivalDate: string) {
  return dayjs(arrivalDate).week()
}
