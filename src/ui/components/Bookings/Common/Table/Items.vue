<template>
  <div class="pe-text-white">
    <div
      v-if="showCountdown"
      class="top-tabs"
    >
      <TabCounter
        :uppercase="false"
        :end-time="endDateCounter"
      />
    </div>
    <Card
      :validate="validate"
      :reservation="reservationComputed"
    >
      <slot />
    </Card>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import dayjs, {extend} from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

import Card from './Card.vue'
import TabCounter from './TabCounter.vue'

extend(utc)
extend(timezone)

@Component({
  components: {
    Card,
    TabCounter
  }
})
export default class BookingsCommonTableItems extends Vue {
  @Prop() readonly reservation!: any

  @Prop({default: false, type: Boolean}) readonly validate!: boolean

  get reservationComputed() {
    return this.reservation
  }

  get date() {
    return new Date(this.reservation.ent_date)
  }

  get endDateCounter() {
    const dateString = this.reservation.ent_date.split('T')[0]
    const time = this.reservation.ent_time.split(':')
    
    const bookingCreationtDate = dayjs(`${dateString}T${Number(time[0]) - 1}:${time[1]}`)
    .add(1, 'days')

    return bookingCreationtDate.toDate()
  }

  get startDateCounter() {
    return new Date(this.reservation.ent_date.substr(0, 19))
  }

  get showCountdown(): boolean {
    return this.reservation.countDown && new Date() <= new Date(this.endDateCounter)
  }
 
  @Emit()
  onOpenMoreDetails() {
    return this.reservation
  }

  // endregion
}
</script>

<style scoped></style>
