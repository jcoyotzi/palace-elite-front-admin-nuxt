import {Component, Vue} from 'vue-property-decorator'

@Component
export default class CreditCardMixin extends Vue {
  last4DigitsCard(cardNumber: string): string {
    if (cardNumber === '') {
      return ''
    }

    return `•••• •••• •••• ${cardNumber}`
  }

  financialStamp(cardStamp: string): string {
    const cardStamps = {
      VISA: 'visa',
      MC: 'mastercard',
      AMEX: 'AMEX'
    }
    // @ts-ignore
    return cardStamps[cardStamp] ?? ''
  }
}
