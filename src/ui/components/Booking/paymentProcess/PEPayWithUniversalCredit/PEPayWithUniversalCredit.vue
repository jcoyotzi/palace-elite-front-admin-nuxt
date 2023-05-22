<template>
  <section>
    <label class="pe-pb-8 pe-font-semibold pe-uppercase pe-text-white">{{
      $t('Pay with Universal Credit')
    }}</label>
    <p class="pt-2">
      <label class="pe-font-sans pe-text-[16px] pe-text-white"
        >{{ $t('Amount Available') }}:
      </label>
      <span class="pe-font-sans pe-text-[24px] pe-text-white">{{ amountAvaliable }}</span>
      <span class="pe-font-sans pe-text-[16px] pe-text-white">
        {{ currency }}
      </span>
    </p>
    <div class="pe-pt-2 md:pe-pr-10">
      <div class="pe-grid md:pe-grid-cols-1 md:pe-gap-x-10">
        <div class="pe-mb-4 md:pe-mb-6">
          <PEInput
            v-model="amountToUse"
            :label="$t('Amount to use')"
            :mask="amountToUseMask"
            :disabled="disabledAmountToUse"
            @change="useCredits"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {Component, Prop, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'

@Component({
  name: 'pe-pay-with-universal-credit',
  i18n
})
export default class PEPayWithUniversalCredit extends Vue {
  @Prop({required: true}) availableCredits!: number

  @Prop({required: false, default: 'USD'}) currency!: string

  @Prop({required: false, default: 0}) initialAmount!: number

  @Prop({required: true}) maxCreditToUse!: number

  @Prop({required: false, default: false}) disabledAmountToUse!: boolean

  public prefix = '$'

  public amountToUse = ''

  public validatedAmountToUse = 0

  get amountToUseMask() {
    return createNumberMask({
      prefix: '$ ',
      suffix: ` ${this.currency}`,
      includeThousandsSeparator: true,
      allowNegative: false,
      thousandsSeparatorSymbol: ',',
      allowDecimal: true
    })
  }

  get amountAvaliable() {
    if (this.disabledAmountToUse) {
      return `${usdFormatter.format(this.availableCredits)}`
    }
    return ` ${usdFormatter.format(this.availableCredits - this.validatedAmountToUse)}`
  }

  useCredits() {
    if (!this.disabledAmountToUse) {
      let amount = Number(this.clearValue(this.amountToUse))
      if (this.validateNewAmount(amount)) {
        if (amount > this.maxCreditToUse) {
          amount = this.maxCreditToUse
        }
        this.$emit('universalCreditToUse', amount)
        this.validatedAmountToUse = amount
        this.amountToUse = amount.toString()
      } else {
        this.amountToUse = ''
        this.validatedAmountToUse = 0
        this.$emit('universalCreditToUse', 0)
      }
    }
  }

  validateNewAmount(value: number) {
    return value > 0 && value <= this.availableCredits
  }

  clearValue(value: string) {
    return value.replace('$', '').replace(this.currency, '').replace(',', '').trim()
  }
}
</script>
<style lang="scss"></style>
