<template>
  <section>
    <div
      v-for="(payment, index) in getPaidRooms"
      :key="index"
      class="pe-pb-5"
    >
      <PEExpansionPanel
        justify-header-class="pe-justify-start pe-bg-black-light"
        icon-classes="pe-text-blue-light pe-fill-transparent pe-mb-auto pe-content-center pe-min-w-[30px] pe-min-h-[30px] lg:pe-mr-3 pe-h-20 pe-grid pe-grid-cols-3 pe-gap-4 pe-content-center pe-mx-0"
        reverse
        rounded
      >
        <template #headerText>
          <PERoomDetail
            :room-detail="payment.room"
            :index-room="payment.roomIndex"
          />
        </template>
        <template #content>
          <PEPaymentDetail
            :cards="cards"
            :payment="payment"
            :payment-type="paymentType"
            :index-room="payment.roomIndex"
            :is-loading="isLoading"
          />
        </template>
      </PEExpansionPanel>
    </div>
    <div
      v-if="showDivider"
      class="spacer pe-pb-5 pe-border-t-2 pe-border-black-medium"
    ></div>
    <div v-if="currentPayment">
      <PERoomDetail
        :room-detail="currentPayment?.room"
        :index-room="currentPayment.roomIndex"
      />
      <PEPaymentDetail
        :cards="cardsItems"
        :payment="currentPayment"
        :payment-type="paymentType"
        :index-room="currentPayment.roomIndex"
        @payNow="payNow"
      />
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import PEPaymentDetail from './PEPaymentDetail/PEPaymentDetail.vue'
import PERoomDetail from './PERoomDetail/PERoomDetail.vue'
import {BookingPaymentStore} from '~/src/ui/store/bookingPaymentStore'
import {PEPayment} from '~/src/app/bookingpayment/domain/entities/PEPayment'
import {PECardPaymentType} from '~/src/app/bookingpayment/domain/enums/cardPaymentType'
import {PayDetail} from '~/src/app/bookingpayment/domain/entities/cardPayment'
import {PECreditCard} from '~/src/app/bookingpayment/domain/entities/cardCredit'

@Component({
  name: 'pe-per-room-payment',
  components: {
    PEPaymentDetail,
    PERoomDetail
  }
})
export default class PENewCardPayment extends Vue {
  @Prop({required: true}) payments!: PEPayment[]

  @Prop({required: true}) cards!: PECreditCard[]
  
  @Prop({type:Boolean, required: false, default:false}) isLoading!: boolean

  // Data

  public paymentType = PECardPaymentType.PerRoomPayment

  public BookingPaymentStoreInstance = new BookingPaymentStore()

  // Computed

  get currentPayment() {
    return this.BookingPaymentStoreInstance.getCurrentPayment
  }

  get cardsItems(): PECreditCard[] {
    return this.cards
  }

  get itemsToPay(): number {
    return this.payments.length
  }

  get getPaidRooms() {
    return this.BookingPaymentStoreInstance.readPaidPayments
  }

  get showDivider() {
    return this.getPaidRooms.length > 0 && !!this.currentPayment
  }

  // Methods

  public payNow(payload: PayDetail, roomIndex: number) {
    this.$emit('payNow', payload, roomIndex)
  }
}
</script>
<style lang="scss"></style>
