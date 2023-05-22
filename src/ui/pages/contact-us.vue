<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <CommonHeroWidget
      v-if="components"
      :booking-attrs="bookingAttrs"
      :calendar-data="calendarData"
      :hero-attrs="heroAttrs"
      :is-authenticated="userIsAuthenticated"
    />
    <div
      v-else
      class="pe-flex pe-flex-col pe-justify-center pe-items-center pe-bottom-0 pe-right-0 pe-w-full pe-h-[100vh] z-[100] pe-bg-black"
    >
      <PELoadingData />
    </div>
    <ContentBlockManager :blocks="components" />
    <ClientOnly v-if="components">
      <div class="pe-container pe-mb-28 md:pe-mb-52 pe-flex pe-flex-col pe-items-center">
        <div class="pe-max-w-5xl pe-mb-28 md:pe-mb-52">
          <PEOfferText
            v-if="componentsContact?.banner"
            :title="componentsContact?.banner.title"
            class="pe-mt-14 xl:pe-mt-32 pe-max-h-40 md:pe-max-h-28 pe-mb-14 pe-w-[96%]"
          />
          <div
            v-if="componentsContact?.banner"
            class="pe-container pe-mx-auto pe-text-center pe-text-xl pe-leading-[30px] pe-text-white md:text-2xl md:leading-9"
            v-html="componentsContact?.banner.content"
          />
        </div>
        <PEContactForm
          :is-authenticated="userIsAuthenticated"
          :user-id="userId"
          :disable-form="sendingForm"
          @form-data="onSubmitData"
        />
      </div>

      <PEMap
        class="pe-mt-[120px] md:pe-mt-[100px] pe-mb-80 pe-w-screen md:pe-w-full pe-h-96 md:pe-h-auto"
        v-bind="mapProps"
      />
      <div
        v-if="componentsContact?.directLinks"
        class="flex pe-justify-center pe-gap-0 md:pe-gap-20 pe-w-11/12 pe-max-w-screen-2xl pe-mx-auto pe-flex-wrap"
      >
        <div class="pe-min-w-full">
          <PEOfferText
            :title="$t('contact.links')"
            class="pe-max-w-[550px] pe-mx-auto pe-mb-7 pe-max-h-[100px]"
          />
        </div>
        <PEArticle
          v-for="article in componentsContact?.directLinks"
          :key="article.title"
          v-bind="article"
          class="pe-mb-28"
        />
      </div>
      <PEModal
        v-model="showModal"
        class="pe-z-10"
      >
        <template #content>
          <p class="pe-font-sans pe-text-[24px] pe-text-white pe-w-4/5">{{
            $t('contact.thank')
          }}</p>
        </template>
        <template #buttons>
          <div class="items-center justify-center sm:flex md:mt-[40px] mt-[60px]">
            <PEButton
              outlined
              flat
              block
              :label="$t('contact.buttonModal')"
              class="mb-2 text-white sm:mr-5 sm:mb-0"
              @click="closeModal"
            />
          </div>
        </template>
      </PEModal>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {
  PEInput,
  PESelect,
  PEImageStrapi,
  PEButton,
  PEGalleryGrid,
  PEModal,
  PEOfferText
} from '@pr-elite-components-library/lib'
import PEBookingWidget from '../components/BookingWidget/PEBookingWidget.vue'
import PEMap from '../components/ContactUs/PEMap.vue'
import {ContactStore} from '../store/contactUs/contacUsStore'
import {CalendarStore} from '../store/calendarStore'
import {PropertiesStore} from '../store/propertiesStore'
import PEBannerLinks from '../components/ContactUs/PEBannerInfo/PEBannerLinks.vue'
import PEArticle from '../components/ContactUs/PEArticle.vue'
import PEContactForm from '../components/ContactUs/PEContactForm.vue'
import {UseAuth} from '../store/auth'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import PELoadingData from '../components/PELoadingData.vue'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '../../app/Strapi/StrapiConfiguration'

@Component({
  name: 'ContactUs',
  components: {
    PEBookingWidget,
    PEInput,
    PESelect,
    PEImageStrapi,
    PEButton,
    PEBannerLinks,
    PEMap,
    PEGalleryGrid,
    PEArticle,
    PEContactForm,
    PELoadingData,
    PEModal,
    PEOfferText,
  }
})
export default class ContactUs extends Mixins(BasePageStrapiMixin, BookingWidgetMixin) {
  public slugPage: string = BasePageSlugs.ContactUs;

  public finished: boolean = false
  public sendingForm: boolean = false
  public showModal: boolean = false

  public calendarStore = new CalendarStore()
  public contactStore = new ContactStore()
  public propertiesStore = new PropertiesStore()
  public authStore = new UseAuth()

  public get propertiesFilteredByMembership() {
    return this.propertiesStore.propertiesFilteredByMembership
  }

  get heroAttrs() {
    return this.contentStore.heroDefault;
  }

  public mapProps = {
    name: 'Palace Resorts',
    address: 'Blvd. Kukulcan, Km 10, Zona Hotelera Cancun, QRoo 77500, México',
    phone: 9988814740,
    cords: {lat: 21.123375089078404, lng: -86.75428670212122}
  }

  get componentsContact() {
    return this.contactStore.contactUsPage
  }

  get calendarData() {
    return this.calendarStore.calendarData
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  get userId() {
    return this.authStore.userAffiliationId
  }

  get heroImageClases() {
    return `[&>section>div>div>img]:pe-w-auto
      [&>section]:!pe-min-h-[720px]
      [&>section>div>div>img]:pe-max-w-none
      [&>section>div>div>img]:-pe-ml-[68rem]
      sm:[&>section>div>div>img]:-pe-ml-[50rem]
      md:[&>section>div>div>img]:pe-ml-0
      md:[&>section>div>div>img]:pe-w-full
      md:[&>section>div>div>img]:pe-max-w-full`
  }

  mounted() {
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')
  }

  async beforeMount() {
    await this.loadStrapiPageData()
  }

  public async onSubmitData(contactForm: any) {
    this.sendingForm = true

    await this.contactStore
      .postContactForm(contactForm)
      .then(() => {
        this.showModal = true
      })
      .finally(() => {
        this.sendingForm = false
      })
  }

  public closeModal() {
    this.showModal = false
  }
}
</script>

<style lang="scss" scoped>
.container-paddings {
  padding: 20px;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }
}
</style>
