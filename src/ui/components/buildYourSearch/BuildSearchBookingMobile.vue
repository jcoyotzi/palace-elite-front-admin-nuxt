<template>
  <div class="xl:hidden">
    <div class="pe-container pe-mx-auto pe-p-9">
      <!-- <PEBookingInfo
        class="align-start"
        first-icon="map-pin"
        :rooms-label="selectedPropertyText"
        @click="show('selectingPropertyMobile')"
      /> -->

      <PEBookingInfo
        first-icon="calendar"
        :rooms-label="selectedFromDisplay"
        :guests-label="selectedToDisplay"
        @click="show('selectingCalendarMobile')"
      />

      <PEBookingInfo
        first-icon="bed-icon"
        second-icon="guest-icon"
        :rooms-label="roomLabeltoDisplay"
        :guests-label="guestsLabeltoDisplay"
        @click="show('selectingRoomMobile')"
      />

      <PEButton
        class="mt-auto"
        block
        solid
        uppercase
        @click="submitData"
      >
        {{ bookingButtonText }}
      </PEButton>
    </div>
  </div>
</template>
<script lang="ts">
import {Component} from 'vue-property-decorator'
import MobileDisplay from '../BookingWidget/atoms/PEBookingMobileDisplay.vue'
import PEBookingInfo from '../BookingWidget/atoms/PEBookingInfo.vue'

@Component({
  name: 'MobileDisplay',
  components: {
    PEBookingInfo
  }
})
export default class BookingMobile extends MobileDisplay {}
</script>
