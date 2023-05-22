<template>
  <div class="pe-bg-black">
    <div class="pe-relative">
      <CommonHeroWidgetPayLink
        :hero-attrs="heroAttrs"
        show-title
      />
    </div>
    <div
      class="pe-absolute pe-w-full pe-text-center pe-m-auto pe-font-sans pe-font-normal pe-top-[150px] md:pe-top-[200px] pe-black-pure"
    >
      <div class="pe-uppercase pe-font-serif pe-text-[32px]">{{ heroAttrs.title }}</div>
      <div
        v-if="heroAttrs.description && heroAttrs.description.length"
        class="pe-text-[16px] pe-mt-[40px] pe-w-[80%] lg:!pe-w-[50%] xl:!pe-w-[40%] pe-m-auto"
      >
        {{ heroAttrs.description }}
      </div>
    </div>

    <PELoadingData 
    v-if="showLoadingPage"
    class="pe-my-24" 
    />
    <div v-else>
      <div 
        v-if="showReservationCancelled"
        class="pe-text-center pe-text-white pe-my-24" 
      >
        <div class="pe-font-serif pe-text-[24px] uppercase">
          {{ $t('reservationCancelled') }}
        </div>
        <div class="pe-text-[16px] pe-font-sans">
          {{ $t('cancelledText') }}
        </div>
      </div>
  
      <div v-else-if="!showNotFound">
        <div
          v-if="showLoading"
          class="pe-my-24"
        >
          <PELoadingData />
        </div>
        <div v-else>
          <div
            v-if="reservationSuccessPaid"
            class="pe-flex pe-gap-12 pe-relative pe-justify-center pe--mt-[100px] lg:pe--mt-[130px] pe-pb-20"
          >
            <PaylinkPayConfirmation />
          </div>
          <div
            v-else
            class="pe-flex pe-gap-12 pe-relative pe-justify-center pe--mt-[100px] lg:pe--mt-[130px] pe-pb-20"
          >
            <PaylinkYourReservation />
            <PaylinkBookingPayment />
          </div>
        </div>
      </div>
  
      <div
        v-else
        class="pe-text-center pe-text-white pe-my-24"
      >
        <div class="pe-font-serif pe-text-[24px] uppercase">
          {{ $t('notFound') }}
        </div>
        <div class="pe-text-[16px] pe-font-sans">
          {{ $t('text') }}
        </div>
        <div>
          <PEButton v-bind="buttonProps"> {{ $t('loginLabel') }}</PEButton>
        </div>
      </div>
    </div>

    <PaylinkModalBookingConditions />
    <PaylinkModalPrivacyNoticies />
    <PaylinkModalTermsAndConditions />
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import { currentLocale } from '../utils/currentLocaleByCookie'
import i18n from '~/src/ui/i18n/paylink.lang'
import {ContentStore} from '~/src/ui/store/contentStore'
import HeroDto from '~/src/app/layout/domain/dto/heroDto'
import {PayLinkStore} from '~/src/ui/store/payLinkStore'
import PayloadDataReservation from '~/src/app/paylink/domain/entities/payloadDataReservation'

@Component({
  i18n,
  layout: 'landing'
})
export default class PayLinkPage extends Mixins(BookingWidgetMixin) {
  public showNotFound: boolean = false

  public heroAttrs: HeroDto = this.contentStore.heroDefault

  async beforeMount() {
    this.paylinkStore.showLoadingPage = true
    await this.$nuxt.setLayout('landing')
    await this.paylinkStore.getTermsAndConditions()
    await this.paylinkStore.getProperties()
    await this.paylinkStore.getExChangeRate(this.payloadExChangeRate)
    await this.getPageContent()

    if (
      // @ts-ignore
      ![null, '', undefined].includes(this.tokenParam) &&
      // @ts-ignore
      ![null, '', undefined].includes(this.versionParam)
    ) {
      this.paylinkStore.showLoading = true
      this.paylinkStore.getNationalities()
      this.paylinkStore.getDataReservation(this.payloadDataReservation)
      return
    }
    this.showNotFound = true
    this.showLoadingPage = false
  }

  async getPageContent() {
    const pageData = await this.contentStore.getHeroWithDescription(currentLocale())

    this.heroAttrs = {
      ...this.contentStore.constructHero(pageData.data.attributes.hero),
      description: pageData.data.attributes.heroDescription || ''
    }
  }

  get showLoadingPage() {
    return this.paylinkStore.showLoadingPage
  }

  set showLoadingPage(value: boolean) {
    this.paylinkStore.showLoadingPage = value
  }

  get showReservationCancelled(): boolean {
    return this.paylinkStore.showReservationCancelled
  }

  get payloadExChangeRate() {
    const date = new Date()

    return {
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      country: 'MX',
      currency: 'USD'
    }
  }

  get reservationSuccessPaid(): boolean {
    return this.paylinkStore.reservationSuccessPaid
  }

  get reservation() {
    return this.paylinkStore.reservation
  }

  get loadReservationSuccess(): boolean {
    return this.reservation?.balance !== undefined
  }

  get payloadDataReservation(): PayloadDataReservation {
    return {
      'request.token': String(this.tokenParam),
      'request.version': String(this.versionParam)
    }
  }

  get tokenParam() {
    return this.$route.query.token
  }

  get versionParam() {
    return this.$route.query.version
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get contentStore(): ContentStore {
    return new ContentStore()
  }

  get showLoading(): boolean {
    return this.paylinkStore.showLoading
  }

  set showLoading(value: boolean) {
    this.paylinkStore.showLoading = value
  }

  get buttonProps() {
    return {
      tag: 'NuxtLink',
      to: '/home',
      text: true
    }
  }
}
</script>
