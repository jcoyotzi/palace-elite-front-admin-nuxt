<template>
  <div class="pe-p-[30px] pe-bg-black-light pe-text-white">
    <div class="pe-flex pe-justify-between">
      <div class="justify-start pt-2">
        <PEButton
          secondary
          class="pe-h-[20px] !pe-rounded-[4px] pe-uppercase !pe-px-4 !pe-py-4 text-[12px] font-normal font-sans"
        >
          {{ $t(detailSelected.status) }}
        </PEButton>
      </div>
      <div
        class="pe-w-full pe-ml-2 pe-flex pe-flex-col pe-items-start xl:pe-flex-row xl:pe-items-center"
      >
        <span class="pe-ml-0 xl:pe-ml-2"> {{ getFolioClub }}</span>
      </div>
    </div>
    <div class="pe-mt-[20px] pe-uppercase pe-font-serif pe-font-normal pe-text-[24px]">
      {{ detailSelected.resort }}
    </div>
    <div class="pe-font-sans pe-font-normal pe-text-[16px]">
      <span class="pe-font-semibold">
        {{ labelNights }}
      </span>
      {{ labelDateFrom }}
    </div>
    <!-- Actions -->
    <div
      v-if="showActions"
      class="pe-grid pe-grid-cols-2 md:pe-grid-cols-3 lg:pe-grid-cols-3 xl:pe-grid-cols-3 pe-gap-8 pe-mt-[16px]"
    >
      <div
        v-if="canSendConfirmationLetter"
        class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-blue-light hover:pe-cursor-pointer"
        @click.prevent="showDrawerSendConfirmation"
        >{{ $t('sendConfirmation') }}</div
      >
      <div
        class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-blue-light hover:pe-cursor-pointer"
        @click.prevent="showDrawerCancelReservation"
        >{{ $t('cancelReservation') }}</div
      >
    </div>

    <div class="pe-p-[10px]">
      <div class="flex pe-justify-between"> </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {
  DrawerSteps,
  DrawerStepsInSendConfirmation
} from '~/src/app/bookings/domain/enums/drawerStep'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
@Component({
  i18n
})
export default class HeaderDrawer extends Mixins(DateFormaterProvition, CurrencyFormatDivisa) {
  DrawerSteps = DrawerSteps

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get getFolioClub(): string {
    return `${this.$t('confirmationNumber')}: ${this.detailSelected.hotel}-${
      this.detailSelected.folioClub
    }`
  }

  get detailSelected() {
    return this.bookingsStore.detailSelected
  }

  get labelDateFrom(): string {
    return `${this.$t('from')} ${this.dateFormaterProvitionBetween(
      {
        startDate: this.detailSelected.arv_date,
        endDate: this.detailSelected.depart_dt
      },
      this.separator
    )}`
  }

  get separator(): string {
    return this.$t('to') as string
  }

  get labelNights(): string {
    return `${this.$t('nights', {number: this.detailSelected.nights})}`
  }

  get locale() {
    return this.$i18n.locale
  }

  get showActions() {
    return !(this.detailSelected.status === BookingStatus.CANCELLED)
  }

  get canSendConfirmationLetter() {
    return this.detailSelected.status === BookingStatus.PAID
  }

  currencyAmount(amount: number): string {
    return this.currencyFormatDivisa({value: String(amount)})
  }

  getKeysIndex(name: string, index: number) {
    return `${name}-${index}`
  }

  showDrawerSendConfirmation() {
    this.bookingsStore.drawerStepSendConfirmartionNow = DrawerStepsInSendConfirmation.FORM
    this.bookingsStore.drawerStepNow = DrawerSteps.SEND_CONFIRMATION
  }

  showDrawerCancelReservation() {
    this.bookingsStore.drawerStepNow = DrawerSteps.CANCEL_RESERVATION
  }
}
</script>
