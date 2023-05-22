<template>
  <div
    class="pe-bg-black pe-p-[25px] md:pe-p-[40px] pe-w-full pe-font-normal pe-text-white pe-font-sans md:pe-h-auto pe-h-[208px] pe-rounded-[10px] linear-gradient"
  >
    <img
      class="pe-max-w-[45px] md:pe-max-w-[60px]"
      src="../../../assets/img/sim.png"
    />
    <div class="pe-text-[16px] pe-uppercase label-card-number">{{ $t('cardNumberLabel') }}</div>
    <div
      class="pe-text-[32px] card-number pe-truncate"
      v-html="formatNumber"
    />
    <div class="pe-flex pe-justify-between pe-mt-[10px] md:!pe-mt-[30px]">
      <div>
        <div class="pe-text-[16px] pe-leading-none pe-uppercase label-cardholder-name pe-truncate">
          {{ $t('cardHolder') }}
        </div>
        <div class="pe-text-[24px] pe-leading-none md:pe-mt-[7px] cardholder-name pe-truncate">
          {{ cardHolder }}
        </div>
      </div>
      <div>
        <div class="pe-leading-none pe-text-[16px] pe-uppercase label-expiration pe-truncate">
          {{ $t('expiration') }}
        </div>
        <div class="pe-flex">
          <div class="pe-mt-[5px]">
            <div class="pe-text-[12px] pe-leading-none pe-h-[10px] pe-uppercase valid-thru">
              valid
            </div>
            <div
              class="pe-text-[12px] pe-leading-none pe-mt-[5px] pe-h-[10px] pe-uppercase valid-thru"
            >
              THRU
            </div>
          </div>
          <PEIcon class="pe-mt-[7px] md:pe-mt-[10px] pe-fill-white">menu-right</PEIcon>
          <span class="pe-text-[24px] pe-uppercase vigency">
            {{ selectedCardCredit.dueDate }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'

// Plugins
import {CardsCreditEntity} from '~/src/app/payments/domain/entities/cardsCreditEntity'
import FormatCardAsterizkTermination from '~/src/ui/mixins/FormatCardAsterizkTermination'
import i18n from '~/src/ui/i18n/membership/creditCards.lang'

@Component({
  i18n
})
export default class CreditCards extends Mixins(FormatCardAsterizkTermination) {
  @Prop() selectedCardCredit!: CardsCreditEntity

  get cardHolder() {
    return this.selectedCardCredit.cardHolder?.substr(0, 15)
  }

  get formatNumber() {
    const {cardNumber, cardTermination, cardStamp} = this.selectedCardCredit

    if (cardTermination) return this.formatSpaceAsterizkHtml(12, cardTermination, cardStamp!)

    return this.formatSpaceAsterizkHtml(cardNumber?.length, '', cardStamp!)
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1550px) {
  .card-number {
    font-size: 24px !important;
  }
  .label-cardholder-name,
  .label-expiration,
  .label-card-number {
    font-size: 12px !important;
  }

  .label-card-number {
    margin-top: 10px;
  }

  .valid-thru {
    font-size: 8px !important;
  }

  .cardholder-name,
  .vigency {
    margin-top: 5px;
    font-size: 18px !important;
  }
}
.linear-gradient {
  background: linear-gradient(70deg, #7d7d7d 40%, #606060 40%);
}
</style>
