<template>
  <section class="pe-m-0 pe-p-0">
    <BookingMobile
      v-show="true"
      :selected-property-text="selectedProperty?.text"
      :selected-from-display="selectedFromDisplay"
      :selected-to-display="selectedToDisplay"
      :room-labelto-display="roomLabeltoDisplay"
      :guests-labelto-display="guestsLabeltoDisplay"
      :booking-button-text="'View Rates'"
      @removeDropdown="removeDropdown"
      @show="showThis"
      @submitData="submitData"
    />
    <PEBookingOverlay
      class="pe-overflow-auto lg:pe-hidden"
      z-index="pe-z-20"
      :value="dropDownTwo"
    >
      <div class="pe-container pe-mx-auto pe-px-0">
        <div
          class="pe-ml-auto pe-mb-5 pe-mr-4 pe-mt-4 pe-max-h-[35px] pe-w-min pe-cursor-pointer pe-p-5 pe-text-end pe-text-white"
          @click="closeDropdownsContentMobile"
        >
           <PE-icon
            class=" pe-text-white"
            :width="33.91"
            :height="33.91"
            >close-icon</PE-icon>
        </div>

        <div
          v-if="selectingPropertyMobile"
          class="pe-z-[11] pe-mt-4 pe-rounded-[15px]"
        >
          <div class="pe-container pe-mx-auto mt-4 pt-9">
            <PEPropertyListSelect
              v-bind="propertyList"
              variant="map-pin"
              :select-placeholder="selectPlaceholder"
              @onItemChange="onPropertyChangeMobile"
            />
          </div>
        </div>

        <div
          v-show="selectingCalendarMobile"
          class="pe-z-[11] pe-mt-2 pe-rounded-[15px] md:pe-container md:pe-mx-auto"
        >
          <pe-calendar
            class="pe-mx-auto"
            locale="en"
            :range="initialDateRangeSelected"
            :items="items"
            :rate-currency="rateCurrency"
            @apply-dates="applyDates"
          />
        </div>

        <div
          v-if="selectingRoomMobile"
          class="pe-container pe-mx-auto pe-mt-4 pe-rounded-[15px] pe-p-9"
        >
          <PEBookingInfo
            class="pe-align-center pe-mx-2"
            first-icon="bed-icon"
            second-icon="guest-icon"
            divider-background=" bg-transparent"
            :rooms-label="roomSelector.roomsLabelMobile"
            :guests-label="roomSelector.adultsLabelMobile"
            :rooms-value="rooms.length"
            :guests-value="totalGuests"
          />

          <PERoomSelector
            :rooms="rooms"
            v-bind="roomSelectorProps"
            @submitted="selectGuestsMobile"
          />
        </div>
      </div>
    </PEBookingOverlay>
    <div class="bookingmobile pe-flex pe-flex-col pe-items-center xl:pe-hidden">
      <div
        v-if="showModifySearchSummary"
        class="pe-text-white pe-text-center pe-mt-5"
      >
        <div>{{ dateRangeFormatted }}</div>
        <div>{{ totalPeopleFormatted }}</div>
      </div>
    </div>
    <PEBookingOverlay
      :value="isSelectingADesktopOption"
      class="pe-overflow-auto pe-p-0"
      overlay-color="pe-bg-black-light lg:pe-bg-black/80"
      @click="handleRemoveDropdown"
    />
    <div class="booking pe-hidden pe-flex-col pe-justify-center xl:pe-flex pe-w-[1200px]">
      <PEBookingDesktopDisplay
        :selected-property-text="selectedProperty?.text"
        :selected-from-display="selectedFromDisplay"
        :selected-to-display="selectedToDisplay"
        :room-labelto-display="roomLabeltoDisplay"
        :guests-labelto-display="guestsLabeltoDisplay"
        :booking-button-text="bookingButtonText"
        :rooms-length="rooms.length"
        :total-guests="totalGuests"
        :compress-button="compressButton"
        @removeDropdown="handleRemoveDropdown"
        @show="show"
        @submitData="submitData"
      />
      <div v-show="isSelectingADesktopOption">
        <div class="pe-flex pe-justify-center">
          <div
            v-show="selectingProperty"
            class="pe-absolute pe-z-[20] pe-mt-4 pe-max-h-[460px] pe-w-[98vw] pe-overflow-y-auto pe-rounded-[15px] pe-bg-black-light xl:pe-max-h-[40vw] pe-max-w-[1200px]"
          >
            <PE-property-list
              v-bind="propertyList"
              @changedProperty="onPropertyChange"
            />
          </div>

          <div
            v-show="selectingCalendar"
            class="pe-absolute pe-z-[11] pe-mt-4 pe-rounded-[15px] pe-bg-black lg:pe-w-[1080px]"
          >
            <pe-calendar
              :range="initialDateRangeSelected"
              locale="en"
              :items="items"
              :rate-currency="rateCurrency"
              @apply-dates="applyDates"
            />
          </div>

          <div
            class="booking-room-selector pe-absolute pe-z-[11] pe-mt-4 pe-flex pe-w-auto pe-max-w-[73vw] pe-flex-col pe-justify-end pe-rounded-[15px] pe-bg-black-light xl:pe-max-w-[67vw] 2xl:pe-max-w-[55vw]"
          >
            <PERoomSelector
              v-if="selectingRoom"
              :rooms="rooms"
              v-bind="roomSelectorProps"
              @submitted="selectGuests"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import PEBookingWidget from '../BookingWidget/PEBookingWidget.vue'
import BookingMobile from './BuildSearchBookingMobile.vue'

type RangeValue = string | null

export type CalendarRange = {
  start: RangeValue
  end: RangeValue
}

export type selectingOptions =
  | 'selectingProperty'
  | 'selectingCalendar'
  | 'selectingRoom'
  | 'selectingPropertyMobile'
  | 'selectingCalendarMobile'
  | 'selectingRoomMobile'
  | 'selectingMobile'

const startTravelDate = new Date()

startTravelDate.setDate(startTravelDate.getDate() + 14)

const endTravelDate = new Date(startTravelDate)

endTravelDate.setDate(endTravelDate.getDate() + 7)

@Component({
  name: 'build-search-booking',
  components: {
    BookingMobile
  }
})
export default class BuildSearchBooking extends PEBookingWidget {
  showThis(selecting: selectingOptions) {
    this.show('selectingMobile')
    this.show(selecting)
  }

  applyDates(dates: CalendarRange) {
    this.$emit('dates', dates)
    this.onApplyDates(dates)
  }
}
</script>
