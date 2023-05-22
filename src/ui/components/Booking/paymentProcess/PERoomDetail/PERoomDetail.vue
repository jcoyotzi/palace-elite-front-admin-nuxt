<template>
  <section>
    <div>
      <label class="font-sans text-[16px] font-semibold uppercase text-blue-light">{{
        roomNumber
      }}</label>
    </div>
    <div>
      <label class="font-sans text-[24px] font-normal text-white">{{ guestInfo }}</label>
    </div>
    <div class="flex flex-row">
      <label class="pe-text-white pe-font-sans pe-text-[16px] pe-pb-8">{{ property }}</label>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'

@Component({
  name: 'pe-room-detail',
  i18n
})
export default class PERoomDetail extends Vue {
  @Prop({required: true}) roomDetail!: any

  @Prop({required: true}) indexRoom!: number

  get roomNumber() {
    return this.indexRoom >= 0
      ? `${this.$t('Room')} ${this.numberToWordCardinal}`
      : `${this.$t('Room')}`
  }

  get guestInfo() {
    return this.roomDetail.alias
      ? `${this.roomDetail.guest}, ${this.roomDetail.alias}.`
      : `${this.roomDetail.guest}.`
  }

  get property() {
    return this.roomDetail.property
  }

  get numberToWordCardinal() {
    const cardinalTexts = [
      this.$t('0'),
      this.$t('1'),
      this.$t('2'),
      this.$t('3'),
      this.$t('4'),
      this.$t('5'),
      this.$t('6'),
      this.$t('7'),
      this.$t('8'),
      this.$t('9')
    ]
    return cardinalTexts[this.indexRoom]
  }
}
</script>
<style lang="scss"></style>
