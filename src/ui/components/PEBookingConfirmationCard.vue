<template>
  <section class="pe-text-white">
    <div class="pe-flex-row-reverse lg:pe-flex lg:pe-gap-[45px] pe-w-fullb pe-justify-between">
      <PEImageStrapi
        class="pe-mb-10 pe-rounded-[10px] pe-overflow-hidden pe-h-[275px] pe-w-full md:pe-flex md:pe-flex-1 lg:pe-w-[50%] lg:pe-h-auto"
        :image="media"
        fit
      />
      <article
        class="pe-mb-10 pe-flex pe-flex-col pe-items-center pe-flex-wrap pe-justify-start pe-rounded-[10px] pe-bg-black-light pe-px-5 pe-py-10 lg:pe-block lg:pe-w-[40%] lg:pe-py-[67px] lg:pe-px-10"
      >
        <div class="pe-max-w-[330px] pe-w-full">
          <div
            v-for="{room, name, roomName, confirmationId, hotel} in reservations"
            :key="confirmationId"
            class="pe-mb-10"
          >
            <p class="pe-font-semibold uppercase">{{ room }}</p>
            <h3 class="pe-text-2xl">{{ name }}</h3>
            <p>{{ roomName }}</p>
            <p>
              {{ confirmationLabel }}: <span>{{ hotel }} - {{ confirmationId }}</span>
            </p>
          </div>
        </div>
        <div class="pe-flex pe-flex-col items-center lg:block">
          <p class="pe-mb-10 pe-max-w-[330px] lg:pe-max-w-none lg:pe-text-left">
            {{ notificationLabel }}
          </p>
          <p
            class="pe-mb-10 pe-max-w-[330px] lg:pe-max-w-none lg:pe-text-left"
            v-if="isOnHoldReservation"
          >
            {{ onHoldLabel }}</p
          >

          <PEButton
            v-bind="callToActionButton"
            uppercase
            solid
            flat
            class="pe-mb-14 pe-cursor-pointer"
            @click="onDetailsClick"
          />

          <p class="pe-mb-10">{{ labelStores }}</p>

          <div class="pe-mb-10 pe-grid pe-max-w-[320px] pe-grid-cols-2 pe-gap-3">
            <PEButton v-bind="[linkProps, appStoreLink]">
              <PEImageStrapi
                :image="appStoreImage"
                class="pe-w-full"
                :fit="true"
              />
            </PEButton>
            <PEButton v-bind="[linkProps, playStoreLink]">
              <PEImageStrapi
                :image="playStoreImage"
                class="pe-w-full"
                :fit="true"
              />
            </PEButton>
          </div>
          <div class="flex items-center">
            <PEButton
              v-if="backLink"
              v-bind="[linkProps, backLink]"
            />
            <span class="px-2.5 pe-text-blue-light">|</span>
            <PEButton
              v-if="helpLink"
              v-bind="[linkProps, helpLink]"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

// Interfaces
import {Button} from '~/interfaces/GenericTypes/Button.interface'

interface Reservation {
  room: string
  name: string
  roomName: string
  confirmationId: string
  hotel: string
}

@Component({
  name: 'PEBookingConfirmationCard'
})
export default class PEBookingConfirmationCard extends Vue {
  @Prop({
    type: String,
    default: 'Pre check-in directly from our mobile app'
  })
  labelStores!: string

  @Prop({
    type: Object,
    required: true
  })
  callToActionButton!: Button

  @Prop({
    type: Object,
    required: true
  })
  backLink!: Button

  @Prop({
    type: Object,
    required: true
  })
  helpLink!: Button

  @Prop({
    type: Object,
    required: true
  })
  media!: any

  @Prop({
    type: Object,
    required: true
  })
  appStoreLink!: Button

  @Prop({
    type: Object,
    required: true
  })
  appStoreImage!: any

  @Prop({
    type: Object,
    required: true
  })
  playStoreLink!: Button

  @Prop({
    type: Object,
    required: true
  })
  playStoreImage!: any

  @Prop({
    type: Array,
    required: true
  })
  reservations!: Reservation[]

  @Prop({type: String, default: 'Confirmation Number'}) confirmationLabel!: string
  @Prop({
    type: String,
    default: 'A notification has been sent to your email, please checkout your inbox.'
  })
  notificationLabel!: string

  @Prop({type: Boolean, default: false}) isOnHoldReservation!: boolean

  @Prop({type: String, default: ' You can hold your reservation up to 24 hours  '})
  onHoldLabel!: string

  // Data

  // Computed
  public get linkProps() {
    return {
      class: ['px-0', 'py-0', '!pe-no-underline'],
      text: true
    }
  }

  // Methods
  @Emit()
  onDetailsClick() {}
}
</script>

<style lang="scss" scoped></style>
