<template>
  <div class="pe-z-70 pe-fixed lg:pe-relative lg:pe-w-[400px] pe-w-full pe-bottom-0 pe-text-white">
    <div
      class="pe-bg-black-medium pe-grid pe-place-items-center pe-text-center !pe-rounded-t-[5px] pe-font-medium pe-font-serif pe-text-[24px] pe-uppercase py-[20px] pe-cursor-pointer lg:pe-cursor-default"
      @click.prevent="showDetails"
    >
      <div class="pe-flex">
        <PEIcon
          size="26"
          class="pe-text-blue-light pe-mt-1 pe-mr-6 lg:!pe-hidden"
          :class="getClassChevronYourSummary"
          >chevron-down</PEIcon
        >
        {{ $t('yourSummary') }}
      </div>
    </div>
    <div v-if="showDetailsYourSummary">
      <div
        class="pe-font-sans pe-text-[16px] pe-bg-black-light pe-py-[20px] pe-px-[30px] pe-border-b-2 pe-border-black-medium"
      >
        <div class="pe-font-semibold pe-uppercase pe-text-center lg:pe-text-left">
          {{ resort?.attributes.title }}
        </div>
        <div class="pe-text-center lg:pe-text-left">{{ labelDateFrom }}</div>

        <div class="pe-mt-[20px]">
          <div
            class="pe-flex cursor-pointer"
            @click.prevent="showInfoRoom"
          >
            <PEIcon
              class="pe-text-blue-light pe-mr-[10px]"
              :class="getClassChevronRoom"
              size="24"
              >chevron-down</PEIcon
            >
            <div class="pe-font-semibold"> Room One </div>
            <span
              class="pe-ml-3 pe-inline-flex pe-h-[25px] pe-font-sans pe-max-w-full pe-text-black pe-bg-blue-light pe-items-center pe-rounded-[5px] pe-px-3 pe-py-1 pe-text-[12px] pe-font-normal"
            >
              {{ $t(reservation?.ContractCategory) }}
            </span>
          </div>
          <div
            class="pe-ml-9 pe-mt-1"
            v-if="infoRoom"
          >
            <div class="pe-text-[12px] pe-font-sans"> {{ fullName }} </div>
          </div>
        </div>
      </div>
      <div
        class="pe-font-sans pe-justify-between pe-flex pe-text-[16px] lg:pe-text-[12px] pe-bg-black-light pe-py-[20px] pe-px-[30px] pe-border-b-2 pe-border-black-medium"
      >
        <div class="pe-justify-start"> Subtotal </div>
        <div class="pe-justify-end"> {{ subtotal }} </div>
      </div>
      <div
        class="pe-font-serif lg:pe-font-sans pe-rounded-b-[5px] pe-justify-between pe-flex pe-text-[16px] pe-bg-black-light pe-py-[20px] pe-px-[30px]"
      >
        <div class="pe-justify-start pe-uppercase pe-font-medium lg:pe-font-normal">
          {{ getLabelTextTotal }}
        </div>
        <div
          class="pe-justify-end pe-text-[24px] pe-font-medium lg:pe-font-normal lg:pe-text-[16px]"
        >
          {{ total }}
          <span class="pe-text-[16px]">{{ currency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import CurrencyFormatDivisa from '../../mixins/CurrencyFormatDivisa'
import DateFormaterProvition from '../../mixins/DateFormaterProvition'
import {PayLinkStore} from '../../store/payLinkStore'
import i18n from '~/src/ui/i18n/paylink.lang'
import {isTemplateElement} from '@babel/types'
import {Currencies} from '~/src/app/bookingpayment/domain/enums/currencies'

@Component({
  i18n
})
export default class YourReservation extends Mixins(DateFormaterProvition, CurrencyFormatDivisa) {
  public infoRoom: boolean = true

  public isMobile: boolean = false

  public showDetailsYourSummary: boolean = true

  beforeMount() {
    this.isMobile = window.innerWidth < 1019

    if (this.isMobile) this.showDetailsYourSummary = false
  }

  showInfoRoom(): void {
    this.infoRoom = !this.infoRoom
  }

  showDetails(): void {
    if (!this.isMobile) return

    this.showDetailsYourSummary = !this.showDetailsYourSummary
  }

  get getClassChevronRoom() {
    return {
      '!pe-rotate-180': !this.infoRoom
    }
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get reservation(): any {
    return this.paylinkStore.reservation!
  }

  get separator(): string {
    return this.$t('to') as string
  }

  get reservationBalance() {
    return this.paylinkStore.reservationBalance
  }

  get total(): string {
    let value = this.reservationBalance

    if (this.currency === Currencies.MXN) value = this.paylinkStore.exchangeRate * value

    return this.currencyFormatDivisa({
      value: value.toFixed(2),
      prefix: '$',
      currencyText: '',
      divisa: ''
    })
  }

  get subtotal(): string {
    let value = this.reservationBalance

    if (this.currency === Currencies.MXN) value = this.paylinkStore.exchangeRate * value

    return this.currencyFormatDivisa({
      value: value.toFixed(2),
      prefix: '$',
      currencyText: this.currency,
      divisa: ''
    })
  }

  get currency(): string {
    return this.paylinkStore.bookingPayment.currency || 'USD'
  }

  get labelDateFrom(): string {
    return `${this.$t('from')} ${this.dateFormaterProvitionBetween(
      {startDate: this.reservation?.Arv_date, endDate: this.reservation?.Depart_dt},
      this.separator
    )}`
  }

  get properties() {
    return this.paylinkStore.properties
  }

  get resort() {
    return this.properties.find(
      (item: any) => item.attributes.externalId === this.reservation?.Hotel
    )
  }

  get fullName() {
    return `${this.reservation?.First_name} ${this.reservation?.Last_name}`
  }

  get getClassChevronYourSummary() {
    return {
      '!pe-rotate-180': this.showDetailsYourSummary
    }
  }

  get getLabelTextTotal(): string {
    if (this.isMobile) return this.$t('total') as string
    return this.$t('totalPayment') as string
  }
}
</script>
