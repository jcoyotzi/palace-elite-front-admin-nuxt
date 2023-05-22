<template>
  <div>
    <button
      data-v-05e9b5e7=""
      disabled
      name=""
    >
      hola
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <!-- TODO: set new namingConvention for CLVRoomTypeCategory -->
    <template v-for="(el, index) of roomsAvailable">
      <PEBookingRoomDetail
        :key="index"
        :area="roomArea(el.roomArea)"
        :is-offer="false"
        :items="[
          {
            header: 'BookingTerms',
            content: el.bookingTerms
          }
        ]"
        :max="el.CLVRoomTypeCategory.max_occupancy"
        :title="el.description"
        bonus-referals=""
        class="mb-8"
        credit-limit=""
        daily-rates=""
        imperial-weeks=""
        non-refundable-rates=""
        public-rate=""
        refund-rate-options=""
        refundable-rates=""
        total-nights=""
        total-rate=""
      />
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {container} from '../../container'
import infoAccessRoom from '../../app/common/types/infoAccessRoom'
import {RoomArea} from '../../app/roomAccess/domain/entities/roomArea'
import {InfoAccessRoomRepository} from '../../app/infoAccessRoom/domain/repositories/infoAccessRoomRepository'
import {BookingStore} from '~/src/ui/store/bookingStore'

@Component({
  name: 'chrisSecretPage'
})
export default class chrisSecretPage extends Mixins() {
  bookingStore = new BookingStore()

  get roomsAvailable() {
    return this.bookingStore.accessRoom
  }

  async mounted() {
    // await this.getRooms()

    const p: InfoAccessRoomRepository = container.get(
      infoAccessRoom.infoAccessRoomServiceRepository
    )
    const result = await p.all({
      company: '5',
      affiliation: '4030396',
      includeDetails: true
    })

    // console.log(result.data)
  }

  // async getRooms() {
  //   await this.bookingStore.getRoomAccess()
  // }

  roomArea(roomArea: RoomArea | null) {
    if (roomArea) {
      return `${roomArea._area} ${roomArea._unit_code}`
    }

    return ''
  }
}
</script>
