import {Component, Vue} from 'vue-property-decorator'
import dayjs from 'dayjs'
@Component
export default class DateFormaterProvition extends Vue {
  dateFormaterProvition(date: string, typeMonth: any = 'short', locale: string = 'en-US'): string {
    if (date !== undefined && date !== null) {
      const d = new Date()
      const day = date.substr(8, 2)
      const year = date.substr(0, 4)

      const monthNumber = parseInt(date.substr(5, 2))
      d.setMonth(monthNumber - 1)

      const monthLetter = d.toLocaleString(locale, {
        month: typeMonth
      })
      const monthValid = `${monthLetter.charAt(0).toUpperCase()}${monthLetter.substr(1, 2)}`
      return `${monthValid} ${day}, ${year}`
    }
    return ''
  }

  dateFormaterProvitionBetween(
    dates: any,
    separator: string = 'to',
    typeMonth: any = 'short'
  ): string {
    let {startDate, endDate} = dates
    const notFounds = [undefined, null]

    if (!notFounds.includes(startDate) && !notFounds.includes(endDate)) {
      startDate = startDate.substr(0, 10)
      endDate = endDate.substr(0, 10)

      const sDate = new Date(`${startDate}T00:00:00`)
      const eDate = new Date(`${endDate}T00:00:00`)

      const startDay = startDate.substr(8, 2).replace(/(^|-)0+/g, '$1')
      const endDay = endDate.substr(8, 2).replace(/(^|-)0+/g, '$1')

      const startYear = startDate.substr(0, 4)
      const endYear = endDate.substr(0, 4)

      sDate.setMonth(parseInt(startDate.substr(5, 2)) - 1)
      eDate.setMonth(parseInt(endDate.substr(5, 2)) - 1)

      const startMonthLetter = sDate.toLocaleString('en-US', {
        month: typeMonth
      })

      const endMonthLetter = eDate.toLocaleString('en-US', {
        month: typeMonth
      })

      let startFormat = `${startMonthLetter} ${startDay}, ${startYear}`
      const endFormat = `${endMonthLetter} ${endDay}, ${endYear}`

      if (startYear === endYear) {
        startFormat = `${startMonthLetter} ${startDay}`
        return `${startFormat} ${separator} ${endFormat}`
      }

      return `${startFormat} ${separator} ${endFormat}`
    }
    return ''
  }

  dateFormaterProvitionBetweenTimeZone(
    dates: any,
    separator: string = 'to',
    typeMonth: any = 'short'
  ): string {
    let {startDate, endDate} = dates
    const notFounds = [undefined, null]

    if (!notFounds.includes(startDate) && !notFounds.includes(endDate)) {
      startDate = dayjs(startDate)
      endDate = dayjs(endDate)

      const sDate = new Date(startDate.toDate())
      const eDate = new Date(endDate.toDate())

      const startDay = startDate.get('date')
      const endDay = endDate.get('date')

      const startYear = startDate.get('year')
      const endYear = endDate.get('year')

      sDate.setMonth(parseInt(startDate.get('month')))
      eDate.setMonth(parseInt(endDate.get('month')))

      const startMonthLetter = sDate.toLocaleString('en-US', {
        month: typeMonth
      })

      const endMonthLetter = eDate.toLocaleString('en-US', {
        month: typeMonth
      })

      let startFormat = `${startMonthLetter} ${startDay}, ${startYear}`
      const endFormat = `${endMonthLetter} ${endDay}, ${endYear}`

      if (startYear === endYear) {
        startFormat = `${startMonthLetter} ${startDay}`
        return `${startFormat} ${separator} ${endFormat}`
      }

      return `${startFormat} ${separator} ${endFormat}`
    }
    return ''
  }
}
