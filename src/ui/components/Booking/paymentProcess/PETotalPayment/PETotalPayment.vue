<template>
  <section>
    <div
      v-if="showUniversalCredits"
      class="pe-flex pe-flex-wrap pe-justify-between"
    >
      <div>
        <label
          class="pe-font-normal pe-text-white"
          v-show="showTotalPayment"
          >{{ $t('With Universal Credit') }}
        </label>
      </div>
      <div>
        <label class="pl-4 pe-font-normal pe-uppercase pe-text-white">
          {{ universalCredits }}
        </label>
      </div>
    </div>
    <div
      v-if="showCreditCard"
      class="pe-flex pe-flex-wrap pe-justify-between"
    >
      <div>
        <label
          class="pe-font-normal pe-text-white"
          v-show="showTotalPayment"
          >{{ $t('With Credit Card') }}
        </label>
      </div>
      <div>
        <label class="pe-pl-4 pe-font-normal pe-uppercase pe-text-white">
          {{ creditCard }}
        </label>
      </div>
    </div>
    <hr
      v-if="showCreditCard || showUniversalCredits"
      class="pe-mt-4 pe-border-white/20 pe-pt-4"
    />
    <div class="pe-flex pe-flex-wrap pe-justify-between">
      <div>
        <label
          class="pe-font-normal pe-uppercase pe-text-white"
          v-show="showTotalPayment"
        >
          {{ $t('Total Payment') }}
        </label>
      </div>
      <div>
        <label class="pl-4 pe-font-normal pe-uppercase pe-text-white">
          {{ totalPayment }}
        </label>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {usdExactFormatter, usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'

@Component({
  name: 'pe-total-payment',
  i18n
})
export default class PETotalPayment extends Vue {
  @Prop({required: true}) amountUniversalCredits!: number

  @Prop({required: true}) remaningBalance!: number

  @Prop({required: false, default: 'USD'}) currency!: string

  @Prop({required: false, type: Number}) amountCreditCard!: number

  prefix = '$'

  get showUniversalCredits() {
    return this.amountUniversalCredits > 0
  }

  get showCreditCard() {
    return this.amountCreditCard > 0
  }

  get showTotalPayment() {
    return this.remaningBalance > 0
  }

  get universalCredits() {
    return `${usdExactFormatter.format(this.amountUniversalCredits)} ` + `${this.currency} `
  }

  get creditCard() {
    return `${usdExactFormatter.format(this.amountCreditCard)} ` + `${this.currency} `
  }

  get totalPayment() {
    return `${usdExactFormatter.format(this.calculateTotal)} ` + `${this.currency} `
  }

  get calculateTotal(): number {
    return this.remaningBalance
  }
}
</script>
<style lang="scss"></style>
