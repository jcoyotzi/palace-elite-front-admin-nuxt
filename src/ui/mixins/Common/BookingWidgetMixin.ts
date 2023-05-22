import {Component, Vue} from 'vue-property-decorator'
import {CalendarStore} from '../../store/calendarStore'

@Component
export default class BookingWidgetMixin extends Vue {
  calendarStore = new CalendarStore()

  finished = false

  bookingAttrs = {
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
    rateCurrency: ''
  }

  get calendarData() {
    return this.calendarStore.calendarData
  }
}
