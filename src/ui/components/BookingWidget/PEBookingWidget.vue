<template>
  <section class="pe-m-0 pe-p-0">
    <!-- #region Mobile summary display -->
    <PEBookingMobileDisplay
      v-if="modifySearch"
      v-show="selectingMobile"
      :selected-property-text="selectedProperty?.text"
      :selected-from-display="selectedFromDisplay"
      :selected-to-display="selectedToDisplay"
      :room-labelto-display="roomLabeltoDisplay"
      :guests-labelto-display="guestsLabeltoDisplay"
      :booking-button-text="modifyBookingButtonText"
      @removeDropdown="removeDropdown"
      @show="show"
      @submitData="submitData"
    />
    <PEBookingOverlay
      v-else
      :value="isSelectingAMobileOption"
      class="pe-overflow-auto pe-p-0 xl:pe-hidden"
      overlay-color="pe-bg-black-light xl:pe-bg-black/80"
      @click="handleRemoveDropdown"
    >
      <PEBookingMobileDisplay
        v-show="selectingMobile"
        :selected-property-text="selectedProperty?.text"
        :selected-from-display="selectedFromDisplay"
        :selected-to-display="selectedToDisplay"
        :room-labelto-display="roomLabeltoDisplay"
        :guests-labelto-display="guestsLabeltoDisplay"
        :booking-button-text="bookingButtonText"
        @removeDropdown="removeDropdown"
        @show="show"
        @submitData="submitData"
      />
    </PEBookingOverlay>

    <!-- endregion -->

    <!-- #region Mobile dropdown content -->

    <PEBookingOverlay
      class="pe-overflow-auto xl:pe-hidden"
      z-index="pe-z-[32]"
      :value="dropDownTwo"
    >
      <div class="pe-container pe-mx-auto pe-px-0">
        <div
          class="pe-ml-auto pe-mb-5 pe-mr-4 pe-mt-4 pe-max-h-[35px] pe-w-min pe-cursor-pointer pe-p-5 pe-text-end pe-text-white"
          @click="closeDropdownsContentMobile"
        >
          <PE-icon
            class="pe-text-white"
            :width="33.91"
            :height="33.91"
            >close-icon</PE-icon
          >
        </div>

        <div
          v-if="selectingPropertyMobile"
          class="pe-z-[31] pe-mt-4 pe-rounded-[15px]"
        >
          <div class="pe-container pe-mx-auto mt-4 pt-9">
            <PEPropertyListSelect
              v-bind="propertyListMobile"
              variant="map-pin"
              :select-placeholder="selectPlaceholder"
              @onItemChange="onPropertyChangeMobile"
            />
          </div>
        </div>

        <div
          v-show="selectingCalendarMobile"
          class="pe-z-[31] pe-mt-2 pe-rounded-[15px] md:pe-container md:pe-mx-auto"
        >
          <PELoadingData
            v-if="items.length <= 0 || loadingRates"
            class="pe-mt-[50px] pe-mb-8 pe-bg-black-light pe-h-full"
          />
          <pe-calendar
            v-else
            class="pe-mx-auto"
            locale="en"
            :range="initialDateRangeSelected"
            :items="items"
            :rate-currency="rateCurrency"
            @apply-dates="onApplyDates"
          />
        </div>

        <div
          v-if="selectingRoomMobile"
          class="pe-container pe-mx-auto pe-mt-4 pe-rounded-[15px] pe-p-9"
        >
          <PEBookingInfo
            class="pe-align-center pe-mx-2"
            first-icon="bed-icon"
            second-icon="guest-icon"
            divider-background=" bg-transparent"
            :rooms-label="roomSelector.roomsLabelMobile"
            :guests-label="roomSelector.adultsLabelMobile"
            :rooms-value="rooms.length"
            :guests-value="totalGuests"
          />

          <PERoomSelector
            :rooms="rooms"
            v-bind="roomSelectorProps"
            @submitted="selectGuestsMobile"
          />
        </div>
      </div>
    </PEBookingOverlay>

    <!-- endregion -->

    <!-- #region Mobile button -->

    <div class="bookingmobile pe-flex pe-flex-col pe-items-center xl:pe-hidden">
      <div
        v-if="showModifySearchSummary"
        class="pe-text-white pe-text-center pe-mt-5"
      >
        <div>{{ dateRangeFormatted }}</div>
        <div>{{ totalPeopleFormatted }}</div>
      </div>
      <div class="pe-justify-center">
        <PE-button
          v-if="!modifySearch || showModifySearchSummary"
          :loading="loading"
          uppercase
          :text="modifySearch"
          class="!pe-text-blue-light sm:pe-w-auto !pe-justify-center pe-w-full"
          @click="show('selectingMobile')"
        >
          {{ bookingButtonText }}
        </PE-button>
      </div>
    </div>

    <!-- endregion -->

    <!-- #region Desktop overlay -->

    <PEBookingOverlay
      :value="isSelectingADesktopOption"
      class="pe-overflow-auto pe-p-0"
      overlay-color="pe-bg-black-light lg:pe-bg-black/80"
      @click="handleRemoveDropdown"
    />

    <!-- endregion -->

    <div class="booking pe-hidden pe-flex-col pe-justify-center xl:pe-flex pe-w-[1200px]">
      <!-- #region Desktop summary display -->

      <PEBookingDesktopDisplay
        :selected-property-text="selectedProperty?.text"
        :selected-from-display="selectedFromDisplay"
        :selected-to-display="selectedToDisplay"
        :room-labelto-display="roomLabeltoDisplay"
        :guests-labelto-display="guestsLabeltoDisplay"
        :booking-button-text="bookingButtonText"
        :rooms-length="rooms.length"
        :total-guests="totalGuests"
        :compress-button="compressButton"
        @removeDropdown="handleRemoveDropdown"
        @show="show"
        @submitData="submitData"
      />

      <!-- endregion -->

      <!-- #region Desktop dropdown content -->

      <div v-show="isSelectingADesktopOption">
        <div class="pe-flex pe-justify-center">
          <div
            v-show="selectingProperty"
            class="custom-scroll pe-absolute pe-z-[31] pe-mt-4 pe-max-h-[460px] pe-w-[98vw] pe-overflow-y-auto pe-rounded-[15px] pe-bg-black-light xl:pe-max-h-[52vw] pe-max-w-[1200px]"
          >
            <PE-property-list
              v-bind="propertyListPalaceComputed"
              @changedProperty="onPropertyChange"
            />
            <PE-property-list
              v-bind="propertyListEuropeanComputed"
              @changedProperty="onPropertyChange"
            />
          </div>

          <div
            v-show="selectingCalendar"
            class="pe-absolute pe-z-[31] pe-mt-4 pe-rounded-[15px] pe-bg-black-light lg:pe-w-[1080px]"
          >
            <PELoadingData
              v-if="items.length <= 0 || loadingRates"
              class="pe-mt-[50px] pe-mb-8 pe-bg-black-light pe-h-full"
            />
            <pe-calendar
              v-else
              :range="initialDateRangeSelected"
              locale="en"
              :items="items"
              :rate-currency="rateCurrency"
              @apply-dates="onApplyDates"
            />
          </div>

          <div
            class="booking-room-selector pe-absolute pe-z-[31] pe-mt-4 pe-flex pe-w-auto pe-max-w-[73vw] pe-flex-col pe-justify-end pe-rounded-[15px] pe-bg-black-light xl:pe-max-w-[67vw] 2xl:pe-max-w-[55vw]"
          >
            <PERoomSelector
              v-if="selectingRoom"
              :rooms="rooms"
              v-bind="roomSelectorProps"
              @submitted="selectGuests"
            />
          </div>
        </div>
      </div>

      <!-- endregion -->
    </div>
  </section>
</template>

<script lang="ts">
import dayjs from 'dayjs'

import {Component, Prop, Mixins, Watch} from 'vue-property-decorator'

import {RoomSelectorI} from '~/node_modules/@pr-elite-components-library/lib/src/types/PEBooking/PERoomSelector/RoomSelector.interface'
import {format} from 'date-fns'
import DateWidgetFormater from '../../mixins/DateWidgetFormater'
import {BookingStore} from '../../store/bookingStore'
import {PropertiesStore} from '../../store/propertiesStore'
import {RatesCleverStore} from '../../store/ratesCleverStore'
import {DashboardStore} from '../../store/dashboardStore'
import toEpochTimeStamp from '../../utils/toEpochTimeStamp'
import {CalendarStore} from '../../store/calendarStore'
import PEBookingInfo from './atoms/PEBookingInfo.vue'

import PEBookingMobileDisplay from './atoms/PEBookingMobileDisplay.vue'

import PEBookingDesktopDisplay from './atoms/PEBookingDesktopDisplay.vue'

import PEBookingOverlay from './PEBookingOverlay.vue'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'
import {RoomBookingEntity} from '~/src/app/booking/domain/entities/roomBookingEntity'
import {CategoryStore} from '~/src/ui/store/strapi/categoryStore'
import RoomFactory from '~/src/app/booking/domain/factories/roomFactory'
import {RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {BookingEntity} from 'app/booking/domain/entities/bookingEntity'
import {UseAuth} from '~/src/ui/store/auth'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import ClearStorage from '~/src/ui/mixins/clearStorage'
import {RoomsDataLayer} from '~/src/app/gtm/domain/types/RoomsDataLayer'
import {
  getRoomsFromBooking,
  getTotalGuestsFromBooking
} from '~/src/app/gtm/domain/mapper/roomMapper'
import {infantGrouping, isLockOffRoom, RuleGrouping} from 'app/booking/domain/mapper/infantGrouping'
import i18n from '~/src/ui/i18n/booking/bookingWidget'
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes
} from '~/src/app/roomAccess/domain/data/lockOffRoomAccessCode'

import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import {RoomAccess} from '~/interfaces/Booking/Category.interface'
type RangeValue = string | null

export type CalendarRange = {
  start: RangeValue
  end: RangeValue
}

export type selectingOptions =
  | 'selectingProperty'
  | 'selectingCalendar'
  | 'selectingRoom'
  | 'selectingPropertyMobile'
  | 'selectingCalendarMobile'
  | 'selectingRoomMobile'
  | 'selectingMobile'

const startTravelDate = new Date()

startTravelDate.setDate(startTravelDate.getDate() + 14)

const endTravelDate = new Date(startTravelDate)

endTravelDate.setDate(endTravelDate.getDate() + 7)

@Component({
  name: 'PEBookingWidget',
  components: {
    PEBookingInfo,
    PEBookingMobileDisplay,
    PEBookingDesktopDisplay,
    PEBookingOverlay
  },
  i18n
})
export default class PEBookingWidget extends Mixins(DateWidgetFormater, ClearStorage) {
  bookingStoreInstance = new BookingStore() // Guardar en Ls

  propertyStoreInstance = new PropertiesStore()
  categoryStoreInstance = new CategoryStore()
  ratesCleverStoreInstance = new RatesCleverStore() // cache navegador PWA
  dashboardStoreInstance = new DashboardStore()
  calendarStore = new CalendarStore()

  authStore = new UseAuth()

  propertyListPalace = {
    ListTitle: this.$t('listTitlePalace') as string,
    properties: [] as PropertyEntity[]
  }

  propertyListEuropean = {
    ListTitle: this.$t('listTitleEuropean') as string,
    properties: [] as PropertyEntity[]
  }

  selectedProperty: PropertyEntity | null = null

  // desktop

  selectingProperty = false

  selectingCalendar = false

  selectingRoom = false

  // room

  selectingPropertyMobile = false

  selectingCalendarMobile = false

  selectingRoomMobile = false

  selectingMobile = false

  dropDownTwo = false

  rooms: RoomBookingEntity[] = RoomFactory()

  window = {
    width: 0,

    height: 0
  }

  selectedFrom = ''

  selectedTo = ''

  selectedFromDisplay = ''

  selectedToDisplay = ''

  internalFrom: Date = startTravelDate

  internalTo: Date = endTravelDate

  initialDateRangeSelected: CalendarRange | null = null

  persistence = new PersistentStoreLocalStorageRepository([])

  @Prop({
    type: Object,
    default: () => ({})
  })
  roomSelector!: Omit<RoomSelectorI, 'rooms' | 'onlyAdults' | 'maxGuests'>

  @Prop()
  items!: any[]

  @Prop({type: String, default: 'Book Now'})
  bookingButtonText!: string

  @Prop({type: String, default: 'Book Now'})
  modifyBookingButtonText!: string

  @Prop({type: String, default: 'Resort selection'})
  selectPlaceholder!: string

  @Prop({type: String, default: 'US Dollars'})
  readonly rateCurrency!: string

  @Prop({type: Boolean, default: false})
  readonly modifySearch!: boolean

  @Prop({type: Boolean, default: false})
  readonly compressButton!: boolean

  @Prop({type: Object, default: null})
  initialValues!: any

  async initWidget() {
    if (this.bookingStoreInstance.getBooking.checkIn.length > 0 && !this.initialValues?.checkin) {
      this.internalFrom = dayjs(this.bookingStoreInstance.getBooking.checkIn).toDate()
    } else if (this.initialValues?.checkin) {
      this.internalFrom = dayjs(this.initialValues.checkin).toDate()
    }

    if (this.bookingStoreInstance.getBooking.checkOut.length > 0 && !this.initialValues?.checkout) {
      this.internalTo = dayjs(this.bookingStoreInstance.getBooking.checkOut).toDate()
    } else if (this.initialValues?.checkout) {
      this.internalTo = dayjs(this.initialValues.checkout).toDate()
    }

    await this.initProperties()

    if (this.initialValues?.room) {
      this.rooms = [this.initialValues.room]
    } else {
      this.rooms = this.bookingStoreInstance.getBooking.rooms
    }

    if (this.initialValues?.resort) {
      this.bookingStoreInstance.setPropertyCode(this.initialValues?.resort)
    }

    this.updateDateRange(this.internalFrom, this.internalTo)

    this.initialDateRangeSelected = {
      start: dayjs(this.internalFrom).format('YYYY-MM-DD'),
      end: dayjs(this.internalTo).format('YYYY-MM-DD')
    }

    //window.addEventListener('resize', this.handleResize)

    this.handleResize()

    this.retrieveRates()
  }

  getSocioMoroso() {
    this.dashboardStoreInstance.getSocioMoroso({
      company: this.authStore.userCompany || 0,
      application: Number(this.authStore.applicationUserMember) || 0,
      isNational: this.authStore.isNational || false
    })
  }

  beforeMount() {
    if (this.isSocioMoroso === null) {
      this.getSocioMoroso()
    }
  }

  async mounted() {
    this.initWidget()
    window.addEventListener('resize', this.handleResize)

    /*
    if (this.bookingStoreInstance.getBooking.checkIn.length > 0 && !this.initialValues?.checkin) {
      this.internalFrom = dayjs(this.bookingStoreInstance.getBooking.checkIn).toDate()
    } else if (this.initialValues?.checkin) {
      this.internalFrom = dayjs(this.initialValues.checkin).toDate()
    }

    if (this.bookingStoreInstance.getBooking.checkOut.length > 0 && !this.initialValues?.checkout) {
      this.internalTo = dayjs(this.bookingStoreInstance.getBooking.checkOut).toDate()
    } else if (this.initialValues?.checkout) {
      this.internalTo = dayjs(this.initialValues.checkout).toDate()
    }

    await this.initProperties()

    if (this.initialValues?.room) {
      this.rooms = [this.initialValues.room]
    } else {
      this.rooms = this.bookingStoreInstance.getBooking.rooms
    }

    if(this.initialValues?.resort) {
      this.bookingStoreInstance.setPropertyCode(this.initialValues?.resort)
    }

    this.updateDateRange(this.internalFrom, this.internalTo)

    this.initialDateRangeSelected = {
      start: dayjs(this.internalFrom).format('YYYY-MM-DD'),
      end: dayjs(this.internalTo).format('YYYY-MM-DD')
    }

    window.addEventListener('resize', this.handleResize)

    this.handleResize()

    this.retrieveRates() */
  }

  @Watch('bookingStoreInstance.resetWidget')
  async onResetBookingStore(needReset: boolean) {
    if (needReset) {
      this.initWidget()
      this.bookingStoreInstance.widgetReseted()
    }
  }

  @Watch('selectedProperty')
  @Watch('initialValues')
  submitInitialData() {
    if (
      this.initialValues?.resort &&
      this.initialValues?.submit &&
      this.selectedProperty?.externalId === this.initialValues.resort
    ) {
      this.submitData()
    }
  }

  retrieveRates() {
    const rates = localStorage.getItem('rates')

    if (rates !== null) {
      this.ratesCleverStoreInstance.setRooms(JSON.parse(rates))
    }
  }

  @Watch('propertyStoreInstance.propertiesFilteredByMembership')
  onFilteredPropertiesChange(properties: PropertyEntity[]) {
    this.propertyListPalace.properties = properties
    this.propertyAlreadySelected(properties)
    // this.selectedProperty = properties[0]
  }

  getBookingStorage(): null | BookingEntity {
    const store = JSON.parse(localStorage.getItem('bookingStore')!)

    if (store === null) {
      return null
    }

    return JSON.parse(store.booking)
  }

  propertyAlreadySelected(properties: PropertyEntity[]) {
    const bookStorage = this.getBookingStorage()

    if (bookStorage) {
      const existInProperties = properties.find(
        property => property.externalId === bookStorage.propertyCode
      )

      if (existInProperties) {
        this.selectedProperty = existInProperties
      } else {
        this.selectedProperty = properties[0]
      }
    } else {
      this.selectedProperty = properties[0]
    }
  }

  async initProperties() {
    await this.propertyStoreInstance.initStore()

    this.propertyListPalace = {
      ListTitle: this.$t('listTitlePalace') as string,
      properties: this.propertyStoreInstance.propertiesFilteredByMembership.filter(prop => {
        return !baglioniCodes.includes(prop.externalId)
      })
    }

    if (this.bookingStoreInstance.getBooking.propertyCode) {
      this.selectedProperty =
        this.propertyStoreInstance.propertiesFilteredByMembership.find(
          property => property.externalId === this.bookingStoreInstance.getBooking.propertyCode
        ) || null
    } else {
      this.selectedProperty = this.propertyListPalace.properties[0]
      this.onPropertyChange(this.selectedProperty)
    }
  }

  async fetchProperties() {
    await this.propertyStoreInstance.fetchPropertiesStrapi()
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.window.width = window.innerWidth

    this.window.height = window.innerHeight

    if (this.window.width < 1024) {
      this.removeDropdown()
    }
  }

  updateDateRange(from: Date, to: Date) {
    this.selectedFromDisplay = this.dateToWidgetDisplayFormat(from)

    this.selectedToDisplay = this.dateToWidgetDisplayFormat(to)

    this.selectedFrom = this.dateToWidgetExportFormat(from)

    this.selectedTo = this.dateToWidgetExportFormat(to)
  }

  onApplyDates(dates: CalendarRange) {
    if (dates.start !== null && dates.end !== null) {
      const from = dayjs(dates.start).toDate()
      const to = dayjs(dates.end).toDate()

      this.updateDateRange(from, to)

      this.internalFrom = from

      this.internalTo = to

      if (this.selectingMobile) {
        this.openselectingRoomMobile()
      } else {
        this.removeDropdown()
      }
    }
  }

  async onPropertyChange(property: any) {
    this.selectedProperty = {
      ...property
    }

    this.bookingStoreInstance.setPropertyCode(this.selectedProperty?.externalId!)

    // await this.calendarStore.getRatesLegacyApi(property.code)

    this.rooms = RoomFactory()

    this.selectingProperty = false
    this.bookingStoreInstance.setShowCategories(false)
  }

  onPropertyChangeMobile(property: any) {
    this.onPropertyChange(property)
    this.selectingPropertyMobile = false
    this.selectingCalendarMobile = true
  }

  getDataFromLocalStorage() {
    const memberPropertyAccess = JSON.parse(localStorage.getItem('MemberPropertyAccess')!)
    const country = memberPropertyAccess.member.Country
    const rateType = memberPropertyAccess.memberExtension._rate_Type
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
    const reservationCostType = userInfo._ReservationCostType
    const market = userInfo._Market
    const application = userInfo._UserMember._application
    const company = userInfo._UserMember._company
    const isNational = userInfo._UserMember._isnational
    return {market, reservationCostType, application, company, isNational, country, rateType}
  }

  isLockByRoom(category: RoomAccess): boolean {
    const roomIndex = this.bookingStoreInstance.currentRoom
    const {adults, children, childrenages, infants} =
      this.bookingStoreInstance.getBooking.roomsCopy[roomIndex]

    const {max_children, max_occupancy} = category.CLVRoomTypeCategory

    return isLockOffRoom(adults, infants, max_children, max_occupancy)
  }

  isLockByPax(category: RoomAccess) {
    return this.isLockByRoom(category)
  }

  async buildRatesCleverPayload(): Promise<RatesCleverPayloadDto> {
    const roomsAccessCodes = this.bookingStoreInstance.accessRoom.map(room => ({
      room
    }))

    const roomsToFetch = roomsAccessCodes.filter(actualRoom => !this.isLockByPax(actualRoom.room))

    // Add room PS2 if PS1 Exist in roomAccessCodes
    const hasPresidentialRoom = roomsToFetch.find(
      room => LockOffRoomAccessCode.includes(room.room.RealCode) && !room.room?.isLockOff
    )

    if (hasPresidentialRoom) {
      const roomPS2InAccesCodes = roomsToFetch.filter(room =>
        PresidentialSecondRoomCodes.includes(room.room.RealCode)
      )

      if (roomPS2InAccesCodes.length === 0) {
        const roomPS2 = this.bookingStoreInstance.allRooms.filter(room =>
          PresidentialSecondRoomCodes.includes(room.RealCode)
        )

        if (roomPS2.length > 0) {
          roomPS2.map(secondPresidentialRoom => {
            roomsToFetch.push({room: secondPresidentialRoom})
          })
        }
      }
    }

    const {market, reservationCostType, application, company, isNational, country} =
      this.getDataFromLocalStorage()
    const checkIn = this.bookingStoreInstance.getBooking.checkIn
    const checkOut = this.bookingStoreInstance.getBooking.checkOut
    const adult = this.bookingStoreInstance.getBooking.roomsCopy[0].adults
    const infants = this.bookingStoreInstance.getBooking.roomsCopy[0].infants

    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const promotions = this.bookingStoreInstance.specialRatesPromotion

    const cleverPayload: RatesCleverPayloadDto = {
      application,
      company,
      hotel: this.bookingStoreInstance.getBooking.propertyCode,
      checkInDate: toEpochTimeStamp(checkIn),
      checkOutDate: toEpochTimeStamp(checkOut),
      nights,
      roomCodes: roomsToFetch.map(actualRoom => ({
        code: actualRoom.room.RealCode,
        isLockOff: actualRoom.room.isLockOff ?? false,
        lockoffType: actualRoom.room.isLockOff ? 'L1' : ''
      })),
      market,
      country,
      isRefundable: true,
      isNational,
      costType: true,
      guestCd: 'M', // TODO retomar para guest flow. 'M' = member 'G' = guest
      adult,
      infants,
      rateType: 'L',
      reservationCostType,
      promotions
    }
    return cleverPayload
  }

  saveInLocalStorage() {
    localStorage.setItem('rates', JSON.stringify(this.ratesCleverStoreInstance.rooms))
  }

  async submitData() {
    this.clearAllStorage()

    // this.ratesCleverStoreInstance.setRooms(JSON.parse(rates))
    localStorage.removeItem('rates')
    this.ratesCleverStoreInstance.setRooms([])

    try {
      this.bookingStoreInstance.roomIndex = 0

      this.bookingStoreInstance.$reset()
      this.persistence.clean(this.bookingStoreInstance)
      this.bookingStoreInstance.initStore()

      if (this.isSocioMoroso) {
        this.disallowBookingActions()
        return
      }

      this.bookingStoreInstance.setLoading(true)
      this.bookingStoreInstance.setSkeleton(true)

      this.bookingStoreInstance.setPropertyCode(this.selectedProperty?.externalId!)

      const operaId = this.propertyStoreInstance.getOperaid(this.selectedProperty?.externalId || '')
      this.bookingStoreInstance.setOperaId(operaId)
      this.storeCheckIn(this.selectedFrom)
      this.storeCheckOut(this.selectedTo)
      await this.storeRooms(this.rooms)

      this.removeDropdown()

      const isPromotionAvailable = await this.bookingStoreInstance.verifyPromotionAvailability()

      const checkIn = this.bookingStoreInstance.getBooking.checkIn
      const checkOut = this.bookingStoreInstance.getBooking.checkOut
      let adult = this.bookingStoreInstance.getBooking.rooms[0].adults
      // const child = this.bookingStoreInstance.getBooking.rooms[0].children
      const data = await this.propertyStoreInstance.fetchGroupingData(
        this.bookingStoreInstance.getBooking.propertyCode
      )

      const rules = data.events as RuleGrouping

      const infants = infantGrouping(
        this.bookingStoreInstance.getBooking.rooms[0].childrenages as string[],
        rules
      )
      if (infants.adults) {
        adult += infants.adults
      }

      const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

      await this.ratesCleverStoreInstance.getAvailableCategoriesForBooking({
        application: this.authStore.userAffiliationId,
        company: this.authStore.userCompany,
        hotel: this.bookingStoreInstance.getBooking.propertyCode,
        checkInDate: toEpochTimeStamp(checkIn),
        checkOutDate: toEpochTimeStamp(checkOut),
        nights,
        market: this.authStore.userMarket,
        isNational: this.authStore.isNational
      })

      const {numberOfAdults, numberOfChildren, numberOfGuests} = getTotalGuestsFromBooking(
        this.bookingStoreInstance.getBooking.rooms
      )

      const numberOfRooms = this.bookingStoreInstance.getBooking.rooms.length

      const rooms = getRoomsFromBooking(this.bookingStoreInstance.getBooking.rooms)

      const roomsEvent: RoomsDataLayer = {
        event: 'rooms',
        hotelName: this.bookingStoreInstance.getBooking.propertyCode,
        checkIn: dayjs(checkIn).format('DD-MM-YY'),
        checkOut: dayjs(checkOut).format('DD-MM-YY'),
        numberOfRooms,
        numberOfGuests,
        numberOfAdults,
        numberOfChildren,
        currencyCode: 'USD',
        nights,
        rooms
      }

      // console.log('roomsEvent', roomsEvent)

      // @ts-ignore
      this.$gtm.push(roomsEvent)

      const routeCategorySelector = this.localePath('/booking/categorySelector');

      if (this.$nuxt.$route.path !== routeCategorySelector) {
        this.$nuxt.$router.push(routeCategorySelector)
      }

      if (!isPromotionAvailable) {
        await this.bookingStoreInstance.bookNow()
        await this.getRates()
      }
    } catch (e) {
      // console.log(e)
    }
    // await this.bookingStoreInstance.getProvitions()
  }

  async getRates() {
    this.bookingStoreInstance.setLoading(false)

    const access = await this.buildRatesCleverPayload()

    const fetchPayload = {
      payload: access,
      propertyCode: this.selectedProperty?.externalId!,
      roomIndex: this.bookingStoreInstance.roomIndex,
      originalAccessRooms: this.bookingStoreInstance.accessRoom
    }

    this.ratesCleverStoreInstance.setfetchPayload(fetchPayload)

    await this.ratesCleverStoreInstance.prepareRoomCodesRequest(
      access,
      this.selectedProperty?.externalId!
    )
  }

  async storeRooms(rooms: RoomBookingEntity[]) {
    this.bookingStoreInstance.setRooms(rooms)
    await this.bookingStoreInstance.setRoomsCopy(rooms)
  }

  storeCheckIn(checkIn: string) {
    this.bookingStoreInstance.setCheckIn(checkIn)
  }

  storeCheckOut(checkOut: string) {
    this.bookingStoreInstance.setCheckOut(checkOut)
  }

  handleRemoveDropdown() {
    if (this.window.width >= 1280) {
      this.removeDropdown()
    }
  }

  selectGuests(rooms: RoomBookingEntity[]) {
    const RoomsData = rooms.map(room => {
      return {
        ...room,
        id: rooms.indexOf(room)
      }
    })

    this.rooms = RoomsData
    this.removeDropdown()
  }

  selectGuestsMobile(rooms: RoomBookingEntity[]) {
    const RoomsData = rooms.map(room => {
      return {
        ...room,
        id: rooms.indexOf(room)
      }
    })
    this.rooms = RoomsData
    this.closeDropdownsContentMobile()
  }

  resetDropdownsContent() {
    this.selectingProperty = false

    this.selectingCalendar = false

    this.selectingRoom = false

    this.selectingMobile = false
  }

  closeDropdownsContentMobile() {
    this.selectingPropertyMobile = false

    this.selectingCalendarMobile = false

    this.selectingRoomMobile = false

    this.dropDownTwo = false
  }

  openselectingRoomMobile() {
    this.selectingPropertyMobile = false

    this.selectingCalendarMobile = false

    this.selectingRoomMobile = true

    this.dropDownTwo = true
  }

  removeDropdown() {
    this.resetDropdownsContent()

    this.dropDownTwo = false
  }

  show(selecting: selectingOptions) {
    ////
    this.bookingStoreInstance.$reset()
    this.persistence.clean(this.bookingStoreInstance)
    this.bookingStoreInstance.initStore()
    /////
    if (!this.selectingMobile) {
      this.removeDropdown()
    } else {
      this.resetDropdownsContent()

      this.closeDropdownsContentMobile()

      this.selectingMobile = true

      this.dropDownTwo = true
    }
    ///this.bookingStoreInstance.bookNow()

    this[selecting] = true
  }

  disallowBookingActions() {
    this.$toasted.error(this.$t('membershipOutstandingDebts') as string, {
      theme: 'pe_toast',
      duration: 5000,
      // @ts-ignore
      keepOnHover: true,
      type: 'info',
      action: [
        {
          text: 'Pay now',
          onClick: (_e, toastObject) => {
            toastObject.goAway(0)
            this.$nuxt.$router.push(this.localePath('/membership/SummaryAndPayments'))
          }
        },
        {
          icon: 'close',
          text: '',
          onClick: (_e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      ]
    })
  }

  get fromFormat() {
    return format(dayjs(this.internalFrom).toDate(), 'E, d MMM yyy')
  }

  get toFormat() {
    return format(dayjs(this.internalTo).toDate(), 'E, d MMM yyy')
  }

  get totalRooms(): string {
    const totalRooms = this.rooms.length
    return `${totalRooms} ${totalRooms > 1 ? 'rooms' : 'room'}`
  }

  get totalAdults(): string {
    const totalAdults = this.rooms.reduce((acc, room: RoomBookingEntity) => acc + room.adults, 0)
    return `${totalAdults} ${totalAdults > 1 ? 'adult' : 'adults'}`
  }

  get totalChildren(): string {
    const totalChildren = this.rooms.reduce(
      (acc, room: RoomBookingEntity) => acc + room.children,
      0
    )
    return `${totalChildren} ${totalChildren > 1 ? 'Child' : 'Children'}`
  }

  get showModifySearchSummary() {
    return this.modifySearch && !this.selectingMobile
  }

  get isSelectingADesktopOption() {
    return this.selectingProperty || this.selectingCalendar || this.selectingRoom
  }

  get isSelectingAMobileOption() {
    return this.selectingMobile
  }

  get roomSelectorProps() {
    const featuresByProperty = this.propertyStoreInstance.featuresByProperty(
      this.selectedProperty?.externalId!
    )
    return {
      maxGuests: featuresByProperty[0]?.maxGuests || 9,
      onlyAdults: featuresByProperty[0]?.onlyAdults || false,
      ...this.roomSelector
    }
  }

  get totalGuests() {
    return this.rooms.reduce((acc, room) => acc + room.children + room.adults, 0)
  }

  get dateRangeFormatted() {
    return `From ${this.fromFormat} to ${this.toFormat}`
  }

  get totalPeopleFormatted() {
    return `${this.totalRooms}, ${this.totalAdults}, ${this.totalChildren}`
  }

  get roomLabeltoDisplay() {
    return `${this.rooms.length} ${this.roomSelector.roomsLabel}`
  }

  get guestsLabeltoDisplay() {
    return `${this.totalGuests} ${this.roomSelector.GuestsLabel}`
  }

  get loading() {
    return this.bookingStoreInstance.isLoading
  }

  get isSocioMoroso(): boolean | null | undefined {
    return this.dashboardStoreInstance.isSocioMoroso
  }

  get propertyListMobile() {
    let properties = [{title: true, text: 'Palace Resorts'}]
    // @ts-ignore
    properties.push(...this.propertyListPalaceComputed.properties)
    properties.push({title: true, text: 'European Hotels'})
    if (this.propertyListEuropeanComputed.properties.length) {
      // @ts-ignore
      properties.push(...this.propertyListEuropeanComputed?.properties)
    }

    return {
      ListTitle: 'Lista mobile',
      properties: properties
    }
  }

  get baglioniAccess() {
    return this.propertyStoreInstance.accessBaglioni
  }

  get propertyListEuropeanComputed() {
    if (!this.baglioniAccess) {
      return {
        ListTitle: this.propertyListEuropean.ListTitle,
        properties: this.propertyStoreInstance.propertiesFilteredByMembership
          .filter(property => baglioniCodes.includes(property.externalId))
          .map(prop => {
            return {
              ...prop,
              comingSoon: true,
              comingSoonLabel: this.$t('upgradeRequired')
            }
          })
      }
    }
    return {
      ListTitle: this.propertyListEuropean.ListTitle,
      properties: this.propertyStoreInstance.propertiesFilteredByMembership.filter(property =>
        baglioniCodes.includes(property.externalId)
      )
    }
  }

  get propertyListPalaceComputed() {
    return {
      ListTitle: this.$t('listTitlePalace') as string,
      properties: this.propertyStoreInstance.propertiesFilteredByMembership.filter(prop => {
        return !baglioniCodes.includes(prop.externalId)
      })
    }
  }

  get loadingRates() {
    return this.calendarStore.loadingRates
  }
}
</script>

<style lang="scss">
.pe-col-span-2 > button {
  padding: 1.5rem 0;
}

.booking-room-selector {
  max-width: 700px;
}

.relative.left-0.right-0.mt-auto.mb-6.w-full.px-5.text-center.text-sm.md\:mb-3.lg\:mb-5.\32
  xl\:pb-2 {
  top: 10px;
}

.col-span-12.min-h-\[320px\].w-full.md\:col-span-6.md\:min-h-\[220px\].lg\:col-span-3.lg\:min-h-\[10vw\].\32
  xl\:min-h-\[9vw\] {
  min-height: 128px;
}

@media (min-width: 1024px) {
  .booking-room-selector {
    right: 14vw;
  }
}

@media (min-width: 1280px) {
  .booking-room-selector {
    right: 14vw !important;
  }
}

@media (max-width: 1440px) {
  .booking-room-selector {
    right: 14vw !important;
  }
}

@media (min-width: 1536px) {
  .booking-room-selector {
    right: 10vw !important;
  }
}

@media (min-width: 1920px) {
  .booking-room-selector {
    right: 10.5vw !important;
  }
}

@media (min-width: 2500px) {
  .booking-room-selector {
    right: 8vw !important;
  }
}

.custom-scroll::-webkit-scrollbar {
  -webkit-appearance: none;
}

.custom-scroll::-webkit-scrollbar:vertical {
  width: 10px;
}

.custom-scroll::-webkit-scrollbar-button:increment,
.custom-scroll::-webkit-scrollbar-button {
  display: none;
}

.custom-scroll::-webkit-scrollbar:horizontal {
  height: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #666666;

  border-radius: 3px;

  border: 3px solid #666666;
}

.custom-scroll::-webkit-scrollbar-track {
  border-radius: 3px;
}
</style>
