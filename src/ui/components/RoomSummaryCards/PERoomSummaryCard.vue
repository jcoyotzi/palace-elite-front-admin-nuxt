<template>
  <section>
    <PEButton
      :without-border="true"
      :class="titleButtonClasses"
      @click="toggleState"
    >
      <span :class="titleWrapClasses">
        <span
          v-if="icon"
          :class="iconWrapClasses"
        >
          <PEIcon :class="upIconClasses">chevron-up</PEIcon>
          <PEIcon :class="downIconClasses">chevron-down</PEIcon>
        </span>
        <span :class="titleClasses">
          {{ title }}
        </span>
      </span>
    </PEButton>
    <div :class="contentClasses">
      <PERoomBadge
        v-if="showBadge"
        v-bind="badgeProps"
      />
      <div :class="topContentClasses">
        <PERoomSlider
          class="md:grow"
          :images="images"
          :show-tour-icon="showTourIcon"
          @open-modal="toggleTour"
        >
        </PERoomSlider>
        <PESummaryPanel
          v-bind="summaryProps"
          @open-details="removeRoom"
        >
        </PESummaryPanel>
      </div>
      <PETab
        class="!pe-bg-black-light/50"
        :start-closed="true"
        :items="items"
      />
      <PETourModal
        v-if="tour"
        :show="showTour"
        :source="tour"
        @close-modal="toggleTour"
      />
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ExpansibleItem} from '@pr-elite-components-library/lib/src/types/PERoomSummaryCard/ExpansibleItem.interface'
import {Image} from 'app/property/domain/entities/propertyEntity'
import {Button} from '~/interfaces/GenericTypes/Button.interface'
import PESummaryPanel from '~/src/ui/components/RoomSummaryCards/PESummaryPanel.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {LockOffRoomAccessCode, PresidentialSecondRoomCodes} from "app/roomAccess/domain/data/lockOffRoomAccessCode";
import {BookingBenefitStore} from "~/src/ui/store/strapi/bookingBenefitsStore";

@Component({
  name: 'PERoomSummaryCard',
  components: {
    PESummaryPanel
  }
})
export default class PERoomSummaryCard extends Vue {
  // region Props

  @Prop({type: Boolean, default: false})
  readonly icon!: boolean

  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: Number})
  readonly lastRooms!: number

  @Prop({type: Array, required: true})
  readonly images!: Image[]

  @Prop({type: Number, required: true})
  readonly max!: number

  @Prop({type: String, required: true})
  readonly area!: string

  @Prop({type: String, required: true})
  readonly creditLimit!: string

  @Prop({type: String, default: '--'})
  readonly publicRate!: string

  @Prop({type: String, required: true})
  readonly totalRate!: string

  @Prop({type: Number})
  readonly totalNights!: number

  @Prop({type: String})
  readonly tour!: string

  @Prop({type: Array, required: true})
  readonly items!: ExpansibleItem[]

  @Prop({type: Object, required: true})
  readonly button!: Button

  // endRegion Props

  isOpen = false

  bookingbenefitStore = new BookingBenefitStore()

  showTour = false

  bookingStore = new BookingStore()

  get showTourIcon() {
    return !!this.tour
  }

  get showBadge() {
    return !!this.lastRooms
  }

  toggleState() {
    if (this.icon) this.isOpen = !this.isOpen
  }

  toggleTour() {
    this.showTour = !this.showTour
  }

  removeRoom() {
    const currentRoomIndex = this.bookingStore.currentRoomIndex
    const category = this.bookingStore.reservation[currentRoomIndex].roomSelected?.selectedCategory.RealCode

    if (category && (LockOffRoomAccessCode.includes(category) || PresidentialSecondRoomCodes.includes(category))) {
      this.bookingStore.setRoomsFromPresidentialFlow()
      this.bookingbenefitStore.emptySelectedBenefits()
      this.bookingStore.setMaxStep(0)
      this.bookingStore.setCurrentRoom(0)
      this.$nuxt.$router.push(this.localePath('/booking/categorySelector'))
    } else {
      this.bookingStore.removeRoomByIndex(currentRoomIndex)
      this.$nuxt.$router.push(this.localePath('/booking/categorySelector'))
    }
  }

  // region Bindings

  get badgeProps() {
    const label = `Last ${this.lastRooms} rooms`
    return {
      label,
      class: [
        'pe-absolute',
        'pe-left-2.5',
        'pe-top-2.5',
        'pe-z-10',
        'pe-min-w-[120px]',
        'md:pe-left-0',
        'md:pe-min-w-[190px]'
      ]
    }
  }

  get summaryProps() {
    return {
      roomCapacity: this.max,
      roomArea: this.area ?? '',
      creditLimit: this.creditLimit,
      publicRate: this.publicRate,
      totalRate: this.totalRate,
      totalNights: this.totalNights,
      button: this.button,
      isRatesLoading: false,
      class: ['pe-w-full', 'pe-min-w-[55%]', 'pe-max-w-[768px]']
    }
  }

  // endregion Bindings

  // region Classes

  get titleButtonClasses() {
    return [
      'pe-block',
      'pe-w-full',
      '!pe-bg-black-light/50',
      'pe-py-5',
      'pe-md:py-8',
      'pe-px-5',
      'pe-md:px-10',
      'pe-rounded-t-md',
      'pe-rounded-b-none',
      'pe-no-underline',
      'pe-z-10'
    ]
  }

  get titleWrapClasses() {
    return ['pe-flex', 'pe-w-full', 'md:pe-items-center', 'pe-px-10']
  }

  get iconWrapClasses() {
    return ['pe-relative', 'pe-h-8', 'pe-w-8']
  }

  get iconClasses() {
    return [
      'pe-absolute',
      'pe-right-0',
      'pe-bottom-0',
      'pe-w-8',
      'pe-fill-transparent',
      'pe-stroke-blue-light',
      'pe-transition-[height]',
      'pe-duration-300',
      'text-blue-light'
    ]
  }

  get upIconClasses() {
    return [this.isOpen ? 'pe-h-8' : 'pe-h-0', ...this.iconClasses]
  }

  get downIconClasses() {
    return [!this.isOpen ? 'pe-h-8' : 'pe-h-0', ...this.iconClasses]
  }

  get titleClasses() {
    return [
      'pe-font-serif',
      'pe-text-2xl',
      'pe-font-medium',
      'pe-text-white',
      'sm:pe-font-normal',
      'pe-uppercase',
      'pe-ml-5'
    ]
  }

  get contentClasses() {
    return [
      this.isOpen ? 'pe-scale-y-1 pe-opacity-1 pe-h-auto' : 'pe-scale-y-0 pe-opacity-0 pe-h-0',
      'pe-overflow-hidden',
      'pe-relative',
      'pe-transition-[transform,_opacity]',
      'pe-origin-top'
    ]
  }

  get topContentClasses() {
    return ['pe-flex', 'pe-flex-col', 'md:pe-flex-row']
  }

  //  endregion Classes
}
</script>

<style scoped></style>
