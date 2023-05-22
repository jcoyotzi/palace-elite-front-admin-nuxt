<template>
  <PEPaymentDetail :cards="cards" :payment="payment" :payment-type="paymentType" :is-loading="isLoading"
    @payNow="payNow"></PEPaymentDetail>
</template>
<script lang="ts">
import { PECardPaymentType } from '@pr-elite-components-library/lib/src/types/PECardPayment/PECardPaymentType.enum'
import { Component, Vue, Prop } from 'vue-property-decorator'
import PEPaymentDetail from './PEPaymentDetail/PEPaymentDetail.vue'
import { PayDetail } from '~/src/app/bookingpayment/domain/entities/cardPayment'
import { PEPayment } from '~/src/app/bookingpayment/domain/entities/PEPayment'
import { PaymentStatus } from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'
import { BookingPaymentStore } from '~/src/ui/store/bookingPaymentStore'
import { PECreditCard } from '~/src/app/bookingpayment/domain/entities/cardCredit'

@Component({
  name: 'PEOneCardPayment',
  i18n,
  components: {
    PEPaymentDetail
  }
})
export default class PEOneCardPayment extends Vue {
  @Prop({ type: Array, required: true }) cards!: PECreditCard[]
  @Prop({ type: Array, required: true }) payments!: PEPayment[]
  @Prop({ type: Boolean, required: false, default: false }) isLoading!: boolean

  // Data

  public BookingPaymentStoreInstance = new BookingPaymentStore()

  public checkAcceptTerms = false

  public paymentType = PECardPaymentType.OnePay

  // Computed
  get payment(): PEPayment {
    const unifiedPayment = {
      ...this.payments[0]
    }
    unifiedPayment.remaningBalance = this.BookingPaymentStoreInstance.totalCost
    return unifiedPayment
  }

  // Methods
  public payNow(payload: PayDetail) {
    this.$emit('payNow', payload)
  }
}
</script>
