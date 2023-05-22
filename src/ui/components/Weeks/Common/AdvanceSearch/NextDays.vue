<template>
  <div class="pe-mt-10">
    <PERadioButtons
      v-model="selectedNextDay"
      class="!pe-gap-x-[6px] !pe-gap-y-[6px]"
      v-bind="nextDays"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import { NextDaysIDEnum } from '~/src/app/bookings/domain/enums/nextDaysEnum'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  name: 'NextDays',
  components: {}
})
export default class NextDays extends Vue {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get nextDays() {
    return this.bookingsStore.nextDays
  }

  get selectedNextDay(): NextDaysIDEnum {
    return this.bookingsStore.ASSelectedNextDay
  }

  set selectedNextDay(value: NextDaysIDEnum) {
    this.bookingsStore.setASSelectedNextDay(value)
  }

  @Watch('selectedNextDay')
  onSelectedNextDayChange() {
    if (this.selectedNextDay !== NextDaysIDEnum.EMPTY) {
      const findDaysToAdd = this.nextDays.options.find(item => item.value === this.selectedNextDay)

      const startDate = this.formatDate(new Date())
      const endDate = this.formatDate(this.addDays(new Date(), Number(findDaysToAdd?.daysToAdd || 0)))
      
      this.bookingsStore.setASTempStartDate(startDate)
      this.bookingsStore.setASTempEndDate(endDate)
      this.bookingsStore.setASStartDate(startDate)
      this.bookingsStore.setASEndDate(endDate)
    }
  }

  addDays(date: Date, days: number): Date {
    return new Date(date.setDate(date.getDate() + days))
  }

  addMonths(date: Date, months: number): Date {
    return new Date(date.setMonth(date.getMonth() + months))
  }

  formatDate(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${this.addZero(month)}-${this.addZero(day)}`
  }

  addZero(number: number): string {
    return number < 10 ? `${0}${number}` : `${number}`
  }
}
</script>
