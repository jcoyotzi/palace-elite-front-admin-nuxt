<template>
  <aside>
    <div class="pe-p-[24px] pe-pb-[12px] pe-bg-black-light pe-text-white">
      <div class="flex justify-between">
        <form
          ref="form"
          :class="containerClasess"
          class="w-full"
        >
          <div class="w-full flex flex-col justify-center items-center">
            <PESelect
              :items="guestListSelect"
              v-bind="nameSelectProps"
              item-value="email"
              item-text="name"
              class="w-full mb-4"
              :class="inputClasses"
              v-model="guestSelected"
            />
          </div>

          <div
            class="w-full my-4 flex flex-col justify-center items-center"
            v-if="isValidForm"
          >
            <PETextInput
              v-model="guestSelected.email"
              :class="inputClasses"
              class="w-full"
              v-bind="emailInputProps"
            />
          </div>

          <PEButton
            v-bind="buttonSend"
            @click.prevent="onEmailSubmit"
            class="mt-2 mb-6 pe-bg-blue-light"
            :disabled="!isValidForm"
          />
        </form>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator'
import dayjs from 'dayjs'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {BookingsStore} from '../../store/bookingsStore'
import {UseAuth as AuthStore} from '../../store/auth'
import {paymentLinkTemplate} from '~/src/ui/emailTemplates/paymentLinkTemplate'
import {BookingStore} from '../../store/bookingStore'
import {PromiseAllSettled} from '~/src/app/booking/domain/enums/promiseAllSettled'
import {PayLinkStore} from '../../store/payLinkStore'
import {LayoutStore} from '../../store/layoutStore'
import i18n from '~/src/ui/i18n/bookings.lang'
import {ToastDuration} from '../../utils/toastHelpers'
import {ToastAction, ToastOptions} from 'vue-toasted'
import {PESelect} from '@pr-elite-components-library/lib'
import {PaymentLinkDataLayer} from '~/src/app/gtm/domain/types/PaymentLinkDataLayer'
import {JustBookItDataLayer} from '~/src/app/gtm/domain/types/JustBookItDataLayer'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {
  getRoomsFromReservationInfo,
  getTotalAmountRooms,
  getTotalAmountServices,
  getTotalGuestsFromReservationInfo
} from '~/src/app/gtm/domain/mapper/roomMapper'

@Component({
  i18n,
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class SendPaymentLink extends Vue {
  showRoomDetails: boolean = false

  showGuestList: boolean = false

  formName = ''

  formEmail = ''

  guestSelected = {
    name: '',
    email: ''
  }

  reservationsSends: {idReservation: string; isSuccess: boolean}[] = []

  public loadingEmail: boolean = false

  @Prop({type: Boolean, required: true})
  showLoading!: boolean

  @Prop({type: String, required: false})
  startingFormEmail!: string

  async mounted() {
    this.formEmail = this.startingFormEmail
  }

  get isValidForm(): boolean {
    return this.guestSelected.name !== ''
  }

  get emailInputProps() {
    return {
      type: 'text',
      value: this.guestSelected.email,
      label: this.$t('email') as string,
      disabled: true,
      name: 'email'
    }
  }

  get guestListSelect() {
    return this.paylinkStore.guestPaylink
  }

  get nameSelectProps() {
    return {
      type: 'text',
      'list-dense': false,
      'chip-template': '{{value}}',
      label: this.$t('name') as string,
      disabled: this.showLoading,
      name: 'name-select'
    }
  }

  get errorClasses() {
    return ['text-left text-red-600 pr-1 text-sm mb-4 w-full']
  }

  get containerClasess() {
    return ['flex flex-col justify-center text-white items-center']
  }

  get emailRules() {
    return 'required|email'
  }

  get nameRules() {
    return 'required'
  }

  get inputClasses() {
    return ['mb-2', 'pe-text-[16px]']
  }

  get bookingStore() {
    return new BookingStore()
  }

  get promiseAllReservationsResults() {
    return this.bookingStore.promiseAllReservationsResults
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get isNational() {
    return this.authStore.isNational
  }

  get company() {
    return this.authStore.userCompany
  }

  get authStore(): AuthStore {
    return new AuthStore()
  }

  public get toastCloseOption(): ToastAction {
    return {
      icon: 'close',
      text: '',
      onClick: (_e: any, toastObject: any) => {
        toastObject.goAway(0)
      }
    }
  }

  public get toastOptions(): ToastOptions {
    return {
      action: [this.toastCloseOption] as ToastAction[],
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'success'
    }
  }

  @Watch('guestSelected')
  onChangeGuestPaylink(newval: {email: string; name: string}) {
    this.formEmail = newval.email
    this.formName = newval.name
  }

  @Emit('onEmailSubmit')
  async onEmailSubmit() {
    this.bookingStore.setLoading(true)
    await this.bookingStore.createNewReservation()

    this.$nextTick(async () => {
      const mails = await Promise.allSettled(
        this.promiseAllReservationsResults.map(async reservation => {
          if (reservation.status === PromiseAllSettled.REJECTED)
            this.$toasted.error(this.$t('createReservationError') as string, this.toastOptions)
          else {
            const folio = String(reservation.value?.Reservations[0].Folio)
            this.reservationsSends.push({idReservation: folio, isSuccess: true})
            this.bookingsStore.sendPaymentLink({
              name: this.formName,
              email: this.formEmail,
              application: Number(this.applicationUserMember!),
              isNational: this.isNational!,
              company: this.company!,
              body: paymentLinkTemplate(this.formName),
              folio,
              hotel: reservation.value?.Reservations[0].Hotel
            })
          }
        })
      )

      this.reservationsSends.forEach(reservation => {
        if (reservation.isSuccess) {
          const hotelName = this.bookingStore.getBooking.propertyCode
          const checkIn = this.bookingStore.getBooking.checkIn
          const checkOut = this.bookingStore.getBooking.checkOut
          const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
          const numberOfRooms = this.bookingStore.getBooking.rooms.length
          const {numberOfAdults, numberOfChildren, numberOfGuests} =
            getTotalGuestsFromReservationInfo(this.bookingStore.reservationInfo)
          const rooms = getRoomsFromReservationInfo(this.bookingStore.reservationInfo)
          const totalRooms = getTotalAmountRooms(this.bookingStore.reservationInfo)
          const totalServices = getTotalAmountServices(this.bookingStore.reservationInfo)

          const paymentLinkEvent: PaymentLinkDataLayer = {
            event: 'paymentLink',
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
            totalServices,
            reservID: reservation.idReservation,
            rooms
          }

          // console.log('paymentLinkEvent', paymentLinkEvent)

          // @ts-ignore
          this.$gtm.push(paymentLinkEvent)
        }
      })

      // eslint-disable-next-line array-callback-return
      mails.map((statusMail: any, index: number) => {
        if (statusMail.status === PromiseAllSettled.REJECTED) {
          this.$toasted.error(this.$t('sendPaymentLinkMessageError') as string, this.toastOptions)
          this.reservationsSends[index].isSuccess = false
        } else {
          this.$toasted.success(
            this.$t('sendPaymentLinkMessageSuccess') as string,
            this.toastOptions
          )
          this.reservationsSends[index].isSuccess = true
          this.$nuxt.$router.push({path: this.localePath('/bookings')})
        }
        this.bookingStore.setLoading(false)
      })
    })
  }

  get buttonSend() {
    return {
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading,
      label: this.$t('sendButton') as string
    }
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }
}
</script>
