function getLastDayOfYear(year: any) {
  const lastDay = new Date(year, 11, 31)
  const lastDayWeek = new Date(year, 11, 31)
  const initialDay = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay2 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay3 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay4 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay5 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay6 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  const initialDay7 = new Date(lastDay.setDate(lastDay.getDate() - 1))
  return [
    initialDay7.toISOString().slice(0, 10),
    initialDay6.toISOString().slice(0, 10),
    initialDay5.toISOString().slice(0, 10),
    initialDay4.toISOString().slice(0, 10),
    initialDay3.toISOString().slice(0, 10),
    initialDay2.toISOString().slice(0, 10),
    initialDay.toISOString().slice(0, 10),
    lastDayWeek.toISOString().slice(0, 10)
  ]
}
// 👇️ Current Year
const currentYear = new Date().getFullYear()
const nextYear = currentYear + 1
// // console.log('Current-year', currentYear)

export const lastWeek = getLastDayOfYear(currentYear)
export const lastWeek2 = getLastDayOfYear(nextYear)
export const lastWeeks = lastWeek.concat(lastWeek2)
// // console.log('LAST WEEKS', lastWeeks)
