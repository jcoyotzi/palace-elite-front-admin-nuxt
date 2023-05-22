<template>
  <section>
    <div class="pe-pt-8">
      <div class="pe-grid md:pe-grid-cols-3 md:pe-gap-x-10">
        <div class="pe-mb-4 md:pe-mb-6">
          <PETextInput
            v-model="downpayment"
            :label="$t('downPaymentInputLbl')"
            :value="downpaymentString"
            :mask="currencyMask"
            :disabled="isDisabledDownPaymentInput"
            input-max-lenght="12"
          />
        </div>
        <div class="pe-mb-4 md:pe-mb-6">
          <PETextInput
            v-model="monthlyFee"
            :label="$t('monthlyFeeInputLbl')"
            :mask="currencyMask"
            :disabled="isDisabledMonthlyFeeInput"
            input-max-lenght="12"
            @change="onChangeMonthlyFeeInput"
          />
          <PECheckbox
            v-model="payByNumberOfMonths"
            class="pe-my-5">
            {{ $t('monthsToPayCheckboxLbl') }}
          </PECheckbox>
          <PEInput
            v-if="payByNumberOfMonths"
            v-model.lazy="monthsToPay"
            v-bind="numberOfMonthsInputProps"
            @change="onChangeMonthsInput"
          />
        </div>
        <div class="pe-mb-4 md:pe-mb-6">
          <PETextInput
            v-model="lateFee"
            :label="$t('latePaymentInputLbl')"
            :value="lateFeeString"
            :mask="currencyMask"
            :disabled="isDisabledLateaymentInput"
          />
        </div>
      </div>
      <div class="pe-w-full">
        <a
          class="pe-my-4 pe-text-blue-light pe-underline pe-cursor-pointer"
          @click="toggleModal(true)"
          >{{ $t('needHelp') }}</a
        >
      </div>
    </div>
    <!-- Cards -->
    <div class="pe-flex pe-flex-row pe-mb-10">
      <div class="pe-basis-full">
        <PEPayWithCard
          class="pe-pt-8"
          :cards="cardsItems"
          payment-type="pe-One Payment"
          :disabled="isDisabledCreditCardForm"
          @handleValidForm="validForm"
        />
      </div>
    </div>
    <div class="pe-flex pe-justify-center pe-pt-4 md:pe-pt-8 pe-border-t-2 pe-border-t-black">
      <div class="pe-text-center">
        <label
          class="pe-text-normal pe-font-sans pe-text-[24px] pe-text-white pe-block pe-capitalize"
          >{{ $t('totalPaymentLabel') }}
        </label>
        <label class="pe-text-normal pe-font-sans pe-text-[24px] pe-text-white"
          >{{ calcTotalPayment | currency }}
        </label>
        <span class="pe-text-normal pe-font-sans pe-text-[16px] pe-text-white">{{ currency }}</span>
      </div>
    </div>
    <!-- <div class="flex justify-center pt-8 md:pt-8">
      <div class="md:w-[580px]">
        <PECheckbox v-bind="checkboxRecurryPayment">
          <slot name="default">
            <label class="cursor-pointer font-sans text-[16px] text-white">{{
              labelCheckRecurryPayment
            }}</label>
          </slot>
        </PECheckbox>
      </div>
    </div> -->
    <div class="pe-flex pe-justify-center pe-pt-4 md:pe-pt-8">
      <div class="md:pe-max-w-[580px]">
        <section>
          <PECheckbox
            :checked="checkAcceptTerms"
            v-bind="acceptTermsProps"
            @input="acceptTerms"
          >
            <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-white">
              {{ $t('disclamer') }}
            </label>

            <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-blue-light">
              <PEButton
                text
                :class="termsbuttonProps"
                @click="toggleModalTerms(true)"
              >
                {{ $t('termsAndConditionsLabel') }}
              </PEButton>
            </label>
            <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-white">
              {{ $t('disclamerConcatLabel') }}
            </label>
            <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-blue-light">
              <PEButton
                text
                :class="termsbuttonProps"
                @click="toogleModalPrivacy(true)"
              >
                {{ $t('privacyNoticesLabel') }}
              </PEButton>
            </label>
          </PECheckbox>
        </section>
      </div>
    </div>
    <div class="pe-flex pe-justify-center">
      <div>
        <PEButton
          uppercase
          block
          solid
          :disabled="!isAllowedToPay"
          class="pe-mt-8 pe-mb-8 pe-block pe-h-[50px] pe-w-[250px]"
          :loading="isLoading"
          @click="payNow"
        >
          <span class="pe-text-[16px]">{{ $t('payNow') }}</span>
        </PEButton>
      </div>
    </div>
    <PEModal @input="toggleModal(false)">
      <div class="pe-items-end pe-justify-end sm:pe-flex pe-mt-20 pe-w-full">
        <PEButton
          outlined-secondary
          flat
          :label="$t('close')"
          class="pe-text-white"
          @click="toggleModal(false)"
        />
      </div>
    </PEModal>
    <PEModal
      v-model="isModalVisible"
      class="pe-z-[900]"
      @input="toggleModal(false)"
    >
      <template #title>
        <div
          v-if="modalContent?.title"
          class="pe-w-full"
        >
          <h3 class="pe-text-white pe-text-2xl pe-uppercase pe-my-10 pe-font-serif">{{
            modalContent?.title
          }}</h3>
        </div>
      </template>
      <template #content>
        <div
          v-if="modalContent?.content"
          class="pe-text-white pe-w-full"
          v-html="modalContent?.content"
        >
        </div>
      </template>
      <template #buttons>
        <PEButton
          outlined-secondary
          flat
          uppercase
          :label="$t('close')"
          class="pe-text-white"
          @click="toggleModal(false)"
        />
      </template>
    </PEModal>

    <!-- Mpdal terms & conditions -->
    <PEModal
      v-if="termsAndConditions"
      v-model="isModalTermsVisible"
      class="pe-z-[900]"
      @input="toggleModalTerms(false)"
    >
      <template #title>
        <div class="pe-w-full">
          <h3 class="pe-text-white pe-text-2xl pe-uppercase pe-my-10 pe-font-serif">{{
            termsAndConditions.title
          }}</h3>
        </div>
      </template>
      <template #content>
        <div class="pe-max-h-[250px] md:pe-max-h-[350px] pe-overflow-y-scroll w-full custom-scroll">
          <p
            class="pe-text-white"
            v-html="termsAndConditions.content"
          >
          </p>
        </div>
      </template>
      <template #buttons>
        <div class="pe-items-end pe-justify-center pe-flex pe-mt-5 pe-w-full pe-gap-20">
          <PEButton
            outlined-secondary
            flat
            uppercase
            :label="$t('close')"
            class="pe-text-white"
            @click="toggleModalTerms(false)"
          />
        </div>
      </template>
    </PEModal>

    <!-- Modal Privacy notices -->
    <PEModal
      v-if="privacyNotice"
      v-model="isPrivacyPoliciesVisible"
      class="pe-z-[900]"
      @input="toogleModalPrivacy(false)"
    >
      <template #title>
        <div class="pe-w-full">
          <h3 class="pe-text-white pe-text-2xl pe-uppercase pe-my-10 pe-font-serif">{{
            privacyNotice.title
          }}</h3>
        </div>
      </template>
      <template #content>
        <div class="pe-max-h-[250px] md:pe-max-h-[350px] pe-overflow-y-scroll w-full custom-scroll">
          <p
            class="pe-text-white"
            v-html="privacyNotice.content"
          >
          </p>
        </div>
      </template>
      <template #buttons>
        <div class="pe-items-end pe-justify-center pe-flex pe-mt-5 pe-w-full pe-gap-20">
          <PEButton
            outlined-secondary
            flat
            uppercase
            :label="$t('close')"
            class="pe-text-white"
            @click="toogleModalPrivacy(false)"
          />
        </div>
      </template>
    </PEModal>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import PEPayWithCard from './atomic/PEPayWithCard.vue'
import PECheckBookingConditions from './atomic/PECheckBookingConditions/PECheckBookingConditions.vue'
import {MembershipPaymentStore} from '~/src/ui/store/paymentMembershipStore'
import {PAYMENT_STATUS} from '~/src/app/paymentMembership/domain/enums/paymentStatus'
import {QueryPayload} from '~/src/app/paymentMembership/domain/entities/payloadMembershipEntity'
// import { PaymentMembershipRepository } from '~/src/app/paymentMembership/application/domain/repositories/paymentMembershipRepository';
import i18n from '~/src/ui/i18n/membership/summaryAndPayments.lang'
import {ModalAndContentStore} from '~/src/ui/store/modalsStore'
import Modal from '../../Owners/Modal.vue'
import {ModalContent} from '~/src/app/modals/domain/dto/modalAndContentDto'
import { TermsAndConditionsStore } from '~/src/ui/store/termAndConditionsStore'
import { UseAuth } from '~/src/ui/store/auth'
import { BalanceStore } from '~/src/ui/store/balanceStore'
import { ParamsAmountPromiseEntity } from '~/src/app/paymentMembership/domain/entities/paramsAmountPromiseEntity'

export interface PECreditCard {
  cardId: string
  cardNumber: string
  cardHolderName?: string
  expiryDate?: string
  cvv?: string
}
enum PECardPaymentType {
  OnePay = 'onePayment',
  PerRoomPayment = 'perRoomPayment',
  MonthlyPayment = 'monthlyPayment'
}

@Component({
  name: 'pe-monthly-payment',
  components: {
    PEPayWithCard,
    // PETextInput,
    PECheckBookingConditions
    // PEButton,
    // PECheckbox,
  },
  i18n
})
export default class PEPaymentDetail extends Vue {
  @Prop({required: true}) downPaymentAmount!: number

  @Prop({required: true}) monthlyFeeAmount!: number

  @Prop({required: true}) latePaymentAmount!: number

  @Prop({required: true}) cards!: PECreditCard[]

  @Prop({required: false, default: 'USD'}) currency!: string

  @Prop({required: true, type: Boolean, default: false}) isProcessingPayment!: boolean

  // @Prop({default: false, type: Boolean}) reset!: boolean

  @Prop({required: false, default: '/info/booking-conditions'})
  bookingCoditionsUrl!: string

  @Prop({required: false, default: '/info/temns-and-conditions'})
  termsConditionsUrl!: string

  @Prop({required: false, default: '/info/privacy-noticies'})
  privacyNoticiesUrl!: string

  paymentMembershipStore = new MembershipPaymentStore()
  modalsStore = new ModalAndContentStore()
  tycStore = new TermsAndConditionsStore()
  authStore = new UseAuth()
  balanceStore = new BalanceStore()

  isValidCardForm = false

  modalContent: void | ModalContent | null = null

  monthlyFee = ''

  get monthlyFeeString() {
    return this.monthlyPayment ? this.numberValidations(this.monthlyPayment).toString() : ''
  }

  get monthlyPayment() {
    return this.paymentMembershipStore.amountPromise
  }

  downpayment = this.downpaymentString

  get downpaymentString() {
    return this.numberValidations(this.downPaymentAmount).toString()
  }

  lateFee = this.lateFeeString

  get lateFeeString() {
    return this.numberValidations(this.latePaymentAmount).toString()
  }

  get isLoading() {
    return this.isProcessingPayment
  }

  public get acceptTermsProps() {
    return {
      id: 'checkbox-accept-terms',
      value: this.checkAcceptTerms,
      color: 'blue'
    }
  }

  public get termsAndConditions() {
    return this.paymentMembershipStore.termsAndConditions
  }

  public get privacyNotice() {
    return this.paymentMembershipStore.privacyNotices
  }

  totalToPay = 0

  checkAcceptTerms = false

  checkRecurryPayment = false

  isModalVisible = false

  isModalTermsVisible: boolean = false

  isPrivacyPoliciesVisible: boolean = false

  monthsToPay: number = 1

  payByNumberOfMonths: boolean = false

  isLoadingNumberOfMonths: boolean = false

  toggleModal(value: boolean) {
    this.isModalVisible = value
  }

  get latePayment(): string {
    return this.latePaymentAmount.toString()
  }

  get cardsItems(): PECreditCard[] {
    return this.cards
  }

  get totalAmountToPay(): string {
    return `Total payment $${this.calcTotalPayment.toFixed(2)}`
  }

  get calcTotalPayment(): number {
    return (
      this.stringToNumber(this.downpayment) +
      this.stringToNumber(this.monthlyFee) +
      this.stringToNumber(this.lateFee)
    )
  }

  get isValidAmountToPay(): boolean {
    return this.calcTotalPayment > 0
  }

  get isValidCreditCardForm(): boolean {
    return this.paymentMembershipStore.isNewCardValid
    // return !!this.newCard.firstName && !!this.newCard.number && !!this.newCard.expMM && !!this.newCard.expYY
  }

  get isValidStoredCard(): boolean {
    return this.paymentMembershipStore.isStoredSelectedCardValid
  }

  get hasPaymentMethod(): boolean {
    return !!this.isValidStoredCard || !!this.isValidCreditCardForm
  }

  get isAllowedToPay(): boolean {
    return (
      this.isValidAmountToPay && this.hasPaymentMethod && this.checkAcceptTerms && !this.isLoading
    )
  }

  get isDisabledDownPaymentInput(): boolean {
    return this.isLoading
  }

  get isDisabledMonthlyFeeInput(): boolean {
    return this.monthlyFeeAmount === 0 || this.isLoading || this.isLoadingNumberOfMonths
  }

  get isDisabledLateaymentInput(): boolean {
    return this.latePaymentAmount === 0 || this.isLoading
  }

  get isDisabledCreditCardForm(): boolean {
    return this.isLoading
  }

  get isDisabledAmountPromiseInput(): boolean {
    return this.isLoading || this.isLoadingNumberOfMonths
  }

  get paymentResponse() {
    return this.paymentMembershipStore.addPaymentResponse
  }

  get maxAmountOfPromises(): number {
    return this.balanceStore.balance.remainingMonthlyPayments
  }

  get numberOfMonthsInputProps() {
    return {
      label: this.$t('numberOfMountsInputLbl'),
      type: "text",
      mask: "###",
      disabled: this.isLoadingNumberOfMonths,
    }
  }

  validForm(val: boolean) {
    this.isValidCardForm = !val
  }

  payNow() {
    const query: QueryPayload = {
      lateFee: this.lateFee,
      monthlyAmount: this.stringToNumber(this.monthlyFee),
      downPayment: this.stringToNumber(this.downpayment),
      numMonthlys: this.monthsToPay,
      exchangeRate: 1
    }

    this.$emit('pay', query, this.calcTotalPayment)
  }

  acceptTerms(checkAcceptTerms: boolean) {
    this.checkAcceptTerms = checkAcceptTerms
  }

  get disabledPayNow(): boolean {
    return !this.checkAcceptTerms
  }

  get labelCheckRecurryPayment() {
    return 'Enable this card for recurring monthly payments.'
  }

  get currencyMask() {
    return createNumberMask({
      prefix: '$ ',
      // suffix: " USD",
      includeThousandsSeparator: true,
      allowNegative: false,
      thousandsSeparatorSymbol: ',',
      allowDecimal: true
    })
  }

  get termsbuttonProps() {
    return ['!pe-p-0 !no-underline']
  }

  numberValidations(number: number): string {
    const validate = Math.abs(number).toFixed(2)
    return validate
  }

  stringToNumber(number: string): number {
    const validate = number.replaceAll('$ ', '').replaceAll(',', '')
    if (!validate) return 0
    return +parseFloat(validate).toFixed(2)
  }

  toggleModalTerms(value: boolean) {
    this.isModalTermsVisible = value
  }

  toogleModalPrivacy(value: boolean) {
    this.isPrivacyPoliciesVisible = value
  }

  onChangeMonthsInput(evt: any) {
    if (!evt.target.value) return
    this.getAmountPromises(evt.target.value)
  }

  async getAmountPromises(number: number) {
    this.isLoadingNumberOfMonths = true
    const params: ParamsAmountPromiseEntity = {
      application: this.authStore.userAffiliationId,
      isNational: this.authStore.isNational,
      promises: Number(number)
    }
    await this.paymentMembershipStore.getAmountPromise(params)
    this.monthlyFee = String(this.monthlyPayment)
    this.isLoadingNumberOfMonths = false
  }

  async init() {
    const content = await this.modalsStore.fetchModalContent('membership-payments-need-help')
    // @ts-ignore
    this.modalContent = content
    this.monthlyFee = String(this.monthlyFeeAmount)
  }

  reset() {
    this.monthlyFee = '0'
    this.downpayment = '0'
    this.lateFee = '0'
    this.totalToPay = 0
    this.acceptTerms(false)
    this.monthsToPay =1
  }

  onChangeMonthlyFeeInput() {
    this.monthsToPay = 1
    this.payByNumberOfMonths = false
  }

  @Watch('paymentResponse')
  handlePayment() {
    if (this.paymentResponse.status === PAYMENT_STATUS.SUCCESS) {
      this.reset()
    }
  }

  // @Watch('downpayment')
  // handleDownpayment(newValue: any) {
  //   if (this.stringToNumber(newValue) > this.downPaymentAmount) {
  //     this.downpayment = this.downPaymentAmount.toString()
  //   }
  // }

  // @Watch('monthlyFee')
  // handleMonthlyFee(newValue: any) {
  //   if (this.stringToNumber(newValue) > this.monthlyFeeAmount) {
  //     this.monthlyFee = this.monthlyFeeAmount.toString()
  //   }
  // }

  @Watch('monthsToPay')
  handleNumberOfPromises(val: string) {
    if (Number(val) > this.maxAmountOfPromises) {
      this.monthsToPay = this.maxAmountOfPromises
      this.getAmountPromises(this.maxAmountOfPromises)
    }
  }

  @Watch('payByNumberOfMonths')
  handlePayMore(newVal: boolean) {
    if (newVal === false && Number(this.monthsToPay) !== 1) {
      this.monthsToPay = 1
      this.getAmountPromises(1)
    }
  }

  mounted() {
    this.init()
  }
}
</script>
