<template>
  <PECBTemplate
    :photo="photo"
    :description="description"
    :capacity-text="capacityText"
    :chip-text="getchipText"
    :more-details="moreDetails"
    :price="price"
    :title="title"
    :units="totalUnits"
    :is-button-enabled="canToggleTransportation || totalUnits > 0"
  >
    <template #interaction>
      <div class="pe-my-1 pe-flex pe-w-fit pe-flex-col pe-bg-black pe-rounded-[10px]">
        <div
          class="w-full p-5"
          v-show="showTitle"
        >
          {{ interactionTitle }}
        </div>
        <div v-if="hasElegibleRoomsWithRate">
          <div
            v-for="(room, index) in roomsInternal"
            :key="index"
          >
          </div>
          <div
            v-for="(room, index) in externalRoomsMutable"
            :class="counterContainerClass(index, room)"
          >
            <template v-if="getRoomVisibility(room)">
              <PECheckbox
                class="pe-flex pe-my-1 pe-items-center pe-justify-start"
                :ref="`item-${benefitId}-${externalRoomsMutable[index].id}`"
                :name="`item-${benefitId}-${externalRoomsMutable[index].id}`"
                :disabled="isDisabled(room)"
                :value="isSelected(externalRoomsMutable[index].id)"
                @input="resetUnits($event, externalRoomsMutable[index])"
              >
                {{ formatTitle(externalRoomsMutable[index]) }}
                <br />
                <span
                  class="pe-text-xs pe-text-white"
                  v-if="isGolf"
                >
                  {{ golfPrice(externalRoomsMutable[index]) }}
                </span>
              </PECheckbox>
              <div
                class="Units-counter pe-my-1 pe-flex pe-items-center pe-justify-start"
                v-if="validateRef(externalRooms[index].id)"
              >
                <div class="pe-w-[1.875rem] pe-mr-5 pe-h-[1.875rem]"></div>
                <PECounter
                  v-model="roomsInternal[externalRoomsMutable[index].id]"
                  :start="roomsInternal[externalRoomsMutable[index].id]"
                  :min="1"
                  :max="1"
                  :step="1"
                  variant="circle"
                  @input="onInteract"
                />
                <span class="pe-ml-[10px]">{{ unitsNameDisplayed }}</span>
              </div>
            </template>
          </div>
        </div>
        <div
          v-else
          class="!pe-bg-black-light p-5 pe-border-b pe-border-black pe-rounded-b-[10px]"
        >
          <p>
            {{ noRoomsAvailable }}
          </p>
        </div>
      </div>
    </template>
  </PECBTemplate>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import PECBTemplate from './PECBTemplate.vue'
import {
  ExternalRooms,
  EmitedSelectedBookingBenefits,
  Price
} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import i18n from '~/src/ui/i18n/booking/bookingBenefits/bookingBenefits.lang'
import {BookingBenefitStore} from '~/src/ui/store/strapi/bookingBenefitsStore'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import {
  TransportDetail,
  NotRequired,
  TransportationUnits
} from '~/src/app/bookingBenefits/domain/entities/bookingBenefitCard'
import {EliteProductRuleEntity} from '~/src/app/bookingBenefits/domain/entities/rules/EliteProductRuleEntity'
import {BookingGolfStore} from '~/src/ui/store/booking/bookingGolfStore'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {UseAuth} from '~/src/ui/store/auth'
import {GuestRelationship} from '~/src/app/filldatareservation/domain/data/GuestRelationship'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import dayjs from 'dayjs'
import {evaluateDefaultTransportation} from '~/src/ui/utils/evaluate/defaultTransportation'
import { TrasportationType } from '~/src/app/bookingBenefits/domain/entities/TypeValidationsUtils'

@Component({
  name: 'PECardTransportDetail',
  i18n,
  components: {
    PECBTemplate
  }
})
export default class PECardTransportDetail extends Vue implements TransportDetail {
  // region Props
  @Prop({type: String, required: false})
  readonly benefitId!: string

  @Prop({type: Boolean, required: false})
  readonly chipText!: boolean

  @Prop({type: String, required: false})
  readonly capacityText!: NotRequired<string>

  @Prop({type: String, required: false})
  readonly description!: NotRequired<string>

  @Prop({type: String, required: true})
  readonly moreDetails!: string

  @Prop({type: String, default: 'https://via.placeholder.com/420x232.jpeg'})
  readonly photo!: string

  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: Number, required: true, default: 100})
  readonly maxUnits!: number

  @Prop({type: Boolean, default: true})
  dependsOnOcupation!: boolean

  @Prop({type: Boolean, default: false})
  readonly isGolf!: boolean

  @Prop({type: Array, default: () => []})
  readonly roomBenefits!: any[]

  @Prop({
    type: Object,
    default: (): Price => {
      return {
        currency: 'USD',
        description: 'Price per unit',
        price: 0,
        freeText: 'Undefined Price'
      }
    }
  })
  readonly price!: Price

  @Prop({type: Array, required: true})
  readonly externalRooms!: ExternalRooms[]
  // endregion

  // region Data

  externalRoomsMutable: ExternalRooms[] = []

  startingCounterValue = TransportationUnits.Minimal

  bookingBenefitStore = new BookingBenefitStore()

  bookingGolfStore = new BookingGolfStore()

  bookingStore = new BookingStore()

  authStore = new UseAuth()

  priceInternal: Price = {
    currency: 'USD',
    description: 'Price per unit',
    price: 0,
    freeText: 'Undefined Price'
  }

  roomsInternal: Array<number> = []

  totalUnits = 0

  // endregion

  // region Life Cycle Hooks

  created() {
    if (process.client) {
      this.externalRoomsMutable = this.filterGolfRoomsMutable(structuredClone(this.externalRooms))
    }
    this.priceInternal = this.price
  }

  mounted() {
    //init roomsInternal with

    this.onSelectedBenefitsChange()
    this.setDefaultPrivateTransport()
    this.onInteract()
  }

  setDefaultPrivateTransport() {
    if (this.benefitId == '1') {
      const {checkIn, checkOut, propertyCode } = this.bookingStore.getBooking
      const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
      const market = String(this.authStore.userMarket)
      const memberLevel = this.authStore.memberLevel

      this.roomsInternal = this.externalRooms.map(room =>
         evaluateDefaultTransportation({
          memberLevel,
          whosTraveling: this.whosTraveling(room),
          traveledNights: nights,
          market,
          propertyCode
        })
      )
      
      this.updateTotalUnits()
    }
  }

  whosTraveling(room: ExternalRooms): GuestRelationship {
    return room.guests[0]?.memberUtils.isGuest ? GuestRelationship.Guest : GuestRelationship.Member
  }

  filterGolfRoomsMutable(externarlRooms: ExternalRooms[]): ExternalRooms[] {
    // Obtener roomBenefits del store
    // TODO: Terminar este método 23-11-2022
    return externarlRooms
  }

  @Watch('externalRooms', {deep: true})
  onExternalRoomsChange() {
    this.externalRoomsMutable = structuredClone(this.externalRooms)
  }

  @Watch('selectedBenefits')
  onSelectedBenefitsChange() {
    this.SelectedBenefits.forEach(benefit => {
      if (benefit.benefitId === this.benefitId) {
        benefit?.roomsData?.forEach(room => {
          this.roomsInternal[room?.id] = room?.units || 0
          if (this.isGolf) this.roomHasGolf(room)
        })
      }
    })
    this.updateTotalUnits()
  }

  updateTotalUnits() {
    this.totalUnits = this.roomsInternal.reduce((acc, room) => {
      return acc + room
    }, 0)
  }

  // get showPrice(): Price {
  //   this.externalRooms[0].imperialGolfType.golfType
  // }

  get SelectedBenefits() {
    return this.bookingBenefitStore.getSelectedBenefits
  }

  get reservationInfo() {
    return this.bookingStore.reservation
  }

  // endregion

  // region Computed
  get isFree(): boolean {
    return this.price.price <= 0
  }

  get unitsNameDisplayed(): string {
    return this.$t('units') as string
  }

  get getchipText(): string {
    const chipText = this.chipText ? (this.$t('recommended') as string) : ''
    return chipText
  }

  get interactionTitle(): string {
    return this.$tc('maximumPerUnit', this.maxUnits)
  }

  get showTitle(): boolean {
    return this.maxUnits > 1 && this.dependsOnOcupation
  }

  // get isGolf(): boolean {
  //   return this.bookingBenefitStore.getGolfproductIds.includes(this.benefitId)
  // }

  get hasElegibleRoomsWithRate(): boolean {
    return this.isGolf ? this.externalRoomsMutable?.some(room => this.validateGolfRoom(room)) : true
  }

  validateGolfRoom(room: ExternalRooms): boolean {
    const hasRate = this.roomHasGolf(room)
    return hasRate
  }

  get canToggleTransportation(): boolean {
    return !this.everyRoomHasTransportation() && this.totalUnits >= 0
  }

  everyRoomHasTransportation(): boolean {
    return this.reservationInfo.every(room => {
      return this.roomHasTransportation(room)
    })
  }

  roomHasTransportation(room: ReservationInfo): boolean {

    const trasportationUnits = [
      TrasportationType.privateTransportation,
      TrasportationType.privateVanTransportation,
      TrasportationType.PrivateVanXLTransportation
    ]

    return (
      room.benefits?.some(benefit => {
        return trasportationUnits.includes(benefit.benefitId as TrasportationType)
      }) || false
    )
  }

  get noRoomsAvailable(): string {
    return this.$t('no elegible rooms') as string
  }

  // endregion

  // region Methods

  resetUnits(isActive: boolean, room: ExternalRooms) {
    this.roomsInternal[room?.id] = isActive
      ? this.setStartValue(room, isActive)
      : TransportationUnits.Empty

    this.onInteract()
  }

  setStartValue(room: ExternalRooms, isActive: boolean = false): number {
    this.roomsInternal[room.id] = isActive
      ? this.findSelectedUnits(room.id)
      : TransportationUnits.Empty

    return this.roomsInternal[room.id]
  }

  findSelectedUnits(roomId: number): number {
    if (this.isGolf) {
      const room = this.SelectedBenefits.find(
        benefit => benefit.benefitId === this.benefitId
      )?.roomsData?.find(room => room?.id === roomId)
      return room?.units || 1
    }

    return (
      this.SelectedBenefits.find(benefit => benefit.benefitId === this.benefitId)?.roomsData?.find(
        roomData => roomData?.id === roomId
      )?.units || 1
    )
  }

  validateRef(roomID: number) {
    if (
      this.maxUnits <= 1 ||
      this.roomsInternal.length === 0 ||
      this.roomsInternal[roomID] === undefined ||
      !this.dependsOnOcupation
    ) {
      return false
    }

    try {
      if (this.roomsInternal[roomID] > 0) {
        return true
      }
    } catch (error) {
      console.error(error)
    }

    return false
  }

  formatTitle(room: ExternalRooms) {
    return `${this.$t('room')} ${room.id + 1} : ${room.namePax}.  ${this.$tc('pax', room.pax)}`
  }

  counterContainerClass(index: number, room: ExternalRooms) {
    const containerClass = {
      '!pe-bg-black-light p-5  ': true,
      'pe-border-b pe-border-black': index !== this.externalRoomsMutable.length - 1,
      'pe-rounded-b-[10px]': index === this.externalRoomsMutable.length - 1,
      'pe-rounded-t-[10px]': index === 0 && this.maxUnits <= 1
    }

    if (this.isGolf) return this.getRoomVisibility(room) ? containerClass : ''

    return containerClass
  }

  isSelected(index: number) {
    return this.roomsInternal[index] > 0
  }

  getRoomVisibility(room: ExternalRooms) {
    if (this.isGolf) return this.validateGolfRoom(room)
    return true
  }

  roomHasGolf(room: ExternalRooms) {
    const {reserveType} = room

    let hasGolf = false

    if (reserveType === BookingCategoryStatus.ANIVERSARIO) {
      hasGolf = room.roomSelected?.provisions?.anniversary?.hasGolf || false
    } else if (reserveType === BookingCategoryStatus.INCENTIVA) {
      hasGolf = room.roomSelected?.provisions?.incentive?.hasGolf || false
    } else {
      hasGolf = room.freeGolfPolicyWeeksCompliance || room.paidGolfPolicyWeeksCompliance
    }

    if (!hasGolf) {
      this.clearIfSelected(room)
    }

    return hasGolf
  }

  clearIfSelected(room: ExternalRooms) {
    if (this.roomsInternal[room?.id] > 0) {
      this.roomsInternal[room?.id] = 0
    }
  }

  golfPrice(room: ExternalRooms) {
    let golfRate = 0
    // TODO : change lang of costoProvision
    if (
      room.reserveType === BookingCategoryStatus.IMP_WEEKS ||
      room.reserveType === BookingCategoryStatus.ANIVERSARIO ||
      room.reserveType == BookingCategoryStatus.INCENTIVA
    ) {
      golfRate = room.costoProvision || 0
    } else {
      golfRate = room.costoElite || 0
    }

    return golfRate ? `${usdFormatter.format(golfRate)} ${this.price.currency}` : 0
  }

  get avaliableUnits() {
    return (
      this.bookingGolfStore.availableGolfCountDependingOnPolicy +
      this.bookingGolfStore.provisionRoomsWithGolf
    )
  }

  get selectedUnitsCount() {
    return this.totalUnits
  }

  get unitsLeft() {
    return Math.max(this.avaliableUnits - this.selectedUnitsCount, 0)
  }

  isDisabled(room: ExternalRooms) {
    if (this.isGolf) return this.unitsLeft <= 0 && this.roomsInternal[room?.id] === 0
    else
      return (
        this.roomHasTransportation(this.reservationInfo[room?.id]) && !this.isSelected(room?.id)
      )
  }

  // endregion

  // region Watch

  @Watch('price', {deep: true})
  onPriceChange(newVal: Price) {
    this.priceInternal = newVal
  }

  async evaluateGolfPolicy(reserveType: string): Promise<EliteProductRuleEntity> {
    const reEvaluatedPolicy = this.bookingGolfStore.evaluateGolfPolicy(
      reserveType,
      this.bookingGolfStore.paidGolfPolicies
    )

    return reEvaluatedPolicy
  }

  // endregion

  // region Emit
  @Emit()
  async onInteract() {
    const evaluateGolfPolicy = await Promise.all(
      this.roomsInternal?.map((room, index) => {
        return this.evaluateGolfPolicy(
          String(this.externalRoomsMutable[index].reserveType).toLowerCase()
        )
      })
    )
    // @ts-ignore
    const RoomData: Array<ExternalRooms> = await Promise.all(
      this.roomsInternal.map(async (room, index) => {
        if (room >= TransportationUnits.Minimal) {
          return {
            id: this.externalRoomsMutable[index].id,
            pax: this.externalRoomsMutable[index].pax,
            namePax: this.externalRoomsMutable[index].namePax,
            benefits: this.externalRoomsMutable[index].benefits,
            units: room,
            categoryId: this.externalRoomsMutable[index].categoryId,
            hasGolfCompliance: this.externalRoomsMutable[index].hasGolfCompliance,
            freeGolfPolicyWeeksCompliance:
              this.externalRoomsMutable[index].freeGolfPolicyWeeksCompliance,
            paidGolfPolicyWeeksCompliance:
              this.externalRoomsMutable[index].paidGolfPolicyWeeksCompliance,
            allInclusivePolicyWeeksCompliance:
              this.externalRoomsMutable[index].allInclusivePolicyWeeksCompliance,
            reserveType: this.externalRoomsMutable[index].reserveType,
            eliteProduct: evaluateGolfPolicy[index].events?.code || '',
            eliteProductType: evaluateGolfPolicy[index].events?.type || ''
          }
        }

        return null as any as ExternalRooms
      }) || []
    )

    this.updateTotalUnits()

    const amount = Math.round(this.price.price) * this.totalUnits

    //TODO: set the price based on bussines rules using golfRateByProducts
    const price = structuredClone(this.priceInternal)
    price.price = this.isGolf ? amount : 0
    price.description = 'total'
    this.priceInternal = price

    const returnableObject: EmitedSelectedBookingBenefits = {
      benefitId: this.benefitId,
      benefitName: this.title,
      capacityText: this.capacityText || '',
      chipText: this.chipText,
      description: this.description || '',
      moreDetails: this.moreDetails,
      photo: this.photo,
      price: this.price.price,
      currency: this.price.currency,
      roomsData: RoomData,
      title: this.title,
      units: this.totalUnits,
      dependsOnOcupation: this.dependsOnOcupation,
      maxUnits: this.maxUnits
    }

    return returnableObject
  }

  // endregion
}
</script>

<style scoped></style>
