import {Pinia, Store} from 'pinia-class-component'

@Store({
  name: 'bookingYourReservationStore'
})
export class BookingYourReservationStore extends Pinia {
  public showLoadingPlaceOnHold: boolean = false

  public showLoadingPayNow: boolean = false
}
