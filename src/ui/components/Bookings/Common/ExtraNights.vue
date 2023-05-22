<template>
  <div>
    <div class="pe-my-2 pe-text-black-gray pe-font-semibold pe-uppercase pe-text-[12px]">
      {{ $t('extraNights') }}
    </div>
    <div class="pe-text-[16px] pe-font-normal pe-font-sans">
      {{ getFromDates(detailSelected.arv_date, detailSelected.depart_dt) }}
      <div class="pe-flex pe-text-[16px] pe-font-normal pe-font-sans">
        {{ labelNights }}
        (<span class="pe-mt-1 pe-text-blue-light pe-text-[12px] pe-cursor-pointer">
          {{ $t('showDailyRates') }} </span
        >)
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'

@Component({
  i18n
})
export default class ExtraNights extends Mixins(DateFormaterProvition, CurrencyFormatDivisa) {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get detailSelected() {
    return this.bookingsStore.detailSelected
  }

  get labelNights(): string {
    return `${this.$t('nights', {number: this.detailSelected.nights})}`
  }

  get separator(): string {
    return this.$t('to') as string
  }

  get locale() {
    return this.$i18n.locale
  }

  getFromDates(startDate: string, endDate: string): string {
    return `${this.$t('from')} ${this.dateFormaterProvitionBetween(
      {startDate, endDate},
      this.separator
    )}`
  }
}
</script>
