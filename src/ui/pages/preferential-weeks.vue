<template>
  <div>
    <CommonHeroWidget
      v-if="components"
      :booking-attrs="bookingAttrs"
      :calendar-data="calendarData"
      :hero-attrs="heroAttrs"
      :is-authenticated="userIsAuthenticated"
    />
    <ContentBlockManager :blocks="components" />
    <div class="pe-container">
      <PreferentialWeeksWidget
        v-if="loadStrapi"
        v-bind="loadStrapi.widget"
        :total-weeks="loadWeeks.total"
        :used-weeks="loadWeeks.used"
        class="pe-mb-14 xl:pe-mb-32"
        @learn-more-click="goWeeks"
        @use-now-click="goBooking"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
// Plugins
import {add} from 'date-fns'
import PEBookingWidget from '../components/BookingWidget/PEBookingWidget.vue'

// Classes
import {UseAuth} from '../store/auth'
import {ContentStore} from '../store/contentStore'
import {BookingStore} from '../store/bookingStore'
import {WeekStore} from '../store/benefits/weekStore'
import {CalendarStore} from '../store/calendarStore'
import {CategoryStore} from '../store/strapi/categoryStore'
import {PropertiesStore} from '../store/propertiesStore'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import {BookingEvent} from '~/interfaces/Booking/Booking.interface'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  name: 'PreferentialWeeks',
  layout: 'default',
  transition: 'fade',
  components: {
    PEBookingWidget
  },
  meta: {
    auth: true
  }
})
export default class PreferentialWeeks extends Mixins (BasePageStrapiMixin) {

  public slugPage: BasePageSlugs = BasePageSlugs.PreferentialWeeks;

  public finished: boolean = false

  public calendarStore = new CalendarStore()

  public bookingInstance = new BookingStore()

  public strapiCategoryInstance = new CategoryStore()

  public propertiesStore = new PropertiesStore()

  public weeksStore = new WeekStore()

  public authStore = new UseAuth()

  public contentStore = new ContentStore()

  public usedWeeks: number = 0

  public totalWeeks: number = 0

  public confirmationAttrs = {
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

  public get propertiesFilteredByMembership() {
    return this.propertiesStore.propertiesFilteredByMembership
  }

  public get calendarData() {
    return this.calendarStore.calendarData
  }

  public get bookingAttrs() {
    return {
      propertyList: {
        ListTitle: 'Resorts',
        properties: this.propertiesFilteredByMembership
      },
      bookingUrl: 'booking/',
      bookingButtonText: 'Book Now',
      selectPlaceholder: 'Select a property',
      roomSelector: {
        roomLabel: 'Room',
        adultsLabel: 'Adults',
        childLabel: 'Children',
        childAgeLabel: 'Age',
        selectGuestsLabel: 'Select guests',
        roomsLabel: 'Rooms',
        GuestsLabel: 'Guests',
        roomButtonLabel: '+ Add room',
        maxGuestsLabel: 'Max guests',
        adultsLabelMobile: 'No. of Guests',
        roomsLabelMobile: 'No. of Rooms',
        removeRoomLabel: 'Remove'
      },
      rateCurrency: '',
      from: new Date(),
      to: add(new Date(), {days: 1})
    }
  }

  public get applicationUserMember(): string {
    return this.authStore.applicationUserMember || ''
  }

  public get userCompany(): number {
    return this.authStore.userCompany || 0
  }

  // #endregion Computed

  async beforeMount() {
    const response = await this.loadStrapiPageData()
    this.weeksStore.setStrapiPreferential(response)
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  get userId() {
    return this.authStore.userAffiliationId
  }

  async mounted() {
    await this.weeksStore.fetchWeeksAndNightsPreferentials({
      application: this.applicationUserMember,
      company: this.userCompany
    })

    if (this.userIsAuthenticated)
      this.$nuxt.setLayout('default')
    else
      this.$nuxt.setLayout('auth')
  }
  // #region Methods

  get loadStrapi() {
    return this.weeksStore.readStrapiProps
  }

  get loadWeeks() {
    let total = 0;
    let used = 0;
    
    if (this.weeksStore.weeksAndNightsPreferentials?.assets && this.weeksStore.weeksAndNightsPreferentials?.assets[0]) {
      total = this.weeksStore.weeksAndNightsPreferentials?.assets[0].total;
      used = this.weeksStore.weeksAndNightsPreferentials?.assets[0].used;
    }

    return {total, used}
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

  public goBooking() {
    this.$nuxt.$router.push(this.localePath('/booking'))
  }

  public goWeeks() {
    this.$nuxt.$router.push(this.localePath('/weeks/all'))
  }
  // #endregion Methods
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
