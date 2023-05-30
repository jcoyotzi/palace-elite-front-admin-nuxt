import {Component, Vue} from 'vue-property-decorator'
import {usdExactFormatter} from '~/src/app/common/mapper/moneyFormatters'

interface currencyFormatI {
  value: string | number
  prefix?: string
  currencyText?: string
  divisa?: string
  minus?: boolean
  valuefloat?: boolean
}

@Component
export default class CurrencyFormatDivisa extends Vue {
  currencyFormatDivisa({value, currencyText = '', divisa = 'USD'}: currencyFormatI): string {
    if (!value) {
      console.error('currencyFormat: value is required')
      return ''
    }

    return ` ${usdExactFormatter.format(Number(value))} ${currencyText} ${divisa}`
  }
}
