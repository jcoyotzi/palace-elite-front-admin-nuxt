<template>
  <div class="pe-flex">
    <div class="pe-overflow-x-auto pe-overflow-y-hidden">
      <h1 class="pe-mb-[40px] pe-font-serif pe-text-[32px] pe-uppercase pe-text-white">
        membership Summary
      </h1>

      <PESpinner
        v-if="balanceStore.isLoading"
        class="pe-mb-[40px]"
        fill="pe-fill-blue"
      />
      <MembershipSummaryPaymentsSummaryPESummary
        v-else
        :balance="balance"
        class="pe-w-full mb-[40px]"
      />

      <p
        v-if="isBalanceUnavailable"
        class="pe-text-white pe-mb-[40px]"
      >
        Unavailable service
      </p>

      <PEButton
        outlined-secondary
        uppercase
        class="pe-mb-[120px]"
        :loading="isGeneratingPdf"
        @click="downloadBalance"
        >Download My Membership Balance</PEButton
      >

      <h1 class="pe-mb-[40px] pe-font-serif pe-text-[32px] pe-uppercase pe-text-white">
        Membership payments
      </h1>

      <MembershipSummaryPaymentsPaymentsPEPayments
        v-if="isPaymentsReady"
        :cards="payments.cards"
        :payments="payments.payments"
        :payment-type="payments.paymentType"
        :due-date="payments.dueDate"
      />
      <PESpinner
        v-else
        class="pe-mb-[40px]"
        fill="pe-fill-blue"
      />
    </div>
    <!-- <div class="overflow-auto">
    </div> -->
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import {Mixins, Watch} from 'vue-property-decorator'
import {ToastOptions} from 'vue-toasted'
import {UseAuth} from '../../store/auth'
import {BalanceStore} from '../../store/balanceStore'
import {PropertiesStore} from '../../store/propertiesStore'
import {MembershipPaymentStore} from '../../store/paymentMembershipStore'
import {PaymentStore} from '../../store/paymentStore'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import {ToastDuration} from '../../utils/toastHelpers'
import {ParamsBalanceEntity} from '~/src/app/balance/domain/entities/paramsBalanceEntity'
import {ParamsAmountPromiseEntity} from '~/src/app/paymentMembership/domain/entities/paramsAmountPromiseEntity'
import {PAYMENT_STATUS} from '~/src/app/paymentMembership/domain/enums/paymentStatus'
import i18n from '~/src/ui/i18n/membership/summaryAndPayments.lang'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  name: 'SummaryAndPayments',
  components: {},
  meta: {
    auth: true
  }
})
export default class SummaryAndPayments extends Mixins (BasePageStrapiMixin) {
  balanceStore = new BalanceStore()
  authStore = new UseAuth()
  propertiesStore = new PropertiesStore()
  paymentMembershipStore = new MembershipPaymentStore()
  paymentStore = new PaymentStore()

  public paramsBalance: ParamsBalanceEntity = {
    affiliationId: this.authStore.userAffiliationId,
    company: this.authStore.userCompany,
    isNational: this.authStore.isNational
  }

  public paramsAmountPromise: ParamsAmountPromiseEntity = {
    application: this.authStore.userAffiliationId,
    isNational: this.authStore.isNational,
    promises: 1
  }

  get balance() {
    return this.balanceStore.balance
  }

  get dueDownpayment() {
    return this.balanceStore.balance.dueDownpayment
  }

  get cards() {
    const mappedCards = this.paymentStore.cardsCredit.map(creditCard => ({
      cardId: creditCard.id,
      cardNumber: creditCard.cardTermination,
      cardHolderName: creditCard.cardHolder,
      expiryDate: creditCard.dueDate,
      cardStamp: creditCard.cardStamp
    }))
    return mappedCards
  }

  get amountPromise() {
    return this.paymentMembershipStore.amountPromise
  }

  get isBalanceUnavailable() {
    return !this.balanceStore.isLoading && this.balanceStore.hasError
  }

  get paymentResponse() {
    return this.paymentMembershipStore.addPaymentResponse
  }

  async getBalance() {
    await this.balanceStore.getBalance(this.paramsBalance)
  }

  async getAmountPromise() {
    try {
      await this.paymentMembershipStore.getAmountPromise(this.paramsAmountPromise)
    } catch (e) {
      console.error(e)
    }
  }

  async getTermsAndConditions() {
    try {
      await this.paymentMembershipStore.getTermsAndCoditions()
    } catch (error) {}
  }

  @Watch('paymentResponse')
  handleResponse() {
    if (this.paymentResponse.status === PAYMENT_STATUS.SUCCESS) {
      this.getAmountPromise()
    }
  }

  isGeneratingPdf = false

  public get toastOptions(): ToastOptions {
    return {
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'error'
    }
  }

  getMembershipPaymentData() {
    if(this.paramsBalance.affiliationId && this.paramsBalance.company) {
      this.paymentMembershipStore.fetchMembershipPaymentsData({
        application: this.paramsBalance.affiliationId,
        isNational: this.paramsBalance.isNational?? false,
        company: this.paramsBalance.company
      })
    }
  }

  async downloadBalance() {
    this.isGeneratingPdf = true

    try {
      let response: any = ''

      response = await this.balanceStore.getDownloadBalance(this.paramsBalance)

      const pdf = response
      const byteCharacters = atob(pdf)
      const byteNumbers = new Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      const file = new Blob([byteArray], {type: 'application/pdf;base64'})
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)

      this.$toasted.success(this.$t('successDownloadBalance') as string, this.toastOptions)
    } catch (e) {
      this.$toasted.error(this.$t('errorDownloadBalance') as string, this.toastOptions)
    } finally {
      this.isGeneratingPdf = false
    }
  }

  get hrefBase64() {
    return 'data:application/pdf;base64,' + this.balanceStore.downloadBalanceBlob
  }

  beforeMount() {
    this.loadStrapiPageData(BasePageSlugs.SummaryAndPayments);
  }
  
  mounted() {
    this.getBalance()
    this.getAmountPromise()
    this.getTermsAndConditions()
    this.getMembershipPaymentData()
  }

  get isPaymentsReady() {
    // return true
    return this.amountPromise !== null && this.dueDownpayment !== null
  }

  get memebershipPayments() {
    return this.paymentMembershipStore.membershipPaymentsData
  }

  get payments() {
    return {
      cards: this.cards,
      payments: {
        remaningBalance: this.amountPromise,
        downPaymentAmount: this.dueDownpayment
      },
      paymentType: 'onePayment',
      dueDate: this.memebershipPayments ? new Date(this.memebershipPayments.dueDate.split('.')[0]) : new Date()
    }
  }

  // payments = {
  //   cards: this.cards,
  //   payments2: [
  //     {
  //       remaningBalance: this.amountPromise,
  //       currency: 'USD',
  //     },
  //     {
  //       downPaymentAmount: this.dueDownpayment,
  //       currency: 'USD'
  //     }
  //   ],
  //   payments: {
  //     remaningBalance: this.amountPromise,
  //     downPaymentAmount: this.dueDownpayment,
  //   },
  //   paymentType: 'onePayment',
  //   dueDate: '2022/08/30',
  // }
  // cards: [
  //     {
  //       cardId: '1',
  //       cardNumber: '5555222233339999',
  //       expiryDate: '09/2023',
  //     },
  //     {
  //       cardId: '2',
  //       cardNumber: '4444555533337765',
  //       expiryDate: '12/2023',
  //     },
  //     {
  //       cardId: '3',
  //       cardNumber: '4444999333370999',
  //       expiryDate: '12/2023',
  //     },
  //   ];
}
</script>

<style scoped></style>
