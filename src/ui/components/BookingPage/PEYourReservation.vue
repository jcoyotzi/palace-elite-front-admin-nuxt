<template>
  <aside>
    <PEResumeReservation2
      :title="title"
      :subtitle="summaryPropertyName"
      :date="summaryDatesRange"
      :is-mobile="isMobile"
      class="xl:pe-max-w-[400px]"
    >
      <template #aboveDate>
        <div
          v-if="showPlaceOnHold"
          class="pe-bg-black"
        >
          <div class="flex justify-center">
            <PEButton
              v-if="isMobile && showPlaceOnHold"
              uppercase
              solid
              flat
              :label="buttonText"
              class="pe-bg-blue-dark pe-min-w-[90%] pe-mx-auto !pe-font-normal"
              :disabled="isContinueDisabled"
              @click="goToNextStep"
            />
          </div>
          <PEResumeFooterAction
            v-if="isMobile"
            :colapsable="true"
          >
            <template #title>
              <icon-arrow-down-tiny />
              {{ $t('sendPaymentLink') }}
            </template>
            <template #content>
              <SendPaymentLink />
            </template>
          </PEResumeFooterAction>

          <PEResumeFooterAction v-if="showButtonPlaceOnHoldMobile">
            <template #title>
              <icon-person-timeline />
              <span
                class="pe-cursor-pointer"
                @click="placeOnHold"
              >
                {{ $t('placeOnHold') }}
              </span>
            </template>
          </PEResumeFooterAction>
        </div>
      </template>

      <PEResumeRoomItem2
        v-for="(reservation, roomIndex) in summaryRooms"
        :key="roomIndex"
        :index="roomIndex"
        :reservation="reservation"
        :disabled="isNotCurrentRoom(roomIndex)"
        :allow-open="userCanOpen(roomIndex)"
      >
        <template #title>{{ parseNameRoomByIndex(roomIndex) }}</template>
        <template #chip-content>
          <div v-if="reservation.roomSelected">
            <PEChip
              class="pe-bg-blue-light text-black pe-text-[12px] pe-text-white pe-p-[4px] pe-rounded-[5px]"
            >
              <span v-if="!reservation.chris">{{ getCodeReservation(reservation) }}</span>
              <span v-else>Xmas bonus</span>
            </PEChip>
          </div>
        </template>
        <template #subtitle>
          <div
            v-if="showMainGuest(reservation)"
            class="pe-flex pe-flex-col"
          >
            <span> {{ reservation | mainMemberName }}</span>
          </div>
          <p
            v-else
            class="text-blue-light"
          >
            {{ $t('selectYourRoom') }}
          </p>
        </template>
        <template #content-quick-actions>
          <span
            v-show="reservation.roomSelected && !isPaymentPage && notIsPresidential(reservation)"
            @click="editRoom(roomIndex)"
          >
            <PEIcon class="text-blue-light cursor-pointer">pencil</PEIcon>
          </span>
          <span
            v-if="userCanDelete(roomIndex) && !isPaymentPage"
            @click="deleteRoom(roomIndex)"
          >
            <PEIcon
              class="text-blue-light cursor-pointer"
              :disabled="disableButtonDelete(roomIndex)"
              text
              >trash-can</PEIcon
            >
          </span>
        </template>
        <template #content-actions>
          <div
            v-if="reservation.roomSelected"
            class="pe-flex pe-flex-col"
          >
            <span>
              {{ reservation.roomSelected.selectedCategory.title }}
              {{ reservation.roomSelected.selectedCategory.RealCode }}
            </span>
          </div>
          <p v-if="reservation.roomSelected">
            {{
              $t('textRate', {
                typeRefundable: isRefundableText(reservation.roomSelected.selectedRefundRate),
                amount: avgNight(reservation.roomSelected.dailyRates)
              })
            }}
          </p>
          <p>{{ summaryAdults(reservation.roomsPax.adults) }}</p>
          <p>{{ summaryChildren(reservation.roomsPax.children) }}</p>
          <div class="mb-3 flex justify-between">
            <div class="text-white pe-flex">
              {{ summarySelectedNights }}
              <div
                v-if="
                  reservation.roomSelected &&
                  ![3, 4].includes(reservation.roomSelected.selectedOption.id)
                "
              >
                (<span
                  class="pe-text-blue-light pe-cursor-pointer"
                  @click="changeDailyRatesState(roomIndex)"
                >
                  {{ dailyRatesText(reservation.showDailyRates) }} </span
                >)
              </div>
            </div>
            <div v-if="reservation.roomSelected">
              {{
                isBonusWeek(reservation)
                  ? reservation.roomSelected.bonusRate
                  : reservation.roomSelected.selectedOption.rate | usd
              }}
            </div>
          </div>
          <div class="mb-3">
            <span>{{$t('promotionApplied')}} </span>
            <ul v-for="(name, index) in namesPromotionsApplied" :key="index">
              <li>{{name}}</li>
            </ul>
          </div>
          <div
            v-if="reservation.roomSelected && reservation.showDailyRates"
            class=""
          >
            <div
              v-for="(el, index) of reservation.roomSelected.dailyRates"
              :key="index"
              class="pe-flex pe-justify-between"
            >
              <div class="text-left"> - {{ el.date }} </div>
              <PEYDailyRatePrice
                :price="el.price | usd"
                :provisions="provisionsAniversaryIncentive(roomIndex)"
              />
            </div>
          </div>
          <div
            v-for="(benefit, selectedRoomBenefitindex) in selectedRoomBenefits(roomIndex)"
            :key="selectedRoomBenefitindex"
            class="mb-3 flex justify-between"
          >
            <p class="benefit text-white">
              {{ formatBenefitText(benefit, roomIndex) }}
            </p>
            <p class="benefit text-white">
              {{ getBenefitPrice(benefit, roomIndex) }}
            </p>
          </div>

          <div
            v-if="showReferralFee(reservation)"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('referralFee') }}</div>
            <div>{{ getReferralFee(reservation) }}</div>
          </div>
          <div
            v-if="showSupplementFee(reservation)"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('suplement fee') }}</div>
            <div>{{ supplementFee(reservation) }}</div>
          </div>
          <div
            v-if="reservation?.imperialTotalRate?.AmountWeek52 > 0"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('Amount Week 52') }}</div>
            <div>{{ reservation?.imperialTotalRate?.AmountWeek52 | usd }}</div>
          </div>
          <div
            v-if="reservation?.imperialTotalRate?.AmountChargeUpgrade > 0"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('Amount Charge Upgrade') }}</div>
            <div>{{ reservation?.imperialTotalRate?.AmountChargeUpgrade | usd }}</div>
          </div>
          <div
            v-if="reservation?.imperialTotalRate?.AmountResortAccess > 0"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('Amount Resort Access') }}</div>
            <div>{{ reservation?.imperialTotalRate?.AmountResortAccess }}</div>
          </div>
          <div
            v-if="reservation?.imperialTotalRate?.AmountOutOfSeason > 0"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('Amount out of season') }}</div>
            <div>{{ reservation?.imperialTotalRate?.AmountOutOfSeason }}</div>
          </div>

          <div
            v-if="reservation?.imperialTotalRate?.AmountThanksGivingDay > 0"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('Amount  Thanks Giving Day') }}</div>
            <div>{{ reservation?.imperialTotalRate?.AmountThanksGivingDay }}</div>
          </div>
          <div
            v-if="showExtraFee(reservation)"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('extra pax fee') }}</div>
            <div>{{ extraFee(reservation) }}</div>
          </div>

          <!---CARGO POR UPGRADE--->

          <!--          <div


            v-if="roomWithExtraCost(reservation)"
            class="mb-3 pe-mt-1 flex justify-between"
          >
            <div>{{ $t('extraCost') }}</div>
            <div>{{ reservation.imperialTotalRate?.AmountChargeUpgrade | usd }}</div>
          </div>-->
        </template>
      </PEResumeRoomItem2>
      <!--      <PEResumeReservationItem v-if="reservationWithSomeChris">
        <template #text-left>Xmas bonus</template>
        <template #text-right>-{{ xmasBonus | usd }}</template>
      </PEResumeReservationItem>-->
      <!-- ESTE BLOQUE SOLO DISPONIBLE EN EL STEP 4 (PAGOS) -->
      <!-- <PEResumeReservationItem v-show="showPayDetails">
        <template #text-left>{{ $t('subtotal') }}</template>
        <template #text-right>$4,618 USD</template> -->
      <!--      <template #text-action>
          <span>{{ $t('havePromoCode') }}</span>
        </template>
        <template #action-content>
          <PEInput
            extraclasess="black-palace-medium"
            :label="$t('promotionalCode')"
            type="text"
          />
        </template>-->
      <!-- </PEResumeReservationItem> -->
      <PEResumeReservationItem
        v-show="showPayDetails"
        increase-text-right
      >
        <template #text-left>
          <span class="pe-uppercase">
            {{ $t('total') }}
          </span>
        </template>
        <template #text-right>
          <span class="pe-text-[24px]">
            {{ totalSummary }}
          </span>
          <span class="pe-mt-[5px]">
            {{ divisa }}
          </span>
        </template>
      </PEResumeReservationItem>
      <PEButton
        v-if="!isMobile"
        v-show="showPayButton"
        uppercase
        block
        solid
        :loading="showLoadingPayNow"
        class="pe-bg-blue-dark !pe-rounded-none"
        :disabled="isContinueDisabled"
        @click="goToNextStep"
      >
        {{ buttonTextComputed }}
      </PEButton>

      <div v-if="showPlaceOnHold && !isContinueDisabled">
        <PEResumeFooterAction
          v-if="showButtonPayLink"
          :colapsable="true"
        >
          <template #title>
            <icon-arrow-down-tiny />
            {{ $t('sendPaymentLink') }}
          </template>
          <template #content>
            <SendPaymentLink />
          </template>
        </PEResumeFooterAction>

        <PEResumeFooterAction v-if="showButtonPlaceOnHold">
          <template
            v-if="showLoadingPlaceOnHold"
            #title
          >
            <PESpinner
              fill="fill-blue"
              size="30"
            />
          </template>
          <template
            v-else
            #title
          >
            <icon-person-timeline />
            <span
              class="pe-cursor-pointer"
              @click="placeOnHold"
            >
              {{ $t('placeOnHold') }}
            </span>
          </template>
        </PEResumeFooterAction>
      </div>
    </PEResumeReservation2>
  </aside>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import i18n from '../../i18n/reservation/yourReservation.lang'
import {BookingBenefitStore} from '../../store/strapi/bookingBenefitsStore'
import SendPaymentLink from '../Forms/sendPaymentLink.vue'
import {ReservationInfo} from 'app/booking/domain/entities/reservationInfo'
import PEResumeRoomItem2 from '~/src/ui/components/BookingResumeReservation/PEResumeRoomItem2.vue'
import RoomItem from '~/src/ui/components/RoomItem.vue'
import PEResumeReservation2 from '~/src/ui/components/BookingResumeReservation/PEResumeReservation2.vue'
import {usdExactFormatter, usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import {SelectedBookingBenefits} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {RefundableOptions} from '~/src/app/common/domain/enums/refundableOptions'
import {DailyRates} from '~/interfaces/Booking/Category.interface'
import {BookingProvotionStatus} from 'app/bookings/domain/enums/bookingProvitionStatus'
import PEYDailyRatePrice from '~/src/ui/components/BookingPage/PEYourReservation/PEYDailyRatePrice.vue'
import {ReservationFromBookings} from '~/src/app/booking/domain/entities/reservationFromBookings'
import {ImperialEntity} from 'app/booking/domain/entities/imperialEntity'
import {Combination} from 'app/booking/domain/dto/imperialDto'
import {BookingYourReservationStore} from '~/src/ui/store/bookingYourReservationStore'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import AssignProvisionStore from '../../store/booking/assingProvitionStore'
import {calculateRoomRefferalFee} from '../../utils/arithmetic/RefferalFee'
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes
} from 'app/roomAccess/domain/data/lockOffRoomAccessCode'

@Component({
  i18n,
  name: 'PEYourReservation',
  components: {
    PEResumeRoomItem2,
    RoomItem,
    PEResumeReservation2,
    SendPaymentLink,
    PEYDailyRatePrice
  },
  filters: {
    usd(value: number) {
      return `${usdFormatter.format(value)} USD`
    },
    mainMemberName(reservation: ReservationInfo) {
      const {firstname, lastname} = reservation?.guests[0].memberUtils
      return `${firstname} ${lastname}`
    }
  }
})
export default class PEYourReservation extends Vue {
  @Prop({type: String, default: ''})
  summaryPropertyName!: string

  @Prop({type: String, default: ''})
  summaryDatesRange!: string

  @Prop({type: String, default: ''})
  summarySelectedNights!: string

  @Prop({type: Array, default: []})
  summaryRooms!: ReservationInfo[] | ReservationFromBookings[]

  @Prop({default: false})
  isMobile!: boolean

  @Prop({default: false})
  showPayDetails!: boolean

  @Prop({default: false})
  showPayButton!: boolean

  @Prop()
  buttonText!: any

  @Prop({type: String, default: null})
  SummaryButtonText?: string

  @Prop({type: Boolean, default: false})
  showPlaceOnHold!: boolean

  bookingStore = new BookingStore()

  bookingbenefitStore = new BookingBenefitStore()

  assignProvisionStore = new AssignProvisionStore()

  showModal = false

  fee!: number

  notIsPresidential(reservation: ReservationInfo) {
    return !LockOffRoomAccessCode.concat(PresidentialSecondRoomCodes).includes(
      reservation.roomSelected?.selectedCategory.RealCode!
    )
  }

  get title() {
    return this.isPaymentPage ? this.$t('yourSummary') : this.$t('yourReservation')
  }

  get showButtonPlaceOnHold(): boolean {
    return !this.isMobile && this.bookingTotal > 0 && !this.bookingStore.isCurrentRoomWithNullGuest
  }

  get showButtonPlaceOnHoldMobile(): boolean {
    return this.isMobile && this.bookingTotal > 0
  }

  get xmasBonus() {
    let total = 0

    for (const element of this.bookingStore.reservationInfo) {
      if (element.chris && element.savedXAmount) {
        total += element.savedXAmount || 0
      }
    }

    return total
  }

  roomWithExtraCost(room: ReservationInfo) {
    return room.imperialTotalRate !== null && room.imperialTotalRate.AmountChargeUpgrade > 0
  }

  getCodeReservation(reservation: any) {
    return this.$t(reservation.roomSelected?.selectedOption?.code) as string
  }

  reservationWithSomeChris = false

  get divisa() {
    return `USD`
  }

  get totalSummary() {
    return usdExactFormatter.format(this.bookingTotal)
  }

  isBonusWeek(reservation: ReservationInfo) {
    return reservation.roomSelected?.selectedOption?.code === BookingCategoryStatus.BONO
  }

  showReferralFee(reservation: ReservationInfo | ReservationFromBookings) {
    return (
      reservation.roomSelected !== null &&
      reservation.roomSelected.selectedOption!.code === BookingCategoryStatus.REFERIDO &&
      calculateRoomRefferalFee({
        room: reservation as ReservationInfo,
        referralScheme: this.bookingStore.referralScheme,
        referralProgram: this.bookingStore.referralProgram
      }) > 0
    )
  }

  get referralFee() {
    return `${usdFormatter.format(this.bookingStore.referralProgram?.fee || 0)} USD`
  }

  getReferralFee(reservation: ReservationInfo | ReservationFromBookings) {
    return `${usdFormatter.format(
      calculateRoomRefferalFee({
        room: reservation as ReservationInfo,
        referralScheme: this.bookingStore.referralScheme,
        referralProgram: this.bookingStore.referralProgram
      })
    )} USD`
  }

  supplementFee(reservation: ReservationInfo) {
    let supplementFee = 0

    supplementFee += reservation?.imperialTotalRate?.imperialFee || 0
    supplementFee += reservation?.imperialTotalRate?.imperialLeblancFee || 0

    return `${usdFormatter.format(supplementFee)} USD`
  }

  showSupplementFee(reservation: ReservationInfo) {
    let supplementFee = 0
    supplementFee += reservation?.imperialTotalRate?.imperialFee || 0
    supplementFee += reservation?.imperialTotalRate?.imperialLeblancFee || 0
    return supplementFee > 0
  }

  showExtraFee(reservation: ReservationInfo) {
    return (reservation?.imperialTotalRate?.Rate || 0) > 0
  }

  get namesPromotionsApplied(){
    return this.bookingStore.namePromotion
  }

  async preassign(reservation: ReservationInfo) {
    /*   const preassaginPayload = await this.assignProvisionStore.generateRoomFolioPayload({
      room: reservation
    })
    const folioContent = await this.assignProvisionStore.generateRoomFolio(preassaginPayload)

    this.bookingStore.reservationInfo[reservation.index].folio = folioContent.rmFolio?.Folio!

    // @ts-ignore
    this.bookingStore.reservationInfo[reservation.index].folioContent = folioContent

    const selectedProvision = this.assignProvisionStore.findSelectedProvitionOnRoom({
      room: reservation
    })

    this.assignProvisionStore.preAssignProvision({
      rmFolio: folioContent.rmFolio!,
      context: folioContent.context,
      provition: selectedProvision
    })
 */
  }

  async desPreassign(reservation: ReservationInfo | ReservationFromBookings) {
    /*     const selectedProvision = this.assignProvisionStore.findSelectedProvitionOnRoom({
      room: reservation as ReservationInfo
    })

    const despreassignedResponse = await this.assignProvisionStore.desPreAssing({
      // @ts-ignore
      rmFolio: reservation.reservationFolioData,
      selectedProvition: selectedProvision,
      category: (reservation as ReservationInfo).roomSelected?.selectedOption?.id! as number
    })

    this.bookingStore.reservationInfo[reservation.index].folio = 0

    // @ts-ignore
    this.bookingStore.reservationInfo[reservation.index].folioContent = null

    // console.log(despreassignedResponse)
 */
  }

  extraFee(reservation: ReservationInfo) {
    let supplementFee = 0
    supplementFee += reservation?.imperialTotalRate?.Rate || 0
    supplementFee += reservation?.imperialTotalRate?.AmountOutOfSeason || 0
    supplementFee += reservation?.imperialTotalRate?.AmountResortAccess || 0
    supplementFee += reservation?.imperialTotalRate?.AmountThanksGivingDay || 0

    return `${usdFormatter.format(supplementFee)} USD`
  }

  get bookingTotal(): number {
    return this.bookingStore.getTotalReservationWithFee
  }

  get showButtonPayLink() {
    return !this.isMobile && this.bookingTotal > 0
  }

  get isContinueDisabled() {
    if (this.isPaymentPage) {
      return false
    }

    const anyNullBeforeLastRoom =
      this.bookingStore.reservation
        .map(room => {
          // @ts-ignore
          return room.guests?.length === 0 || room.guests?.includes(null)
        })
        .includes(true) && this.benefitsStep

    return (
      anyNullBeforeLastRoom ||
      this.bookingStore.isCurrentRoomWithNullGuest ||
      this.bookingYourReservationStore.showLoadingPlaceOnHold
    )
  }

  showMainGuest(reservation: ReservationInfo | ReservationFromBookings) {
    return !!reservation.roomSelected && this.isWithMainGuest(reservation.guests)
  }

  isWithMainGuest(guest: any) {
    return guest.length > 0 && guest[0]
  }

  dailyRatesText(isVisible: boolean) {
    if (isVisible) {
      return this.$t('hideDailyRates')
    }

    return this.$t('showDailyRates')
  }

  changeDailyRatesState(index: number) {
    this.bookingStore.changeDailyRatesState(index)
  }

  /* Eliminación de habitación múltiple */
  deleteMultiRoom(index: number, category: string) {
    if (LockOffRoomAccessCode.includes(category)) {
      this.bookingStore.removeReservationByIndex(index, 2)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index + 1)
    } else {
      this.bookingStore.removeReservationByIndex(index - 1, 2)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index - 1)
    }

    this.bookingStore.setRoomsFromPresidentialFlow()
    this.bookingStore.setMaxStep(0)
    this.bookingStore.setCurrentRoom(0)

    this.bookingStore.isPresidentialFlow = false
    this.$router.push('/booking/categorySelector')

    // Si contiene numero 1 en la categoría, se elimina la 1 y la 2
    /*if (category.includes('1')) {
      this.bookingStore.removeReservationByIndex(index)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index)
      this.bookingStore.removeReservationByIndex(index + 1)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index + 1)
    } else if (category.includes('2')) {
      // Si contiene numero 2 en la categoría, se elimina la 2 y la 1
      this.bookingStore.removeReservationByIndex(index)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index)
      this.bookingStore.removeReservationByIndex(index - 1)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index + 1)
    }
    if (this.bookingStore.maxStep > this.bookingStore.reservationInfo.length - 1)
      this.bookingStore.setMaxStep(this.bookingStore.reservationInfo.length - 1)
    this.bookingStore.isPresidentialFlow = false
    this.$router.push('/booking/categorySelector')*/
  }

  deleteRoom(index: number) {
    const category = this.bookingStore.reservationInfo[index].roomSelected?.selectedCategory.code!

    if (!category && this.bookingStore.isPresidentialFlow) {
      this.deleteMultiRoom(index, '')
    }
    // Si la habitación tiene categoría y es una habitación multiple, se eliminan grupo de habitaciones
    if (
      category !== undefined &&
      this.bookingStore.categoriesTwoDeleteOnPair.includes(category) &&
      this.bookingStore.isPresidentialFlow
    ) {
      this.deleteMultiRoom(index, category)
    } else {
      this.bookingStore.removeReservationByIndex(index)
      this.bookingbenefitStore.removeRoomFromSelectedBenefits(index)
      if (this.bookingStore.maxStep > this.bookingStore.reservationInfo.length - 1)
        this.bookingStore.setMaxStep(this.bookingStore.reservationInfo.length - 1)
    }
    this.bookingStore.setCurrentRoom(this.bookingStore.maxStep)
  }

  userCanOpen(index: number) {
    const hasGuestsAlreadySelected = this.bookingStore.reservationInfo[index]?.guests.length > 0

    if (this.isPaymentPage || hasGuestsAlreadySelected) {
      return true
    }

    return index === this.bookingStore.currentRoomIndex
  }

  isRefundableText(textRefundable: string) {
    if (textRefundable === RefundableOptions.REFUNDABLE) {
      return this.$t('fullyRefundable')
    }

    return this.$t('nonRefundable')
  }

  avgNight(dailyRates: DailyRates[]) {
    let total = 0

    dailyRates.forEach((dailyRate: DailyRates) => {
      total += dailyRate.price
    })

    return usdFormatter.format(Math.ceil(total / dailyRates.length))
  }

  editRoom(index: number) {
    this.bookingStore.setCurrentRoom(index)
    this.bookingStore.reservationInfo[index].roomSelected = null
    this.bookingStore.reservationInfo[index].selectedReferrals = []
    this.$router.push('/booking/categorySelector')
  }

  disableButtonDelete(index: number) {
    return index < this.bookingStore.currentRoom
  }

  userCanDelete(index: number) {
    return !(index === 0 && this.summaryRooms.length <= 1)
  }

  summaryAdults(adults: number) {
    if (adults === 0) {
      return ''
    }
    const word = adults > 1 ? this.$t('adults') : this.$t('adult')
    return `${adults} ${word}`
  }

  parseNameRoomByIndex(index: number) {
    if (this.summaryRooms.length === 1) {
      return this.$t('roomSelection')
    }

    return this.$t('roomEnumerable', {
      room: this.$t(`${index}`)
    })
  }

  summaryChildren(children: number) {
    if (children === 0) {
      return ''
    }
    const word = children > 1 ? this.$t('children') : this.$t('child')
    return `${children} ${word}`
  }

  formatBenefitPrice(value: number | undefined, currency: string = 'USD') {
    if (value === 0 || value === undefined) {
      return 'Free'
    }

    return ` ${usdFormatter.format(value)} ${currency} `
  }

  isPaymentPage = false

  @Watch('$route.path', {immediate: true})
  onRouteChanges() {
    this.isPaymentPage = this.$router.currentRoute.path === '/booking/payment-process'
  }

  isNotCurrentRoom(roomIndex: number) {
    if (this.isPaymentPage) {
      return false
    }

    if (this.summaryRooms.length === 1) {
      return false
    }

    return roomIndex > this.bookingStore.currentRoomIndex
  }

  get bookingYourReservationStore(): BookingYourReservationStore {
    return new BookingYourReservationStore()
  }

  get showLoadingPlaceOnHold() {
    return this.bookingYourReservationStore.showLoadingPlaceOnHold
  }

  get showLoadingPayNow() {
    return this.bookingYourReservationStore.showLoadingPayNow
  }

  goToNextStep() {
    this.$emit('goToNextStep')
  }

  get payNowText() {
    return this.SummaryButtonText ?? this.$t('payNow')
  }

  get benefitsStep() {
    return this.$route?.name?.includes('benefit-selector')
  }

  get buttonTextComputed() {
    if (!this.benefitsStep) return this.buttonText

    return this.bookingTotal > 0 ? this.$t('payNow') : this.$t('finish')
  }

  get selectedBenefits() {
    return this.bookingStore.allBenefitsInReservation
  }

  get totalReservationPrice() {
    return ` ${usdFormatter.format(this.bookingTotal)} USD  `
  }

  get subTotalReservationPrice() {
    return ` ${usdFormatter.format(this.bookingStore.getSubTotalReservationPrice)} USD  `
  }

  selectedRoomBenefits(roomIndex: number) {
    return this.bookingbenefitStore.selectedRoomBenefits(roomIndex).sort((a, b) => {
      if (a.benefitName < b.benefitName) {
        return -1
      }
      if (a.benefitName > b.benefitName) {
        return 1
      }
      return 0
    })
  }

  formatBenefitText(benefit: SelectedBookingBenefits, roomIndex: number) {
    const benefitUnits = benefit?.roomsData?.find(room => room?.id === roomIndex)?.units || 0

    return `${benefit.benefitName}  (${this.$tc('unit', benefitUnits)})`
  }

  getBenefitPrice(benefit: SelectedBookingBenefits, roomIndex: number) {
    let benefitPrice = 'not defined'
    try {
      benefitPrice = this.formatBenefitPrice(
        (benefit?.roomsData?.find(room => room?.id === roomIndex)?.units || 0) *
          (benefit?.price || 0)
      )
    } catch (error) {}

    return benefitPrice
  }

  placeOnHold() {
    if (this.bookingStore.referralProgram) {
      this.fee = this.bookingStore.referralProgram.fee
    }
    this.$emit('placeOnHold')
  }

  // region Anniversary provision applied

  provisionsAniversaryIncentive(roomIndex: number) {
    const bs = this.bookingStore
    const provisions = {
      anniversary: bs.reservation[roomIndex]?.roomSelected?.provisions?.anniversary,
      incentive: bs.reservation[roomIndex]?.roomSelected?.provisions?.incentive
    }

    return provisions
  }

  // endregion

  @Watch('bookingStore.reservationInfo', {deep: true, immediate: true})
  onReservationsChange() {
    this.reservationWithSomeChris = this.bookingStore.reservationInfo.some(value => value.chris)
  }
}
</script>

<style scoped></style>
