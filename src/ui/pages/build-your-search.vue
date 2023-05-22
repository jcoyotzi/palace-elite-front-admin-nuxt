<template>
  <ClientOnly>
    <div class="pe-bg-black">
      <div class="'pe-bg-black-light xl:pe-bg-black'">
        <div class="pe-h-28 xl:!pe-h-60 pe-block"></div>
        <div class="pe-mx-auto pe-relative">
          <PEBookingWidget
            :items="calendarData"
            class="pe-container pe-relative mx-auto pe-max-w-[1200px] pe-px-4 sm:pe-px-0 pe-mx-auto"
            v-bind="bookingAttrs"
            :initialValues="queryToBooking"
          />
        </div>
      </div>
      <div
        v-if="resortCards"
        class="pe-w-11/12 pe-max-w-[1320px] pe-mx-auto pe-mt-[87px] pe-mb-32"
      >
        <div class="pe-w-11/12 pe-max-w-[1024px] pe-mb-16 sm:pe-block">
          <h1 class="pe-mb-[29px] pe-font-serif pe-text-2xl pe-uppercase pe-text-blue-light">
            Build your search
          </h1>
          <PERadioGroup
            v-model="filter"
            :items="radioItems"
            class="pe-mb-5 [&>ul]:!pe-flex-wrap [&>ul]:!pe-gap-x-7 [&>ul>li]:!pe-w-auto"
          />
        </div>
        <PEResortCard
          v-for="(card, index) in resortCards"
          :key="index"
          v-bind="card"
          :is-load-offer="isLoadingOffers"
          :offer="offers?.find(offer => offer.hotel === card.externalId)"
        />
      </div>
      <div
        v-if="isLoadingResorts"
        class="pe-flex pe-flex-col pe-justify-center pe-items-center pe-bottom-0 pe-right-0 pe-w-full pe-h-[100vh] z-[100] pe-bg-black"
      >
        <PELoadingData />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator'
import {PERadioGroup, PEIcon, PEButton} from '@pr-elite-components-library/lib'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {BuildSearchStore} from '../store/buildSearch/buildSearchStore'
import PEResortCard from '../components/buildYourSelf/PEResortCard.vue'
import BuildSearchHero from '../components/buildYourSearch/BuildSearchHero.vue'
import {BookingStore} from '../store/bookingStore'
import {PropertiesStore} from '../store/propertiesStore'
import {UseAuth} from '../store/auth'
import PEBookingWidget from '../components/BookingWidget/PEBookingWidget.vue'

@Component({
  name: 'build-your-search',
  components: {
    PERadioGroup,
    PEIcon,
    PEButton,
    PEResortCard,
    BuildSearchHero,
    PEBookingWidget
  },

  meta: {
    auth: true
  }
})
export default class BuildYourSearch extends Mixins(BookingWidgetMixin) {
  private buildStore = new BuildSearchStore()
  public authStore = new UseAuth()
  public isLoadingResorts = true
  public isLoadingOffers = true

  filter = 'all'

  bookingStore = new BookingStore()
  propertyStore = new PropertiesStore()

  public radioItems = [
    {
      id: 'all',
      name: 'all-resorts',
      labelText: 'All Resorts'
    },
    {
      id: 'fam',
      name: 'family-resorts',
      labelText: 'Family Resorts'
    },
    {
      id: 'adult',
      name: 'adults-resorts',
      labelText: 'Adults-only Resorts'
    },
    {
      id: 'special',
      name: 'special-offer',
      labelText: 'Special Offer'
    }
  ]

  get offers() {
    return this.buildStore.allOffers
  }

  get resortCards() {
    const resorts = [...(this.buildStore.rewardNightsResorts ?? [])]

    if (resorts) {
      switch (this.filter) {
        case 'special':
          return resorts.filter(resort => resort.specialOffer)
        case 'fam':
          return resorts.filter(resort => resort.category === 'Family Resorts')
        case 'adult':
          return resorts.filter(resort => resort.category === 'Adults-only Resorts')
        default:
          return resorts
      }
    }

    return []
  }

  get queryToBooking() {
    const { resort, checkin, checkout, adults, kids, babies } = this.$nuxt.$route.query

    if(!resort && !checkin && !adults) return null
    return {
      resort,
      checkin,
      checkout,
      room: adults ? {
        id: 0,
        name: '',
        adults: Number(adults),
        children: Number(kids?? 0) + Number(babies?? 0),
        childrenages: Array(Number(kids?? 0) + Number(babies?? 0)).fill(0)
      } : null,
    }
  }

  get components() {
    return this.buildStore.buildSearchPage
  }

  async changeDates(dates: any) {
    await this.buildStore.fetchRoomRates({
      begin: dates.start,
      end: dates.end,
      costType: 'V',
      market: this.authStore.userMarket?? ''
    })
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  @Watch('buildStore.rewardNightsResorts')
  loadRewardNights() {
    if(this.buildStore.rewardNightsResorts && this.buildStore.rewardNightsResorts.length) {
      this.isLoadingResorts = false
    }
  }
  
  @Watch('offers')
  loadOffers() {
    if(this.offers && this.offers.length) {
      this.isLoadingOffers = false
    }
  }

  mounted() {
    const { checkin, checkout } = this.$nuxt.$route.query

    const initialRange = {
      start: checkin?? new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      end: checkout?? new Date(new Date().setDate(new Date().getDate() + 21)).toISOString().split('T')[0]
    }

    this.changeDates(initialRange)
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else {
      this.$nuxt.setLayout('auth')
    } 
  }
}
</script>
