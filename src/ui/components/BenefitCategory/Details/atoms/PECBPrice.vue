<template>
  <div
    class="pecb-price pe-mx-auto pe-flex pe-w-full pe-flex-col pe-items-center pe-justify-center lg:pe-max-w-[94px]"
  >
    <template v-if="isFree">
      <div class="ammount pe-flex pe-flex-row pe-items-baseline pe-justify-center">
        <span class="pe-font-sans pe-text-2xl pe-font-normal"> {{ freeText }}&nbsp; </span>
      </div>
    </template>
    <template v-else>
      <div class="ammount pe-flex pe-flex-row pe-items-baseline pe-justify-center">
        <span class="pe-font-sans pe-text-2xl pe-font-normal"> {{ priceDisplayed }}&nbsp; </span>
        <span class="pe-font-sans pe-text-base pe-font-normal">{{ currency }}</span>
      </div>
      <small class="pe-font-sans pe-text-xs pe-font-normal">{{ description }}</small>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Price} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'

@Component({
  name: 'PECBTitle',
  components: {}
})
export default class PECBPrice extends Vue implements Price {
  @Prop({type: String, required: true})
  readonly currency!: string

  @Prop({type: String, required: true})
  readonly description!: string

  @Prop({type: String, default: 'Free'})
  readonly freeText!: string

  @Prop({type: Number, required: true})
  readonly price!: number

  get roundedPrice(): number {
    return Math.round(this.price)
  }

  get priceDisplayed(): string {
    const price = this.roundedPrice
    return `$${price}`
  }

  get isFree(): boolean {
    return this.roundedPrice <= 0
  }
}
</script>

<style scoped></style>
