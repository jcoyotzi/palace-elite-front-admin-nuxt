<!--
  - Copyright (c) 2022.
  - Author: Enrique Nieto Martínez
  - Company: Palace Resorts
  - Created:  2022 / 11 / 17 9:43:58
  -
  -->

<template>
  <div class="pe-text-right pe-flex pe-grow pe-justify-end">
    <p>{{ price }}</p>
    <small
      v-if="showProvisionAppliedText"
      class="pe-text-blue-light pe-ml-0"
      >{{ provisionAppliedText }}</small
    >
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {BookingStore} from '~/src/ui/store/bookingStore'

const enum ProvisionNames {
  ANNIVERSARY = 'anniversary',
  INCENTIVE = 'incentive',
  NEVER = '-'
}

@Component({
  name: 'PEYDailyRatePrice'
})
export default class PEYDailyRatePrice extends Vue {
  @Prop({type: String, default: '-1'})
  readonly price!: string

  @Prop({type: Object, default: {}})
  private readonly provisions!: any

  bookingStore = new BookingStore()

  get provisionApplied(): string {
    let result = ProvisionNames.NEVER
    if (this.provisions !== null && this.provisions !== undefined) {
      const {anniversary, incentive} = this.provisions

      if (anniversary !== undefined) {
        const hasAnniversary = Object.hasOwn(anniversary, 'provision')
        if (hasAnniversary) {
          result = ProvisionNames.ANNIVERSARY
        }
      }
      if (incentive !== undefined) {
        const hasIncentive = Object.hasOwn(incentive, 'provision')
        if (hasIncentive) {
          result = ProvisionNames.INCENTIVE
        }
      }
    }
    return result
  }

  get provisionAppliedText(): string {
    switch (this.provisionApplied) {
      case ProvisionNames.ANNIVERSARY:
        return '-30%'
        break

      case ProvisionNames.INCENTIVE:
        return '-20%'
        break
      default:
        return ProvisionNames.NEVER
        break
    }
  }

  get showProvisionAppliedText(): boolean {
    return this.provisionAppliedText !== ProvisionNames.NEVER
  }

  get priceStyles(): string {
    const discounted = 'pe-line-through'
    return this.showProvisionAppliedText ? discounted : ''
  }

  get fee() {
    return this.bookingStore.referralProgram!.fee
  }
}
</script>

<style scoped></style>
