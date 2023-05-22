export const __OfficialOffset = 300

export function ChangeDateToOfficialZone(datevalue: Date) {
  // si la fecha tiene la zona horaria oficial no hacemos nada
  if (datevalue.getTimezoneOffset() == __OfficialOffset) return datevalue
  if (datevalue.getTimezoneOffset() == 240) return datevalue
  // get UTC time in msec
  const utc = datevalue.getTime() + datevalue.getTimezoneOffset() * 60000

  // create new Date object for different city
  // using supplied offset
  // return time as a string
  return new Date(utc + 3600000 * -5)
}
