<!-- eslint-disable vue/no-v-html -->
<template>
<div class="pe-w-full">
  <PETabCounter
    v-if="offerExpiration"
    v-bind="offerExpiration"
    :withDays="showDays"
  />
  <article class="pe-w-full pe-min-h-[560px] pe-bg-black-light pe-mb-[60px] pe-rounded-[10px] lg:pe-overflow-hidden">
    <header class="pe-w-full pe-min-h-[77px] pe-bg-black-50 pe-px-9 pe-flex pe-items-center">
      <h1 class="pe-uppercase pe-text-white pe-text-2xl pe-font-serif pe-font-normal">{{ title }}</h1>
    </header>
    <section class="pe-flex pe-flex-col lg:pe-flex-row lg:pe-h-[483px] pe-overflow-hidden">
      <div class="pe-relative pe-w-full lg:pe-w-2/4 pe-h-72 sm:pe-h-full">
        <span
          v-if="specialOffer"
          class="-pe-rotate-45 pe-top-9 -pe-left-11 pe-flex
          pe-justify-center pe-items-center pe-w-48 pe-h-8
          pe-bg-red-700 pe-absolute pe-z-10 pe-text-white
          pe-uppercase pe-text-base">Special offer</span>
        <PERoomSlider
          class="pe-w-full pe-h-full"
          :images="images"
          :show-tour-icon="false"
        >
        </PERoomSlider>
      </div>
      <div class="pe-flex pe-justify-between pe-flex-wrap pe-h-fit lg:pe-w-2/4 pe-w-full pe-p-7 pe-text-base pe-text-white">
        <p class="pe-mb-4 pe-w-full pe-text-justify">{{ summary }}</p>
        <div class="pe-flex pe-flex-col pe-justify-between">
          <div class="[&>ul>li]:pe-list-disc [&>ul>li]:pe-list-inside" v-html="services" />
          <div class="pe-h-11 pe-mt-5 sm:pe-mt-0">
            <div class="pe-flex pe-w-36 pe-justify-between pe-cursor-pointer pe-items-center" :class="{'!pe-text-blue-light': openAmenities}" @click="openAmenitiesPanel">
              <PEIcon class="!pe-text-blue-light" :class="{'!pe-hidden': !openAmenities}">chevron-up</PEIcon>
              <PEIcon class="!pe-text-blue-light" :class="{'!pe-hidden': openAmenities}">chevron-down</PEIcon>
              View Amenities
            </div>
          </div>
        </div>
        <div
          class="pe-w-full pe-overflow-hidden pe-px-7 sm:pe-order-2 sm:pe-mt-7 pe-mb-5
          [&>ul]:pe-flex [&>ul]:pe-flex-col sm:[&>ul]:!pe-flex-row [&>ul]:pe-flex-wrap [&>ul]:pe-justify-between
          [&>ul>li]:pe-w-full sm:[&>ul>li]:pe-w-2/4 [&>ul>li]:pe-list-disc" :class="{ '!pe-hidden': !openAmenities }"
          v-html="amenities"
        />
        <div class="pe-flex pe-flex-col sm:pe-w-auto pe-w-full pe-justify-between pe-items-center">
          <div v-if="!isLoadOffer" class="pe-w-52 pe-text-center pe-mb-3">
            <div v-show="offer.lastPrice && (offer.discount?? 0) > 1" class="pe-flex pe-items-center pe-justify-center">
              <p class="text pe-mx-3 line-through">${{ getPrice(offer.lastPrice) }} USD</p>
              <PEChip>
                <div class="pe-bg-blue-light pe-text-black pe-text-xs pe-w-12 pe-h-5 pe-rounded-[5px] pe-flex pe-items-center pe-justify-center">
                  -{{ offer.discount }}%
                </div>
              </PEChip>
            </div>
            <p class="pe-text-2xl pe-text-center pe-leading-[7px] pe-mt-3">
              ${{ getPrice(offer.currentPrice?? offer.lastPrice) }} <span class="pe-text-base">USD</span> <br>
              <span class="pe-text-xs">{{ offer.concept }}</span>
            </p>
          </div>
          <PELoadingData
            v-else
          />
          <div class="sm:pe-w-52 pe-w-full">
            <PEButton
              solid
              uppercase
              :disabled="!offer.lastPrice && !offer.currentPrice"
              label="Choose rooms"
              class="!pe-px-8 pe-w-full"
              :loading="loadingButton"
              @click="goToBookings"
            />
          </div>
        </div>
      </div>
    </section>
  </article>
</div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {PEIcon, PEChip, PEButton} from '@pr-elite-components-library/lib'
import { IOffer } from '../../../app/buildSearch/domain/dto/rewardNightDTO'
import { BookingStore } from '../../store/bookingStore'
import PEBookingWidget from '../BookingWidget/PEBookingWidget.vue'
import { PropertiesStore } from '../../store/propertiesStore'

@Component({
  name: 'pe-resort-card',
  components: {
    PEIcon,
    PEChip,
    PEButton
  },
})
export default class PEResortCard  extends PEBookingWidget {
  @Prop({
    type: String,
    default: ''
  })
    title!: string
  
  @Prop({
    type: String,
    default: ''
  })
    summary!: string
  
  @Prop({
    default: () => ({
      lastPrice: 0,
      discount: 0,
      currentPrice: 0,
      concept: '',
      hotel: ''
    })
  })
    offer!: IOffer
  
  @Prop({
    default: []
  })
    services!: string[]
  
  @Prop({
    default: []
  })
    amenities!: string[]
  
  @Prop({
    default: null
  })
    offerExpiration!: any
  
  @Prop({
    type: Boolean,
    default: false
  })
    specialOffer!: boolean
  
  @Prop({
    type: Boolean,
    default: true
  })
    isLoadOffer!: boolean
  
  @Prop({
    default: []
  })
    images!: any[]

  @Prop({ type: String, default: '' })
    externalId!: string

  openAmenities = false

  bookingStore = new BookingStore()
  properties = new PropertiesStore()

  get loadingButton() {
    return this.bookingStoreInstance.isLoading
  }

  get showDays() {
    const diff = this.offerExpiration.endTime.getTime() - new Date().getTime();
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)))
    return days > 0
  }

  goToBookings() {
    this.bookingStore.setPropertyCode(this.externalId!)
    const property = this.properties.allProperties?.find((property) => property.externalId === this.externalId)

    this.onPropertyChange(property)
    this.submitData()
  }

  getPrice(price: number | null) {
    return price?.toLocaleString('en-US')
  }

  openAmenitiesPanel() {
    this.openAmenities = !this.openAmenities
  }
}
</script>