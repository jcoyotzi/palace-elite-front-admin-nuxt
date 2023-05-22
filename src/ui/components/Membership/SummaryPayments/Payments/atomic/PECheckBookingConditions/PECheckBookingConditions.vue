<template>
  <section>
    <PECheckbox
      v-bind="acceptTermsProps"
      @input="acceptTerms"
    >
      <slot name="default">
        <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-white">{{
          labelChoosing
        }}</label>
        <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-blue-light pe-underline">
          <a :href="termsConditionsUrl"> {{ $t('Terms & Conditions') }}</a>
        </label>
        <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-white">
          {{ $t('and the') }}
        </label>
        <label class="pe-cursor-pointer pe-text-[16px] pe-text-sm pe-text-blue-light pe-underline">
          <a :href="privacyNoticiesUrl"> {{ $t('Privacy Notices') }} .</a>
        </label>
      </slot>
    </PECheckbox>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'

@Component({
  name: 'pe-check-booking-conditions',
  i18n,
  components: {}
})
export default class PECheckBookingConditions extends Vue {
  public checkAcceptTerms = false

  @Prop({required: false, default: '/info/booking-conditions'})
  bookingCoditionsUrl!: string

  @Prop({required: false, default: '/info/terms-and-conditions'})
  termsConditionsUrl!: string

  @Prop({required: false, default: '/info/privacy-noticies'})
  privacyNoticiesUrl!: string

  @Prop({type: String}) labelChoosingProp!: string

  public get acceptTermsProps() {
    return {
      id: 'checkbox-accept-terms',
      value: this.checkAcceptTerms,
      color: 'blue'
    }
  }

  get labelChoosing() {
    return this.labelChoosingProp || this.$t('labelChoosing')
  }

  acceptTerms(value: boolean) {
    this.checkAcceptTerms = value
    this.$emit('acceptTerms', value)
  }
}
</script>
<style lang="scss"></style>
