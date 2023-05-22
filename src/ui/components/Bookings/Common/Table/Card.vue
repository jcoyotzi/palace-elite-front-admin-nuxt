<template>
  <div>
    <div
      class="pe-flex pe-w-full pe-flex-col pe-justify-between pe-bg-black-light pe-px-[20px] pe-pt-[25px] pe-pb-[40px] md:pe-flex-row md:pe-p-[30px]"
      :class="getClassCard"
    >
      <section class="">
        <div class="lg:pe-flex pe-items-center pe-gap-x-[10px]">
          <Chip>{{ getStatus }}</Chip>
          <div
            class="pe-mt-[10px] lg:pe-mt-[0px] pe-font-sans pe-text-[16px] pe-font-normal pe-text-white md:pe-w-auto"
          >
            {{ $t('confirmationNumber') }}: {{ getConfirmationNumber }}
          </div>
        </div>

        <div
          class="md:pe-mt-[6px] pe-font-sans pe-cursor-pointer pe-text-[24px] pe-font-normal pe-text-white"
          @click.prevent="openDrawerDetails"
        >
          {{ getResort }}
        </div>

        <div class="leading-[28px]">
          <div class="pe-font-sans pe-text-[16px] pe-text-white">
            {{ fullName }}
          </div>
          <div class="pe-font-sans pe-font-normal pe-text-[16px]">
            <span class="pe-font-semibold">
              {{ labelNights }}
            </span>
            {{ labelDateFrom }}
          </div>
          <div v-if="isReferral" class="pe-font-sans pe-font-normal pe-text-[16px]">
            {{ reservation.refProgram?? 'REF2x1' }}
          </div>

          <!-- section guests -->
          <div class="pe-text-[16px] pe-font-normal pe-font-sans">
            {{ getNumberAdults(reservation.adult) }}
            {{ getNumberTeens(reservation.child) }}
          </div>
          <span
            class="pe-cursor-pointer pe-font-sans pe-text-[16px] pe-text-blue-light"
            @click.prevent="openDrawerDetails"
          >
            {{ $t('moreDetails') }}
          </span>
        </div>
      </section>
      <div
        class="pe-mt-[40px] md:pe-flex pe-items-center pe-justify-center md:pe-justify-end md:pe-mt-0"
      >
        <BookingsCommonTableBalanceInfo
          :validate="validate"
          :reservation="reservation"
          currency="USD"
          :total-balance-text="$t('totalBalance')"
          :button-text="textActionBalance"
          :total-balance="reservation.Paid"
        >
          <slot />
        </BookingsCommonTableBalanceInfo>
      </div>
    </div>
    <BookingsCommonTableFooterLink
      v-if="reservation.sendPaymentLink"
      :reservation="reservation"
    />
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/bookings.lang'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {UseAuth} from '~/src/ui/store/auth'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'

@Component({
  i18n
})
export default class BookingsCommonTableCard extends Mixins(
  DateFormaterProvition,
  CurrencyFormatDivisa
) {
  @Prop({type: String, default: ''})
  readonly id!: string

  @Prop()
  readonly reservation!: ReservationsDto

  @Prop({default: false, type: Boolean}) readonly validate!: boolean
  // ======================================================
  get textActionBalance(): string {
    return this.$t('payBalance') as string
  }

  get isReferral() {
    return this.reservation.category === 'REFERIDOS'
  }

  get getStatus(): string {
    if (!this.validate) return this.reservation.status
    //@ts-ignore
    return BookingStatus[this.reservation.status]
  }

  get getConfirmationNumber() {
    return `${this.reservation.hotel}-${this.reservation.folioClub}`
  }

  get getClassCard() {
    return {
      'pe-rounded-[10px]': true,
      '!pe-rounded-b-[0px]': this.reservation.sendPaymentLink,
      'pe-rounded-tr-[0px]': this.reservation.showCountdown
    }
  }

  get getResort() {
    if (!this.validate) return this.reservation.resort
    const resort = this.bookingsStore.itemsFiltersDefault[1].filters.find(
      (resort: any) => resort.value === this.reservation.hotel
    )
    return resort?.name
  }

  get labelNights(): string {
    if (Number(this.reservation.nights) > 1)
      return `${this.$t('nights', {number: this.reservation.nights})}`
    return `${this.$t('night', {number: this.reservation.nights})}`
  }

  get labelDateFrom(): string {
    if (!this.validate)
      return `${this.$t('from')} ${this.dateFormaterProvitionBetween(
        {startDate: this.reservation.arv_date, endDate: this.reservation.depart_dt},
        this.separator
      )}`
    return `${this.$t('from')} ${this.dateFormaterProvitionBetween(
      {startDate: this.reservation.arvDate, endDate: this.reservation.departDt},
      this.separator
    )}`
  }

  get separator(): string {
    return this.$t('to') as string
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get fullName() {
    if (!this.validate) return `${this.reservation.first_name} ${this.reservation.last_name}`
    return `${this.reservation.firstName} ${this.reservation.lastName}`
  }

  async openDrawerDetails() {
    this.bookingsStore.loadingDrawer = true
    this.bookingsStore.showDrawerDetails = true
    await this.getDetails().finally(() => {
      this.bookingsStore.loadingDrawer = false
    })
  }

  async getDetails() {
    this.bookingsStore.detailSelected = this.reservation

    await this.bookingsStore.getProductsAndPayments({
      folio: this.reservation.folioClub,
      hotel: this.reservation.hotel,
      isNational: this.authStore.isNational || false
    })

    await this.bookingsStore.getCompanions({
      folio: this.reservation.folioClub,
      hotel: this.reservation.hotel,
      isNational: this.authStore.isNational || false
    })

    await this.bookingsStore.getCategorie({
      rm_type: this.reservation.rm_type,
      property: this.reservation.hotel
    })
  }

  getNumberAdults(adult: string): string {
    const adults = parseInt(adult)

    if (adults > 1) return `${this.$t('adults', {number: adults})}`

    return `${this.$t('adult', {number: adults})}`
  }

  getNumberTeens(teen: string): string {
    const teens = parseInt(teen)

    if (teens === 0) return ''

    if (teens > 1) return `, ${this.$t('teens', {number: teens})}`

    return `, ${this.$t('teen', {number: teens})}`
  }
}
</script>

<style scoped></style>
