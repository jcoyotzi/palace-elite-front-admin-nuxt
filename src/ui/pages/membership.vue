<template>
  <div class="pe-bg-black">
    <div class="pe-relative">
      <CommonHeroWidget
        :calendar-data="calendarData"
        :hero-attrs="heroAttrs"
        :booking-attrs="bookingAttrs"
      />
    </div>
    <div class="pe-relative pe-container pe-px-4 pe-mx-auto pe-pb-20 md:pe-mt-24">
      <MembershipBreadcrumbs
        class="pe-my-10 pe-w-full"
        :items="breadcrumbItems"
        @on-breadcrumb-index="setItemIndex"
        @on-breadcrumb-item="setBreadcrumbItems"
      />
      <div class="lg:pe-flex pe-gap-12 pe-overflow-x-auto pe-overflow-y-hidden">
        <MembershipMenu
          class="mb-10"
          :position="itemIndex"
          @on-menu-index="setItemIndex"
          @on-menu-item="setBreadcrumbItems"
        />
        <NuxtChild
          class="pe-w-full"
          @on-menu-item="setBreadcrumbItems"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator'
import strapiClient from '../../app/common/clients/strapi.client'
import {ContentStore} from '../store/contentStore'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import PECategories from './Booking/CategorySelector.vue'
import {PaymentStore} from '~/src/ui/store/paymentStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import {PropertiesStore} from '~/src/ui/store/propertiesStore'
import {CalendarStore} from '~/src/ui/store/calendarStore'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {CategoryStore} from '~/src/ui/store/strapi/categoryStore'

// Interfaces
import PEBookingWidget from '~/src/ui/components/BookingWidget/PEBookingWidget.vue'
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'
import {BookingEvent} from '~/interfaces/Booking/Booking.interface'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import i18n from '~/src/ui/i18n/membership/membership.lang'
import HeroDto from '~/src/app/layout/domain/dto/heroDto'

@Component({
  i18n,
  meta: {
    auth: true
  },
  components: {
    PEBookingWidget,
    PECategories
  }
})
export default class Membership extends Mixins(BookingWidgetMixin) {

  public breadcrumbDefault: BreadcrumbItem[] = []

  public breadcrumbItems: BreadcrumbItem[] = [
    {
      page: this.localePath('/membership/SummaryAndPayments'),
      title: 'Membership'
    },
    {
      page: this.localePath('/membership/MyContract'),
      title: 'My Contract'
    },
    {
      page: this.localePath('/membership/CreditCards'),
      title: 'Credit Cards'
    },
    {
      page: this.localePath('/membership/CreditCardsDetails'),
      title: 'Details'
    },
    {
      page: this.localePath('/membership/Owners'),
      title: 'Owners',
    },
    {
      page: this.localePath('/membership/Beneficiaries'),
      title: 'Beneficiaries'
    },
    {
      page: this.localePath('/membership/Guests'),
      title: 'Guests'
    },
    {
      page: this.localePath('/membership/account-details'),
      title: 'account-details'
    }
  ]

  get itemIndex(): number {
    return this.layoutStore.itemIndexMembership
  }

  set itemIndex(value: number) {
    this.layoutStore.itemIndexMembership = value
  }

  finished = false

  testimonials: [] = []

  propertiesStore = new PropertiesStore()

  paymentStore = new PaymentStore()

  authStore = new AuthStore()

  calendarStore = new CalendarStore()
  bookingInstance = new BookingStore()
  strapiCategoryInstance = new CategoryStore()

  confirmationAttrs = {
    media: {
      mime: 'image/jpeg',
      url: 'https://d2bu21lk8ufslk.cloudfront.net/Beaches_Turks_Caicos_Family_Walk_Beach_b95e4454d1.jpg',
      alt: 'Family on the beach',
      title: 'Family Vacations'
    },
    appStoreLink: {
      type: 'url',
      label: null,
      url: 'https://www.apple.com/mx/app-store',
      page: {
        data: null
      }
    },
    appStoreImage: {
      mime: 'image/jpeg',
      url: 'https://d2bu21lk8ufslk.cloudfront.net/Download_On_The_App_Store_PNG_Photos_abd2fa56aa.png',
      alt: 'App Store Logo',
      title: 'App Store'
    },
    playStoreLink: {
      type: 'page',
      label: null,
      url: 'https://play.google.com/store/apps',
      page: {
        data: null
      }
    },
    playStoreImage: {
      mime: 'image/jpeg',
      url: 'https://d2bu21lk8ufslk.cloudfront.net/get_it_on_google_play_logo_84c37e2732.png',
      alt: 'Play Store Logo',
      title: 'Play Store'
    },
    localizations: {
      data: [
        {
          room: 'One',
          name: 'John Smith, Jr.',
          roomName: 'Grand Deluxe Garden View',
          confirmationId: 'MPG - 8500908'
        }
      ]
    }
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get contentStore(): ContentStore {
    return new ContentStore()
  }

  get heroAttrs(): HeroDto {
    return this.contentStore.heroDefault
  }

  fetchCardsCredit() {
    this.paymentStore.getCardsCredit(this.applicationUserMember, this.isNational)
  }

  get applicationUserMember(): string {
    return this.authStore.applicationUserMember as string
  }

  get isNational(): boolean {
    return this.authStore.isNational as boolean
  }

  get propertiesStrapi() {
    return this.propertiesStore.properties
  }

  get propertiesFilteredByMembership() {
    return this.propertiesStore.propertiesFilteredByMembership
  }

  get calendarData() {
    return this.calendarStore.calendarData
  }

  beforeMount() {
    this.$nuxt.setLayout('default')
    this.breadcrumbDefault = this.breadcrumbItems
    this.checkPath()
  }

  mounted() {
    this.fetchCardsCredit()
  }

  get paramsCardsCredit() {
    return {
      pageNumber: 1,
      size: 10
    }
  }

  // async fetchCalendarData() {
  //   await this.calendarStore.getRatesLegacyApi()
  // }

  async getTestimonials() {
    // get from api
    const response = await strapiClient.get('/testimonials')

    this.testimonials = response.data.data.map((item: any) => {
      return {
        id: item.id,
        title: item.attributes.caption,
        description: item.attributes.testimonial,
        authorName: item.attributes.authorName,
        authorOrigin: item.attributes.authorOrigin
      }
    })
  }

  public booking(booking: BookingEvent) {
    this.finished = true
    scrollTo(0, 0)
    this.confirmationAttrs.localizations.data = Array.from(new Array(booking.totalRooms), () => ({
      room: 'One',
      name: 'John Smith, Jr.',
      roomName: 'Grand Deluxe Garden View',
      confirmationId: `MPG - ${Math.round(Math.random() * 10000) + 10000}`
    }))
  }

  public setBreadcrumbItems(items: BreadcrumbItem[]) {
    this.breadcrumbItems = items
  }

  get path() {
    return this.$route.path
  }

  @Watch('path')
  onChangePath() {
    this.checkPath()
  }

  public checkPath() {
    const index = this.breadcrumbDefault.findIndex(item => item.page === this.path)
    this.setItemIndex(index)
  }

  public setItemIndex(index: number) {
    if (index >= 0) this.itemIndex = index
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
