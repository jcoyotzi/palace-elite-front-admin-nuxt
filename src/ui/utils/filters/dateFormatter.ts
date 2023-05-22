import dayjs from 'dayjs'

const dateFormatter = function (date: Date): string {
  return dayjs(date).format('MMM D, YYYY')
}

export default dateFormatter
