<template>
  <div class="flex flex-wrap justify-between bg-black-light p-5 md:py-8 md:px-10">
    <div class="mb-5 w-1/2 flex-wrap justify-between md:row-span-2 md:block md:w-auto">
      <div class="mb-5 flex">
        <PEIcon class="mr-3">{{ capacityIcon }}</PEIcon>
        <p class="text-xs text-white md:text-base">
          {{ maxRoomText }} <span>{{ roomCapacity }}</span>
        </p>
      </div>
      <div
        class="mb-5 flex"
        v-if="showRoomArea"
      >
        <PEIcon class="mr-3">room</PEIcon>
        <p class="text-xs text-white md:text-base">
          <span>{{ roomArea }}</span>
        </p>
      </div>
      <div v-if="!isBaglioni" class="mb-5 flex items-start">
        <PEIcon class="mr-3">offer</PEIcon>
        <div>
          <p class="text-xs text-white md:text-base">
            <span>{{ creditLimitComputed }}</span>
          </p>
          <button
            type="link"
            class="text-xs text-blue-light"
            @click="$emit('viewResort')"
            >{{ resortCreditText }}</button
          >
        </div>
      </div>
    </div>
    <div class="flex w-1/2 flex-col md:w-auto">
      <div class="mb-10 text-right">
        <div
          v-if="isRatesLoading"
          class="pe-flex pe-animate-pulse pe-flex-row pe-items-center pe-h-full pe-justify-center pe-space-x-5"
        >
          <div class="pe-flex pe-flex-col pe-space-y-3">
            <div class="pe-w-36 pe-bg-gray-400 pe-h-6 pe-rounded-md"> </div>
          </div>
        </div>
        <div v-else>
          <p class="text-xs text-white md:text-base">
            {{ publicRateText }}:
            <span v-if="isDisabled">{{ $t('noAvailable') }}</span>
            <span
              v-else
              class="line-through"
              >{{ publicRate }} {{ divisa }}</span
            >
          </p>
          <p class="text-2xl text-white usd-prefix">
            <span v-if="isDisabled">{{ $t('noAvailable') }}</span>
            <span v-else>
              {{ totalRateText }}
              <span class="pe-text-[16px]">{{ divisa }}</span>
            </span>
          </p>
          <p class="text-white">{{ totalNightsText }}</p>
        </div>
        <PETooltipRates
          v-if="isAvailableTooltipRates"
          :rates-title="ratesTitle"
          :price-title="priceTitle"
          :price-items="dailyRates"
        />
      </div>
    </div>
    <PEButton
      v-if="isButtonAvailable"
      class="ml-auto"
      v-bind="[button, buttonProps]"
      @click="openDetails"
    >
    </PEButton>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
import {BookingStore} from '../../store/bookingStore'
import i18n from './PESumnaryPanel'

import {Button} from '~/interfaces/GenericTypes/Button.interface'

export enum RoomCapacity {
  max = 4,
  iconFamily = 'family',
  iconGroup = 'people-group'
}

export interface IPriceItems {
  date: string
  dashedPrice: string
  price: string
}

@Component({
  i18n,
  name: 'PESummaryPanel'
})
export default class PESummaryPanel extends Vue {
  @Prop({type: Number, required: true})
  readonly roomCapacity!: number

  @Prop({type: String, required: true})
  readonly roomArea!: string

  @Prop({type: String, required: true})
  readonly creditLimit!: string

  @Prop({type: String, required: true})
  readonly publicRate!: string

  @Prop({type: String, required: true})
  readonly totalRate!: string

  @Prop({type: Number})
  readonly totalNights!: number

  @Prop({type: Object})
  readonly button!: Button

  @Prop({type: Array})
  readonly dailyRates!: IPriceItems[]

  @Prop({type: String, default: 'Daily Rates'})
  readonly ratesTitle!: string

  @Prop({type: String, default: 'Up to'})
  readonly upToText!: string

  @Prop({type: String, default: 'Resort Credit'})
  readonly resortCreditText!: string

  @Prop({type: String, default: 'Max'})
  readonly maxRoomText!: string

  @Prop({type: String, default: 'Public Rate'})
  readonly publicRateText!: string

  @Prop({type: String, default: 'USD'})
  readonly currency!: string

  @Prop({type: Boolean, default: false})
  readonly isImperial!: boolean

  @Prop({type: Boolean, default: true})
  readonly isRatesLoading!: boolean

  @Prop()
  readonly priceTitle!: string

  @Prop()
  readonly skeletonClass!: string

  bookingStore = new BookingStore()

  // Data
  private isMobile: boolean = false

  mounted() {
    this.isMobile = window.innerWidth < 768
  }

  get isBaglioni() {
    return this.bookingStore.isBaglioniBooking
  }

  get isDisabled() {
    return this.isImperial ? false : this.publicRate === '-$1'
  }

  get showRoomArea(): boolean {
    return this.roomArea !== ''
  }

  get divisa(): string {
    return `USD`
  }

  get creditLimitComputed(): string {
    return `${this.upToText} ${this.creditLimit} ${this.divisa}`
  }

  get totalRateText() {
    return this.isImperial ? '$0' : this.totalRate
  }

  get totalNightsText() {
    const word = this.totalNights > 1 ? this.$t('nights') : this.$t('night')
    return `${this.$t('totalFor')} ${this.totalNights} ${word}`
  }

  public get capacityIcon() {
    return this.roomCapacity > RoomCapacity.max ? RoomCapacity.iconFamily : RoomCapacity.iconGroup
  }

  public get buttonProps() {
    return {
      flat: true,
      block: this.isMobile,
      secondary: true,
      uppercase: true,
      class: [
        'font-serif',
        'font-medium',
        'w-full md:w-auto',
        'md:col-span-2',
        'lg:col-span-1',
        'self-start'
      ]
    }
  }

  public get isButtonAvailable() {
    return Object.keys(this.button).length > 0
  }

  public get isAvailableTooltipRates() {
    return this.dailyRates && !this.isDisabled
  }

  public get lblNights() {
    if (this.totalNights) {
      return this.totalNights === 1 ? 'night' : 'nights'
    }
    return ''
  }

  get skeleton() {
    /*
    if (this.bookingStore.skeletonList.length === 0) {
      return false
    }
    const skeletonActive = this.bookingStore.skeletonList.filter((item: string) => {
      return item === this.skeletonClass
    })
    */
    // return skeletonActive.length
    return this.publicRate === '$0'
    // return this.bookingStore.isSkeleton
  }

  // Methods

  @Emit()
  openDetails() {}

  // Hooks
}
</script>

<style lang="scss" scoped>
.usd-prefix:after {
  //add content style after total rate based on currency variable
  content: var(--currency);
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  font-family: 'Open Sans', serif;
}
</style>
