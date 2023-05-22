<template>
  <div class="pe-flex pe-justify-center w-full">
    <div class="rounded-[5px] bg-black-light !p-0 w-full">
      <div class="grid grid-cols-12">
        <!-- #region Property selector -->
        <div
          class="align-center col-span-4 flex cursor-pointer items-center border-r border-[#DBDADA7F] px-2"
          @click="show('selectingProperty')"
        >
          <PEBookingInfo
            class="align-start text-whit break-words"
            first-icon="map-pin"
            :rooms-label="selectedPropertyText"
          />
        </div>
        <!-- #endregion -->
        <!-- #region Date selector -->
        <!--        <div
          class="align-center col-span-3 flex cursor-pointer items-center border-r border-[#DBDADA7F] px-[8px]"
          @click="show('selectingCalendar')"
        >
          <pe-booking-desktop-range-selected
            :check-in="selectedFromDisplay"
            :check-out="selectedToDisplay"
          />
        </div>-->
        <!-- #endregion -->
        <!-- #region Room selector -->
        <div class="align-center pe-col-span-6 pe-flex pe-cursor-pointer pe-items-center">
          <div
            class="pe-px-[28px] pe-h-full pe-flex"
            @click="show('selectingCalendar')"
          >
            <pe-booking-desktop-range-selected
              :check-in="selectedFromDisplay"
              :check-out="selectedToDisplay"
              @click="show('selectingCalendar')"
            />
          </div>

          <div class="border-r border-[#DBDADA7F] h-full w-[1px]" />

          <div
            class="pe-px-[28px] pe-h-full pe-flex"
            @click="show('selectingRoom')"
          >
            <pe-booking-desktop-room-selector
              :rooms-length="roomsLength"
              :total-guests="totalGuests"
            />
          </div>
        </div>
        <!-- #endregion -->
        <!-- #region Button -->
        <div
          class="pe-align-center pe-col-span-2 pe-flex pe-cursor-pointer pe-items-center"
          @click="submitData"
        >
          <PEButton
            :loading="loading"
            :class="buttonCompressedStyle"
            class="pe-h-full pe-flex-grow !pe-rounded-l-none pe-bg-blue-dark !pe-justify-center"
            solid
            uppercase
          >
            {{ bookingButtonText }}
          </PEButton>
        </div>
        <!-- #endregion -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

import PEBookingInfo from './PEBookingInfo.vue'
import PeBookingDesktopRangeSelected from '~/src/ui/components/BookingWidget/atoms/PeBookingDesktopRangeSelected.vue'
import PeBookingDesktopRoomSelector from '~/src/ui/components/BookingWidget/atoms/PeBookingDesktopRoomSelector.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'

@Component({
  name: 'DesktopDisplay',
  components: {
    PeBookingDesktopRoomSelector,
    PeBookingDesktopRangeSelected,
    PEBookingInfo
  }
})
export default class DesktopDisplay extends Vue {
  @Prop({type: String, default: ''}) selectedPropertyText!: string
  @Prop({type: String, default: ''}) selectedFromDisplay!: string
  @Prop({type: String, default: ''}) selectedToDisplay!: string
  @Prop({type: String, default: ''}) roomLabeltoDisplay!: string
  @Prop({type: String, default: ''}) guestsLabeltoDisplay!: string
  @Prop({type: String, default: ''}) bookingButtonText!: string
  @Prop({type: [String, Number], default: ''}) roomsLength!: number | string
  @Prop({type: [String, Number], default: ''}) totalGuests!: number | string
  @Prop({type: Boolean, default: false})
  readonly compressButton!: boolean 

  bookingStoreInstance = new BookingStore() // Guardar en Ls

  get buttonCompressedStyle() {
    return {
      '!px-[0]': this.compressButton
    }
  }

  @Emit('removeDropdown')
  removeDropdown() {}

  @Emit('show')
  show(value: string) {
    return value
  }

  @Emit('submitData')
  submitData() {}

  get loading() {
    return this.bookingStoreInstance.isLoading
  }
}
</script>
