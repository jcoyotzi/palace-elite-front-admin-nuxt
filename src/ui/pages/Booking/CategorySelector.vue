<template>
  <div v-if="categories && showCategories">
    <PE-booking-room-detail
      v-for="(category, index) in categories"
      :key="index"
      :price-title="$t('pricesPerNight')"
      class="!bg-black !bg-opacity-50 w-full"
      :icon="false"
      lock-text="Maximum pax"
      lock-description="Maximum occupancy exceeded for this type of room."
      v-bind="roomDetailProps({category, index})"
      :select-room-button-text="roomTextSelectable"
      :skeleton-class="`skeleton-${index}`"
      :available="verifyAvailability(category.code, category.availability)"
      :loadingButton="loadingButton"
      :promotions="promotions"
      @select-room="selectRoom($event, true)"
      @selected-rate-on-click="selectedRateOnClick($event, category)"
    >
      <template #referral-weeks>
        <div>
          <h4 :class="provisionTitleClasses"> Select your preferred program</h4>
          <div :class="provisionContainerClasses">
            <PERadioGroup
              v-model="selectedPromotion"
              :items="promotions"
              :position="radioPosition"
              class="pe-mb-3 md:pe-w-full"
            ></PERadioGroup>
          </div>
        </div>
      </template>
      <template #imperial-weeks>
        <div v-if="!loadingImperials">
          <h4 :class="provisionTitleClasses"> {{ $t('selectYourImperialWeek') }} </h4>
          <div :class="provisionContainerClasses">
            <ImperialRadioGroup
              v-model="selectedImperialPromotions[category.RealCode]"
              :items="imperialProvitions(category)"
              :position="radioPosition"
              class="pe-mb-3 md:pe-w-full"
            ></ImperialRadioGroup>
          </div>
        </div>
        <PELoadingData v-else></PELoadingData>
      </template>
    </PE-booking-room-detail>
    <PEXmasModal
      v-bind="xmasModalProps"
      @noUseProvition="noUseProvition"
      @useProvition="useProvition"
      @closeModal="closeModal"
    />
  </div>
  <div v-else>
    <h4 class="text-white font-serif text-2xl text-center">REALIZA UNA BUSQUEDA</h4>
  </div>
</template>

<script lang="tsx">
import dayjs from 'dayjs'
import {Component, Mixins, Watch} from 'vue-property-decorator'
import {CategoryStore} from '../../store/strapi/categoryStore'

import GenerateIdMixin from '../../mixins/generateIdMixin'
import PEBookingRoomDetail from '../../components/RoomSummaryCards/PEBookingRoomDetail.vue'
import PeBookingWidget from '../../components/BookingWidget/PEBookingWidget.vue'
import {RatesCleverStore} from '../../store/ratesCleverStore'
import categoryLang from '../../i18n/booking/categorySelector.lang'
import notificationsLang from '~/src/ui/i18n/notifications/notifications.lang'
import ImperialRadioGroup from '../../components/RoomSummaryCards/ImperialRadioGroup.vue'
import {showToast, ToastDuration} from '../../utils/toastHelpers'
import PEXmasModal from '~/src/ui/components/Booking/PEXmasModal.vue'
import {
  CategoryMapped,
  ImperialWeeks,
  MappedRates,
  RefundRateOptions,
  RoomDetailProps,
  SelectedCategory
} from '~/interfaces/Booking/Category.interface'
import {AccessibleCategories} from 'app/category/domain/mapper/AccesibleCategories'
import {BookingStore, ImperialTotalRate} from '~/src/ui/store/bookingStore'
import {getRoomsSorted} from 'app/ratesClever/infrastructure/getRoomsSorted'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import PEResumeRoomItem2 from '~/src/ui/components/BookingResumeReservation/PEResumeRoomItem2.vue'
import PEResumeReservation2 from '~/src/ui/components/BookingResumeReservation/PEResumeReservation2.vue'
import {ProvisionStore} from '~/src/ui/store/provisionStore'
import {selectedNightsFromStrDates} from 'app/common/helpers/dateRanges'
import PEProvisionOption from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOption.vue'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import {ImperialEntity, ImperialProvitions} from '~/src/app/booking/domain/entities/imperialEntity'
import {Combination, InfoMemberProvision} from '~/src/app/booking/domain/dto/imperialDto'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'
import {ValidateWeek52} from 'app/filldatareservation/legacyBin/ValidateWeek52'
import {RefundableOptions} from 'app/common/domain/enums/refundableOptions'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {ResortCreditStore} from '~/src/ui/store/benefits/resortCreditStore'
import {ImperialItemRadioGroup} from '~/src/app/benefits/domain/entities/ItemRadioGroup'
import {container} from '../../../container'
import ContractByPromotionRepository from 'app/contractByPromotion/domain/repositories/contractByPromotionRepository'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'
import {UseAuth} from '~/src/ui/store/auth'
import {RCDetail} from 'app/contractByPromotion/domain/entities/ContractByPromotion'
import {infantGrouping, isLockOffRoom, RuleGrouping} from 'app/booking/domain/mapper/infantGrouping'
import GetContractByPromotionArrayStore from '~/src/ui/store/booking/getContractByPromotionArrayStore'
import {DashboardStore} from '../../store/dashboardStore'

const i18n = {
  messages: {
    es: {...categoryLang.messages.es, ...notificationsLang.messages.es},
    en: {...categoryLang.messages.en, ...notificationsLang.messages.en}
  }
}
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes
} from '~/src/app/roomAccess/domain/data/lockOffRoomAccessCode'
import {PropertiesStore} from '../../store/propertiesStore'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import { EliteProductType } from '~/src/app/bookingBenefits/domain/entities/rules/reservationTypes'

export enum CustomBreakpoints {
  DESKTOP = 1024,
  MOBILE = 768
}

export interface SelectedImperialPromotions {
  [key: string]: ImperialProvitions
}

const date = dayjs().add(1, 'day').toDate()

@Component({
  i18n,
  name: 'PE-booking-categories',
  meta: {
    auth: true
  },
  components: {
    PeBookingWidget,
    PEBookingRoomDetail,
    PEResumeRoomItem2,
    PEResumeReservation2,
    ImperialRadioGroup,
    PEProvisionOption,
    PEXmasModal
  }
})
export default class PEBookingCategories extends Mixins(GenerateIdMixin) {
  strapiCategoryInstance = new CategoryStore()
  bookingStoreInstance = new BookingStore()
  ratesInstance = new RatesCleverStore()
  layoutStore = new LayoutStore()
  resortCreditStore = new ResortCreditStore()
  authStore = new UseAuth()
  dashboardStore = new DashboardStore()
  loadingImperials = false

  reservationRepository = container.get<ContractByPromotionRepository>(
    contractByPromotionTypes.ContractByPromotionRepository
  )

  windowWidth = 0
  selectedPromotion = 'BW'
  selectedImperialPromotions: ImperialProvitions = [] as any as ImperialProvitions
  provisionStore = new ProvisionStore()

  anniversarySelected = null
  incentiveSelected = null

  acceptedXmasModal = false

  cachedValue = null

  minStayREf = true

  xmasModalProps = {
    loading: false,
    provisionDetail: '1 Gold Week PR - Exp. date Aug 23, 2022 +',
    provitionAmount: '1500',
    provitionAmountCurrency: 'USD'
  }

  private presidentialRoomPart2 = null

  @Watch('imperialProvitions')
  onImperialProvitionsClean() {
    this.selectedImperialPromotions = [] as any as ImperialProvitions
  }

  bookingStore = new BookingStore()
  propertiesStore = new PropertiesStore()

  getContractByPromotionStore = new GetContractByPromotionArrayStore()

  get showIncentiveOptions(): boolean {
    return this.incentiveProvisionsAvailable !== null
      ? this.incentiveProvisionsAvailable.length > 0
      : false
  }

  get showAnniversaryOptions(): boolean {
    return this.anniversaryProvisionsAvailable !== null
      ? this.anniversaryProvisionsAvailable.length > 0
      : false
  }

  get showCategories() {
    return this.bookingStoreInstance.showCategories
  }

  public get loggedUser() {
    return this.authStore.getLoggedUser
  }

  get roomTextSelectable() {
    if (this.categories!.length < 1) {
      return this.$t('selectRoom')
    }

    return this.$t('selectNumerableRoom', {
      room: this.bookingStoreInstance.currentRoomIndex + 1
    })
  }

  loadingButton = false

  get getselectedImperialPromotions() {
    return this.selectedImperialPromotions
  }

  get radioPosition() {
    return this.windowWidth > CustomBreakpoints.DESKTOP ? 'horizontal' : 'vertical'
  }

  get anniversaryProvisionsAvailable() {
    return this.provisionStore.anniversaryItems
  }

  get incentiveProvisionsAvailable() {
    return this.provisionStore.incentiveItems
  }

  get anniversaryProvisions() {
    return this.bookingStoreInstance.allProvisions?.Anniversary
  }

  get incentiveProvisions() {
    return this.bookingStoreInstance.allProvisions?.Incentive
  }

  get anniversaryToDisplay() {
    if (this.anniversaryProvisions !== null && this.anniversaryProvisions !== undefined) {
      const booking = this.bookingStoreInstance.getBooking
      const hotelCode = booking.propertyCode
      const market = this.bookingStoreInstance.userInfo._Market
      // const market = 'UK'
      const nightsToBook = selectedNightsFromStrDates(booking.checkIn, booking.checkOut)
      this.provisionStore.computeAvailableAnniversaryProvitions(
        this.anniversaryProvisions,
        hotelCode,
        nightsToBook,
        market
      )
    }
    return
  }

  imperialTotalRate: ImperialTotalRate | null = null

  async useProvition() {
    this.acceptedXmasModal = true

    const savedXAmount = this.imperialTotalRate?.AmountWeek52 || 0
    const imperialTotalRate = {
      ...this.imperialTotalRate,
      AmountWeek52: 0
    } as ImperialTotalRate

    await this.bookingStoreInstance.selectedRoomToReservate({
      room: this.value,
      imperialFee: 0,
      imperialLeblancFee: 0,
      week52Fee: 0,
      extraFee: 0,
      isChris: true,
      RmfolioRc: null,
      imperialTotalRate,
      savedXAmount
    })

    this.$nuxt.$router.push({path: '/booking/roomGuests'})
  }

  async desPreAssing() {
    /**
     * RESCATAR PROVICION CHRISMAS
     */
    await this.bookingStoreInstance.desPreAssignProvisionMember({
      application: this.authStore.applicationUserMember,
      company: this.authStore.userCompany,
      provision: this.selectedProvition,
      reservation: this.rmFolio,
      category: this.value.selectedOption!.id!,
      isNational: this.bookingStoreInstance.infoUserMember._UserMember._isnational,
      chris: this.nightsBetweenWeek52 > 0
    })
  }

  async noUseProvition() {
    this.xmasModalProps.loading = true
    this.acceptedXmasModal = false
    await this.desPreAssing()
    this.xmasModalProps.loading = false
    this.$nuxt.$router.push({path: '/booking/roomGuests'})
  }

  closeModal() {
    this.desPreAssing()
  }

  makeId(base: string, index: string) {
    return `${base}_${index}`
  }

  get categories(): AccessibleCategories[] | null {
    const accesibleCategories = this.strapiCategoryInstance.getMappedCategories

    if (accesibleCategories === null) return null

    const paxExceeded = accesibleCategories.map(category => ({
      isExceeded: this.isLockByPax(category),
      category
    }))

    const lockedCategories = paxExceeded.filter(item => item.isExceeded).map(item => item.category)
    const availableCategories = paxExceeded
      .filter(item => !item.isExceeded)
      .map(item => item.category)
    const propertyCode = this.bookingStoreInstance.getbookingpropertyCode

    const sorted = this.sortCategories(availableCategories, propertyCode)
    let result = [...sorted, ...lockedCategories]

    const aCategories = result.filter(category => {
      if (
        LockOffRoomAccessCode.includes(category.RealCode) &&
        !category.isLockoff &&
        !this.strapiCategoryInstance.mappedPresidentialCategories.some(
          item => item.RealCode === category.Category._RmtypeRelated
        )
      ) {
        return false
      }
      return category?.availability
    })

    const uCategories = result.filter(category => {
      return !category?.availability
    })

    result = aCategories.concat(uCategories)

    // console.log("ACTUAL RESERVATION INDEX: ", this.bookingStoreInstance.roomIndex)

    // Aplicar filtro para mostrar solo rooms (Parte 2) de categoria Presidencial
    if (this.bookingStoreInstance.roomIndex > 0) {
      const previousPresidentialRoom =
        this.bookingStoreInstance.reservationInfo[this.bookingStoreInstance.roomIndex - 1]
          .roomSelected
      const previousPresidentialRoomCode = previousPresidentialRoom?.selectedCategory.RealCode ?? ''

      if (
        LockOffRoomAccessCode.includes(previousPresidentialRoomCode) &&
        !previousPresidentialRoom?.selectedCategory.isLockOff
      ) {
        result = this.strapiCategoryInstance.mappedPresidentialCategories.filter(category => {
          return category.RealCode === previousPresidentialRoom?.selectedCategory.relRoomsCodes
        })
      }
    }

    /*// console.log({
      result
    })*/

    return result as AccessibleCategories[] | null
  }

  sortCategories(categories: AccessibleCategories[], hotelCode: string) {
    const roomOrder = getRoomsSorted(hotelCode)

    categories.sort(function (categoryA, categoryB) {
      // @ts-ignore
      const defaultSort: RoomSort = {
        orderPosition: roomOrder.length
      }

      const categoryToSortA =
        roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryA.code) ?? defaultSort
      const categoryToSortB =
        roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryB.code) ?? defaultSort

      return categoryToSortA?.orderPosition - categoryToSortB?.orderPosition
    })

    return categories
  }

  constructDescription(promo: any) {
    return promo.Descripcion_US.replace(`${promo.PromotionMemberId}-`, '').replace('Activo', '')
  }

  get promos(): any {
    return this.bookingStoreInstance.referralPromotions
  }

  get locale(): string {
    return this.$i18n.locale
  }

  verifyAvailability(roomCode: string, isCategoryAvailable: boolean): boolean {
    return PresidentialSecondRoomCodes.includes(roomCode) ? true : isCategoryAvailable
  }

  get promotions() {
    if (this.promos.length > 0) {
      if (!this.promos[0].PromotionsBenefits) {
        return [
          {
            id: this.promos[0].IdPromocion,
            name: this.generateId('radio'),
            labelText: this.promos[0].Descripcion
          }
        ]
      }

      return this.promos[0].PromotionsBenefits?.map((item: any) => {
        if (item.Benefit === 'BW' || item.Benefit === 'PR') {
          return {
            id: item.Benefit,
            name: this.generateId('radio'),
            labelText:
              this.locale === 'es'
                ? this.promos[0].Descripcion
                : this.constructDescription(this.promos[0])
          }
        }
        if (item.Benefit === 'UC' || item.Benefit === 'RC') {
          const {checkIn, checkOut} = this.bookingStoreInstance.getBooking
          const market = this.bookingStoreInstance.userInfo._Market

          const totalNights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
          // Validación para mercado nacional
          if (market === 'MEXICO') {
            if (totalNights <= 4) {
              this.minStayREf = false
              return
            }

            if (totalNights === 5 || totalNights === 6) {
              return {
                id: item.Benefit,
                name: this.generateId('radio'),
                labelText: `REF ${item.DaysForAward}`
              }
            }

            return {
              id: item.Benefit,
              name: this.generateId('radio'),
              labelText: `REF ${item.Quantity}`
            }
          } else if (market === 'USA' || market === 'LATAM' || market === 'CANADA') {
            if (totalNights < 5) {
              this.minStayREf = false
              return
            }

            if (totalNights === 5 || totalNights === 6) {
              return {
                id: item.Benefit,
                name: this.generateId('radio'),
                labelText: `REF ${item.DaysForAward}`
              }
            }

            return {
              id: item.Benefit,
              name: this.generateId('radio'),
              labelText: `REF ${item.Quantity}`
            }
          } else if (market === 'UK') {
            if (totalNights < 7) {
              return
            }

            if (totalNights > 6 && totalNights < 10) {
              return {
                id: item.Benefit,
                name: this.generateId('radio'),
                labelText: `REF ${item.DaysForAward}`
              }
            }

            return {
              id: item.Benefit,
              name: this.generateId('radio'),
              labelText: `REF ${item.Quantity}`
            }
          }
        }
      }).filter((promo: any) => promo)
    }
    return []
  }

  get getImperials(): ImperialProvitions {
    return this.bookingStoreInstance.imperialProvitions
  }

  imperialProvitions(category: AccessibleCategories): ImperialItemRadioGroup[] {
    try {
      const provitions = []
      const categoryCode = category.RealCode
      provitions.push(...(this.BasicImperials(this.getImperials[categoryCode]?.Basic) || []))
      provitions.push(...(this.BasicImperials(this.getImperials[categoryCode]?.Combinations) || []))
      provitions.push(
        ...(this.BasicImperials(this.getImperials[categoryCode]?.CombinationsWithCost) || [])
      )
      provitions.push(...(this.BasicImperials(this.getImperials[categoryCode]?.Lineals) || []))
      provitions.push(
        ...(this.BasicImperials(this.getImperials[categoryCode]?.LinealsWithCost) || [])
      )
      provitions.push(
        ...(this.BasicImperials(this.getImperials[categoryCode]?.ProvisionPromotions) || [])
      )
      // TODO: refactor type
      return [...provitions]
    } catch (error) {
      // console.log(error)
    }
    return []
  }

  BasicImperials(combination: Combination[] | undefined): ImperialItemRadioGroup[] {
    if (combination !== undefined) {
      const listOfBasics = combination?.flatMap(item => {
        const nearestProvision = this.getNearestProvision(item)
        if (nearestProvision === undefined || item.Type === 'CSC') return []
        return this.formatImperialRadio(nearestProvision, item)
      })
      let sortedList
      try {
        sortedList = listOfBasics?.sort((current, next) => {
          // @ts-ignore
          return new Date(current.provitionExpiration) - new Date(next.provitionExpiration)
        })
      } catch (error) {
        // console.log(error)
      }

      return sortedList || []
    }
    return []
  }

  getNearestProvision(imperial: Combination): InfoMemberProvision | undefined {
    return imperial.Provisions?.reduce((prev, curr) => {
      if (curr?.VALIDDTE === undefined) return prev
      if (prev?.VALIDDTE === undefined) return curr
      return prev.VALIDDTE > curr.VALIDDTE ? prev : curr
    })
  }

  formatImperialRadio(
    nearestProvision: InfoMemberProvision,
    combination: Combination
  ): ImperialItemRadioGroup {
    const provitionExpiration = nearestProvision.VALIDDTE
      ? ` - ${this.formatImperialDate(nearestProvision.VALIDDTE)}`
      : ''
    const isUsedCombination = this.bookingStoreInstance.findImperialOnReservation(
      combination.CombinationId!
    )
    const golf = this.golfType(nearestProvision)
    return {
      id: combination.CombinationId as any,
      name: this.generateId('radio'),
      labelText: `${combination.Provisions?.length} ${nearestProvision.TYPENAME} ${golf}: ${provitionExpiration}`,
      price: combination.Paymentrequired as number,
      currency: 'USD',
      selectedProvisionRecnum: nearestProvision.RECNUM,
      provitionExpiration: dayjs(nearestProvision.VALIDDTE).format('YYYY-MM-DD'),
      disabled: isUsedCombination
    }
  }

  formatImperialDate(date: string) {
    return `Exp.date  ${dayjs(date).format('MMM DD, YYYY')}`
  }

  cacheValue(value: any) {
    this.cachedValue = value
    return
  }

  selectedProvition = null

  rmFolio: any = null

  value: any = null

  nightsBetweenWeek52 = 0

  // SUPLEMENT FEE - AMOUNT UPGRADE
  // EXTRA FEE - COSTO EXTRA POR PAX

  async clearRejectedRoom(clearedValue: SelectedCategory) {
    await this.bookingStoreInstance.selectedRoomToReservate({
      room: clearedValue,
      imperialFee: 0,
      imperialLeblancFee: 0,
      week52Fee: 0,
      extraFee: 0,
      isChris: false,
      RmfolioRc: null,
      imperialTotalRate: null
    })

    this.loadingButton = false
  }

  validSelectedCategory(category?: SelectedCategory): boolean {
    return category !== undefined && category.selectedOption?.code !== undefined
  }

  validSelectedCategoryKidsAndTeens(category?: SelectedCategory): boolean {
    // Hotel
    // const hotel = this.bookingStoreInstance.getBooking.propertyCode
    const room = category?.selectedCategory.RealCode
    const specialRooms = ['FBV', 'PRE', '2PSBV']
    const index = this.bookingStoreInstance.roomIndex
    const infants = this.bookingStoreInstance.getBooking.roomsCopy[index].infants
    const children = infants.children + infants.babies + infants.kids

    // Is Baglioni room special?
    if (specialRooms.includes(room!)) {
      // Have promotion kids and teens free
      return this.bookingStoreInstance.specialRatesPromotions.some(function (item: any) {
        if (item.Code === 'KidsAndTeens') {
          return children > 2
        }
      })
    }

    return false
    // return category !== undefined && category.selectedOption?.code !== undefined
  }

  getCategorySelectedType(category: SelectedCategory): string {
    const selectedProvision = this.roomSelectedProvition(category) 
    return selectedProvision?.Category?.includes(EliteProductType.provisionWeekIfIncludes) ? EliteProductType.weekType : EliteProductType.nightType
  }

  roomSelectedProvition(room: SelectedCategory): InfoMemberProvision | null {
    let selectedProvition :  InfoMemberProvision | null = null

    if (room?.selectedOption?.code === BookingCategoryStatus.ANIVERSARIO)
      selectedProvition =
        room?.provisions?.anniversary?.provision.raw ||
        room?.provisions?.anniversary?.provision?.nights![0].raw ||
        null

    if (room?.selectedOption?.code === BookingCategoryStatus.INCENTIVA)
      selectedProvition =
        room?.provisions?.incentive?.provision?.raw ||
        room?.provisions?.incentive?.provision?.nights![0].raw ||
        null

    if (room?.selectedOption?.code === BookingCategoryStatus.IMP_WEEKS)
      selectedProvition = room?.selectedProvition || null
    return selectedProvition
  }

  async selectRoom(value: SelectedCategory, validateChristmas: boolean = true) {
    this.loadingButton = true
    let imperialFee = 0
    let imperialLeblancFee = 0

    let clearedValue = value


    if (this.isSocioMoroso) {
      showToast({context: this, message: this.$t('isSocioMoroso') as string})
      this.loadingButton = false
      return
    }

    if (!this.validSelectedCategory(value)) {
      showToast({context: this, message: this.$t('mustSelectValidOption') as string})
      this.loadingButton = false
      return
    }

    // Validar kids&teens Baglioni
    if (this.validSelectedCategoryKidsAndTeens(value)) {
      showToast({context: this, message: this.$t('mustSelectValidOptionKidsAndTeens') as string})
      this.loadingButton = false
      return
    }

    const responseSemana52 = await this.bookingStoreInstance.validateRuleSemana52(
      PipelinesEnum.SEMANA52,
      String(value.selectedOption?.code)
    )

    let selectedProvition: InfoMemberProvision | any
    let selectedRadio
    let selectedCombination: any | Combination = null
    let calculatedRate = 0


    // TODO: Refactor interfaces
    if (value.selectedOption?.code === BookingCategoryStatus.IMP_WEEKS) {
      value.selectedRefundRate = RefundableOptions.REFUNDABLE
      const selectedRadioId = this.selectedImperialPromotions[value.selectedCategory.RealCode]

      const radiosOnCategory: any[] | undefined = this.imperialProvitions(value.selectedCategory)

      selectedRadio = radiosOnCategory.find(selectedRadio => selectedRadio.id === selectedRadioId)

      const selectedProvisionRecnum = selectedRadio?.selectedProvisionRecnum

      for (const [key, combinationValue] of Object.entries(
        this.getImperials[value.selectedCategory.RealCode] as ImperialEntity
      )) {
        const findedValue = combinationValue.find(
          (combination: Combination) => combination.CombinationId === selectedRadioId
        )
        if (findedValue !== undefined) {
          selectedCombination = findedValue
          break
        }
      }

      selectedProvition = selectedCombination?.Provisions?.find(
        (provision: InfoMemberProvision) => {
          return provision.RECNUM === selectedProvisionRecnum
        }
      )

      clearedValue = {
        ...value,
        selectedOption: {
          ...value.selectedOption,
          rate: 0
        }
      }
      value = {
        ...value,
        selectedOption: {
          ...value.selectedOption,
          rate: 0
        },
        selectedCombination,
        selectedProvition
      }

      if (selectedProvition === undefined || selectedCombination === undefined) {
        this.$toasted.info(this.$t('mustSelectValidImperialProvition') as string, {
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
        this.clearRejectedRoom(clearedValue)
        return
      }
    }

    const productType = this.getCategorySelectedType(value)

    const minimalStayRule = await this.bookingStoreInstance.validateRuleMinimalStay(
      PipelinesEnum.STAY_MINIMAL,
      value.selectedCategory.RealCode,
      value.selectedOption?.code,
      productType
    )
    if (!minimalStayRule && !this.isBaglioniBooking) {
      showToast({context: this, message: this.$t('minimunStayRule') as string})
      this.loadingButton = false
      return
    }

    const maximalStayRule = await this.bookingStoreInstance.validateRuleMaximalStay(
      PipelinesEnum.STAY_MAXIMAL,
      value.selectedCategory.RealCode,
      value.selectedOption?.code
    )

    if (!maximalStayRule && !this.isBaglioniBooking) {
      showToast({context: this, message: this.$t('maximalStayRule') as string})
      this.loadingButton = false
      return
    }

    // validamos que sea una imperial en forma
    if (value.selectedOption?.code === BookingCategoryStatus.IMP_WEEKS) {
      await this.bookingStoreInstance.selectedRoomToReservate({
        room: value,
        imperialFee: 0,
        imperialLeblancFee: 0,
        week52Fee: 0,
        extraFee: 0,
        isChris: false,
        RmfolioRc: null,
        imperialTotalRate: null
      })

      const productElite = await this.bookingStoreInstance.evaluateDefaultGolfPolicy(
        value.selectedOption!.code!
      )
      let provisionGolfType = ''
      try {
        provisionGolfType = this.golfType(selectedProvition)
      } catch (error) {
        console.log(error)
      }

      const responseFromContractArray = await this.getContractByPromotionArray(
        value.selectedCategory.RealCode,
        selectedProvition.Category === 'IMPNIG' ? 3 : 4,
        value.selectedRefundRate === RefundableOptions.REFUNDABLE,
        productElite.events!.code,
        provisionGolfType === 'ULG'
          ? selectedCombination!.ProvisionIdWithGolf
          : selectedCombination!.ToProvisionId,
        selectedProvition,
        provisionGolfType
      )

      this.bookingStoreInstance.setIdImperial(selectedProvition.Category === 'IMPNIG' ? 3 : 4)

      // @ts-ignore
      if (responseFromContractArray.data!.data?.RCDetail.length === 0) {
        this.$toasted.info(this.$t('couldntGetRates') as string, {
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
        this.clearRejectedRoom(clearedValue)
        return
      }
      let imperialTotalRate: ImperialTotalRate = this.getTotalXmasAmount(
        // @ts-ignore
        responseFromContractArray.data!.data?.RCDetail[0]
      )

      if (
        [
          'RE',
          'DE',
          'ER',
          'GD',
          'GV',
          'LB',
          'PS',
          'V',
          'VD',
          'VG',
          'VL',
          'VO',
          'VP',
          'VS',
          'VV'
        ].includes(this.authStore.user!._UserMember._membershiplevel) &&
        ['CNG', 'RHNY'].includes(value.selectedCategory.RealCode)
      ) {
        imperialTotalRate = {
          ...imperialTotalRate,
          AmountChargeUpgrade: 0
        }
      }

      calculatedRate = imperialTotalRate.Rate

      await this.bookingStoreInstance.selectedRoomToReservate({
        room: value,
        imperialFee: 0,
        imperialLeblancFee: 0,
        week52Fee: 0,
        extraFee: calculatedRate,
        isChris: false,
        // @ts-ignore
        RmfolioRc: responseFromContractArray.data!.data?.RCDetail[0],
        imperialTotalRate
      })
      const leBlancPropertyCodes = ['ZHLB', 'LBC', 'ZHLB']

      this.imperialTotalRate = imperialTotalRate

      const payload = this.getContractByPromotionStore.getContractByPromotionArrayPayload({
        index: this.bookingStore.currentRoomIndex
      })

      const {data} = await this.reservationRepository.getContractByPromotion(payload)

      if (
        leBlancPropertyCodes.includes(this.bookingStoreInstance.getBooking.propertyCode) ||
        leBlancPropertyCodes.includes(this.bookingStoreInstance.getBooking.operaId)
      )
        imperialLeblancFee = selectedRadio.price
      else imperialFee = selectedRadio.price

      imperialTotalRate = {
        // @ts-ignore
        ...this.getContractByPromotionStore.getTotalImperialAmounts(data!.data.RCDetail[0]),
        imperialLeblancFee,
        imperialFee
      }
      this.imperialTotalRate = imperialTotalRate

      await this.bookingStoreInstance.selectedRoomToReservate({
        room: value,
        imperialFee,
        imperialLeblancFee,
        week52Fee: 0,
        extraFee: calculatedRate,
        isChris: false,
        // @ts-ignore
        RmfolioRc: responseFromContractArray.data!.data?.RCDetail[0].RmfolioRc,
        imperialTotalRate: imperialTotalRate
      })
    }

    // CASO CHRISMAS
    if (value.selectedOption?.code === BookingCategoryStatus.IMP_WEEKS) {
      //TODO logic for christmas and increase imperialFee if is needed
      if (validateChristmas && responseSemana52) {
        const {checkIn, checkOut} = this.bookingStoreInstance.getBooking
        const arrivalDate = dayjs(checkIn).toDate()
        const departureDate = dayjs(checkOut).toDate()
        const numberOfSelectedNights = selectedNights(arrivalDate, departureDate)

        const nightsBetweenWeek52 = ValidateWeek52(
          arrivalDate,
          departureDate,
          numberOfSelectedNights
        )

        if (nightsBetweenWeek52 > 0 && responseSemana52) {
          let hasChrimasBonus = false

          if (
            [ReservationTypes.IMP_NIGHT, ReservationTypes.IMP_WEEKS].includes(
              value.selectedOption!.id! as number
            )
          ) {
            const productElite = await this.bookingStoreInstance.evaluateDefaultGolfPolicy(
              value.selectedOption!.code!
            )

            const payload = this.getContractByPromotionStore.getContractByPromotionArrayPayload({
              index: this.bookingStore.currentRoomIndex
            })

            const responseFromContractArray =
              await this.reservationRepository.getContractByPromotion(payload)

            this.bookingStoreInstance.setIdImperial(selectedProvition.Category == 'IMPNIG' ? 3 : 4)

            // console.log(responseFromContractArray)
            // @ts-ignore
            // console.log(this.getTotalXmasAmount(responseFromContractArray.data!.data.RCDetail[0]))

            // SI DA MAS DE 1 ESTAMOS DENTRO DE LA SEMANA 52
            if (nightsBetweenWeek52 > 0) {
              const currentRoom =
                this.bookingStoreInstance.reservationInfo[
                  this.bookingStoreInstance.currentRoomIndex
                ]

              currentRoom.roomSelected!.selectedOption!.id =
                selectedProvition.Category === 'IMPNIG' ? 3 : 4

              this.bookingStoreInstance.setIdImperial(
                selectedProvition.Category === 'IMPNIG' ? 3 : 4
              )

              const {rmFolio, context} = await this.bookingStoreInstance.createRoomFolio(
                currentRoom,
                [currentRoom.roomSelected?.selectedCategory.RealCode],
                [currentRoom.roomSelected?.selectedRefundRate === RefundableOptions.REFUNDABLE],
                numberOfSelectedNights,
                false,
                this.bookingStore.currentRoomIndex
              )

              if (selectedProvition) {
                selectedProvition.STATUS = 'R'
                selectedProvition.HOTFOLIO = rmFolio!.Folio
              }

              selectedProvition.STATUS = 'R'
              selectedProvition.HOTFOLIO = rmFolio!.Folio
              selectedProvition.HOTEL = context.Hotel
              selectedProvition.RM_TYPE = context.rm_type
              selectedProvition.APPLICATION = context.Member
              selectedProvition.ARV_DATE = rmFolio!.Arv_date

              const provitions = selectedCombination?.Provisions?.map(
                (provitionNight: {
                  HOTEL: string
                  RM_TYPE: string
                  APPLICATION: any
                  ARV_DATE: any
                  HOTFOLIO: number
                  STATUS: string
                }) => {
                  provitionNight.HOTEL = context.Hotel
                  provitionNight.RM_TYPE = context.rm_type
                  provitionNight.APPLICATION = context.Member
                  provitionNight.ARV_DATE = rmFolio!.Arv_date as any
                  provitionNight.HOTFOLIO = rmFolio!.Folio
                  provitionNight.STATUS = 'R'
                  return provitionNight
                }
              )

              /**
               * PREASIGNACION CHRISMAS
               */
              const {data} = await this.bookingStoreInstance.preAssignCombinationToMember(
                rmFolio!,
                provitions,
                this.bookingStoreInstance.infoUserMember._UserMember._isnational,
                0,
                context.Application,
                rmFolio!.Co
              )

              hasChrimasBonus = data.data.provision !== null

              if (hasChrimasBonus) {
                this.selectedProvition = data.data.provision
              } else {
                this.selectedProvition = selectedProvition
              }

              this.rmFolio = rmFolio!
              this.value = value
              this.nightsBetweenWeek52 = nightsBetweenWeek52

              // OJO - CHECAR SI TIENE EL CHRISTMAS BONUS
              // SI TIENE: MOSTRAR EL MODAL PARA PREGUNTAR SI QUIERE USAR SU PROVISION
              // | ---CACHAR SU PROVICION Y SETEARLA EN EL REQUEST DE PREASIGNAR
              // | ---MANDAR A LA SIGUIENTE PANTALLA
              // NO TIENE: MANDARLO A LA SIGUIENTE PANTALLA LLAMAR A GET CONTRACT BY PROMOTION ARRAY
              // BUSCAR EL CAMPO WEEK 32 O EL FEE DE LA RESPUESTA
              // CARGAR ESOS DATOS EN EL RMFOLIO QUE SE VALLA A GENERAR
            }

            this.xmasModalProps = {
              provisionDetail: selectedRadio.labelText, //'1 Gold Week PR - Exp. date Aug 23, 2022 +',
              // @ts-ignore
              provitionAmount: imperialFee,
              provitionAmountCurrency: 'USD'
            }

            await this.bookingStoreInstance.selectedRoomToReservate({
              room: value,
              imperialFee: 0,
              imperialLeblancFee: 0,
              week52Fee: this.imperialTotalRate?.AmountWeek52 || 0,
              extraFee: calculatedRate,
              isChris: false,
              // @ts-ignore
              RmfolioRc: responseFromContractArray.data!.data?.RCDetail[0],
              imperialTotalRate: this.imperialTotalRate
            })
          }

          this.loadingButton = false

          if (hasChrimasBonus) {
            this.bookingStoreInstance.setFolioForProvitional(this.rmFolio!.Folio)
            this.bookingStore.toggleXmasModal()
            this.loadingButton = false
          } else if (nightsBetweenWeek52 > 0 && !hasChrimasBonus) {
            await this.desPreAssing()
            this.$nuxt.$router.push({path: '/booking/roomGuests'})
            this.loadingButton = false
          } else {
            // await this.desPreAssing();
            // LLAMAR A GET CONTRAT BY PROMOTION ARRAY
            this.bookingStoreInstance.setFolioForProvitional(this.rmFolio!.Folio)
            this.$nuxt.$router.push({path: '/booking/roomGuests'})
            this.loadingButton = false
          }

          this.cacheValue(value)
          this.loadingButton = false
        } else {
          this.loadingButton = false
          this.$nuxt.$router.push({path: '/booking/roomGuests'})
        }

        this.xmasModalProps = {
          loading: false,
          provisionDetail: selectedRadio.labelText, //'1 Gold Week PR - Exp. date Aug 23, 2022 +',
          provitionAmount: selectedRadio.price,
          provitionAmountCurrency: 'USD'
        }

        // this.bookingStore.toggleXmasModal()
        this.loadingButton = false
        this.cacheValue(value)
        return
      }

      const validImperial = await this.bookingStoreInstance.validateImperial(
        selectedRadio.provitionExpiration
      )
      if (!!validImperial) {
        this.$toasted.info(this.$t('invalidImperialDate ') as string, {
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

        this.clearRejectedRoom(clearedValue)
        return
      }
    }

    if (value.selectedOption?.code !== BookingCategoryStatus.IMP_WEEKS) {
      await this.bookingStoreInstance.selectedRoomToReservate({
        room: value,
        imperialFee: 0,
        imperialLeblancFee: 0,
        week52Fee: 0,
        extraFee: 0,
        isChris: false,
        RmfolioRc: null,
        imperialTotalRate: this.imperialTotalRate
      })
    }

    if (responseSemana52 && value.selectedOption?.code !== BookingCategoryStatus.IMP_WEEKS) {
      this.$toasted.info(this.$t('week52DoesNotApply') as string, {
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

      this.clearRejectedRoom(clearedValue)
      return
    }

    if (value.selectedOption?.code === BookingCategoryStatus.REFERIDO) {
      if (!this.minStayREf) {
        this.$toasted.info(this.$t('minimunStayRule') as string, {
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
        this.loadingButton = false
        this.clearRejectedRoom(clearedValue)
        return
      }
    }

    if (value.selectedOption?.code === BookingCategoryStatus.REFERIDO) {
      if (!this.minStayREf) {
        this.$toasted.error(this.$t('minimunStayRule') as string, {
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
        this.loadingButton = false
        this.clearRejectedRoom(clearedValue)
        return
      }
    }

    const referralMinPaxRule = await this.bookingStoreInstance.validateReferralCompaions(
      PipelinesEnum.REFERRAL_MIN_PAX
    )

    if (!referralMinPaxRule) {
      this.$toasted.info(this.$t('adultsRequiredFoReferral') as string, {
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

      this.clearRejectedRoom(clearedValue)
      return
    }

    const wholesalerRestrictedReservationRule =
      await this.bookingStoreInstance.validateWholesalerRestricted(
        PipelinesEnum.WHOLESALER_RESERVATIONS_RESTRICTED
      )

    if (wholesalerRestrictedReservationRule) {
      this.$toasted.info(this.$t('notAvailableForWholesalers') as string, {
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
      this.clearRejectedRoom(clearedValue)
      return
    }

    if (
      this.isAvailableAnniversaryProv() &&
      value.selectedOption?.code === BookingCategoryStatus.ANIVERSARIO
    ) {
      this.$toasted.info(this.$t('noAnniversaryOptionsAvailable') as string, {
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
      this.clearRejectedRoom(clearedValue)
      this.loadingButton = false
      return
    }

    if (
      this.isAvailableIncentiveProv() &&
      value.selectedOption?.code === BookingCategoryStatus.INCENTIVA
    ) {
      this.$toasted.info(this.$t('noIncentiveOptionsAvailable') as string, {
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
      this.clearRejectedRoom(clearedValue)
      this.loadingButton = false
      return
    }

    this.bookingStoreInstance.saveRooms()
    this.loadingButton = false
    await this.$nuxt.$router.push({path: '/booking/roomGuests'})
  }

  lockWithoutImperials = true

  async selectedRateOnClick(selectedCode: string, category: AccessibleCategories) {
    this.loadingImperials = true
    if (
      selectedCode === BookingCategoryStatus.IMP_WEEKS &&
      this.getImperials[category.RealCode] === undefined
    ) {
      try {
        await this.bookingStoreInstance.fetchImperialProvitions(category)
        this.lockWithoutImperials = false
      } catch (e) {
        this.lockWithoutImperials = true
        showToast({
          context: this,
          message: this.$t('Imperial reservation no available please contact callcenter') as string
        })
      }
    }

    this.loadingImperials = false
  }

  getContractByPromotionArray(
    roomCode: string,
    reservationType: number,
    isRefundable: boolean,
    productId: string = '',
    promotionId: string = '',
    provisionType: string = '',
    golfType: string = 'AINC'
  ) {
    const {checkIn, checkOut, propertyCode} = this.bookingStoreInstance.getBooking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

    const currentRoomInfo =
      this.bookingStoreInstance.reservationInfo[this.bookingStoreInstance.roomIndex]

    return this.reservationRepository.getContractByPromotion({
      adult: currentRoomInfo.roomsPax.adults,
      afilliation: this.authStore.user!._UserMember._application,
      checkInEpoch: toEpochTimeStamp(checkIn),
      checkOutEpoch: toEpochTimeStamp(checkOut),
      child: currentRoomInfo.roomsPax.children,
      company: this.authStore.user!._UserMember._company,
      hotelCode: propertyCode,
      isLockOff: false,
      isNational: this.authStore.user!._UserMember._isnational,
      market: this.$nuxt.$pinia.state.value.authStore.user._Market,
      productId,
      promotionId,
      provisionType,
      isRefundable,
      nights,
      reservationType,
      roomCode,
      golfType,
      promotions: this.bookingStoreInstance.specialRatesPromotion
    })
  }

  golfType(provision: InfoMemberProvision): string {
    const inluded = provision.ULG_INCLUDE === 'Y'
    const amount = provision.ULG_AMOUNT
    const additionalPayment: boolean =
      provision.ULG_ADDITIONAL_PAYMENT === undefined ? false : provision.ULG_ADDITIONAL_PAYMENT
    const hasAmount = amount !== undefined && amount !== 0
    const withPayment = additionalPayment || hasAmount

    // AINC
    if (!inluded) {
      return 'AINC'
    }
    // ULG
    if (inluded && withPayment) {
      return 'ULGW'
    }
    // ULGW
    if (inluded && !withPayment) {
      return 'ULG'
    }

    return 'AINC'
  }

  getTotalXmasAmount(rcDetail: RCDetail) {
    return rcDetail.RmfolioRc.reduce(
      (previousValue, currentValue) => {
        return {
          AmountWeek52: previousValue.AmountWeek52 + currentValue.AmountWeek52,
          AmountChargeUpgrade: previousValue.AmountChargeUpgrade + currentValue.AmountChargeUpgrade,
          AmountOutOfSeason: previousValue.AmountOutOfSeason + currentValue.AmountOutOfSeason,
          AmountPromotion: previousValue.AmountPromotion + currentValue.AmountPromotion,
          AmountResortAccess: previousValue.AmountResortAccess + currentValue.AmountResortAccess,
          AmountThanksGivingDay:
            previousValue.AmountThanksGivingDay + currentValue.AmountThanksGivingDay,
          Rate: previousValue.Rate + currentValue.Rate,
          AditionalCharges: previousValue.AditionalCharges + currentValue.AditionalCharges,
          AdditionalCost: previousValue.AdditionalCost + currentValue.AdditionalCost
        }
      },
      {
        AmountWeek52: 0,
        AmountChargeUpgrade: 0,
        AmountOutOfSeason: 0,
        AmountPromotion: 0,
        AmountResortAccess: 0,
        AmountThanksGivingDay: 0,
        Rate: 0,
        AditionalCharges: 0,
        AdditionalCost: 0
      }
    )
  }

  roomDetailProps({category, index}: RoomDetailProps) {
    return {
      index,
      ...this.mapCategoryToProps(category),
      selectedCategory: category,
      button: {label: 'TODO'},
      changeRoomText: 'TODO',
      creditLimit: this.getResortCredits(),
      endTimeOffer: date,
      lastRoomsTextLeft: 'Last',
      lastRoomsTextRight: 'rooms',
      lockDescription: 'TODO',
      lockText: 'TODO',
      maxRoomText: 'MAX',
      publicRateText: 'Public Rate',
      ratesTitle: 'Daily Rates',
      refundRateOptions: this.refundRateOptions(),
      resortCreditText: 'Resort Credit',
      selectRoomButtonText:
        this.bookingStoreInstance.getBooking.rooms.length > 1
          ? `SELECT ROOM #${this.bookingStoreInstance.currentRoom + 1}`
          : 'SELECT ROOM',
      textOffer: 'offer ends',
      totalNights: 7,
      upToText: 'Up to',
      isOffer: false,
      code: category.RealCode,
      isLockOff: category.isLockOff
    }
  }

  mapCategoryToProps(category: AccessibleCategories): any {
    // TODO: set new namingConvention for RoomArea
    let lockByAccess = false

    if (LockOffRoomAccessCode.includes(category.RealCode)) {
      lockByAccess = !category.haveAccess!
    }

    const isPresidentialFirstPart =
      LockOffRoomAccessCode.includes(category.RealCode) && !category.isLockOff
    const hasMinAdultPax =
      this.bookingStore.reservationInfo[this.bookingStore.roomIndex].roomsPax.adults >= 2
    const lockByPresidentialMinPax = isPresidentialFirstPart ? !hasMinAdultPax : false

    // @ts-ignore
    return {
      area: category.sizeRoom ?? '',
      code: category.code,
      images: category.images,
      items: this.foldableContent(category.items),
      max: category.CLVRoomTypeCategory.max_occupancy,
      title: category.title,
      tour: category.tour,
      lockByImperialsNotFound: this.lockWithoutImperials,
      lock: this.isLockByPax(category) || lockByAccess || lockByPresidentialMinPax
    }
  }

  foldableContent(categoryItem: AccessibleCategories['items']): CategoryMapped['items'] {
    return categoryItem.map(item => {
      return {
        appendIcons: item.appendIcons,
        content: this.itemToTemplate(item.content.contentLeft, item.content.contentRight),
        header: item.header
      }
    })
  }

  itemToTemplate(contentLeft: string, contentRight: string): string {
    return `
      <div class="pe-grid md:pe-grid-cols-2 pe-w-full pe-gap-x-11">
        <div class="col-md-6 [&>ul]:pe-list-disc">
         ${contentLeft}
        </div>
        <div class="col-md-6 [&>ul]:pe-list-disc">
          ${contentRight}
        </div>
      </div>
    `
  }

  isLockByPax(category: AccessibleCategories) {
    return this.isLockByRoom(this.bookingStoreInstance.roomIndex, category)
  }

  isLockByRoom(index: number, category: AccessibleCategories): boolean {
    const {adults, children, childrenages, infants} =
      this.bookingStoreInstance.getBooking.roomsCopy[index]

    // eslint-disable-next-line camelcase
    const {max_children, max_occupancy} = category.CLVRoomTypeCategory

    return isLockOffRoom(adults, infants, max_children, max_occupancy)
  }

  refundRateOptions(): RefundRateOptions[] {
    const randomName = this.generateId('radio')
    let options = [
      {
        id: 'refundable',
        name: randomName,
        labelText: 'Fully refundable'
      }
    ]
    if (!this.isBaglioniBooking) {
      options.push({
        id: 'nonRefundable',
        name: randomName,
        labelText: 'Non-refundable'
      })
    }
    return options
  }

  getResortCredits() {
    const {checkIn, checkOut} = this.bookingStoreInstance.getBooking

    const totalNights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const resortCredits = this.resortCreditStore.calcResortCredits(totalNights)
    if (this.$root.$options.filters) {
      return this.$root.$options.filters.currency_no_decimals(resortCredits)
    }
    return resortCredits
  }

  isAvailableAnniversaryProv(): boolean {
    return !this.anniversaryProvisionsAvailable || this.anniversaryProvisionsAvailable.length <= 0
  }

  isAvailableIncentiveProv(): boolean {
    return !this.incentiveProvisionsAvailable || this.incentiveProvisionsAvailable.length <= 0
  }

  get provisionTitleClasses() {
    return ['my-8', 'font-semibold', 'uppercase', 'text-white', 'text-center md:text-left']
  }

  get provisionContainerClasses() {
    return ['my-4', 'max-h-[250px]', 'overflow-y-scroll']
  }

  get referralPromotionSelected() {
    if (this.promos.length) {
      return this.promos[0].PromotionsBenefits?.filter((item: any) => {
        return item.Benefit === this.selectedPromotion
      })[0]
    }
  }

  get isSocioMoroso(): boolean | null | undefined {
    return this.dashboardStore.isSocioMoroso
  }

  get isBaglioniBooking() {
    return baglioniCodes.includes(this.bookingStore.getBooking.propertyCode)
    // return this.bookingStore.getBooking.propertyCode
  }

  @Watch('referralPromotionSelected', {immediate: true})
  onPromotionChange(value: any) {
    if (value) this.bookingStoreInstance.setReferralPromotion(value)
  }

  getSocioMoroso() {
    this.dashboardStore.getSocioMoroso({
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

  get incentiveToDisplay() {
    if (this.incentiveProvisions !== null && this.incentiveProvisions !== undefined) {
      const booking = this.bookingStoreInstance.getBooking
      const hotelCode = booking.propertyCode
      const market = this.bookingStoreInstance.userInfo._Market
      // const market = 'UK'
      const nightsToBook = selectedNightsFromStrDates(booking.checkIn, booking.checkOut)
      this.provisionStore.computeAvailableIncentiveProvitions(
        this.incentiveProvisions,
        hotelCode,
        nightsToBook,
        market
      )
    }
    return
  }

  mounted() {
    const a = this.anniversaryToDisplay
    const b = this.incentiveToDisplay
  }
}
</script>
