import {Component, Vue} from 'vue-property-decorator'
import {BookingStore} from '../store/bookingStore'
import {BookingBenefitStore} from '../store/strapi/bookingBenefitsStore'

@Component
export default class ClearStorage extends Vue {
  clearAllStorage() {
    const bookingStore = new BookingStore()
    bookingStore.emptyRooms()

    const bookingbenefitStore = new BookingBenefitStore()
    bookingbenefitStore.emptySelectedBenefits()
  }
}
