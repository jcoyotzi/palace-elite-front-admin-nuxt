<template>
  <div ref="container">
    <!-- header -->

    <div :class="headerBackround">
      <div class="pe-h-28 xl:!pe-h-60 pe-block"></div>
      <div
        v-if="showLogo"
        class="pe-text-white xl:pe-hidden pe-text-center"
      >
        <img
          :src="logo"
          alt=""
          class="pe-w-1/2 pe-h-auto pe-mx-auto"
        />
      </div>

      <div class="pe-mx-auto pe-relative">
        <PEBookingWidget
          v-show="showBookingWidget"
          :items="calendarData"
          class="pe-container pe-relative mx-auto pe-max-w-[1200px] pe-px-4 sm:pe-px-0 pe-mx-auto"
          v-bind="bookingAttrs"
          :initialValues="queryBookingValues"
        />
      </div>
      <div
        v-if="showLogo"
        class="pe-container pe-mx-auto pe-text-white pe-hidden xl:pe-flex pe-text-center pe-mt-20 pe-items-center"
      >
        <div class="pe-h-px pe-bg-white pe-flex-grow pe-mr-20"></div>
        <img
          :src="logo"
          class="pe-mx-auto pe-flex-shrink-0 pe-max-w-[250px] pe-max-h-[90px]"
          alt=""
        />
        <div class="pe-h-px pe-bg-white pe-flex-grow pe-ml-20"></div>
      </div>
    </div>
    <!-- /header -->

    <div
      v-if="loading"
      class="pe-overflow-hidden pe-w-20 pe-mx-auto pe-my-20"
    >
      <PESpinner
        class="pe-mb-[40px]"
        fill="fill-blue"
        size="80"
      />
    </div>

    <div
      v-else
      class="pe-container pe-gap-x-[36px] pe-flex pe-justify-between pe-flex-wrap pe-w-full pe-mb-8 pe-bg-black"
    >
      <div
        v-if="showStepper"
        class="pe-my-20 w-full"
      >
        <client-only>
          <p-e-stepper
            v-model="currentRoom"
            v-bind="stepperAttrs"
          />
        </client-only>
      </div>
      <div
        v-if="layoutTitle"
        class="pe-my-10 pe-w-full pe-text-center lg:pe-text-start"
      >
        <p
          class="pe-font-serif pe-font-normal pe-text-[1.5rem] lg:pe-text-[2rem] pe-text-white pe-uppercase"
          >{{ layoutTitle }}</p
        >
      </div>

      <div
        class="pe-w-full pe-flex pe-justify-between pe-gap-x-[24px] pe-flex-wrap xl:pe-flex-nowrap"
      >
        <div class="pe-col-span-7 xl:pe-col-span-7 contents">
          <!-- Content / subpages -->
          <NuxtChild class="pe-w-full pe-flex pe-flex-col pe-gap-[64px] lg:pe-gap-y-[48px]" />
        </div>

        <div
          class="pe-min-w-full xl:pe-min-w-[300px] 2xl:pe-min-w-[400px] xl:my-0 pe-h-fit pe-sticky pe-top-[24px]"
        >
          <div
            v-if="benefitsStep"
            class="xl:pe-h-[120px] pe-block"
          ></div>
          <PECountDown
            v-if="showCountDown && coutDownDate"
            class="pe-block mb-5 pe-text-white text-sm !pe-min-w-[100px]"
            :end-time="coutDownDate"
            day-label="days"
            hour-label="hours"
            minute-label="minutes"
            second-label="seconds"
          >
            <template #title>{{ $t('hurryOfferEndsIn') }}</template>
          </PECountDown>
          <!-- Sidebar -->
          <div class="pe-text-white pe-text-xl pe-hidden xl:pe-flex">
            <PEYourReservation
              class=""
              :button-text="buttonText"
              :summary-property-name="summaryPropertyName"
              :summary-dates-range="summaryDatesRange"
              :summary-rooms="summaryRooms"
              :summary-selected-nights="summarySelectedNights"
              :selected-benefits="selectedBenefits"
              :is-mobile="false"
              :show-pay-details="showPayResume"
              :show-pay-button="showButtonResume"
              :show-place-on-hold="showPlaceOnHold"
              @goToNextStep="goToNextStep"
              @placeOnHold="toggleModal"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      ref="yourReservationContainer"
      :class="summaryStyle"
      class="pe-bg-black-light pe-font-serif pe-font-medium pe-z-[31] pe-flex pe-flex-col pe-fixed pe-w-full pe-bottom-0 pe-left-0 pe-h-screen your-reservation-mobile your-reservation-mobile-minimize xl:pe-hidden"
    >
      <div
        class="pe-bg-black pe-flex pe-flex-col pe-justify-center pe-items-center pe-w-full pe-h-fit pe-text-white pe-text-2xl"
      >
        <div class="pe-flex pe-flex-col pe-w-full pe-pb-[30px] pe-justify-center pe-items-center">
          <div
            class="pe-flex pe-items-center pe-justify-center pe-pt-[30px] pe-pb-[22px] pe-px-[40px] md:pe-pt-[30px]"
            @click="toggleYourReservation"
          >
            <PEIcon
              v-show="isYourReservationChevronUp"
              class="pe-text-blue-light"
              width="25px"
              size="36px"
              >chevron-up</PEIcon
            >
            <PEIcon
              v-show="!isYourReservationChevronUp"
              class="pe-text-blue-light"
              width="25px"
              size="36px"
              >chevron-down</PEIcon
            >
            <p class="pe-ml-[14px] uppercase">{{ $t('yourSummary') }}</p>
          </div>
          <div
            v-if="showContinueButton"
            class="w-full"
          >
            <PEButton
              block
              class="bg-blue-dark border-none uppercase"
              :disabled="isContinueDisabled"
              @click="goToNextStep"
              >{{ $t('continue') }}</PEButton
            >
          </div>
        </div>
      </div>

      <div class="pe-flex-grow pe-bg-black-light pe-z-20">
        <PEYourReservation
          :button-text="buttonText"
          :summary-property-name="summaryPropertyName"
          :summary-dates-range="summaryDatesRange"
          :show-pay-details="showPayDetails"
          :summary-rooms="summaryRooms"
          :selected-benefits="selectedBenefits"
          :is-mobile="true"
          :show-place-on-hold="showPlaceOnHold"
          @goToNextStep="goToNextStep"
          @placeOnHold="toggleModal"
        />
      </div>
    </div>
    <PEYourReservationModal
      :show-modal="showModal"
      @onCancel="toggleModal"
      @onAccept="placeOnHold"
    >
    </PEYourReservationModal>
    <PEModal
      id="promotions-benefits"
      :value="showPromotion"
      class="pe-z-[100] pe-absolute"
      @input="closeModal()"
    >
      <template #title>
        <h1
          class="pe-mr-auto pe-text-2xl pe-leading-[23px] pe-text-white pe-text-start pe-uppercase pe-font-serif"
        >
          {{ $t('select your benefit') }}
        </h1>
        <p class="pe-mr-auto pe-mt-1 pe-text-white pe-text-start pe-font-serif">{{
          $t('Choose an offer to make sure you enjoy the full Palace Elite Experience.')
        }}</p>
      </template>
      <template #content>
        <PEOfferList
          :items="promotionList"
          class="pe-max-h-[536px] pe-overflow-y-scroll scro scrollbarhidden"
          @selectPromotion="sendPromotionSelected"
        />
      </template>
      <template #buttons>
        <div class="pe-mt-2 w-full pe-justify-start pe-flex">
          <PEButton
            outlined-secondary
            flat
            class="pe-uppercase !pe-font-serif"
            @click="closeModal()"
          >
            {{ $t('skip') }}
          </PEButton>
        </div>
      </template>
    </PEModal>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import {Component, Mixins, Watch} from 'vue-property-decorator'
import {toWordsOrdinal} from 'number-to-words'
import {ToastAction, ToastOptions} from 'vue-toasted'
import PEBookingWidget from '../components/BookingWidget/PEBookingWidget.vue'
import {BookingBenefitStore} from '../store/strapi/bookingBenefitsStore'

import i18n from '../i18n/booking/booking'

// Stores
import {CalendarStore} from '../store/calendarStore'
import {PropertiesStore} from '../store/propertiesStore'
import {BookingStore} from '../store/bookingStore'
import {CategoryStore} from '../store/strapi/categoryStore'
import {UseAuth} from '../store/auth'
import {RatesCleverStore} from '../store/ratesCleverStore'
import {showToast, ToastDuration} from '../utils/toastHelpers'
import {BookingYourReservationStore} from '../store/bookingYourReservationStore'
import DateFormaterProvition from '../mixins/DateFormaterProvition'
import {OwnersStore} from '~/src/ui/store/ownersStore'
import {RoomBookingEntity} from 'app/booking/domain/entities/roomBookingEntity'
import PEYourReservation from '~/src/ui/components/BookingPage/PEYourReservation.vue'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import PEResumeFooterAction2 from '~/src/ui/components/BookingResumeReservation/PEResumeFooterAction2.vue'
import PEYourReservationModal from '~/src/ui/components/BookingPage/PEYourReservation/PEYourReservationModal.vue'
import PECountDown from '~/src/ui/components/BookingPage/PECountDown.vue'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'
import {RatesCleverPayloadDto} from '~/src/app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {PromiseAllSettled} from '~/src/app/booking/domain/enums/promiseAllSettled'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'
import ClearStorage from '~/src/ui/mixins/clearStorage'
import {infantGrouping, isLockOffRoom, RuleGrouping} from 'app/booking/domain/mapper/infantGrouping'
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes
} from '~/src/app/roomAccess/domain/data/lockOffRoomAccessCode'
import {RoomAccess} from '~/interfaces/Booking/Category.interface'

@Component({
  i18n,
  meta: {
    auth: true
  },
  layout: '',
  components: {
    PEBookingWidget,
    PEYourReservation,
    PEResumeFooterAction2,
    PEYourReservationModal,
    PECountDown
  }
})
export default class BookingPage extends Mixins(ClearStorage, DateFormaterProvition) {
  public authStore = new UseAuth()
  // variable para saber si mostrar el detalle de pagos

  calendarStore = new CalendarStore()

  propertiesStore = new PropertiesStore()

  bookingStore = new BookingStore()

  strapiCategoryInstance = new CategoryStore()

  benefitStoreInstance = new BookingBenefitStore()

  ratesCleverStoreInstance = new RatesCleverStore()

  ownerStore = new OwnersStore()

  summaryPropertyName: string = ''

  selectedProperty: PropertyEntity | null = null

  showModal = false

  get showPromotion() {
    return this.bookingStore.showPromotionModal
  }

  get promotionList() {
    return this.bookingStore.getPromotionList
  }

  get showPlaceOnHold() {
    return false
    // return this.benefitsStep && !this.bookingStore.isCurrentRoomWithNullGuest
  }

  get currentRoom() {
    return this.bookingStore.currentRoomIndex + 1
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  windowSize = 0

  mounted() {
    if (this.authStore.isAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')

    this.$nextTick(() => {
      window.addEventListener('resize', () => (this.windowSize = window.innerWidth))
      this.windowSize = window.innerWidth
    })
  }

  async beforeMount() {
    // this.$nuxt.setLayout('default')
    await this.bookingStore.initStore()
    await this.propertiesStore.initStore()
  }

  async closeModal() {
    this.bookingStore.setSpecialRatesPromotions(-1)
    this.bookingStore.setShowPromotionModal(false)
    await this.bookingStore.bookNow()
    await this.getRates()
  }

  async sendPromotionSelected(promotion: number) {
    this.bookingStore.setSpecialRatesPromotions(promotion)
    this.bookingStore.setShowPromotionModal(false)
    await this.bookingStore.bookNow()
    await this.getRates()
  }

  async getRates() {
    this.bookingStore.setLoading(false)

    const access = await this.buildRatesCleverPayload()

    const property = this.propertiesStore.getPropertyById(access.hotel)

    this.selectedProperty = property !== undefined ? property : null

    await this.ratesCleverStoreInstance.prepareRoomCodesRequest(
      access,
      this.selectedProperty?.externalId!
    )
  }

  saveInLocalStorage() {
    localStorage.setItem('rates', JSON.stringify(this.ratesCleverStoreInstance.rooms))
  }

  isLockByRoom(category: RoomAccess): boolean {
    const roomIndex = this.bookingStore.currentRoom
    const {adults, children, childrenages, infants} =
      this.bookingStore.getBooking.roomsCopy[roomIndex]

    const {max_children, max_occupancy} = category.CLVRoomTypeCategory

    return isLockOffRoom(adults, infants, max_children, max_occupancy)
  }

  isLockByPax(category: RoomAccess) {
    return this.isLockByRoom(category)
  }

  async buildRatesCleverPayload(): Promise<RatesCleverPayloadDto> {
    const roomsAccessCodes = this.bookingStore.accessRoom.map(room => ({
      room
    }))

    const roomsToFetch = roomsAccessCodes.filter(actualRoom => !this.isLockByPax(actualRoom.room))

    // Add room PS2 if PS1 Exist in roomAccessCodes
    const hasPresidentialRoom = roomsToFetch.find(
      room => LockOffRoomAccessCode.includes(room.room.RealCode) && !room.room?.isLockOff
    )

    if (hasPresidentialRoom) {
      const roomPS2InAccesCodes = roomsToFetch.filter(room =>
        PresidentialSecondRoomCodes.includes(room.room.RealCode)
      )

      if (roomPS2InAccesCodes.length === 0) {
        const roomPS2 = this.bookingStore.allRooms.filter(room =>
          PresidentialSecondRoomCodes.includes(room.RealCode)
        )

        if (roomPS2.length > 0) {
          roomPS2.map(secondPresidentialRoom => {
            roomsToFetch.push({room: secondPresidentialRoom})
          })
        }
      }
    }

    const {market, reservationCostType, application, company, isNational, country} =
      this.getDataFromLocalStorage()

    const checkIn = this.bookingStore.getBooking.checkIn
    const checkOut = this.bookingStore.getBooking.checkOut
    let adult = this.bookingStore.getBooking.roomsCopy[0].adults
    // const child = this.bookingStoreInstance.getBooking.rooms[0].children

    const data = await this.propertiesStore.fetchGroupingData(
      this.bookingStore.getBooking.propertyCode
    )

    const rules = data.events as RuleGrouping

    const infants = infantGrouping(
      this.bookingStore.getBooking.rooms[0].childrenages as string[],
      rules
    )

    if (infants.adults) {
      adult += infants.adults
    }

    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const promotions = this.bookingStore.specialRatesPromotion

    const cleverPayload: RatesCleverPayloadDto = {
      application,
      company,
      hotel: this.bookingStore.getBooking.propertyCode,
      checkInDate: toEpochTimeStamp(checkIn),
      checkOutDate: toEpochTimeStamp(checkOut),
      nights,
      roomCodes: roomsToFetch.map(actualRoom => ({
        code: actualRoom.room.RealCode,
        isLockOff: actualRoom.room.isLockOff ?? false,
        lockoffType: actualRoom.room.isLockOff ? 'L1' : ''
      })),
      market,
      country,
      isRefundable: true,
      isNational,
      costType: true,
      guestCd: 'M', // TODO retomar para guest flow. 'M' = member 'G' = guest
      adult,
      infants,
      rateType: 'L',
      reservationCostType,
      promotions
    }
    return cleverPayload
  }

  getDataFromLocalStorage() {
    const memberPropertyAccess = JSON.parse(localStorage.getItem('MemberPropertyAccess')!)
    const country = memberPropertyAccess.member.Country
    const rateType = memberPropertyAccess.memberExtension._rate_Type
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
    const reservationCostType = userInfo._ReservationCostType
    const market = userInfo._Market
    const application = userInfo._UserMember._application
    const company = userInfo._UserMember._company
    const isNational = userInfo._UserMember._isnational
    return {market, reservationCostType, application, company, isNational, country, rateType}
  }

  summaryStyle = ['your-reservation-small']

  @Watch('$route.currentRoute', {deep: true, immediate: true})
  onRouteChanges() {
    this.isRoomGuestSelect = this.$router.currentRoute.path === '/booking/roomGuests'

    const path = this.$router.currentRoute.path
    if (this.showContinueButton) {
      this.summaryStyle = ['your-reservation-large']
      this.buttonText = this.$t('continue')
      this.showButtonResume = true
    } else {
      this.summaryStyle = ['your-reservation-small']
      this.showButtonResume = false
    }
    if (this.benefitsStep) {
      this.buttonText = this.$t('payNow')
      this.showButtonResume = true
    }

    if (this.paymentStep) {
      this.showButtonResume = false
    }
  }

  get showPayDetails() {
    return true
  }

  buttonText: any = ''

  showButtonResume = false

  get selectedBenefits() {
    return this.benefitStoreInstance.getSelectedBenefits
  }

  get stepperAttrs() {
    return {
      maxValue: this.totalRooms,
      textWithColor: this.stepperTextWithColor,
      textWithoutColor: this.stepperTextWithoutColor
    }
  }

  get isContinueDisabled() {
    if (this.paymentStep) {
      return false
    }
    const anyNullBeforeLastRoom =
      this.bookingStore.reservation
        .map(room => {
          // @ts-ignore
          return room.guests?.length === 0 || room.guests?.includes(null)
        })
        .includes(true) && this.benefitsStep

    return (
      anyNullBeforeLastRoom ||
      this.bookingStore.isCurrentRoomWithNullGuest ||
      this.bookingYourReservationStore.showLoadingPlaceOnHold
    )
  }

  get stepperTextWithColor() {
    // const path = this.$router.currentRoute.path
    // // console.log("Cambio path: ", path)
    // const isSelectingGuests = path === '/booking/roomGuests'
    if (this.isRoomGuestSelect) {
      return this.$t('guestsStaying')
    }
    return this.$t('selectYourRooms', {
      room: this.totalRooms > 1 ? '' : ''
    })
  }

  get stepperTextWithoutColor() {
    return this.totalRooms > 1
      ? `${toWordsOrdinal(this.currentRoom)} ${this.$t('room')}`
      : this.$t('room')
  }

  get showPayResume() {
    return this.paymentStep || this.showButtonResume
  }

  bookingAttrs = {
    compressButton: true,
    modifySearch: true,
    modifyBookingButtonText: 'View Rates',
    propertyList: {
      ListTitle: 'Resorts'
    },
    bookingUrl: 'booking/',
    bookingButtonText: 'Modify Search',
    selectPlaceholder: 'Select a property',
    roomSelector: {
      roomLabel: 'Room',
      adultsLabel: 'Adults',
      childLabel: 'Children',
      childAgeLabel: 'Age',
      selectGuestsLabel: 'Select guests',
      roomsLabel: 'Rooms',
      GuestsLabel: 'Guests',
      roomButtonLabel: '+ Add room',
      maxGuestsLabel: 'Max guests',
      adultsLabelMobile: 'No. of Guests',
      roomsLabelMobile: 'No. of Rooms',
      removeRoomLabel: 'Remove'
    },
    rateCurrency: ''
  }

  isRoomGuestSelect = false

  get queryBookingValues() {
    return this.getQueryToBooking()
  }

  getQueryToBooking() {
    const { resort, checkin, checkout, adults, kids, babies } = this.$nuxt.$route.query

    if(!resort && !checkin && !adults) return null
    return {
      resort,
      checkin,
      checkout,
      submit: true,
      room: adults ? {
        id: 0,
        name: '',
        adults: Number(adults),
        children: Number(kids?? 0) + Number(babies?? 0),
        childrenages: Array(Number(kids?? 0) + Number(babies?? 0)).fill(0)
      } : null,
    }
  }

  get loading() {
    return this.bookingStore.isLoading
  }

  get logo() {
    const selectedHotel = this.bookingStore.getBooking.propertyCode
    return this.propertiesStore.getPropertyById(selectedHotel)?.logo.url
  }

  get booking() {
    return this.bookingStore.getBooking
  }

  get totalRooms() {
    return this.booking.rooms.length
  }

  get propertiesFilteredByMembership() {
    return this.propertiesStore.propertiesFilteredByMembership
  }

  get calendarData() {
    return this.calendarStore.calendarData
  }

  get showCountDown() {
    return this.categorySelectorStep
  }

  get coutDownDate() {
    return this.bookingStore.countDownSpecialRate
  }

  @Watch('booking', {deep: true})
  onBookingChange(newVal: any) {
    const code = newVal.propertyCode
    const property = this.propertiesStore.propertiesFilteredByMembership?.find(
      item => item.externalId === code
    )

    this.summaryPropertyName = property === undefined ? '--' : property.text
  }

  get summaryDatesRange() {
    const {checkIn, checkOut} = this.booking

    return `${this.$t('range')} ${this.dateFormaterProvitionBetween(
      {startDate: checkIn, endDate: checkOut},
      this.$t('to') as string
    )}`
  }

  get summaryRooms() {
    return this.bookingStore.reservationInfo.length > 0
      ? this.bookingStore.reservationInfo
      : this.bookingStore.reservationFromBookings
  }

  get showBookingWidget() {
    return !this.paymentStep
  }

  get showStepper() {
    return !this.paymentStep && !this.benefitsStep
  }

  get showLogo() {
    return !this.paymentStep
  }

  get paymentStep() {
    return this.$route?.name?.includes('payment-process')
  }

  get benefitsStep() {
    return this.$route?.name?.includes('benefit-selector')
  }

  get roomGuestStep() {
    return this.$route?.name?.includes('RoomGuests')
  }

  get categorySelectorStep() {
    return this.$route?.name?.includes('CategorySelector')
  }

  get layoutTitle() {
    return this.paymentStep ? this.$t('paymentProcess') : null
  }

  get headerBackround() {
    return {
      'pe-bg-black-light xl:pe-bg-black': !this.paymentStep
    }
  }

  isYourReservationChevronUp = false

  toggleYourReservation() {
    if (!this.isYourReservationChevronUp) {
      this.summaryStyle = ['your-reservation-mobile-minimize']
    } else if (this.$router.currentRoute.path === '/booking/roomGuests' || this.benefitsStep) {
      this.summaryStyle = ['your-reservation-large']
    } else {
      this.summaryStyle = ['your-reservation-small']
    }

    const body = document.getElementsByTagName(`body`)
    if (!this.isYourReservationChevronUp) {
      body[0].className = 'pe-max-h-full !pe-overflow-hidden'
    } else {
      body[0].className = ''
    }

    // @ts-ignore
    // this.$refs.yourReservationContainer.classList.toggle('your-reservation-mobile-minimize')
    this.isYourReservationChevronUp = !this.isYourReservationChevronUp
  }

  @Watch('windowSize')
  changeYourReservation() {
    if (this.windowSize > 1280 && this.isYourReservationChevronUp) {
      this.toggleYourReservation()
    }
  }

  get summarySelectedNights() {
    const nights = this.summarySelectedNightsNumber
    const word = nights > 1 ? this.$t('nights') : this.$t('night')
    return `${nights} ${word}`
  }

  get showContinueButton() {
    return (this.benefitsStep && !this.isYourReservationChevronUp) || this.isRoomGuestSelect
  }

  get summarySelectedNightsNumber() {
    const {checkIn, checkOut} = this.booking
    return selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
  }

  @Watch('bookingStore.bookingRooms', {immediate: true})
  onBookingRoomsChange(rooms: RoomBookingEntity[]) {
    if (rooms.length > 0) {
      return
    }
    this.bookingStore.setReservationRooms(
      rooms.map(({adults, children, childrenages}) => ({
        adults,
        children,
        childrenages
      }))
    )
  }

  get bookingTotal(): number {
    return this.bookingStore.getTotalReservationWithFee
  }

  changeCurrentRoom(index: number) {
    this.bookingStore.currentRoom = index
  }

  async goToNextStep() {
    // TODO: logic to go to next step & validations
    /* if (this.roomGuestStep) this.$nuxt.$router.push(this.localePath('/booking/benefit-selector'))
     */
    if (this.benefitsStep) {
      this.bookingStore.setLoading(true)
      if (this.bookingTotal > 0) this.onPayNow()
      else {
        await this.bookingStore.createNewReservation()
        const foliosReady = this.bookingStore.reservationInfo.every(
          reservation => reservation.folio > 0
        )

        this.bookingStore.reservationInfo[0].status = PaymentStatus.Paid

        if (foliosReady) this.$nuxt.$router.push(this.localePath('/booking-confirmation'))
      }
    }

    if (this.$router.currentRoute.path === '/booking/roomGuests') {
      if (this.bookingStore.isCurrentRoomWithNullGuest) {
        showToast({
          message: this.$t('setGuestsAlert') as string,
          context: this
        })
        return null
      }

      if (this.bookingStore.currentRoomIndex < this.bookingStore.reservationInfo.length - 1) {
        this.bookingStore.increaseRoomIndex()

        if (
          this.bookingStore.maxStep < this.bookingStore.reservationInfo.length - 1 &&
          this.bookingStore.reservationInfo[this.bookingStore.currentRoomIndex].roomSelected
        ) {
          this.bookingStore.increaseRoomIndex()
        }
      }

      this.bookingStore.setMaxStep(this.bookingStore.currentRoomIndex)

      if (this.bookingStore.currentRoomIndex < this.bookingStore.maxStep) {
        this.bookingStore.setCurrentRoom(this.bookingStore.maxStep)
      } else {
        this.bookingStore.setMaxStep(this.bookingStore.currentRoomIndex)

        if (this.bookingStore.currentRoomIndex < this.bookingStore.maxStep) {
          this.bookingStore.setCurrentRoom(this.bookingStore.maxStep)
        }
      }
      if (this.bookingStore.reservationInfo.every(item => item.roomSelected !== null)) {
        if (
          this.bookingStore.reservationInfo[this.bookingStore.currentRoomIndex].roomSelected!
            .selectedOption?.id! === ReservationTypes.BONO
        ) {
          const selectedReferral = this.bookingStore.usedReferrals[0]
          const guest = this.bookingStore.reservation[this.bookingStore.currentRoomIndex].guests[0]
          if (!selectedReferral.Transferable && guest?.memberUtils.role === 'guest') {
            this.$toasted.info(this.$t('mainGuestMustBeTheOwnerOrBeneficiary') as string, {
              action: [
                {
                  icon: 'close',
                  text: '',
                  onClick: (_e, toastObject) => {
                    toastObject.goAway(0)
                  }
                }
              ],
              theme: 'pe_toast',
              duration: ToastDuration.FIVE_SECONDS
            })
            return
          } else if (selectedReferral.Transferable && guest?.memberUtils.role === 'guest') {
            try {
              const {checkIn, checkOut, propertyCode} = this.bookingStore.getBooking

              const isBonusTransferResponse = await this.ownerStore.isBonusTransfer(
                checkIn,
                checkOut,
                propertyCode
              )

              if (isBonusTransferResponse) {
                this.bookingStore.setTransferableBonus({
                  isTransferable: isBonusTransferResponse.isTransferable,
                  folio: isBonusTransferResponse.folio,
                  hotel: isBonusTransferResponse.hotel
                })
              } else {
                this.$toasted.info(
                  'The owner must travel on the same dates for transfer this reservation',
                  {
                    action: [
                      {
                        icon: 'close',
                        text: '',
                        onClick: (_e, toastObject) => {
                          toastObject.goAway(0)
                        }
                      }
                    ],
                    theme: 'pe_toast',
                    duration: ToastDuration.FIVE_SECONDS
                  }
                )

                return
              }
            } catch (error) {
              console.error(error)
              showToast({
                message: this.$t('requestError') as string,
                context: this,
                type: 'error'
              })

              return
            }
          }
        }
        this.$router.push('/booking/benefit-selector')
      } else {
        if (!this.bookingStore.isPresidentialFlow)
          this.ratesCleverStoreInstance.fetchDataRetry(this.bookingStore.roomIndex)
        this.$router.push('/booking/categorySelector')
      }
    }
    this.bookingStore.setLoading(false)
    this.bookingStore.saveRooms()
  }

  get bookingYourReservationStore(): BookingYourReservationStore {
    return new BookingYourReservationStore()
  }

  get getTotalReservationPrice(): number {
    return this.bookingStore.getTotalReservationPrice
  }

  public get promiseAllReservationsResults() {
    return this.bookingStore.promiseAllReservationsResults
  }

  public get toastCloseOption(): ToastAction {
    return {
      icon: 'close',
      text: '',
      onClick: (_e: any, toastObject: any) => {
        toastObject.goAway(0)
      }
    }
  }

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

  get reservationInfo(): ReservationInfo[] {
    return this.bookingStore.reservationInfo
  }

  set reservationInfo(value) {
    this.bookingStore.reservationInfo = value
  }

  toastCreateNewReservationError(message: string) {
    this.$toasted.error(message, {
      theme: 'pe_toast',
      duration: 5000,
      // @ts-ignore
      keepOnHover: true,
      type: 'error',
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
  }

  async placeOnHold() {
    this.toggleModal()
    this.bookingYourReservationStore.showLoadingPlaceOnHold = true
    this.bookingStore.setLoading(true)
    try {
      await this.bookingStore.createNewReservation()

      this.promiseAllReservationsResults.map((statusMail: any) => {
        if (statusMail.status === PromiseAllSettled.REJECTED) {
          this.$toasted.error(this.$t('createReservationMessageError') as string, this.toastOptions)
          return
        }

        this.$toasted.success(
          this.$t('createReservationMessageSuccess') as string,
          this.toastOptions
        )
        this.setPaidReservations()

        this.$nuxt.$router.push({path: '/booking-onhold'})
      })
    } catch (e: any) {
      // console.log(e) // NO BORRAR 😠😠😡
      this.toastCreateNewReservationError(
        'Problem trying new reservation creation. Try again later.'
      )
    } finally {
      this.bookingStore.setLoading(false)
      this.bookingStore.reservationInfo[0].status = PaymentStatus.OnHold
      this.bookingYourReservationStore.showLoadingPlaceOnHold = false
      // this.clearAllStorage()
    }
  }

  setPaidReservations() {
    this.reservationInfo = this.reservationInfo.map((reservation: ReservationInfo) => {
      return {
        ...reservation,
        status: PaymentStatus.OnHold
      }
    })
  }

  onPayNow() {
    this.$router.push('/booking/payment-process')
  }

  toggleModal() {
    this.isYourReservationChevronUp = false
    this.summaryStyle = ['your-reservation-small']
    this.showModal = !this.showModal
  }
}
</script>

<style lang="scss" scoped>
.your-reservation-mobile {
  max-height: 100vh;
  transition: max-height 0.5s ease;
}

.your-reservation-small {
  max-height: 84px;
}

.your-reservation-large {
  max-height: 154px;
}

.your-reservation-mobile-minimize {
  transition: max-height 0.5s ease;
  overflow: hidden;
}

#promotions-benefits {
  background-color: rgba(39, 37, 39, 0.8) !important;
}

.scrollbarhidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
