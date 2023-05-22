<template>
  <section>
    <div
      v-if="showLoading"
      class="pe-flex pe-items-center pe-justify-center pe-h-screen"
    >
      <PELoadingData />
    </div>
    <div v-else>
      <!-- HEADER DETAIL -->
      <BookingsCommonHeaderDrawer />
      <!-- BODY DETAIL -->
      <div class="pe-divide-y !pe-divide-white !pe-divide-opacity-25">
        <div class="pe-p-[30px] pe-text-white">
          <div class="pe-flex">
            <div
              class="pe-text-[16px] pe-font-semibold pe-font-sans pe-truncate pe-uppercase pe-mr-4"
            >
              {{ $t('roomSelection') }}
            </div>
            <div
              class="pe-w-auto pe-rounded-[3px] pe-leading-none pe-truncate pe-h-[20px] pe-bg-blue-light pe-p-[5px] pe-text-black pe-text-[12px] pe-font-sans pe-font-normal"
            >
              {{ categotyTypeDescription }}
            </div>
            <div
              v-if="isReferral"
              class="pe-ml-3 pe-w-auto pe-rounded-[3px] pe-leading-none pe-truncate pe-h-[20px] pe-bg-blue-light pe-p-[5px] pe-text-black pe-text-[12px] pe-font-sans pe-font-normal"
            >
              {{ detailSelected.refProgram?? 'REF2x1' }}
            </div>
          </div>
          <div>
            <!-- section member -->
            <div class="pe-text-[16px] pe-font-normal pe-font-sans">
              {{ detailSelected.first_name }} {{ detailSelected.last_name }}
            </div>
            <!-- section details room -->
            <div class="pe-text-[16px] pe-font-normal pe-font-sans">
              {{ categoryName }}
              (<span
                class="pe-text-[12px] pe-text-blue-light pe-cursor-pointer"
                @click.prevent="showRoomDetailsMethod"
              >
                {{ labelShowRoomDetails }}</span
              >)
            </div>
            <div
              v-if="showRoomDetails"
              class="pe-mx-4 pe-my-3 pe-bg-black-light pe-text-white pe-rounded pe-py-5 pe-px-3 pe-text-left pe-max-h-48 pe-overflow-x-hidden pe-overflow-y-scroll"
            >
              <p
                class="pe-text-xs"
                v-html="categoryResume"
              />
            </div>
            <div
              class="pe-text-[16px] pe-font-normal pe-font-sans"
              v-if="isRefundable"
            >
              {{ $t('refundableRate') }}
              (<span class="pe-text-[12px]">
                {{ currencyAmount(avgNights) }} {{ $t('avgNight') }} </span
              >)
            </div>
            <div
              class="pe-text-[16px] pe-font-normal pe-font-sans"
              v-else
            >
              {{ $t('nonRefundableRate') }}
            </div>
            <!-- section guests -->
            <div class="pe-text-[16px] pe-font-normal pe-font-sans">
              {{ getNumberAdults(detailSelected.adult) }}
              {{ getNumberTeens(detailSelected.child) }}
              <span
                class="pe-text-[12px] pe-text-blue-light pe-cursor-pointer"
                @click.prevent="showGuestListMethod"
              >
                {{ $t('showGuestList') }}
              </span>
            </div>
            <div
              v-if="showGuestListComputed"
              class="pe-my-2 pe-ml-10"
            >
              <ul
                class="pe-list-disc pe-font-sans pe-text-[12px]"
                v-if="showCompanions"
              >
                <li
                  v-for="(adult, adultIndex) in companions"
                  :key="getKeysIndex('adult', adultIndex)"
                >
                  {{ adult.name }}
                </li>
              </ul>
              <span
                v-else
                class="pe-font-sans pe-text-[12px]"
              >
                {{ $t('noCompanions') }}
              </span>
            </div>
            <!-- section nights -->
            <div class="pe-flex pe-justify-between pe-text-[16px] pe-font-normal pe-font-sans">
              <div class="pe-justify-start">
                {{ labelNights }}
                (<span
                  class="pe-text-blue-light pe-text-[12px] pe-cursor-pointer"
                  @click="onDailyRatesClicked"
                >
                  {{ $t('showDailyRates') }} </span
                >)
              </div>
              <div class="pe-justify-end pe-font-sans pe-text-[16px]">
                {{ currencyAmount(labelTotalAmountNights) }}
              </div>
            </div>
            <div
              v-if="isDailyRatesShown"
              class="pe-container"
            >
              <div
                v-for="(el, index) in dailyRates"
                :key="index"
                class="pe-flex pe-justify-between"
              >
                <div class="text-left"> - {{ el.date }} </div>
                <div class="text-right">
                  {{ el.price | usd }}
                </div>
              </div>
            </div>
            <!-- promotionsAndProducts-->
            <div
              v-for="(product, index) in promotionsAndProducts"
              :key="index"
              class="pe-flex pe-justify-between pe-text-[16px] pe-font-normal pe-font-sans"
            >
              <div class="pe-justify-start">
                {{ descriptionProduct(product) }}
              </div>
              <div class="pe-justify-end pe-font-sans pe-text-[16px]">
                {{ currencyAmount(product.amount) }}
              </div>
            </div>
            <!-- supplement fee -->
            <div
              v-if="supplementFee"
              class="pe-flex pe-justify-between pe-text-[16px] pe-font-normal pe-font-sans"
            >
              <div class="pe-justify-start">
                {{ $t('supplementFee') }}
              </div>
              <div class="pe-justify-end pe-font-sans pe-text-[16px]">
                {{ currencyAmount(supplementFee) }}
              </div>
            </div>

            <!-- supplement fee -->
            <div
              v-if="supplementFeeAditional"
              class="pe-flex pe-justify-between pe-text-[16px] pe-font-normal pe-font-sans"
            >
              <div class="pe-justify-start">
                {{ supplementFeeAditionalLabel }}
              </div>
              <div class="pe-justify-end pe-font-sans pe-text-[16px]">
                {{ currencyAmount(supplementFeeAditional) }}
              </div>
            </div>

            <!-- benefits -->
            <div
              v-for="(benefit, benefitIndex) in detailSelected.benefits"
              :key="getKeysIndex('benefits', benefitIndex)"
              class="pe-text-[16px] pe-font-normal pe-font-sans pe-flex"
            >
              {{ benefit.name }} ({{ currencyAmount(benefit.amount) }})
              <PEIcon class="ml-2 mt-[2px] text-blue-light">info-circle</PEIcon>
            </div>

            <!-- additionals charges -->
            <div
              v-for="(additional, additionalIndex) in detailSelected.additionalCharges"
              :key="getKeysIndex('additionals', additionalIndex)"
              class="pe-text-[16px] pe-justify-between pe-font-normal pe-font-sans pe-flex"
            >
              <div class="pe-justify-start">
                {{ additional.name }}
              </div>
              <div class="pe-justify-end">
                {{ currencyAmount(additional.amount) }}
              </div>
            </div>
            <!-- discounts -->
            <div
              v-for="(discounts, discountsIndex) in detailSelected.discounts"
              :key="getKeysIndex('discounts', discountsIndex)"
              class="pe-text-[16px] pe-justify-between pe-font-normal pe-font-sans pe-flex"
            >
              <div class="pe-justify-start">
                {{ discounts.name }}
              </div>
              <div class="pe-justify-end"> - {{ currencyAmount(discounts.amount) }} </div>
            </div>

            <!-- extra nights -->
            <BookingsCommonExtraNights v-if="false" />

            <!-- methods payment -->
            <BookingsCommonMethodsPayment v-if="showMethodPayment" />
          </div>
        </div>
        <!-- section subtotal -->
        <div
          class="text-center pe-flex pe-justify-between pe-p-[30px] pe-text-[16px] pe-text-white"
        >
          <div class="justify-start">Subtotal</div>
          <div class="justify-end">{{ getSubtotal }}</div>
        </div>
        <!-- section pay -->
        <div
          v-show="showPay"
          class="text-center pe-p-[30px] pe-text-[16px] pe-text-white"
        >
          <div class="pe-font-sans">
            {{ $t('totalPayment') }}:
            <span class="pe-text-[24px]">
              {{ totalProvition }}
            </span>
          </div>
          <div class="pe-text-[12px]">
            {{ $t('taxesAndFees') }}
          </div>
          <div class="pe-mt-[20px]">
            <PEButton
              @click="onPay"
              solid
              class="pe-uppercase h-[50px] w-[65%]"
              v-bind="payInputProps"
            >
              {{ $t('payReservation') }}
            </PEButton>
          </div>
          <div class="pe-mt-[20px] pe-grid pe-place-items-center pe-text-[16px] pe-mb-2 pe-mt-2">
            <div
              class="pe-flex pe-cursor-pointer"
              @click="openFormPayLink"
            >
              <PEIcon
                size="26"
                :class="classIconExpand"
                class="pe-text-blue-light pe-mr-2"
                >chevron-down</PEIcon
              >
              {{ $t('sendPaymentLink') }}
            </div>
          </div>
          <!-- Send link payments -->
          <div v-if="showLinkPayment && !sendPaymentLinkSuccess">
            <div class="pe-p-[24px] pe-bg-black-light pe-text-white">
              <div class="pe-flex pe-justify-between">
                <ValidationObserver
                  v-slot="{handleSubmit, invalid}"
                  class="w-full"
                >
                  <form
                    ref="form"
                    :class="containerClasess"
                    class="pe-w-full"
                    @submit.prevent="handleSubmit(onEmailSubmit)"
                  >
                    <ValidationProvider
                      v-slot="{errors}"
                      name="Email"
                      :rules="nameRules"
                      class="pe-w-full pe-mt-2 pe-flex pe-flex-col pe-justify-center pe-items-center"
                    >
                      <PETextInput
                        v-model="formName"
                        :class="inputClasses"
                        class="pe-w-full pe-mb-2"
                        v-bind="nameInputProps"
                      />
                      <div :class="errorClasses">
                        <span>
                          {{ errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{errors}"
                      name="Email"
                      :rules="emailRules"
                      class="w-full flex flex-col justify-center items-center"
                    >
                      <PETextInput
                        v-model="formEmail"
                        :class="inputClasses"
                        class="w-full mb-2"
                        v-bind="emailInputProps"
                      />
                      <div :class="errorClasses">
                        <span>
                          {{ errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                    <PEButton
                      v-bind="buttonSend"
                      class="pe-mb-6 pe-mt-2 pe-bg-blue-light pe-text-white"
                      :disabled="invalid"
                      @click.prevent="sendPaymentLink"
                    />
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
          <div
            v-if="sendPaymentLinkSuccess"
            class="pe-justify-center pe-text-center pe-items-center pe-flex pe-text-white pe-my-[20px]"
          >
            {{ $t('paymentLinkSuccess') }}
          </div>

          <div
            class="pe-font-sans pe-mt-[20px] pe-text-[12px]"
            v-html="bookingsReservationSendPaymentLink"
          >
          </div>
        </div>
        <!-- Paid total -->
        <div
          v-if="isReservationPaid"
          class="pe-text-white pe-text-center pe-p-[30px]"
        >
          <p>
            <span class="pe-text-base pe-capitalize pe-font-sans"> {{ $t('totalPayment') }}: </span
            ><span class="pe-text-2xl">{{ totalPaid }}</span
            ><span class="pe-uppercase">USD</span>
          </p>
          <p class="pe-text-xs">{{ $t('taxesAndFees') }}</p>
        </div>
        <!-- Terms and conditions -->
        <div
          v-show="showTermsAndConditions"
          class="text-center pe-p-[30px] pe-text-[16px] pe-text-white"
        >
          <div
            class="pe-text-blue-light pe-mt-[20px] pe-text-[12px] pe-font-sans pe-cursor-pointer"
            @click="onTermsAndConditionsClicked"
          >
            {{ $t('termsAndConditions') }}
          </div>
          <div
            v-if="isCancelationPolicyShown"
            class="pe-mx-4 pe-mt-2 pe-bg-black-light pe-text-white pe-rounded pe-py-5 pe-px-3 pe-text-left pe-max-h-48 pe-overflow-x-hidden pe-overflow-y-scroll"
          >
            <h1 class="pe-mb-5 pe-text-base">{{ cancelationPolicy?.title }}</h1>
            <p
              class="pe-text-xs"
              v-html="cancelationPolicy?.content"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Emit} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {email} from 'vee-validate/dist/rules'
import dayjs from 'dayjs'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {TermsAndConditions} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import {DailyRates} from '~/interfaces/Booking/Category.interface'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import {PromotionsAndProduct} from '~/src/app/bookings/domain/dto/getProductsAndPaymentsDto'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import {BookingProvotionStatus} from '~/src/app/bookings/domain/enums/bookingProvitionStatus'
import dateFormatter from '~/src/ui/utils/filters/dateFormatter'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import {paymentLinkTemplate} from '~/src/ui/emailTemplates/paymentLinkTemplate'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import {BookingStore} from '~/src/ui/store/bookingStore'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {ReservationFromBookings} from '~/src/app/booking/domain/entities/reservationFromBookings'
import {dateToMonthDay} from '~/src/app/ratesClever/domain/mappers/RoomRatesCleverMapper'
import PayloadValidateReservation from '~/src/app/bookings/domain/entities/payloadValidateReservation'
import ReservationFromBookingsFactory from '../../../../app/booking/domain/factories/reservationFromBookingsFactory'
import {GetBookingDto} from '~/src/app/bookings/domain/dto/getBookingDto'
import {Reservation} from '../../../../app/bookings/domain/dto/getBookingDto'
import PayloadGetReservations from '~/src/app/bookings/domain/entities/payloadGetReservations'
import {ModalAndContentStore} from '~/src/ui/store/modalsStore'
extend('email', email)

@Component({
  i18n,
  name: 'BookingsDrawerDetail',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  filters: {
    usd(value: number) {
      return `${usdFormatter.format(value)} USD`
    }
  }
})
export default class BookingsDrawerDetail extends Mixins(CurrencyFormatDivisa) {
  showRoomDetails: boolean = false

  showGuestList: boolean = false

  showLinkPayment: boolean = false

  formEmail = ''

  loadingEmail: boolean = false
  loading: boolean = false

  formName = ''

  sendPaymentLinkSuccess: boolean = false

  cancelationPolicy: TermsAndConditions | null = null

  isCancelationPolicyShown = false

  isDailyRatesShown = false

  dailyRates: DailyRates[] = []

  modalsStore = new ModalAndContentStore()
  bookingsReservationSendPaymentLink = ''

  async mounted() {
    this.cancelationPolicy =
      this.bookingsStore.getTermsAndConditionByCode('booking-residence') ?? null

    const content = await this.modalsStore.fetchModalContent(
      'bookings-reservation-send-payment-link'
    )

    await this.bookingsStore.getCategorie({
      rm_type: this.detailSelected.rm_type,
      property: this.detailSelected.hotel
    })

    if (this.bookingsStore.rejectReservationError) {
      this.bookingsStore.showDrawerDetails = false
      this.bookingsStore.rejectReservationError = false
      return
    }

    const {data} = await this.getReservation()
    this.reservationByPay = data?.data?._Reservation || null
    this.dailyRates = this.setDailyRates()

    this.bookingsReservationSendPaymentLink = content?.content || ''
  }

  currencyAmount(amount: number): string {
    return this.currencyFormatDivisa({value: String(Math.ceil(amount))})
  }

  getNumberAdults(adults: number): string {
    if (adults > 1) return `${this.$t('adults', {number: adults})}`

    return `${this.$t('adult', {number: adults})}`
  }

  getNumberTeens(teens: number): string {
    if (teens === 0) return ''

    if (teens > 1) return `, ${this.$t('teens', {number: teens})}`

    return `, ${this.$t('teen', {number: teens})}`
  }

  getKeysIndex(name: string, index: number) {
    return `${name}-${index}`
  }

  showRoomDetailsMethod(): void {
    this.showRoomDetails = !this.showRoomDetails
  }

  showGuestListMethod(): void {
    this.showGuestList = !this.showGuestList
  }

  setDailyRates(): DailyRates[] {
    const tempDailyRates: DailyRates[] = []
    if (!this.reservationByPay?.RateCodeDetails) return []
    for (const dailyRate of this.reservationByPay?.RateCodeDetails) {
      tempDailyRates.push({
        date: dateFormatter(new Date(dailyRate.Arv_date)),
        dashedPrice: '0',
        price: dailyRate.RateOperaUpdated
      })
    }

    return tempDailyRates
  }

  // get isReferral() {
  //   return this.detailSelected.category === 'REFERIDOS'
  // }

  get showCompanions(): boolean {
    return this.companions.length > 0
  }

  get companions() {
    return this.bookingsStore.companions
  }

  get getSubtotal(): string {
    if (this.detailSelected.status === BookingStatus.PAID) return `${this.totalPaid} USD`

    return this.totalProvition
  }

  get classIconExpand() {
    return {
      'rotate-180': this.showLinkPayment
    }
  }

  get supplementFee() {
    return this.bookingsStore.productsAndPayments.supplementFee
  }

  get supplementFeeAditional() {
    const transportationFee = this.promotionsAndProducts.reduce((acc, curr) => acc + curr.amount, 0)
    return this.bookingsStore.detailSelected.supplementFee - transportationFee - this.supplementFee
  }

  descriptionProduct(product: PromotionsAndProduct) {
    return product.type === 'transportation'
      ? `${product.description} ${this.$t('oneUnit')}`
      : product.description
  }

  get promotionsAndProducts() {
    return this.bookingsStore.productsAndPayments.promotionsAndProducts
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get labelShowRoomDetails() {
    if (this.detailSelected.showRoomDetails) return this.$t('hideRoomDetails')
    return this.$t('showRoomDetails')
  }

  get detailSelected() {
    return this.bookingsStore.detailSelected
  }

  get showMethodPayment() {
    return this.bookingsStore.productsAndPayments.paymentMethods.length > 0
  }

  get totalProvition(): string {
    return this.currencyAmount(this.detailSelected.balance)
  }

  get labelNights(): string {
    return `${this.$t('nights', {number: this.detailSelected.nights})}`
  }

  get labelAmountNights() {
    return this.labelTotalAmountNights / Number(this.detailSelected.nights)
  }

  get labelTotalAmountNights() {
    return Number(this.detailSelected.totalReserv) - Number(this.detailSelected.supplementFee)
  }

  get showRoomDetailsComputed() {
    return this.showRoomDetails
  }

  get showGuestListComputed() {
    return this.showGuestList
  }

  get emailInputProps() {
    return {
      type: 'text',
      label: 'Recipient’s Email (All Rooms)',
      disabled: this.loadingEmail,
      name: 'email'
    }
  }

  get payInputProps() {
    return {
      type: 'submit',
      loading: this.loading,
      name: 'pay'
    }
  }

  get nameInputProps() {
    return {
      type: 'text',
      label: 'Recipient’s Name (All Rooms)',
      disabled: this.loadingEmail,
      name: 'name'
    }
  }

  get errorClasses() {
    return ['text-left text-red-600 pr-1 text-sm mb-4 w-full']
  }

  get containerClasess() {
    return ['flex flex-col justify-center text-white items-center']
  }

  get emailRules() {
    return 'required|email'
  }

  get nameRules() {
    return 'required'
  }

  get inputClasses() {
    return ['mb-2']
  }

  get showPay() {
    return (
      this.detailSelected.status === BookingStatus.ON_HOLD ||
      this.detailSelected.status === BookingStatus.PENDING ||
      this.detailSelected.status === BookingStatus.PENDING_PAYMENT
    )
  }

  get showTermsAndConditions() {
    return (
      this.detailSelected.status === BookingStatus.ON_HOLD ||
      this.detailSelected.status === BookingStatus.PENDING ||
      this.detailSelected.status === BookingStatus.PENDING_PAYMENT ||
      this.detailSelected.status === BookingStatus.PAID
    )
  }

  get isReservationPaid(): boolean {
    return this.detailSelected.status === BookingStatus.PAID
  }

  get totalPaid(): string {
    return this.currencyFormatDivisa({
      value: String(Math.ceil(this.detailSelected.Paid)),
      divisa: ''
    })
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get isNational() {
    return this.authStore.isNational
  }

  get company() {
    return this.authStore.userCompany
  }

  get authStore(): AuthStore {
    return new AuthStore()
  }

  get supplementFeeAditionalLabel() {
    return this.isReferral ? this.$t('referralFee') : this.$t('supplementFee')
  }

  get isReferral() {
    return this.categotyTypeDescription == this.$t('referral')
  }

  get payloadSendPaymentLink() {
    return {
      name: this.formName,
      email: this.formEmail,
      // TODO
      // @ts-ignore
      cc: this.formEmail,
      application: Number(this.applicationUserMember!),
      isNational: this.isNational!,
      company: this.company!,
      body: paymentLinkTemplate(this.formName),
      folio: String(this.detailSelected.folioClub),
      hotel: this.detailSelected.hotel
    }
  }

  get isRefundable() {
    return this.detailSelected.Refundable == '0' ? false : true
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  onEmailSubmit() {
    this.bookingsStore.showLoading = true
  }

  async sendPaymentLink() {
    this.loadingEmail = true
    try {
      const {data} = await this.bookingsStore.sendPaymentLink(this.payloadSendPaymentLink)
      if (data.data) {
        this.layoutStore.showSnackbar(
          this.$t('validateReservationTitleSuccess') as string,
          this.$t('sendPaymentLinkMessageSuccess') as string,
          'success'
        )
        this.sendPaymentLinkSuccess = true
        this.formEmail = this.formName = ''
      } else {
        throw new Error()
      }
    } catch (error) {
      this.layoutStore.showSnackbar(
        this.$t('validateReservationTitleError') as string,
        this.$t('sendPaymentLinkMessageError') as string
      )
    } finally {
      this.loadingEmail = false
    }
  }

  onTermsAndConditionsClicked() {
    this.isCancelationPolicyShown = !this.isCancelationPolicyShown
  }

  openFormPayLink() {
    this.showLinkPayment = !this.showLinkPayment
    this.sendPaymentLinkSuccess = false
  }

  onDailyRatesClicked() {
    this.isDailyRatesShown = !this.isDailyRatesShown
  }

  get buttonSend() {
    return {
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.loadingEmail,
      label: 'Send'
    }
  }

  get categoryResume() {
    return this.bookingsStore.categories?.resume
  }

  get categoryName() {
    return this.bookingsStore.categories?.title
  }

  get categotyTypeDescription() {
    const category = this.bookingsStore.detailSelected.category!

    if (category === BookingProvotionStatus.PREFERENCIAL) return this.$t('preferentialRate')
    else if (category === BookingProvotionStatus.REFERIDO) return this.$t('referral')
    else if (category === BookingProvotionStatus.IMP_WEEKS) return this.$t('imperialWeeks')
    else if (category === BookingProvotionStatus.BONO) return this.$t('bonus')
    else if (category === BookingProvotionStatus.ANIVERSARIO) return this.$t('anniversary')
    else if (category === BookingProvotionStatus.INCENTIVA) return this.$t('incentive')
    else if (category === BookingProvotionStatus.REWARDS) return this.$t('rewards')
    else if (category === BookingProvotionStatus.IMP_NIGHT) return this.$t('imperial')
    else return ''
  }

  get avgNights() {
    return this.dailyRates[0]?.price || 0
  }

  get showLoading() {
    return this.bookingsStore.loadingDrawer
  }

  get reservation(): any {
    return this.bookingsStore.detailSelected
  }

  @Prop({type: String, default: 'USD'})
  readonly currency!: string

  @Prop({type: Boolean, default: false})
  readonly validate!: boolean

  @Prop({type: String, default: 'Send payment link'})
  readonly sendPaymentLinkText!: string

  get totalReserv(): string {
    return this.currencyFormatDivisa({
      value: this.reservation.totalReserv,
      prefix: '$',
      currencyText: '',
      divisa: ''
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

  get payloadValidateReservation(): PayloadValidateReservation {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      hotel: this.reservation.hotel,
      folio: this.reservation.folioClub,
      provisionId: '',
      isNational: this.isNational!,
      acepted: true
    }
  }

  get userCompany() {
    return this.authStore.userCompany
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

  public getRoom2Payload(folio: number): PayloadGetReservations {
    return {
      company: this.company || 0,
      application: this.applicationUserMember || '',
      pageNumber: 1,
      size: 1,
      sort: 'desc',
      searchItem: folio.toString(),
      isNational: this.isNational || false
    }
  }

  async joinRooms() {
    if (!this.reservationByPay) return []

    const reservations = [
      ReservationFromBookingsFactory(
        this.detailSelected,
        this.reservationByPay,
        this.setDailyRates()
      )
    ]

    // Presidential flow
    const isLockOffString = this.reservationByPay?.Extension?.IsLockOff as string
    const isLockOff = isLockOffString.length > 0 ?? false

    const ps1 = this.detailSelected.rm_type === 'PS1'
    const ps2 = this.detailSelected.rm_type === 'PS2'

    // Presidential Part 2
    if (ps1 || (ps2 && !isLockOff)) {
      const {data} = await this.getReservation(true, ps1)

      const room2Detail: Reservation | null = data?.data?._Reservation || null

      if (!room2Detail) return reservations

      this.bookingStore.$patch({
        reservationPresidentialPart2: room2Detail
      })

      const searchRoom2 = this.getRoom2Payload(room2Detail.Folio)

      const room2 = await this.bookingsStore.getPresidentialRoom2(searchRoom2)

      if (!room2) return reservations

      reservations.push(ReservationFromBookingsFactory(room2, room2Detail, this.setDailyRates()))
    }

    // All flows reservations
    return reservations
  }

  async onPay() {
    this.loading = true

    const reservations: ReservationFromBookings[] = await this.joinRooms()
    const roomsToShow: any = []

    reservations.forEach(item => {
      roomsToShow.push({
        id: 0,
        name: `${item.guests[0].memberUtils.firstname} ${item.guests[0].memberUtils.lastname}`,
        adults: item.roomsPax.adults,
        children: item.roomsPax.children,
        childrenages: []
      })
    })

    if (reservations.length > 0) {
      this.bookingStore.$patch({
        reservationFromBookings: reservations,
        booking: {
          affiliateId: '',
          propertyCode: this.reservationByPay?.Hotel,
          operaId: '',
          checkIn: this.reservationByPay?.Arv_date,
          checkOut: this.reservationByPay?.Depart_dt,
          rooms: roomsToShow
        }
      })
      this.bookingStore.saveRooms()

      this.$nextTick(() => {
        this.$router.push({path: '/booking/payment-process'})
      })
    }
    this.loading = false
  }

  public getReservation(isPart2 = false, isPs1 = true) {
    const nextFolio = this.detailSelected.folioClub + 1
    const previousFolio = this.detailSelected.folioClub - 1
    const payload = {
      application: this.detailSelected.application,
      company: this.detailSelected.company,
      isNational: this.isNational!,
      folio: !isPart2 ? this.detailSelected.folioClub : isPs1 ? nextFolio : previousFolio,
      hotel: this.detailSelected.hotel
    }

    return this.bookingStore.getReservation(payload)
  }

  get presidentialPart2() {
    return this.bookingStore.reservationPresidentialPart2
  }
}
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply pe-bg-blue-light;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply pe-bg-blue-dark;
}
</style>
