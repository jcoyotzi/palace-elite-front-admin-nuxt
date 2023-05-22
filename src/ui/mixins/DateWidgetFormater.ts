import dayjs from 'dayjs'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class DateWidgetFormater extends Vue {
  dateToWidgetDisplayFormat(date: Date): string {
    const displayFormat = 'ddd, DD MMM'
    const d = dayjs(date)
    return d.format(displayFormat)
  }

  dateToWidgetExportFormat(date: Date): string {
    const displayFormat = 'YYYY-MM-DD'
    const d = dayjs(date)
    return d.format(displayFormat)
  }
}
