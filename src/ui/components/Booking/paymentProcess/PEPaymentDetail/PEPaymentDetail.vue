<template>
  <section>
    <div class="flex-column flex flex-col-reverse md:flex-row">
      <div
        class="pe-basis-full md:pe-basis-1/2"
        :class="{'pe-pointer-events-none pe-opacity-[0.3]': universalCredits <= 0}"
      >
        <PEPayWithUniversalCredit
          :disabled-amount-to-use="isPaid"
          :available-credits="universalCredits"
          :max-credit-to-use="remaningBalance"
          @universalCreditToUse="useUniversalCredits"
        />
      </div>
      <div class="pe-order-1 pe-basis-full pe-pt-6 pe-pb-8 md:pe-basis-1/2 lg:pe-pl-12 lg:pe-pr-4">
        <PELabelBlock :remaining-balance="labelremaningBalance" />
      </div>
    </div>
    <!-- Cards -->
    <div class="flex flex-row">
      <div class="basis-full">
        <PEPayWithCard
          class="pe-pt-8"
          :initial-new-card="initialNewCard"
          :payment-type="paymentType"
          :cards="cardsItems"
          :disabled="isPaid"
          @selectedNewCard="selectCard"
        />
      </div>
    </div>
    <div
      v-if="showTotalPayment && needToBePaid"
      class="flex justify-center"
    >
      <div class="md:w-72">
        <PETotalPayment
          class="pt-12"
          :amount-credit-card="amountCreditCard"
          :amount-universal-credits="amountUniversalCredits"
          :amount-booking-credits="amountBookingCredits"
          :remaning-balance="remaningBalance"
        />
      </div>
    </div>
    <div
      v-if="needToBePaid"
      class="grid md:pe-grid-cols-12"
    >
      <div class="col-span-10 md:col-start-2">
        <PECheckBookingConditions class="pt-8" />
      </div>
    </div>
    <div
      v-if="needToBePaid"
      class="flex justify-center"
    >
      <div>
        <PEButton
          v-bind="buttonPayNowProps"
          :class="buttonPayNowClass"
          :loading="isLoading"
          @click="payNow"
          >{{ labelBtn }}</PEButton
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import PEPayWithUniversalCredit from '../PEPayWithUniversalCredit/PEPayWithUniversalCredit.vue'
import PELabelBlock from '../PELabelBlock/PELabelBlock.vue'
import PEPayWithCard from '../../../Membership/SummaryPayments/Payments/atomic/PEPayWithCard.vue'
import PETotalPayment from '../PETotalPayment/PETotalPayment.vue'
import PECheckBookingConditions from '../PECheckBookingConditions/PECheckBookingConditions.vue'
import {BookingPaymentStore} from '~/src/ui/store/bookingPaymentStore'
import {WalletStore} from '~/src/ui/store/benefits/walletStore'
import {PECardPaymentType} from '~/src/app/bookingpayment/domain/enums/cardPaymentType'
import {PEPayment} from '~/src/app/bookingpayment/domain/entities/PEPayment'
import {PECreditCard} from '~/src/app/bookingpayment/domain/entities/cardCredit'
import {CardPaymentEntity} from '~/src/app/paymentMembership/domain/entities/cardPaymentEntity'
import {CardSelected, PayDetail} from '~/src/app/bookingpayment/domain/entities/cardPayment'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'

@Component({
  name: 'pe-payment-detail',
  components: {
    PEPayWithUniversalCredit,
    PELabelBlock,
    PEPayWithCard,
    PETotalPayment,
    PECheckBookingConditions
  }
})
export default class PEPaymentDetail extends Vue {
  @Prop({required: true}) paymentType!: PECardPaymentType

  @Prop({required: true}) payment!: PEPayment

  @Prop({required: true}) cards!: PECreditCard[]

  @Prop({required: false, default: -1}) indexRoom!: number

  @Prop({required: false}) initialNewCard!: CardPaymentEntity

  @Prop({type: Boolean, required: false, default: false}) isLoading!: boolean

  // Data

  public amountUniversalCredits = 0

  public amountBookingCredits = 0

  public cardSelected: CardSelected | null = null

  public BookingPaymentStoreInstance = new BookingPaymentStore()

  public walletStore = new WalletStore()

  // Computed

  get amountCreditCard() {
    return this.hasSelectedACard ? this.remaningBalance - this.amountUniversalCredits : 0
  }

  get remaningBalance(): number {
    return this.payment.remaningBalance ?? 0
  }

  get universalCredits(): number {
    return this.walletStore.summarysCards?.amountAvailable ?? 0
  }

  get cardsItems(): PECreditCard[] {
    return this.cards
  }

  get disabledPayNow(): boolean {
    return this.labelremaningBalance !== 0
  }

  get labelBtn() {
    return this.isOnePay ? 'Pay Now' : 'Pay this room'
  }

  get isOnePay() {
    return this.paymentType === PECardPaymentType.OnePay
  }

  get roomDetail() {
    return this.payment.room?.property
  }

  get needToBePaid() {
    return this.payment.status !== PaymentStatus.Paid
  }

  get isPaid() {
    return !this.needToBePaid
  }

  get labelremaningBalance(): number {
    return this.remaningBalance - this.amountUniversalCredits - this.amountCreditCard
  }

  get showTotalPayment() {
    return this.labelremaningBalance === 0 || this.amountUniversalCredits > 0
  }

  get buttonPayNowProps() {
    return {
      disabled: this.disabledPayNow,
      uppercase: true,
      block: true,
      solid: true,
      outlined: !this.isOnePay
    }
  }

  get buttonPayNowClass() {
    return {
      '!pe-border-blue-light !pe-text-blue-light': !this.isOnePay,
      'mt-8 mb-8 block h-[50px] w-[250px]': true
    }
  }

  get hasSelectedACard() {
    return this.cardSelected ? Object.entries(this.cardSelected).length > 0 : false
  }

  // Methods

  public selectCard(cardSelected: CardSelected) {
    this.cardSelected = cardSelected
  }

  public useUniversalCredits(amount: number) {
    this.amountUniversalCredits = amount
  }

  public payNow() {
    const payDetail: PayDetail = {
      amountCreditCard: this.amountCreditCard,
      amountUniversalCredits: this.amountUniversalCredits,
      remaningBalance: this.remaningBalance,
      cardSelected: this.cardSelected
    }
    this.$emit('payNow', payDetail, this.indexRoom)
  }
}
</script>
