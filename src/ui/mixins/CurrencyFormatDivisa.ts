import {Component, Vue} from 'vue-property-decorator'

interface currencyFormatI {
  value: string
  prefix?: string
  currencyText?: string
  divisa?: string
  minus?: boolean
  valuefloat?: boolean
}

@Component
export default class CurrencyFormatDivisa extends Vue {
  currencyFormatDivisa({
    value,
    prefix = '$',
    currencyText = '',
    divisa = 'USD',
    minus,
    valuefloat = true,
  }: currencyFormatI): string {
    if (!value) {
      console.error('currencyFormat: value is required')
      return ''
    }

    const currency: string = value.split('.')[0]
    const cents: string = value.split('.')[1]
    let currencyFormatted: string = this.defaultFormat(currency)

    if (cents && valuefloat) currencyFormatted += `.${cents}`
    if (prefix) currencyFormatted = `${prefix}${currencyFormatted}`
    if (currencyText) currencyFormatted = `${currencyFormatted} ${currencyText}`
    if (minus) currencyFormatted = `- ${currencyFormatted}`

    currencyFormatted = `${currencyFormatted} ${divisa}`

    return currencyFormatted
  }

  defaultFormat(currency: string): string {
    return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
