<template>
  <PEResumeRoomItem
    :key="index"
    :disabled="isNotCurrentRoom(index)"
  >
    <template #title> ROOM SELECTION </template>

    <template #chip-content>
      <div v-if="reservation.roomSelected">
        <PEChip class="bg-blue-light text-[12px] text-white p-[4px] rounded-[5px]">
          Imperial Week
        </PEChip>
      </div>
    </template>

    <template #subtitle>
      <p v-if="reservation.roomSelected">
        {{ reservation.roomSelected.selectedCategory.description }}
      </p>
      <p
        v-else
        class="text-blue-light"
      >
        Select your room
      </p>
    </template>

    <template #content-quick-actions>
      <PEIcon class="text-white">pencil</PEIcon>
      <PEIcon class="text-white">trash-can</PEIcon>
    </template>

    <template #content-actions>
      <p>{{ summaryAdults(reservation.roomsPax.adults) }}</p>
      <p>{{ summaryChildren(reservation.roomsPax.children) }}</p>
      <div class="mb-3 flex justify-between">
        <div class="text-white">
          {{ summarySelectedNights }}
        </div>
      </div>

      <div class="flex justify-between">
        <div class="font-bold">+ 3 REWARD NIGHTS</div>
      </div>
    </template>
  </PEResumeRoomItem>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import dayjs from 'dayjs'
import {selectedNights} from '../../app/calendar/domain/generator/CalendarDataGenerator'
import {ReservationInfo} from 'app/booking/domain/entities/reservationInfo'
import {BookingStore} from '~/src/ui/store/bookingStore'

@Component({
  name: 'RoomItem'
})
export default class RoomItem extends Vue {
  @Prop()
  index!: number

  @Prop()
  reservation!: ReservationInfo

  bookingStore = new BookingStore()

  get summarySelectedNights() {
    const {checkIn, checkOut} = this.bookingStore.getBooking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const word = nights > 1 ? 'nights' : 'night'
    return `${nights} ${word}`
  }

  isNotCurrentRoom(roomIndex: number) {
    return this.bookingStore.currentRoomIndex !== roomIndex
  }

  summaryAdults(adults: number) {
    if (adults === 0) {
      return ''
    }
    const word = adults > 1 ? 'adults' : 'adult'
    return `${adults} ${word}`
  }

  summaryChildren(children: number) {
    if (children === 0) {
      return ''
    }
    const word = children > 1 ? 'children' : 'child'
    return `${children} ${word}`
  }
}
</script>

<style scoped></style>
