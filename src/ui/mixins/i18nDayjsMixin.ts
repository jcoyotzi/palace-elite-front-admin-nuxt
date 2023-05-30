import dayjs, { extend } from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Vue, Component } from 'vue-property-decorator'

require('dayjs/locale/es')

extend(updateLocale)

dayjs.updateLocale('es', {
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  weekdays: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  weekdaysShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ]
})

@Component
export default class i18nDayjsMixin extends Vue {
  i18nDayjs(formatToTranslate: string, date: any): string {
    const formatTranslated = this.$t(formatToTranslate);

    return dayjs(date).locale(this.$i18n.locale).format(formatTranslated as string)
  }
}