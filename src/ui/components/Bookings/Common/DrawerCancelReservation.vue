<template>
  <section>
    <!-- HEADER -->
    <div class="pe-p-[24px] pe-bg-black pe-text-white">
      <div class="flex justify-between">
        <div class="pe-mt-[12px]">
          <div class="pe-flex">
            <div class="pe-flex pe-items-center">
              <span
                class="pe-uppercase pe-font-serif pe-font-medium pe-text-[24px] pe-text-blue-light"
                >RESERVATION</span
              >
              <div class="lg:pe-flex pe-hidden">
                <PEIcon
                  class="pe-text-blue-light"
                  size="42"
                  >chevron-right</PEIcon
                >
              </div>
              <span
                class="lg:pe-flex pe-hidden pe-uppercase pe-font-serif pe-font-medium pe-text-[24px] pe-text-white"
                >CANCELLATION</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BACK TO RESERVATION -->
    <div class="pe-bg-black pe-text-white pe-pb-4">
      <div class="flex justify-between">
        <span
          class="pe-text-blue-light pe-flex pe-cursor-pointer"
          @click.prevent="bookingsStore.drawerStepNow = DrawerSteps.DETAIL"
        >
          <PEIcon
            class="pe-text-blue-light"
            size="25"
            >chevron-left</PEIcon
          >
          Back to reservation
        </span>
      </div>
    </div>

    <!-- BODY CANCELATION -->
    <div class="pe-p-[48px] pe-bg-black-light pe-text-white">
      <div class="flex justify-center">
        <label class="pe-pb-4 pe-uppercase pe-font-serif pe-font-medium pe-text-[24px]"
          >CANCELLATION</label
        >
      </div>
      <div
        v-if="isVisibleTerms"
        class="flex justify-center"
      >
        <div class="pe-mt-[8px] pe-pb-4 pe-text-center">
          <label class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-[#FF4E89]">
            {{ $t('warningPenalty') }}
          </label>
        </div>
      </div>
      <div
        v-if="isVisibleTerms"
        class="pe-mx-4 pe-mt-2 pe-bg-black-light pe-text-white pe-rounded pe-py-5 pe-px-3 pe-text-left pe-max-h-48 pe-overflow-x-hidden pe-overflow-y-scroll"
      >
        <h1 class="pe-mb-5 pe-text-base">{{ cancelationPolicy?.title }}</h1>
        <p
          class="pe-text-xs"
          v-html="cancelationPolicy?.content"
        />
      </div>
      <div class="flex justify-center">
        <div class="pe-mt-[8px] pe-pb-4 pe-text-center">
          <label class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-white">
            Are you sure you want to cancel this room reservation?
          </label>
        </div>
      </div>

      <div class="pe-p-[10px] pe-bg-black-light pe-text-white">
        <div class="lg:pe-flex pe-hidden pe-justify-center">
          <PEButton
            v-bind="buttonYesProps"
            class="w-full xl:pe-max-w-[200px] !pe-px-2 h-[50px] text-[16px] xl:pe-mr-[30px]"
            @click="onYesCancel"
          />
          <PEButton
            v-bind="buttonNoProps"
            class="w-full xl:pe-max-w-[200px] !pe-px-2 h-[50px] text-[16px]"
            @click="onDontCancel"
          />
        </div>
        <div class="pe-flex lg:pe-hidden pe-mb-4">
          <PEButton
            v-bind="buttonNoProps"
            class="w-full xl:pe-max-w-[200px] !pe-px-2 h-[50px] text-[16px]"
            @click="onDontCancel"
          />
        </div>
        <div class="pe-flex lg:pe-hidden">
          <PEButton
            v-bind="buttonYesProps"
            class="w-full xl:pe-max-w-[200px] !pe-px-2 h-[50px] text-[16px]"
            @click="onYesCancel"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {ToastAction, ToastOptions} from 'vue-toasted'
import {TermsAndConditions} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import PayloadRejectReservation from '~/src/app/bookings/domain/entities/payloadRejectReservation'
import {
  DrawerSteps,
  DrawerStepsInSendConfirmation
} from '~/src/app/bookings/domain/enums/drawerStep'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {ToastDuration} from '~/src/ui/utils/toastHelpers'

@Component({
  i18n,
  name: 'BookingsDrawerCancelReservation'
})
export default class BookingsDrawerCancelReservation extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  isNational!: boolean

  DrawerSteps = DrawerSteps

  DrawerStepsInSendConfirmation = DrawerStepsInSendConfirmation

  public get toastOptions(): ToastOptions {
    return {
      action: [this.toastCloseOption] as ToastAction[],
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'success'
    }
  }

  public get toastCloseOption(): ToastAction {
    return {
      icon: 'close',
      text: '',
      onClick: (_e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }

  async onYesCancel() {
    this.bookingsStore.showLoading = true
    const selected = this.bookingsStore.detailSelected

    const requestCancelation: PayloadRejectReservation = {
      application: selected.application,
      company: selected.company,
      isNational: this.isNational,
      hotel: selected.hotel,
      folio: selected.folioClub,
      reason: 'Cancel reservation'
    }

    // Cancel pair reservation if roomCode is 'PS1 && !lockOff|| PS2'

    this.bookingsStore.showLoading = true

    try {
      await this.bookingsStore.rejectReservation(requestCancelation)
      // @ts-ignore
      const isLockOffString = this.bookingStore.reservationByPay?.Extension?.IsLockOff as string
      const isLockOff = isLockOffString.length > 0 ?? false

      if (this.bookingsStore.rejectReservationError) throw new Error('Error cancelling reservation')

      await this.cancelSecondRoom(isLockOff, selected)

      this.$toasted.success(this.$t('reservationCancelled') as string, this.toastOptions)
    } catch (error) {
      this.$toasted.error(this.$t('errorCancellingReservation') as string, this.toastOptions)
    }

    this.bookingsStore.drawerStepSendConfirmartionNow =
      DrawerStepsInSendConfirmation.SUCCESS_MESSAGE
    this.bookingsStore.showLoading = false
    this.$emit('submitCancel', true)
  }

  async cancelSecondRoom(isLockOff: boolean, roomSelected: any) {
    if (roomSelected.rm_type === 'PS1' && !isLockOff) {
      // Cancel PS2 Reservation
      const requestCancelation: PayloadRejectReservation = {
        application: roomSelected.application,
        company: roomSelected.company,
        isNational: this.isNational,
        hotel: roomSelected.hotel,
        folio: Number(roomSelected.folioClub) + 1,
        reason: 'Cancel reservation'
      }

      await this.bookingsStore.rejectReservation(requestCancelation)
    }

    if (roomSelected.rm_type === 'PS2') {
      // Cancel PS2 Reservation
      const requestCancelation: PayloadRejectReservation = {
        application: roomSelected.application,
        company: roomSelected.company,
        isNational: this.isNational,
        hotel: roomSelected.hotel,
        folio: Number(roomSelected.folioClub) - 1,
        reason: 'Cancel reservation'
      }

      await this.bookingsStore.rejectReservation(requestCancelation)
    }
  }

  onDontCancel() {
    this.bookingsStore.drawerStepNow = DrawerSteps.DETAIL
  }

  get step(): DrawerSteps {
    return this.bookingsStore.drawerStepNow
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get bookingStore(): BookingStore {
    return new BookingStore()
  }

  get buttonYesProps() {
    return {
      type: 'button',
      uppercase: true,
      outlinedSecondary: true,
      loading: this.bookingsStore.showLoading,
      label: 'YES, CANCEL'
    }
  }

  get buttonNoProps() {
    return {
      type: 'button',
      uppercase: true,
      secondary: true,
      disabled: this.bookingsStore.showLoading,
      label: "DON'T CANCEL"
    }
  }

  hasPenalty: boolean = false
  cancelationPolicy: TermsAndConditions | null = null

  get isVisibleTerms(): boolean {
    return this.hasPenalty === true && this.cancelationPolicy !== null
  }

  async validateCancelationPenalty() {
    const response = await this.bookingsStore.validateCancelation(PipelinesEnum.CANCELATIONS)
    this.hasPenalty = response
  }

  beforeMount() {
    this.validateCancelationPenalty()
    this.cancelationPolicy =
      this.bookingsStore.getTermsAndConditionByCode('booking-residence') ?? null
  }
}
</script>
