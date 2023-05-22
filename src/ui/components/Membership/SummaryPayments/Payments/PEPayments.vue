<template>
  <section>
    <PECard
      :title="dueDateLabel"
      class="pe-min-h-[1094px]"
    >
      <template #body>
        <PEMonthlyPayment
          :monthly-fee-amount="totalPayment"
          :down-payment-amount="downPaymentAmount"
          :late-payment-amount="0"
          :cards="cards"
          :payment-type="paymentType"
          :is-processing-payment="isProcessingPayment"
          @pay="pay"
        />
      </template>
    </PECard>
    <PEModal
      v-model="isModalVisible"
      style="z-index: 9999"
      class=""
      @input="toggleModal(false)"
    >
      <template #title>
        <div class="pe-w-full">
          <h3 class="pe-text-white pe-text-2xl pe-uppercase pe-my-10 pe-font-serif"></h3>
        </div>
      </template>
      <template #content>
        <p class="pe-text-white">{{ paymentResponse.message }}</p>
      </template>
      <template #buttons>
        <div class="pe-flex pe-justify-center pe-sm:flex pe-mt-20 pe-w-full">
          <PEButton
            outlined-secondary
            flat
            label="ACCEPT"
            class="pe-text-white"
            @click="toggleModal(false)"
          />
        </div>
      </template>
    </PEModal>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {UseAuth as Auth} from '../../../../store/auth'
import PEMonthlyPayment from './PEMonthlyPayment.vue'
import PECard from './atomic/PECard.vue'
import {MembershipPaymentStore} from '~/src/ui/store/paymentMembershipStore'
import {
  PayloadMembershipDto,
  QueryPayload,
  CardCreditPayload
} from '~/src/app/paymentMembership/domain/entities/payloadMembershipEntity'
import {CardPaymentEntity} from '~/src/app/paymentMembership/domain/entities/cardPaymentEntity'
import {PaymentOptions} from '~/src/app/paymentMembership/domain/enums/paymentOptions'

enum PECardPaymentType {
  OnePay = 'onePayment',
  PerRoomPayment = 'perRoomPayment',
  MonthlyPayment = 'monthlyPayment'
}

export interface PECreditCard {
  cardId: string
  cardNumber: string
  cardHolderName?: string
  expiryDate?: string
  cvv?: string
}

export interface PEUniversalCredit {
  id: string
  label: string
  amount: number
  checked: boolean
}

export interface PERoom {
  roomNumber: string
  guest: string
  alias: string
  property: string
}

interface PEPayment {
  remaningBalance: number
  universalCreditAmount?: number
  bookingCredits?: PEUniversalCredit[]
  room?: PERoom
  currency?: string
  downpaymentAmount?: number
}

@Component({
  name: 'PEPayments',
  components: {
    // PERadioGroup,
    PECard,
    PEMonthlyPayment
  }
})
export default class PEPayments extends Vue {
  @Prop({required: true}) dueDate!: Date

  @Prop({required: true}) payments!: any

  @Prop({required: true}) cards!: PECreditCard[]

  @Prop({required: true}) paymentType!: PECardPaymentType

  paymenMembershipStore = new MembershipPaymentStore()

  authStore = new Auth()

  isModalVisible = false

  isProcessingPayment = false

  get dueDateLabel(): string {
    const splitDate = new Date(this.dueDate).toDateString().split(' ')
    return this.dueDate && this.dueDate instanceof Date && !isNaN(this.dueDate.getTime())
      ? `Due Date: ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`
      : ''
  }

  get totalPayment(): number {
    return this.payments.remaningBalance
  }

  get downPaymentAmount(): number {
    return this.payments.downPaymentAmount
  }

  get paymentResponse() {
    return this.paymenMembershipStore.addPaymentResponse
  }

  get storedCardData() {
    return this.paymenMembershipStore.storedCard
  }

  get newCard() {
    return this.paymenMembershipStore.newCard
  }

  toggleModal(value: boolean) {
    this.isModalVisible = value
  }

  @Watch('paymentResponse')
  handleResponse() {
    this.isModalVisible = true
  }

  // Example request for /payments/payment-fee-call-center/
  data: PayloadMembershipDto = {
    // "postOnly": false,
    // "isUpdateCreditCard": false,
    // authId, account, transactionId, merchantCode Required in the request, but not used to pay
    authId: '0',
    account: 1,
    transactionId: 1,
    merchantCode: 'A',
    userMember: {
      company: 5
    },
    query: {
      numMonthlys: 0,
      monthlyAmount: 0.01,
      downPayment: 0,
      exchangeRate: 21.05,
      type: 'SL'
    },
    creditCard: {
      amount: 1,
      currency: 'USD',
      cardType: 'AMEX',
      number: '1111-1111-1111-1111',
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      lastName2: '',
      email: 'dummy@dymmy.com',
      phone: '+1234567890',
      paymentType: 'string',
      monthsInterestFree: 1,
      securityCode: 'string',
      expMM: 'string',
      expYY: 'string',
      address: 'string',
      zipCode: 'string',
      state: 'string',
      stateMEX: 1,
      stateUSA: 1,
      stateCAN: 1,
      city: 'string',
      country: 'string',
      countryISO3: '1',
      language: 'string',
      district: 'string',
      municipality: 'string'
    }
  }

  async pay(queryData: QueryPayload, total: number) {
    const query: QueryPayload = {
      numMonthlys: queryData.numMonthlys,
      monthlyAmount: queryData.monthlyAmount,
      downPayment: queryData.downPayment,
      exchangeRate: queryData.exchangeRate
      // type: "SL"
    }

    const card =
      this.paymenMembershipStore.paymentSelectedMethod === PaymentOptions.STORED_CARD
        ? this.storedCardData
        : this.newCard

    const creditCard: CardCreditPayload = {
      // id: cardId,
      amount: total,
      currency: 'USD',
      // cardType: cardData.cardType,
      // number: cardData.number,
      // firstName: cardData.firstName,
      // middleName: "",
      // lastName: "Doe",
      // lastName2: "",
      // email: "dummy@dymmy.com",
      // phone: "+1234567890",
      paymentType: 'SinglePayment',
      // monthsInterestFree: 1,
      // securityCode: cardData.securityCode,
      // expMM: cardData.expMM,
      // expYY: cardData.expYY,
      // address: "string",
      // zipCode: "string",
      // state: "string",
      // stateMEX: 1,
      // stateUSA: 1,
      // stateCAN: 1,
      // city: "string",
      // country: "string",
      countryISO3: card.country,
      // language: "string",
      // district: "string",
      // municipality: "string"
      ...card
    }

    const payload: PayloadMembershipDto = {
      authId: '0',
      account: 1,
      transactionId: 1,
      merchantCode: 'A',
      isNational: this.authStore.isNational,
      userMember: {
        company: this.authStore.userCompany
      },
      query,
      creditCard
    }

    try {
      this.isProcessingPayment = true
      await this.paymenMembershipStore.addPaymet({
        affiliationId: this.authStore.userAffiliationId,
        payload: {
          data: payload as PayloadMembershipDto
          // data: this.data as PayloadMembershipDto
        }
      })
      this.isProcessingPayment = false
    } catch (error) {
      this.isProcessingPayment = false
    }
  }
}
</script>
