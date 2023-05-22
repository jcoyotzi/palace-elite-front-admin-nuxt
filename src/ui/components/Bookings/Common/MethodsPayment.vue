<template>
  <div>
    <div class="pe-my-2 pe-text-black-gray pe-font-semibold pe-uppercase pe-text-[12px]">
      {{ $t('methodPaymentUsed') }}
    </div>
    <div
      class="pe-text-[16px] pe-font-normal pe-font-sans pe-flex pe-justify-between"
      v-for="(method, methodIndex) in paymentMethods"
      :key="getKeysIndex('method', methodIndex)"
    >
      <div class="pe-flex">
        {{ paymentMethodName(method.type, method.cardNumber) }}
        <div class="pe-mx-2">-</div>
        <div v-if="method.date">
          {{ $t('expDate') }}
          {{ dateFormaterProvition(method.date, 'short', locale) }}
        </div>
      </div>
      <div v-if="method.amount">
        <label class="pe-pl-1">
          {{ currencyAmount(method.amount) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  i18n
})
export default class MethodPayment extends Mixins(DateFormaterProvition, CurrencyFormatDivisa) {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get paymentMethods() {
    return this.bookingsStore.productsAndPayments.paymentMethods
  }

  currencyAmount(amount: number): string {
    return this.currencyFormatDivisa({value: String(amount)})
  }

  getKeysIndex(name: string, index: number) {
    return `${name}-${index}`
  }

  public get locale() {
    return this.$i18n.locale
  }

  paymentMethodName(paymentMethod: string, cardNumber: string): string {
    return paymentMethod === 'credit_card'
      ? (cardNumber
          ? `${this.$t('ccEndingLabel').toString()} ${cardNumber}`
          : this.$t('ccLabel')
        ).toString()
      : this.$t('ucLabel').toString()
  }
}
</script>
