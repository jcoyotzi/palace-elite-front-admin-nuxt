<template>
  <div class="pe-my-20">
    <section v-if="hasAvailableBenefits">
      <div v-for="(benefit, index) in benefits">
        <PEBenefitCategory
          :key="index"
          v-bind="benefit"
          :is-golf="isGolf(benefit)"
          @on-benefit-interact="benefitInteraction"
        >
        </PEBenefitCategory>
      </div>
    </section>
    <PELoadingData v-if="isLoadingBenefits"></PELoadingData>
    <div v-if="noBenefitsFounded">
      <PECardWithImage
        v-bind="noBenefitsFoundInfo"
        class="pe-mt-10"
      >
        <template v-slot:body>
          <div
            class="pe-text-white"
            v-html="noBenefitsFoundInfo.body"
          ></div>
        </template>
      </PECardWithImage>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import dayjs from 'dayjs'
import {BookingBenefitStore} from '../../store/strapi/bookingBenefitsStore'

import {ToastDuration} from '../../utils/toastHelpers'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import PEBenefitCategory from '~/src/ui/components/BenefitCategory/PEBenefitCategory.vue'
import {
  BookingBenefitEntity,
  SelectedBookingBenefits
} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {
  getRoomsFromReservationInfo,
  getTotalGuestsFromReservationInfo,
  getTotalAmountRooms
} from '~/src/app/gtm/domain/mapper/roomMapper'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {ProvisionStore} from '~/src/ui/store/provisionStore'
import {BookingGolfStore} from '~/src/ui/store/booking/bookingGolfStore'
import {
  golfFromProvitionsFactory,
  GolfFromProvitionsVariants
} from '~/src/app/provisions/shared/golfFromProvitionsFactory'
import {ServicesDataLayer} from '~/src/app/gtm/domain/types/ServicesDataLayer'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  name: 'PE-booking-benefit-selector',
  scrollToTop: true,
  components: {
    PEBenefitCategory
  }
})
export default class PEBookingBenefitSelector extends Mixins (BasePageStrapiMixin) {
  benefitStoreInstance = new BookingBenefitStore()
  bookingStoreInstance = new BookingStore()
  provisionStoreInstance = new ProvisionStore()
  bookingGolfStoreInstance = new BookingGolfStore()

  loading = true
  lastBenefitIsGolfNotAvailable = true

  noBenefitsFoundInfo: {
    title: string
    image: string
    body: string
    titleClass: string
  } = {
    title: '',
    image: '',
    body: '',
    titleClass: ''
  }

  async beforeMount() {
    const response = await this.loadStrapiPageData(BasePageSlugs.Bookings);
    
    const bookings = response?.data[0]?.attributes?.blocks.find(
      (block: {__component: string}) => block.__component === 'blocks.information-image'
    )

    this.noBenefitsFoundInfo = {
      title: bookings?.title || '',
      image: bookings?.media?.media.data.attributes.url || '',
      body: bookings?.content || '',
      titleClass:
        'pe-font-serif text-[32px] sm:text-[40px] pe-font-medium pe-uppercase pe-text-blue-light'
    }
  }

  async mounted() {
    this.loading = true
    await this.benefitStoreInstance.initStore()
    await this.bookingGolfStoreInstance.initStore()
    await this.benefitStoreInstance.fetchBookingBenefits()
    await this.benefitStoreInstance.fetchBookingPrices()

    if (this.showGolf) {
      this.bookingGolfStoreInstance.setGolfFromProvitions(
        golfFromProvitionsFactory(GolfFromProvitionsVariants.FREE)
      )
    } else {
      this.bookingGolfStoreInstance.setGolfFromProvitions(
        golfFromProvitionsFactory(GolfFromProvitionsVariants.EMPTY)
      )
    }
    this.loading = false
    if (this.bookingStoreInstance.isCurrentRoomWithNullGuest) {
      this.showAlert({
        message: 'Please set the guest information before continue'
      })
    }

    const hotelName = this.bookingStoreInstance.getBooking.propertyCode
    const checkIn = this.bookingStoreInstance.getBooking.checkIn
    const checkOut = this.bookingStoreInstance.getBooking.checkOut
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const {numberOfAdults, numberOfChildren, numberOfGuests} = getTotalGuestsFromReservationInfo(
      this.bookingStoreInstance.reservationInfo
    )
    const numberOfRooms = this.bookingStoreInstance.getBooking.rooms.length
    const rooms = getRoomsFromReservationInfo(this.bookingStoreInstance.reservationInfo)
    const totalRooms = getTotalAmountRooms(this.bookingStoreInstance.reservationInfo)

    const servicesEvent: ServicesDataLayer = {
      event: 'services',
      hotelName,
      checkIn: dayjs(checkIn).format('DD-MM-YY'),
      checkOut: dayjs(checkOut).format('DD-MM-YY'),
      numberOfRooms,
      numberOfGuests,
      numberOfAdults,
      numberOfChildren,
      currencyCode: 'USD',
      nights,
      totalRooms,
      rooms
    }

    // console.log('servicesEvent', servicesEvent)

    // @ts-ignore
    this.$gtm.push(servicesEvent)
  }

  get benefits() {
    const benefits = this.benefitStoreInstance.accesibleBenefits
    const showGolf = this.showGolf
    if (benefits === undefined) {
      return []
    }
    const visibleBenefits = benefits.filter(item => {
      if (!showGolf) {
        const title = item.title.toUpperCase()
        return title !== 'GOLF'
      } else {
        return item
      }
    })
    return visibleBenefits
  }

  isGolf(benefits: BookingBenefitEntity): boolean {
    return this.benefitStoreInstance.getGolfproductIds.includes(benefits.benefits[0]?.benefitId)
  }

  get hasAvailableBenefits() {
    return (
      ((this.benefits?.length || 0) > 0 &&
        !this.isLoadingBenefits &&
        !(this.benefits?.length === 1 && this.isGolf(this.benefits[0]))) ||
      this.showGolf
    )
  }

  showAlert({message}: {message: string}) {
    this.$toasted.info(message, {
      action: [
        {
          icon: 'close',
          text: '',
          onClick: (_e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      ],
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS
    })
  }

  get isLoadingBenefits() {
    return this.benefitStoreInstance.loading && this.loading
  }

  get noBenefitsFounded() {
    return !this.hasAvailableBenefits && !this.isLoadingBenefits
  }

  get showGolf(): boolean {
    return (
      this.bookingGolfStoreInstance.canTravelWithGolf.canTravelWithProvition ||
      this.bookingGolfStoreInstance.canTravelWithGolf.canTravelWithElite
    )
  }

  benefitInteraction(benefit: SelectedBookingBenefits) {
    this.setTransportDetail(benefit)
  }

  setTransportDetail(benefit: SelectedBookingBenefits) {
    this.benefitStoreInstance.setSelectedBenefit(benefit)
  }
}
</script>
