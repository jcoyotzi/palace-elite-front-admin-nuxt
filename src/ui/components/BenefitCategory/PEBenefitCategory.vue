<template>
  <div>
    <div
      class="pe-benefit-category pe-flex pe-flex-col pe-text-white"
      v-if="showTemplate"
    >
      <h2
        class="pe-mb-10 pe-font-serif pe-text-[24px] pe-font-medium pe-uppercase pe-leading-[23px]"
      >
        {{ title }}
      </h2>
      <p class="pe-m-0 pe-mb-[38px] pe-font-sans pe-text-base pe-font-normal pe-leading-6">
        {{ description }}
      </p>
      <div class="benefits pe-mx-auto">
        <PECardTransportDetail
          v-for="(benefit, index) in benefits"
          :key="`benefit-${index}`"
          :is-golf="isGolf"
          class="mb-10"
          v-bind="benefit"
          @on-interact="onBenefitInteract"
        ></PECardTransportDetail>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import {Benefit, ExternalRooms} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import PECardTransportDetail from './Details/PECardTransportDetail.vue'
import {BookingBenefitStore} from '~/src/ui/store/strapi/bookingBenefitsStore'
import {BookingStore} from '../../store/bookingStore'
import {EnumReservationCategory} from 'app/rules/domain/entities/enum/pipelinesEnum'
import {BookingGolfStore} from '../../store/booking/bookingGolfStore'
@Component({
  name: 'PEBenefitCategory',
  components: {
    PECardTransportDetail
  }
})
export default class PEBenefitCategory extends Vue {
  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: String, required: true})
  readonly description!: string

  @Prop({type: Array, required: true})
  readonly benefits!: Benefit[]

  @Prop({type: Boolean, default: false})
  readonly isGolf!: boolean

  bookingBenefitStore = new BookingBenefitStore()

  bookingStore = new BookingStore()

  bookingGolfStore = new BookingGolfStore()

  @Emit()
  onBenefitInteract(evt: Benefit) {}

  @Watch('benefits')
  onBenefitsChange() {
    this.$emit('on-benefits-change')
  }

  get externalRooms() {
    return this.bookingBenefitStore.getExternalRooms
  }

  get elegibleForGolf() {
    return this.externalRooms.some((room: ExternalRooms) => room.hasGolfCompliance === true)
  }

  get showTemplate() {
    return this.isGolf ? this.canTravelWithGolf : true
  }

  get canTravelWithGolf(): boolean {
    return (
      this.bookingGolfStore.canTravelWithGolf.canTravelWithProvition ||
      this.bookingGolfStore.canTravelWithGolf.canTravelWithElite
    )
  }

  roomHasRate(room: ExternalRooms) {
    return this.bookingGolfStore.getAllRoomCodesWithGolf?.includes(room?.categoryId)
  }
}
</script>

<style scoped></style>
