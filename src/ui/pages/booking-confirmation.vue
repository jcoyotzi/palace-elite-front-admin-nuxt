<template>
  <div class="pe-bg-black">
    <div class="pe-h-28 xl:!pe-h-60 pe-block"></div>
    <div class="pe-mx-auto pe-relative">
      <ClientOnly>
        <div
          class="pe-max-w-[1200px] pe-bg-black-medium xl:pe-bg-transparent xl:pe-w-auto pe-w-full pe-mx-auto pe-fixed pe-p-5 xl:pe-p-0 pe-z-20 pe-bottom-0 xl:pe-relative xl:pe-bottom-[33px]"
        >
          <PEBookingWidget
            v-if="true"
            :items="calendarData"
            class="pe-container px-4 sm:px-0 mx-auto"
            v-bind="bookingAttrs"
          />
        </div>
      </ClientOnly>
    </div>

    <section
      v-if="hasPaidReservations || isOnHoldReservation || isOnProcessReservation"
      class="pe-pt-5 pe-text-white pe-container"
    >
      <h1
        class="pe-block pe-mx-auto pe-text-[24px] lg:pe-text-[32px] pe-text-center uppercase pe-font-medium leading-8 pe-mb-8"
        >{{ paymentConfirmationContent?.title }}</h1
      >
      <p class="pe-text-center pe-text-[24px] pe-mb-[60px]">
        {{ paymentConfirmationContent?.description }}</p
      >

      <p v-if="isOnProcessReservation" class="pe-text-center pe-text-[24px] pe-mb-[60px]">
        Your payment confirmation is in progress.</p
      >

      <PEBookingConfirmationCard
        :label-stores="paymentConfirmationContent?.labelStores"
        :call-to-action-button="callToActionButtonProps"
        :back-link="paymentConfirmationContent?.returnLink"
        :help-link="paymentConfirmationContent?.helpLink"
        :media="paymentConfirmationContent?.image"
        :app-store-link="paymentConfirmationContent?.appStoreLink"
        :app-store-image="paymentConfirmationContent?.appStoreImage"
        :play-store-link="paymentConfirmationContent?.playStoreLink"
        :play-store-image="paymentConfirmationContent?.playStoreImage"
        :reservations="formatedReservations"
        :is-on-hold-reservation="isOnHoldReservation"
        class="pe-mb-[120px]"
        @on-details-click="callToAction()"
      />
    </section>
    <div
      v-else
      class="pe-pt-5 pe-text-white pe-text-center pe-container pe-my-10"
    >
      <p class="">There are no paid reservations right now.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {toWords} from 'number-to-words'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {CalendarStore} from '../store/calendarStore'
// import {ContentStore} from '../store/contentStore'
// import {blocksToComponentsAdapter, StrapiComponent} from '~/strapi/strapi-blocks.service'
import PEBookingWidget from '../components/BookingWidget/PEBookingWidget.vue'
import {BookingPaymentStore} from '../store/bookingPaymentStore'
import {BookingStore} from '../store/bookingStore'
import {BookingBenefitStore} from '../store/strapi/bookingBenefitsStore'
import {PaymentConfirmationContentEntity} from '~/src/app/bookingpayment/domain/entities/paymentConfirmationContentEntity'
import PEBookingConfirmationCard from '~/src/ui/components/PEBookingConfirmationCard.vue'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import dayjs from 'dayjs'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {
  getRoomsFromReservationInfo,
  getTotalAmountRooms,
  getTotalAmountServices,
  getTotalGuestsFromReservationInfo
} from '~/src/app/gtm/domain/mapper/roomMapper'
import {PurchaseDataLayer} from '~/src/app/gtm/domain/types/PurchaseDataLayer'
import { BookingStatus } from '~/src/app/bookings/domain/enums/bookingStatus'

@Component({
  name: 'PaymentConfirmation',
  components: {
    PEBookingWidget,
    PEBookingConfirmationCard
  }
})
export default class ResortCreditPage extends Mixins(BookingWidgetMixin) {
  bookingPaymentStore = new BookingPaymentStore()
  bookingStore = new BookingStore()
  calendarStore = new CalendarStore()
  bookingBenefitStore = new BookingBenefitStore()
  persistence = new PersistentStoreLocalStorageRepository([])

  reservationDefault = {
    room: '',
    name: '',
    roomName: '',
    confirmationId: '',
    hotel: ''
  }

  reservations: any = null

  formatedReservations: any = []

  mounted() {
    if (!this.hasPaidReservations || !this.isOnHoldReservation) {
      const purchaseEventArray: PurchaseDataLayer[] = []

      this.reservations.forEach((reservation: any) => {
        const hotelName = this.bookingStore.getBooking.propertyCode
        const checkIn = this.bookingStore.getBooking.checkIn
        const checkOut = this.bookingStore.getBooking.checkOut
        const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
        const numberOfRooms = this.bookingStore.getBooking.rooms.length
        const {numberOfAdults, numberOfChildren, numberOfGuests} =
          getTotalGuestsFromReservationInfo(this.bookingStore.reservationInfo)
        const rooms = getRoomsFromReservationInfo(this.bookingStore.reservationInfo)
        const totalRooms = getTotalAmountRooms(this.bookingStore.reservationInfo)
        const totalServices = getTotalAmountServices(this.bookingStore.reservationInfo)

        const purchaseEvent: PurchaseDataLayer = {
          event: 'purchase',
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
          reservID: reservation.Hotel + '-' + String(reservation.folio),
          revenue: reservation.balance,
          rooms
        }

        purchaseEventArray.push(purchaseEvent)
      })

      // console.log('purchaseEventArray', purchaseEventArray)

      // @ts-ignore
      this.$gtm.push(purchaseEventArray)
    }
  }

  get calendarData() {
    return this.calendarStore.calendarData
  }

  get paymentConfirmationContent(): PaymentConfirmationContentEntity | null {
    return this.bookingPaymentStore.confirmationContent
  }

  get callToActionButtonProps() {
    return {
      label: 'See booking details'
    }
  }

  get hasPaidReservations(): boolean {
    if (!this.bookingStore) return false
    if (this.formatedReservations.length === 0) return false
    return this.reservations[0].status !== 'notPaid' && this.paymentConfirmationContent !== null
  }

  get isOnHoldReservation() {
    if (!this.bookingStore) return false
    if (this.formatedReservations.length === 0) return false
    return this.reservations[0].status === PaymentStatus.OnHold
  }

  get isOnProcessReservation() {
    if (!this.bookingStore) return false
    if (this.formatedReservations.length === 0) return false
    return this.reservations[0].status === PaymentStatus.OnProcess || this.reservations[0].status === BookingStatus.ON_PROCESS
  }

  getReservationInfo() {
    this.reservations = this.bookingPaymentStore.isFromBookings
      ? this.bookingStore.reservationFromBookings
      : this.bookingStore.reservationInfo

    this.formatedReservations = this.reservations.map((reservation: any) => {
      const categoryHotel = reservation.roomSelected?.selectedCategory?.Category?._Hotel
      const hotel = categoryHotel || reservation.reservationFolioData?.Hotel || ''

      return {
        room: `Room ${toWords(reservation?.index + 1)}` || '',
        name: reservation.guests[0]?.name || '',
        roomName: reservation.roomSelected?.selectedCategory.title || '',
        confirmationId: reservation?.folio || '',
        hotel
      }
    })
  }

  async getPaymentConfirmationContent() {
    await this.bookingPaymentStore.getPaymentConfirmationContent()
  }

  resetStores() {
    this.bookingStore.$reset()
    this.bookingPaymentStore.$reset()
    this.bookingBenefitStore.$reset()
  }

  cleanLocalStorage() {
    this.persistence.clean(this.bookingStore)
  }

  callToAction() {
    this.cleanLocalStorage()
    this.resetStores()
    if (this.formatedReservations.length > 0) {
      this.$router.push({
        path: this.localePath('/bookings'),
        query: {reservation: String(this.formatedReservations[0]?.confirmationId)}
      })
      return
    }
    this.$router.replace(this.localePath('/bookings'))
  }

  beforeMount() {
    this.$nuxt.setLayout('auth')
    this.getReservationInfo()
    this.getPaymentConfirmationContent()
  }
}
</script>
