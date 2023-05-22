<template>
  <section>
    <div id="idTerms">
      <p class="text-[16px] text-sm text-white text-center"
        >{{ labelChoosing }}
        <span class="text-[16px] text-sm text-blue-light pe-underline-blue-light pe-underline">
          <a
            target="_blank"
            :href="bookingCoditionsUrl"
          >
            {{ $t('Booking Conditions') }}</a
          > </span
        >,
        <span class="text-[16px] text-sm text-blue-light pe-underline-blue-light pe-underline">
          <a
            target="_blank"
            :href="privacyNoticiesUrl"
          >
            {{ $t('Terms & Conditions') }}</a
          >
        </span>
        {{ $t('and the') }}
        <span class="text-[16px] text-sm text-blue-light pe-underline-blue-light pe-underline">
          <a
            target="_blank"
            :href="privacyNoticiesUrl"
          >
            {{ $t('Privacy Notices') }}</a
          ></span
        >.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'

@Component({
  name: 'pe-check-booking-conditions',
  i18n
})
export default class PECheckBookingConditions extends Vue {
  @Prop({required: false, default: '/info/booking-conditions'})
  bookingCoditionsUrl!: string

  @Prop({required: false, default: '/info/terms-and-conditions'})
  termsConditionsUrl!: string

  @Prop({required: false, default: '/info/privacy-noticies'})
  privacyNoticiesUrl!: string

  get labelChoosing() {
    return this.$t('labelChoosing')
  }
}
</script>
<style lang="scss"></style>
