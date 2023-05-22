<template>
  <div>
    <PERoomSummaryCard
      v-bind="roomSummaryProps"
      @removeRoom="removeRoom"
    ></PERoomSummaryCard>

    <div class="pe-bg-black-light pe-rounded">
      <h1 class="pe-uppercase pe-text-white pe-text-2xl pe-serif pe-px-10 pe-pt-10">Room Guests</h1>

      <div
        v-if="showLoading"
        class="pe-flex pe-items-center pe-justify-center pe-h-screen"
      >
        <PELoadingData />
      </div>
      <div
        v-else
        class="pe-grid pe-gap-10 pe-grid-cols-1 md:pe-grid-cols-2 pe-pt-5 pe-pb-10 pe-px-10"
      >
        <div
          v-for="(guest, index) in selectedCompanions"
          :key="getKey('selectedGuest', index)"
        >
          <PEGuestsSelect
            :id="getKey('selectedGuest', index)"
            v-model="selectedCompanions[index]"
            :label="getLabel(index)"
            :closable="closable(index)"
            :items="companions"
            :custom-validation="customValidation"
            @close="removeSelectedCompanion(index)"
            @newCompanion="openNewCompanionForm(index)"
            @selectOpened="onFocus(index)"
          />
        </div>
      </div>
      <div
        v-if="false"
        class="pe-px-10 pe-pb-10"
      >
        <p-e-button
          :disabled="disableAddGuest"
          :without-border="true"
          class="!pe-py-1.5 pe-text-blue-light"
          @click="addGuestSelection"
        >
          <p-e-icon
            class="pe-text-blue-light mr-2"
            size="24px"
            >circle-plus</p-e-icon
          >
          <span class="!pe-text-white"> Add Another Guest </span>
        </p-e-button>
      </div>
      <div v-if="showNewCompanionForm">
        <PEFormNewCompanion
          @saveNewCompanion="addNewCompanionToCatalog"
          @cancelNewCompanion="cancelNewCompanion"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import dayjs from 'dayjs'
import PERoomSummaryCard from '~/src/ui/components/RoomSummaryCards/PERoomSummaryCard.vue'
import PEGuestsSelect from '~/src/ui/components/BookingPage/PEGuestSelect.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'
import PEFormNewCompanion from '~/src/ui/components/BookingPage/PEFormNewCompanion.vue'
import {AccessibleCategories} from 'app/category/domain/mapper/AccesibleCategories'
import {CategoryMapped} from '~/interfaces/Booking/Category.interface'
import {GetOwnersAdapter} from 'app/owners/domain/adapters/getOwnersAdapter'
import {MembershipTable} from 'app/common/domain/entities/membershipTable'
import {BeneficiaryStore} from '~/src/ui/store/beneficiaryStore'
import {UseAuth} from '~/src/ui/store/auth'
import {GetGuestsAdapter} from 'app/guests/domain/adapters/getGuestsAdapter'
import {CountryStore} from '~/src/ui/store/countryStore'
import {usdFormatter} from 'app/common/mapper/moneyFormatters'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {RoomsPax} from 'app/booking/domain/entities/reservationInfo'
import {GuestsStore} from '~/src/ui/store/guestsStore'
import {container} from '~/src/container'
import GetGuestsUseCase from 'app/guests/application/getGuestsUseCase'
import guestsTypes from 'app/common/types/guestsTypes'
import ContractByPromotionServiceRepository from 'app/contractByPromotion/domain/repositories/contractByPromotionServiceRepository'
import contractByPromotionTypes from 'app/common/types/contractByPromotionTypes'
import GetContractByPromotionArrayStore from '~/src/ui/store/booking/getContractByPromotionArrayStore'
import {PayLinkStore} from '~/src/ui/store/payLinkStore'

@Component({
  name: 'RoomGuests',
  scrollToTop: true,
  components: {
    PERoomSummaryCard,
    PEGuestsSelect,
    PEFormNewCompanion
  }
})
export default class RoomGuests extends Vue {
  bookingStore = new BookingStore()

  authStore = new UseAuth()

  beneficiaryStore = new BeneficiaryStore()

  getOwnersAdapter = new GetOwnersAdapter()

  getGuestsAdapter = new GetGuestsAdapter()

  countryStore = new CountryStore()

  getContractByPromotionStore = new GetContractByPromotionArrayStore()

  showNewCompanionForm = false

  selectingNewGuest = false

  ownersCatalog: MembershipTable[] = []

  beneficiariesCatalog: MembershipTable[] = []

  guestsCatalog: MembershipTable[] = []

  selectedCompanions: MembershipTable[] = []

  roomPax = {} as RoomsPax

  addedCompanions: MembershipTable[] = []

  currentAddingIndex: number | null = null

  currentValueOpened: MembershipTable | null = null

  allGuests: MembershipTable[] = []

  fullCatalog!: MembershipTable[]
  fullCatalogOmitSelected: MembershipTable[] = []

  showLoading: boolean = false

  guestStore = new GuestsStore()

  contractByPromotionServiceRepository = container.get<ContractByPromotionServiceRepository>(
    contractByPromotionTypes.ContractByPromotionRepository
  )

  async mounted() {
    this.showLoading = true
    await Promise.all([
      this.fetchCountries(),
      this.loadOwners(),
      this.getBeneficiaries(),
      this.loadGuests()
    ]).then(() => {
      this.showLoading = false
    })

    this.getCompanionsAvailables()

    this.selectedCompanions = Array(this.totalGuests).fill(null)
    this.roomPax = this.bookingStore.reservationInfo[this.currentRoomIndex].roomsPax
  }

  get allGuestsInReservation() {
    this.allGuests = [...this.bookingStore.allGuestsInReservation, ...this.allGuests]
    console.log(this.allGuests)
    return this.allGuests
  }

  onFocus(val: any) {
    this.currentValueOpened = this.selectedCompanions[val]
  }

  get companions() {
    const companionsInAnotherRooms: string[] = []

    const selectedCompanionsWithoutsNulls = this.selectedCompanions.filter(item => item !== null)

    let companionsAvailablesInTheRoom = this.fullCatalogOmitSelected.filter(fullCatalogOmitItem => {
      return (
        selectedCompanionsWithoutsNulls.find(
          selectedCompanion => selectedCompanion.name === fullCatalogOmitItem.name
        ) === undefined
      )
    })

    this.bookingStore.reservationInfo.forEach((room, index) => {
      if (index !== this.currentRoomIndex) {
        room.guests.forEach(guest => {
          if (guest !== undefined) companionsInAnotherRooms.push(guest.name)
        })
      }
    })

    companionsAvailablesInTheRoom = companionsAvailablesInTheRoom.filter(companion => {
      if (companionsInAnotherRooms.includes(companion.name)) {
        return false
      } else {
        return true
      }
    })

    return companionsAvailablesInTheRoom || []
  }

  getCompanionsAvailables() {
    this.fullCatalog = [
      ...this.ownersCatalog,
      ...this.beneficiariesCatalog,
      ...this.guestsCatalog,
      ...this.addedCompanions
    ]

    const selectedCompanionsIds = new Set(
      this.allGuests.map(
        person => `${person?.memberUtils.firstname} ${person?.memberUtils.lastname}`
      )
    )

    const filterAlreadyInUse = this.fullCatalog?.filter(
      person => !selectedCompanionsIds.has(this.fullName(person))
    )

    const isOnList = filterAlreadyInUse?.find(item => {
      return (
        this.fullName(item).toUpperCase() === this.fullName(this.currentValueOpened).toUpperCase()
      )
    })

    if (this.currentValueOpened !== null && !isOnList) {
      filterAlreadyInUse.push(this.currentValueOpened)
    }

    this.fullCatalogOmitSelected = this.sortingCompanions(filterAlreadyInUse)

    return this.fullCatalogOmitSelected
  }

  fullName(companion: MembershipTable | null) {
    return companion !== null
      ? `${companion?.memberUtils.firstname} ${companion?.memberUtils.lastname}`
      : ''
  }

  sortingCompanions(array: MembershipTable[]) {
    return array?.sort((a, b) => {
      if(a.memberUtils.role === 'owner' || b.memberUtils.role === 'owner') return 1
      if(a.memberUtils.role === 'beneficiary' || b.memberUtils.role === 'beneficiary') return 1

      const nameA = `${a.memberUtils.firstname} ${a.memberUtils.lastname}`.toUpperCase()
      const nameB = `${b.memberUtils.firstname} ${b.memberUtils.lastname}`.toUpperCase()

      if (nameA < nameB) return -1

      return 1
    })
  }

  get disableAddGuest() {
    return (
      this.roomPax.adults + this.roomPax.children >= this.maxRoomGuests ||
      this.selectingNewGuest ||
      // @ts-ignore
      this.selectedCompanions.includes(null)
    )
  }

  get currentRoomIndex() {
    return this.bookingStore.currentRoomIndex
  }

  get currentRoomData() {
    return this.bookingStore.reservationInfo[this.currentRoomIndex]
  }

  get maxRoomGuests() {
    return this.currentRoomData?.roomSelected?.selectedCategory.max || 1
  }

  get totalGuests() {
    return this.currentRoomData?.roomsPax?.adults + this.currentRoomData?.roomsPax?.children
  }

  async fetchCountries() {
    await this.countryStore.fetchCountries()
  }

  public async loadOwners() {
    this.ownersCatalog = await this.getOwnersAdapter.getOwners()
    this.bookingStore.ownersMembers = this.ownersCatalog
  }

  async getBeneficiaries() {
    await this.beneficiaryStore.getBeneficiaries({
      application: this.authStore.userAffiliationId,
      company: this.authStore.userCompany,
      isNational: this.authStore.isNational
    })

    this.beneficiariesCatalog = this.beneficiaryStore.readBeneficiaries
  }

  async loadGuests() {
    this.guestsCatalog = await this.getGuestsAdapter.getGuests()
  }

  removeRoom() {
    this.bookingStore.removeRoomByIndex(this.currentRoomIndex)
    this.$nuxt.$router.push(this.localePath('/booking/categorySelector'))
  }

  customValidation(item: MembershipTable) {
    return this.referralValidation(item)
  }

  referralValidation(item: MembershipTable) {
    if (
      this.bookingStore.reservationInfo[this.bookingStore.currentRoomIndex].roomSelected
        ?.selectedOption?.id === 5
    ) {
      if (
        this.bookingStore.referralPromotion?.Benefit === 'UC' ||
        this.bookingStore.referralPromotion?.Benefit === 'RC'
      ) {
        return [1, 2, 3].includes(item.memberUtils.relationship)
      }

      return [1, 2, 3].includes(item.memberUtils.relationship) || item.memberUtils?.InReferral === 1
    }

    return false
  }

  addGuestSelection() {
    // @ts-ignore
    this.selectedCompanions.push(null)
  }

  openNewCompanionForm(index: number | null = null) {
    if (index !== null) this.currentAddingIndex = index
    this.showNewCompanionForm = true
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  @Watch('selectedCompanions')
  setCompanions(selectedCompanions: MembershipTable[]) {
    this.bookingStore.updateSelections(this.bookingStore.currentRoomIndex, selectedCompanions)
    const total = this.selectedCompanions?.filter(item => item !== null)
    const adultsCompanions = total.filter(companion => companion.memberUtils.isAdult)
    const adults = adultsCompanions.length
    const children = total.length - adults
    this.roomPax = {
      adults,
      children
    }
  }

  setCompanionsInSelectPayment(selectedCompanions: MembershipTable[]) {
    let selects = selectedCompanions.map(guest => {
      if (guest !== null) {
        let data = guest.tableData.map((item: any) => {
          return item.data.filter((itemData: any) => itemData.title === 'email')
        })

        data = data.filter((item: any) => item !== undefined && item.length !== 0)

        if (data.length > 0)
          return {
            name: guest.name,
            email: data[0][0].value
          }
      }
    })

    selects = selects.filter((detail: any) => ![undefined, null].includes(detail))

    if (selects.length > 0) {
      //@ts-ignore
      this.paylinkStore.guestPaylink = selects
    }
  }

  selectThisCompanion(companion: MembershipTable) {
    this.selectedCompanions[this.currentAddingIndex ?? 0] = companion
    this.currentAddingIndex = null
  }

  async addNewCompanionToCatalog(companion: MembershipTable) {
    const store = new GetGuestsAdapter()

    const useCase = container.get<GetGuestsUseCase>(guestsTypes.getGuestsUseCase)

    const result = await useCase.run({
      params: {
        // @ts-ignore
        application: this.authStore.user?._UserMember._application,
        company: this.authStore.user!._UserMember._company,
        isNational: this.authStore.user!._UserMember._isnational
      }
    })

    // @ts-ignore
    this.guestStore.guests = result.data.data
    this.guestStore.guestsTables = store.mapGuestses(this.guestStore.guests)

    // console.log({companion})
    const resultCompanion = this.guestStore.guestsTables.find(item => item.name === companion.name)!
    // console.log({resultCompanion})

    if (companion) {
      this.showNewCompanionForm = false
      this.addedCompanions.push(resultCompanion)
      this.fullCatalogOmitSelected = [...this.fullCatalogOmitSelected, resultCompanion]
      this.currentValueOpened = resultCompanion
      this.selectThisCompanion(resultCompanion)
      this.setCompanions(this.selectedCompanions)
      this.setCompanionsInSelectPayment(this.selectedCompanions)
    }
  }

  removeCompanion() {
    const selectedCompanions = this.bookingStore.reservationInfo[this.currentRoomIndex].guests

    if (selectedCompanions) {
      selectedCompanions.map(companionSelected => {
        const indexOfObject = this.fullCatalogOmitSelected?.findIndex(companion => {
          if (companion)
            return companion.memberUtils?.email === companionSelected?.memberUtils?.email
        })

        if (indexOfObject !== -1 || indexOfObject !== undefined) {
          this.fullCatalogOmitSelected?.splice(indexOfObject, 1)
        }
      })
    }
  }

  removeSelectedCompanion(index: number) {
    this.selectedCompanions.splice(index, 1)
    this.cancelNewCompanion()
    // const roomPax = this.bookingStore.reservation[this.currentRoomIndex].roomsPax
    // if (index <= roomPax.adults - 1) {
    //   this.bookingStore.removeGuest(this.currentRoomIndex, 'adults')
    // } else {
    //   this.bookingStore.removeGuest(this.currentRoomIndex, 'children')
    // }
  }

  cancelNewCompanion() {
    this.showNewCompanionForm = false
  }

  get totalPax() {
    return (
      this.bookingStore.bookingRooms[this.currentRoomIndex].adults +
      this.bookingStore.bookingRooms[this.currentRoomIndex].children -
      1
    )
  }

  closable(index: number) {
    return index > this.totalPax
  }

  getLabel(index: number) {
    return index !== 0 ? 'Select Companion' : 'Main Guest'
  }

  getKey(name: string, index: number) {
    return name + index
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

  get totalNights() {
    const {checkIn, checkOut} = this.bookingStore.getBooking
    return selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
  }

  concatRoomArea(item: any) {
    if (item === undefined) {
      return ''
    }
    if ('RoomArea' in item) {
      if (item.RoomArea?._area) {
        return `${item.RoomArea._area} ${item.RoomArea._unit_code}`
      }

      return 'NOT AVAILABLE'
    }
    return '--'
  }

  get isImperial() {
    return !!this.currentRoomData?.roomSelected?.isImperial
  }

  get imperialData() {
    return this.currentRoomData?.roomSelected?.imperialPublicRatesData
  }

  get publicRate() {
    return this.isImperial
      ? this.imperialData?.publicRate || '--'
      : // @ts-ignore
        usdFormatter.format(this.currentRoomData?.roomSelected?.selectedOption?.regularRate) || '--'
  }

  get totalRate() {
    return this.isImperial
      ? this.imperialData?.totalRate || '--'
      : // @ts-ignore
        usdFormatter.format(this.currentRoomData?.roomSelected?.selectedOption?.rate) || '--'
  }

  get roomSummaryProps() {
    return {
      max: this.currentRoomData?.roomSelected?.selectedCategory.max_pers,
      area: this.concatRoomArea(this.currentRoomData?.roomSelected?.selectedCategory),
      creditLimit: this.currentRoomData?.roomSelected?.creditLimit,
      publicRate: this.publicRate,
      totalRate: this.totalRate,
      images: this.currentRoomData?.roomSelected?.selectedCategory.images,
      icon: true,
      title: this.currentRoomData?.roomSelected?.selectedCategory?.title,
      items: this.foldableContent(
        this.currentRoomData?.roomSelected?.selectedCategory?.items || []
      ),
      totalNights: this.totalNights,
      source: this.currentRoomData?.roomSelected?.selectedCategory.tour,
      button: {
        label: 'Remove room'
      }
    }
  }

  getContractByPromotionArray() {
    const payload = this.getContractByPromotionStore.getContractByPromotionArrayPayload({
      index: this.bookingStore.currentRoomIndex
    })

    return this.contractByPromotionServiceRepository.getContractByPromotion(payload)
  }

  @Watch('selectedCompanions', {deep: true})
  async onSelectedCompanionsChange() {
    const mainGuest: MembershipTable | null = this.selectedCompanions[0] || null

    const selectedRoom = this.bookingStore.reservationInfo[this.bookingStore.currentRoomIndex]

    if (mainGuest && selectedRoom && selectedRoom?.roomSelected?.isImperial) {
      const {data} = await this.getContractByPromotionArray()
      // @ts-ignore
      this.bookingStore.reservationInfo[this.bookingStore.currentRoomIndex].imperialTotalRate = {
        // @ts-ignore
        ...this.getContractByPromotionStore.getTotalImperialAmounts(data!.data.RCDetail[0]),
        imperialFee: selectedRoom.imperialTotalRate?.imperialFee,
        imperialLeblancFee: selectedRoom.imperialTotalRate?.imperialLeblancFee
      }
    }
  }
}
</script>

<style scoped></style>
