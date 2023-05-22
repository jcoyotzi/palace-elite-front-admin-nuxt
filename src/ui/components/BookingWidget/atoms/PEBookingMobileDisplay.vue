<template>
  <div class="xl:hidden">
    <div class="pe-container pe-mx-auto pe-p-9">
      <div
        class="ml-auto mb-5 max-h-[35px] pe-w-min cursor-pointer text-center"
        @click="removeDropdown"
      >
         <PE-icon
            class=" pe-text-white"
            :width="33.91"
            :height="33.91"
            >close-icon</PE-icon>
      </div>

      <PEBookingInfo
        class="align-start"
        first-icon="map-pin"
        :rooms-label="selectedPropertyText"
        @click="show('selectingPropertyMobile')"
      />

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
        class="mt-auto text-center !pe-justify-center"
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
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

import PEBookingInfo from './PEBookingInfo.vue'

@Component({
  name: 'MobileDisplay',
  components: {
    PEBookingInfo
  }
})
export default class MobileDisplay extends Vue {
  @Prop({type: String, default: ''}) selectedPropertyText!: string
  @Prop({type: String, default: ''}) selectedFromDisplay!: string
  @Prop({type: String, default: ''}) selectedToDisplay!: string
  @Prop({type: String, default: ''}) roomLabeltoDisplay!: string
  @Prop({type: String, default: ''}) guestsLabeltoDisplay!: string
  @Prop({type: String, default: ''}) bookingButtonText!: string

  @Emit('removeDropdown')
  removeDropdown() {}

  @Emit('show')
  show(value: string) {
    return value
  }

  @Emit('submitData')
  submitData() {}
}
</script>
