<template>
  <div>
    <div
      v-if="showSectionPay"
      class="pe-price pe-flex pe-flex-col pe-items-center pe-gap-y-[8px] lg:pe-items-end"
    >
      <p class="pe-mb-[20px] pe-font-sans pe-text-[16px] pe-font-normal pe-text-white md:pe-mb-0">
        {{ getTextTotal }}:
        <span class="pe-text-[24px]">{{ totalReserv }}</span>
        {{ currency }}
      </p>
      <PEButton
        class="mb-[30px] w-full md:w-[200px] px-0 md:mb-0"
        v-bind="bindButton"
        @click="onButtonClick"
      >
        {{ getTextButton }}
      </PEButton>
      <slot></slot>
    </div>
    <div
      v-else-if="showSectionToValidate"
      class="pe-grid pe-grid-cols-1 pe-gap-y-12"
    >
      <div class="text-right">
        <p class="pe-mb-[20px] pe-font-sans pe-text-[16px] pe-font-normal pe-text-white md:pe-mb-0">
          {{ $t('totalBooking') }}:
          <span class="pe-text-[24px]">{{ totalReserv }}</span>
          {{ currency }}
        </p>
      </div>
      <div class="flex gap-12">
        <PEButton
          text
          flat
          uppercase
          @click.prevent="openModalReject"
        >
          {{ $t('rejectReservation') }}
        </PEButton>
        <PEButton
          flat
          solid
          uppercase
          @click.prevent="validateReservation"
        >
          {{ $t('validate') }}
        </PEButton>
      </div>
    </div>
    <div
      v-else
      class="pe-price pe-flex pe-w-full pe-flex-col pe-items-center pe-gap-y-[8px] lg:pe-items-end"
    >
      <p class="pe-mb-[20px] pe-font-sans pe-text-[16px] pe-font-normal pe-text-white md:pe-mb-0">
        {{ getTextTotalWithoutButton }}:
        <span class="pe-text-[24px]">{{ totalReserv }}</span>
        {{ currency }}
      </p>
    </div>
    <BookingsCommonTableModalReject />
  </div>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop} from 'vue-property-decorator'
import dayjs from 'dayjs'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import i18n from '~/src/ui/i18n/bookings.lang'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {UseAuth} from '~/src/ui/store/auth'
import PayloadValidateReservation from '~/src/app/bookings/domain/entities/payloadValidateReservation'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {BookingGolfStore} from '~/src/ui/store/booking/bookingGolfStore'
import {ReservationFromBookings} from '~/src/app/booking/domain/entities/reservationFromBookings'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import dateFormatter from '~/src/ui/utils/filters/dateFormatter'
import {DailyRates} from '~/interfaces/Booking/Category.interface'

@Component({
  i18n
})
export default class BalanceInfo extends Mixins(CurrencyFormatDivisa) {
  public loading: boolean = false

  @Prop() readonly reservation!: any

  @Prop({type: String, default: 'USD'})
  readonly currency!: string

  @Prop({type: Boolean, default: false})
  readonly isButtonOutlined!: boolean

  @Prop({type: Boolean, default: false})
  readonly validate!: boolean

  @Prop({type: String, default: 'Send payment link'})
  readonly sendPaymentLinkText!: string

  get totalReserv(): string {
    return this.currencyFormatDivisa({
      value: this.reservation.totalReserv,
      prefix: '$',
      currencyText: '',
      divisa: '',
      minus: false,
      valuefloat: false
    })
  }

  get bindButton() {
    return {
      solid: true,
      loading: this.loading,
      flat: true,
      uppercase: true
    }
  }

  get showSectionPay() {
    return (
      this.reservation.status === BookingStatus.ON_HOLD ||
      this.reservation.status === BookingStatus.PENDING_PAYMENT
    )
  }

  get showSectionToValidate() {
    if (!this.validate) return this.reservation.status === BookingStatus.TO_VALIDATE
    return this.reservation.status === 'TRF'
  }

  get getTextTotal(): string {
    if (this.reservation.status === BookingStatus.ON_HOLD) return this.$t('totalPayment') as string

    if (this.reservation.status === BookingStatus.PENDING_PAYMENT)
      return this.$t('totalBalance') as string
    return ''
  }

  get getTextTotalWithoutButton(): string {
    if (
      this.reservation.status === BookingStatus.CANCELLED ||
      this.reservation.status === BookingStatus.PAST
    )
      return this.$t('totalBooking') as string
    return this.$t('totalPaid') as string
  }

  get getTextButton(): string {
    if (this.reservation.status === BookingStatus.ON_HOLD) return this.$t('payNow') as string

    if (this.reservation.status === BookingStatus.PENDING_PAYMENT)
      return this.$t('payBalance') as string
    return ''
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get payloadValidateReservation(): PayloadValidateReservation {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      hotel: this.reservation.hotel,
      folio: this.reservation.folioClub,
      provisionId: this.reservation.provisionId,
      isNational: this.isNational!,
      acepted: true
    }
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get isNational() {
    return this.authStore.isNational
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get bookingStore() {
    return new BookingStore()
  }

  get reservationByPay() {
    return this.bookingStore.reservationByPay
  }

  set reservationByPay(value) {
    this.bookingStore.reservationByPay = value
  }

  async validateReservation() {
    try {
      const {data} = await this.bookingsStore.validateReservation(this.payloadValidateReservation)

      if (data?.data) {
        this.layoutStore.showSnackbar(
          this.$t('validateReservationTitleSuccess') as string,
          this.$t('validateReservationMessageSuccess') as string,
          'success'
        )
        this.bookingsStore.getFilterSelected(['All'], [0, 1, 2])
      } else throw new Error('Error')
    } catch (error: any) {
      this.layoutStore.showSnackbar(
        this.$t('validateReservationTitleError') as string,
        this.$t('validateReservationMessageError') as string,
        'error'
      )
    }
  }

  openModalReject(): void {
    this.bookingsStore.detailSelected = this.reservation
    this.bookingsStore.showModalRejectReservation = true
  }

  evaluateDefaultGolfPolicy(reservationType: string) {
    const bookingGolfStore = new BookingGolfStore()
    const golfPolicy = bookingGolfStore.evaluateGolfPolicy(
      reservationType,
      bookingGolfStore.defaultValuePolicies
    )
    return golfPolicy
  }

  get supplementFee() {
    return this.bookingsStore.productsAndPayments.supplementFee
  }

  setDailyRates(): DailyRates[] {
    const tempDailyRates: DailyRates[] = []

    for (let index = 0; index < Number(this.reservation.nights); index++) {
      tempDailyRates.push({
        date: dateFormatter(dayjs(this.reservation.arv_date).add(index, 'day').toDate()),
        dashedPrice: '0',
        price:
          Number(this.reservation.totalReserv - Number(this.supplementFee)) /
          Number(this.reservation.nights)
      })
    }

    return tempDailyRates
  }

  @Emit()
  async onButtonClick() {
    this.bookingStore.$reset()
    const persistence = new PersistentStoreLocalStorageRepository([])

    persistence.clean(this.bookingStore)
    this.bookingStore.initStore()

    this.loading = true
    const {data} = await this.bookingStore.getReservation({
      application: this.reservation.application,
      company: this.reservation.company,
      isNational: this.isNational!,
      folio: this.reservation.folioClub,
      hotel: this.reservation.hotel
    })

    this.reservationByPay = data?.data?._Reservation || null

    if (!this.reservationByPay) return
    const reservation: ReservationFromBookings[] = [
      {
        roomSelected: {
          selectedOption: {
            rate: Number(this.reservation.balance),
            code: this.reservationByPay.ContractCategory
          },
          selectedCategory: {
            RealCode: this.reservationByPay.Rm_type,
            title: this.reservation.resort,
            recnum: this.reservationByPay.Recnum.toString()
          },
          dailyRates: this.setDailyRates(),
          selectedRefundRate: this.reservation.Refundable
        },
        benefits: [],
        guests: [
          {
            name: `${this.reservation.first_name} ${this.reservation.last_name}`,
            memberUtils: {
              firstname: this.reservation.first_name,
              lastname: this.reservation.last_name
            }
          }
        ],
        roomsPax: {
          adults: Number(this.reservationByPay.Adult),
          children: Number(this.reservationByPay.Child)
        },
        checkIn: this.reservationByPay.Arv_date,
        checkOut: this.reservationByPay.Depart_dt,
        Hotel: this.reservationByPay.Hotel,
        index: 0,
        status: this.reservation.status,
        folio: this.reservationByPay.Folio,
        showDailyRates: true,
        balance: this.reservation.balance,
        contract: this.reservationByPay.ContractCategory
      }
    ]

    this.bookingStore.reservationFromBookings = reservation
    this.bookingStore.$patch({
      booking: {
        affiliateId: '',
        propertyCode: this.reservationByPay.Hotel,
        operaId: '',
        checkIn: this.reservationByPay.Arv_date,
        checkOut: this.reservationByPay.Depart_dt,
        rooms: [
          {
            id: 0,
            name: `${this.reservation.first_name} ${this.reservation.last_name}`,
            adults: Number(this.reservationByPay.Adult),
            children: Number(this.reservationByPay.Child),
            childrenages: []
          }
        ]
      }
    })
    this.bookingStore.saveRooms()

    this.$nextTick(() => {
      this.$router.push({path: '/booking/payment-process'})
      this.loading = false
    })
  }
}
</script>
