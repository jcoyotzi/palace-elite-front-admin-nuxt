<template>
  <section>
    <div class="pe-h-24 pe-rounded-2xl pe-outline pe-outline-2 pe-outline-blue-light">
      <div class="pe-grid pe-h-24 pe-grid-cols-3 pe-place-items-center pe-gap-4">
        <div class="pe-col-span-4">
          <span class="pe-font-semibold pe-text-white">{{ label }}</span>
          <p
            v-if="hasRemainingBalance"
            class="pe-text-center"
          >
            <span class="pe-font-sans pe-text-[24px] pe-text-white">{{
              remaningBalanceLabel
            }}</span>
            <span class="pe-font-sans pe-text-[16px] pe-text-white">
              {{ currency }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'

import { usdExactFormatter, usdFormatter } from '~/src/app/common/mapper/moneyFormatters'

@Component({
  name: 'pe-label-block',
  i18n
})
export default class PELabelBlock extends Vue {
  @Prop({required: true}) remainingBalance!: number

  @Prop({required: false, default: 'USD'}) currency!: string

  get label(): string {
    return this.hasRemainingBalance
      ? (this.$t('Remaining Balance') as string)
      : (this.$t('No Remaining Balance') as string)
  }

  get hasRemainingBalance(): boolean {
    return this.remainingBalance > 0
  }

  get remaningBalanceLabel() {
    return this.hasRemainingBalance ? `${usdExactFormatter.format(this.remainingBalance)}` : ``
  }
}
</script>
<style lang="scss"></style>
