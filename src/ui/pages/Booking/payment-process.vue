<template>
  <section>
    <div
      v-if="isLoading"
      class="pe-w-20 pe-mx-auto pe-my-20"
    >
      <PESpinner
        class="pe-mb-[40px]"
        fill="fill-blue"
        size="80"
      />
    </div>
    <div
      v-else
      class="pe-w-full"
    >
      <div
        :class="optionsContainer"
        class="pe-flex pe-flex-col pe-rounded-t-md pe-bg-black-medium pe-pl-8 pe-pt-8 pe-max-w-[1164px]"
      >
        <div class="pe-flex pe-flex-row pe-mr-11 lg:pe-mr-0 pe-justify-center lg:pe-justify-start">
          <div class="lg:pe-basis-1/2">
            <PERadioGroup
              v-show="isMultipleRoomFlow"
              v-model="paymentType"
              color="dark"
              :items="items"
              :position="radioPosition"
            />
          </div>
        </div>
      </div>
      <div
        v-if="needToPay"
        class="pe-flex pe-flex-col pe-rounded-b-md pe-bg-black-light pe-p-6 md:pe-p-12 pe-max-w-[1164px]"
      >
        <PEOneCardPayment
          v-if="showOneCardPayment"
          :payments="payments"
          :cards="cards"
          :show-sepator="true"
          :is-loading="!foliosReady"
          @payNow="payNow"
        />
        <PEPerRoomPayment
          v-if="showPerRoomPayment"
          :cards="cards"
          :payments="payments"
          :is-loading="!foliosReady"
          @payNow="payNow"
        />
        <PEModal
          v-model="showModal"
          class="!pe-z-[10] [&>div>div]:!pe-px-14"
        >
          <template #title>
            <h1
              class="pe-mr-auto pe-text-2xl pe-text-white pe-text-start pe-uppercase pe-font-serif"
            >
              {{ $t('paymentMethod') }}
            </h1>
          </template>
          <template #content>
            <p class="pe-my-10 pe-text-start pe-text-white pe-font-sans">
              {{ $t('paymentConfirmation') }}
            </p>
          </template>
          <template #buttons>
            <div class="pe-ml-auto pe-items-center !pe-justify-end pe-flex">
              <PEButton
                text
                flat
                class="pe-uppercase !pe-font-serif"
                :label="$t('paymentCancel')"
                @click="onCancel"
              />
              <PEButton
                flat
                outlined-secondary
                :label="$t('paymentAccept')"
                class="md:pe-ml-14 pe-uppercase !pe-font-serif"
                @click="onAccept"
              />
            </div>
          </template>
        </PEModal>
      </div>
      <div
        v-else
        class="pe-text-white pe-flex pe-flex-col pe-rounded-md pe-bg-black-light pe-p-6 md:pe-p-12 pe-max-w-[1164px]"
      >
        <PELoadingData />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import dayjs from 'dayjs'
import {ToastAction, ToastOptions} from 'vue-toasted'
import {ToastDuration} from '../../utils/toastHelpers'
import PEOneCardPayment from '../../components/Booking/paymentProcess/PEOneCardPayment.vue'
import PEPerRoomPayment from '../../components/Booking/paymentProcess/PEPerRoomPayment.vue'
import {WalletStore} from '../../store/benefits/walletStore'
import {BookingStore} from '../../store/bookingStore'
import {ItemRadioGroup} from '~/src/app/benefits/domain/entities/ItemRadioGroup'
import {BookingPaymentStore} from '~/src/ui/store/bookingPaymentStore'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import {PECardPaymentType} from '~/src/app/bookingpayment/domain/enums/cardPaymentType'
import {PayDetail} from '~/src/app/bookingpayment/domain/entities/cardPayment'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import {PayNow} from '~/src/app/bookingpayment/domain/entities/payNow'
import {PayDataLayer} from '~/src/app/gtm/domain/types/PayDataLayer'
import {PurchaseDataLayer} from '~/src/app/gtm/domain/types/PurchaseDataLayer'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {
  getRoomsFromReservationInfo,
  getTotalAmountRooms,
  getTotalAmountServices,
  getTotalGuestsFromReservationInfo
} from '~/src/app/gtm/domain/mapper/roomMapper'

export enum CustomBreakpoints {
  DESKTOP = 1024,
  MOBILE = 768
}

@Component({
  name: 'PaymentProcess',
  i18n,
  scrollToTop: true,
  components: {
    PEOneCardPayment,
    PEPerRoomPayment
  }
})
export default class PaymentProcess extends Vue {
  // Data
  public authStore = new AuthStore()

  public walletStore = new WalletStore()

  public items: ItemRadioGroup[] = [
    {
      id: PECardPaymentType.OnePay,
      name: 'One-card Payment',
      labelText: this.$t('One-card Payment') as string
    },
    {
      id: PECardPaymentType.PerRoomPayment,
      name: 'Per Room Payment',
      labelText: this.$t('Per Room Payment') as string
    }
  ]

  public showModal = false

  public bookingPaymentStoreInstance = new BookingPaymentStore()

  public bookingStore = new BookingStore()

  public windowWidth = 0

  public paymentType: PECardPaymentType = PECardPaymentType.OnePay

  public payNowData: PayNow | null = null

  public foliosReady: boolean = false

  // Hooks

  async mounted() {
    this.validateFolios()

    if (this.bookingPaymentStoreInstance.isFromBookings) this.foliosReady = true
    if (!this.foliosReady) this.createReservations()
    this.mapBookings()

    await this.bookingPaymentStoreInstance.fetchCreditCards(
      this.applicationUserMember,
      this.isNational
    )

    await this.walletStore.getSummarys(this.applicationUserMember)

    this.listenWindowSize()

    this.bookingPaymentStoreInstance.$patch({
      isLoading: false
    })
    const hotelName = this.bookingStore.getBooking.propertyCode
    const checkIn = this.bookingStore.getBooking.checkIn
    const checkOut = this.bookingStore.getBooking.checkOut
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const numberOfRooms = this.bookingStore.getBooking.rooms.length
    const {numberOfAdults, numberOfChildren, numberOfGuests} = getTotalGuestsFromReservationInfo(
      this.bookingStore.reservationInfo
    )
    const rooms = getRoomsFromReservationInfo(this.bookingStore.reservationInfo)
    const totalRooms = getTotalAmountRooms(this.bookingStore.reservationInfo)
    const totalServices = getTotalAmountServices(this.bookingStore.reservationInfo)

    const payEvent: PayDataLayer = {
      event: 'pay',
      hotelName,
      checkIn: dayjs(checkIn).format('DD-MM-YY'),
      checkOut: dayjs(checkOut).format('DD-MM-YY'),
      numberOfRooms,
      numberOfGuests,
      numberOfAdults,
      numberOfChildren,
      currencyCode: 'USD',
      nights,
      totalRooms,
      totalServices,
      rooms
    }

    // console.log('payEvent', payEvent)

    // @ts-ignore
    this.$gtm.push(payEvent)
  }

  // Computed
  get applicationUserMember(): string {
    return this.authStore.applicationUserMember as string
  }

  get isNational(): boolean {
    return this.authStore.isNational as boolean
  }

  get showOneCardPayment() {
    return this.paymentType === PECardPaymentType.OnePay
  }

  get needToPay() {
    return this.payments.find(payment => payment.status !== PaymentStatus.Paid)
  }

  get payments() {
    return this.bookingPaymentStoreInstance.getPayments
  }

  get radioPosition() {
    return this.windowWidth > CustomBreakpoints.DESKTOP ? 'horizontal' : 'vertical'
  }

  get cards() {
    return this.bookingPaymentStoreInstance.readCreditCards
  }

  get showPerRoomPayment() {
    return this.paymentType === PECardPaymentType.PerRoomPayment
  }

  get isLoading() {
    return this.bookingPaymentStoreInstance.isLoading
  }

  get bookingRooms() {
    return this.bookingStore.reservation
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

  get toastOptions(): ToastOptions {
    return {
      action: [this.toastCloseOption] as ToastAction[],
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'success'
    }
  }

  get isMultipleRoomFlow() {
    return this.bookingStore.isMultipleRoomFlow
  }

  get optionsContainer() {
    return {
      'pe-h-[72px]': !this.isMultipleRoomFlow
    }
  }

  // Watchers

  @Watch('bookingRooms')
  onBookingChange() {
    this.mapBookings()
  }

  // Methods

  public validateFolios() {
    if (this.bookingStore.reservationInfo.length < 1) {
      this.foliosReady = false
      return
    }
    this.foliosReady = this.bookingStore.reservationInfo.some(reservation => reservation.folio > 0)
  }

  public mapBookings() {
    this.bookingPaymentStoreInstance.mapBookings(
      this.bookingRooms.length > 0 ? this.bookingRooms : this.bookingStore.reservationFromBookings
    )
  }

  public beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

  public onResize() {
    this.windowWidth = window.innerWidth
  }

  public payNow(payload: PayDetail, roomIndex: number = -1) {
    this.payNowData = {
      payload,
      roomIndex
    }
    this.toggleModal()
  }

  public toggleModal(): void {
    this.showModal = !this.showModal
  }

  public onCancel(): void {
    this.toggleModal()
  }

  public goConfirmation() {
    this.$nuxt.$router.push(this.localePath('/booking-confirmation'))
  }

  public listenWindowSize() {
    this.$nextTick(() => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  }

  public async onAccept(): Promise<void> {
    this.toggleModal()

    if (this.payNowData) {
      this.bookingPaymentStoreInstance.$patch({
        isLoading: true
      })

      await this.bookingPaymentStoreInstance.pay(this.payNowData)

      if (!this.bookingPaymentStoreInstance.isValidResponse)
        this.$toasted.error(this.$t('validation.payment') as string, {
          theme: 'pe_toast',
          duration: ToastDuration.FIVE_SECONDS,
          action: [
            {
              icon: 'close',
              text: '',
              onClick: (_e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ]
        })
      else if (this.payments.length === 0) this.goConfirmation()

      this.bookingPaymentStoreInstance.$patch({
        isLoading: false
      })
    }
  }

  async verifyIsIHR() {
    return await this.authStore.isIHR({
      hotel: String(this.bookingStore.reservationByPay?.Hotel),
      folio: Number(this.bookingStore.reservationByPay?.Folio),
      contract: String(this.bookingStore.reservationByPay?.Contract),
      agencyCode: String(this.bookingStore.reservationByPay?.Agency_cd)
    })
  }

  @Watch('foliosReady')
  public getIHR() {
    if (!this.foliosReady) return
    this.verifyIsIHR()
  }

  public createReservations() {
    this.bookingStore
      .createNewReservation()
      .then(res => {
        // console.log({res})
        this.validateFolios()
        this.mapBookings()
      })
      .catch(() => {
        this.$toasted.error(this.$t('validation.reservationError') as string, {
          theme: 'pe_toast',
          duration: ToastDuration.FIVE_SECONDS,
          action: [
            {
              icon: 'close',
              text: '',
              onClick: (_e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ]
        })
      })
  }
}
</script>

<style>
body {
  overflow: auto !important;
}
</style>
