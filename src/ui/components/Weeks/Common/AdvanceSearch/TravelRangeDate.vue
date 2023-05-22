<template>
  <div>
    <ValidationObserver
      tag="div"
      class="w-full"
    >
      <div class="pe-mt-4">
        <ValidationProvider
          v-slot="{errors}"
          vid="startDate"
          :rules="{dateCannotBeGreater: {endDate: end}}"
          tag="div"
          class="pe-mb-7 w-full"
        >
          <PEInputDatePicker
            v-model="start"
            label="Start Date"
            :min-year="minYear"
            :max-year="maxYear"
          />
          <div>
            <p
              v-if="errors"
              class="pe-w-full pe-pt-2 pe-text-red-600"
            >
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>
      </div>
      <div class="pe-mt-8">
        <ValidationProvider
          vid="endDateToValidate"
          tag="div"
          class="pe-mb-7 w-full"
        >
          <PEInputDatePicker
            v-model="end"
            label="End Date"
            :min-year="minYear"
            :max-year="maxYear"
          />
        </ValidationProvider>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import dayjs from 'dayjs'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import { NextDaysIDEnum } from '~/src/app/bookings/domain/enums/nextDaysEnum'

@Component({
  name: 'TravelRangeDate',
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class TravelRangeDate extends Vue {
  // Hooks
  mounted() {
    this.setFormConfiguration()
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get start(): {singleDate: string} {
    return {
      singleDate: this.bookingsStore.ASStartDate || ''
    }
  }

  set start(value: {singleDate: string}) {
    this.bookingsStore.setASStartDate(value.singleDate || '')
    this.verifySelectedNextDay()
  }

  get end(): {singleDate: string} {
    return {
      singleDate: this.bookingsStore.ASEndDate || ''
    }
  }

  set end(value: {singleDate: string}) {
    this.bookingsStore.setASEndDate(value.singleDate || '')
    this.verifySelectedNextDay()
  }

  verifySelectedNextDay() {
    if (
      this.bookingsStore.ASStartDate !== this.bookingsStore.ASTempStartDate
      || this.bookingsStore.ASEndDate !== this.bookingsStore.ASTempEndDate
    ) {
      this.bookingsStore.setASSelectedNextDay(NextDaysIDEnum.EMPTY)
    }
  }

  get minYear(): number {
    return 2012
  }

  get maxYear(): number {
    return dayjs(new Date()).add(2, 'year').year()
  }

  get startDateToValidate(): string {
    return this.bookingsStore.ASStartDate
  }

  set startDateToValidate(value: string) {
    this.bookingsStore.setASStartDate(value)
  }

  get endDateToValidate(): string {
    return this.bookingsStore.ASEndDate
  }

  set endDateToValidate(value: string) {
    this.bookingsStore.setASEndDate(value)
  }

  get locale(): string {
    return this.$i18n.locale
  }

  public setFormConfiguration(): void {
    extend('dateCannotBeGreater', {
      params: ['endDate'],
      //@ts-ignore
      validate: (value, {endDate}) => {
        if (value.singleDate && endDate.singleDate) {
          const start = dayjs(value.singleDate)
          const end = dayjs(endDate.singleDate)
          const isValid = end.diff(start, 'day') >= 0

          return isValid
        }

        return true
      },
      message:
        this.locale === 'en'
          ? 'The start date cannot be greater than the end date.'
          : 'La fecha de inicio no puede ser mayor que la fecha de finalización.'
    })
  }
}
</script>
