import {Component, Vue} from 'vue-property-decorator'
import {TypesCards} from '~/src/app/payments/domain/enum/typesCards'

@Component
export default class FormatCardAsterizkTermination extends Vue {
  formatToAsterizkTerminationCard(length: any, format: string = ''): string {
    for (let i = 0; i < length; i++) {
      format += '*'
    }
    return format
  }

  formatSpaceAsterizk(length: any, cardTermination: string, cardStamp: string = '') {
    const format = this.formatToAsterizkTerminationCard(length)

    if (TypesCards.AMEX !== cardStamp)
      return `${format.replace(/.{1,4}/g, '$&  ')} ${cardTermination}`

    return `**** ****** *${cardTermination}`
  }

  formatSpaceAsterizkHtml(length: any, cardTermination: string, cardStamp: string = '') {
    const format = this.formatToAsterizkTerminationCard(length)

    if (TypesCards.AMEX !== cardStamp)
      return `${format.replace(/.{1,4}/g, '$&  ')} ${cardTermination}`

    return `****   ******   *${cardTermination}`.replaceAll(' ', '&nbsp;')
  }
}
