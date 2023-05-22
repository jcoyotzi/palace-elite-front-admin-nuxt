import {Pinia, Store} from 'pinia-class-component'
import {BookingBenefitStore} from '../strapi/bookingBenefitsStore'
import {GolfKinds} from '~/src/app/provisions/shared/GolfKinds'
import GolfFromProvisionsDto from '~/src/app/provisions/shared/golfFromProvitionsDto'
import {UseAuth} from '../auth'
import {BookingStore} from '../bookingStore'
import {BookingBenefitGolfAccessRequestDto} from '~/src/app/bookingBenefits/domain/dto/bookingBenefitGolfAccessRequestDto'
import toEpochTimeStamp from '../../utils/toEpochTimeStamp'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import GetBookingBenefitGolfAccessUseCase from '~/src/app/bookingBenefits/application/getBookingBenefitGolfAccessUseCase'
import bookingBenefitTypes from '~/src/app/common/types/bookingBenefitTypes'
import {lazyInject} from '../../../container'
import {BookingBenefitGolfAccessEntity} from '~/src/app/bookingBenefits/domain/entities/bookingBenefitGolfAccess'
import {ProductAccessEntity} from '~/src/app/productAccess/domain/entities/productAccess'
import {BookingBenefitAccessEntity} from '~/src/app/bookingBenefits/domain/entities/bookingBenefitAccess'
import {InfoMemberProvision} from '~/src/app/booking/domain/dto/imperialDto'
import {MembershipTable, Roles, RoleTypes} from '~/src/app/common/domain/entities/membershipTable'
import GetEliteProductRuleUseCase from '~/src/app/bookingBenefits/application/rules/getEliteProductRule'
import {
  Policies,
  EliteProductFact,
  EliteProductCodes,
  EliteProductRuleEntity
} from '~/src/app/bookingBenefits/domain/entities/rules/EliteProductRuleEntity'
import {
  paidGolfPolicyWeeks,
  freeGolfPolicyWeeks,
  allInclusivePolicyWeeks,
  allInclusivePolicyNights,
  freeGolfPolicyNights,
  paidGolfPolicyNights
} from '~/src/app/bookingBenefits/domain/policies/GolfPolicie'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import dayjs from 'dayjs'
import {ExternalRooms} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {
  golfFromProvitionsFactory,
  GolfFromProvitionsVariants
} from '~/src/app/provisions/shared/golfFromProvitionsFactory'
import {GetReservationRate} from 'app/reservation/application/GetReservationRate'
import createRmFolio from '~/src/app/common/types/createRmFolio'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import {ProvitionOption} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'

const persistence = new PersistentStoreLocalStorageRepository([
  'accesibleGolf',
  'golfProvisionsPrices'
])

@Store({
  name: 'bookingGolfStore'
})
export class BookingGolfStore extends Pinia {
  @lazyInject(bookingBenefitTypes.GetBookingBenefitGolfAccessUseCase)
  private readonly GetBookingBenefitGolfAccessUseCase!: GetBookingBenefitGolfAccessUseCase

  @lazyInject(bookingBenefitTypes.GetEliteProductRuleUseCase)
  private readonly GetEliteProductRuleUseCase!: GetEliteProductRuleUseCase

  @lazyInject(createRmFolio.getReservationRate)
  private readonly getReservationPromotionRate!: GetReservationRate

  accesibleGolf: Array<BookingBenefitGolfAccessEntity> = []

  golfProvisionsPrices: GolfFromProvisionsDto | null = null

  defaultValuePolicies = [
    paidGolfPolicyWeeks,
    paidGolfPolicyNights,
    freeGolfPolicyWeeks,
    freeGolfPolicyNights,
    allInclusivePolicyWeeks,
    allInclusivePolicyNights
  ]

  paidGolfPolicies = [paidGolfPolicyWeeks, paidGolfPolicyNights]

  freeGolfPolicies = [freeGolfPolicyWeeks, freeGolfPolicyNights]

  golfPolicies = [this.paidGolfPolicies, this.freeGolfPolicies]

  allInclusivePolicies = [allInclusivePolicyWeeks, allInclusivePolicyNights]

  setGolfFromProvitions(val: GolfFromProvisionsDto | null) {
    this.golfProvisionsPrices = val
  }

  get allInclusiveWeeksAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.allInclusiveCodeWeeks)
  }

  get paidWeekGolfAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.paidGolfCodeWeeks)
  }

  get freeWeekGolfAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.freeGolfCodeWeeks)
  }

  get allInclusiveNightAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.allInclusiveCodeNights)
  }

  get paidNightGolfAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.paidGolfCodeNights)
  }

  get freeNightGolfAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.freeGolfCodeNights)
  }

  get getAllRoomCodesWithGolf(): string[] {
    return this.getAccesibleGolf.map(golf => golf.roomCode)
  }

  get getAccesibleGolf(): Array<BookingBenefitGolfAccessEntity> {
    return this.accesibleGolf
  }

  get availableGolfCountDependingOnPolicy(): number {
    /* based on bussines rules only when the owner is traveling free golf can be counted */
    if (this.travelWithBeneficiary)
      return this.freeWeekGolfAvailableCount + this.paidWeekGolfAvailableCount
    else return this.paidWeekGolfAvailableCount
  }

  /*
    TODO: maybe better to use this function in bookingStore
  */
  get travelWithBeneficiary(): boolean {
    const bookingStore = new BookingStore()
    const travelWithBeneficiaryOrOwner = !!bookingStore.reservation.find(
      reservationInfo =>
        reservationInfo.guests.find(
          guest =>
            guest?.memberUtils?.role === Roles.Owner ||
            guest?.memberUtils?.role === Roles.Beneficiary
        ) !== undefined
    )

    return travelWithBeneficiaryOrOwner
  }

  get provisionRoomsWithGolf(): number {
    const {getExternalRooms} = new BookingBenefitStore()

    const totalImperialRoomsWithGolf = getExternalRooms.reduce((acc, room) => {
      if (room.imperialGolfType.value.golfType) return acc + 1
      return acc
    }, 0)

    const totalAnniversaryRoomsWithGolf = getExternalRooms.reduce((acc, room) => {
      if (room.roomSelected?.provisions?.anniversary?.hasGolf) return acc + 1
      return acc
    }, 0)

    const totalIncentiveRoomsWithGolf = getExternalRooms.reduce((acc, room) => {
      if (room.roomSelected?.provisions?.incentive?.hasGolf) return acc + 1
      return acc
    }, 0)

    return totalImperialRoomsWithGolf + totalAnniversaryRoomsWithGolf + totalIncentiveRoomsWithGolf
  }

  get canTravelWithGolf() {
    // const {getExternalRooms} = new BookingBenefitStore()
    // //  provision Imperial, aniversario e  incentivo
    // const cantTravelWithImperial = getExternalRooms.some(room => {
    //   if (room.imperialGolfType?.status === 'fulfilled')
    //     return room.imperialGolfType.value.golfType !== GolfKinds.NO_GOLF

    //   return false
    // })
    // const canTravelWithAnniversary = getExternalRooms.some(
    //   room => !!room.roomSelected?.provisions?.anniversary?.hasGolf
    // )

    // const canTravelWithIncentive = getExternalRooms.some(
    //   room => !!room.roomSelected?.provisions?.incentive?.hasGolf
    // )

    // // provision bonos, referidos y preferencial

    // const canTravelWithElite = getExternalRooms.some(
    //   room => room.paidGolfPolicyWeeksCompliance || room.freeGolfPolicyWeeksCompliance
    // )

    // //  provision Imperial, aniversario e  incentivo
    // const hasProvisionRoom = getExternalRooms.some(room => {
    //   const roomCode = room.roomSelected?.selectedOption?.code
    //   return (
    //     roomCode === BookingCategoryStatus.INCENTIVA ||
    //     roomCode === BookingCategoryStatus.IMP_WEEKS ||
    //     roomCode === BookingCategoryStatus.ANIVERSARIO
    //   )
    // })

    // const hasEliteRoom = getExternalRooms.some(room => {
    //   const roomCode = room.roomSelected?.selectedOption?.code
    //   return (
    //     roomCode === BookingCategoryStatus.BONO ||
    //     roomCode === BookingCategoryStatus.PREFERENCIAL ||
    //     roomCode === BookingCategoryStatus.REFERIDO
    //   )
    // })

    return {
      // canTravelWithProvition:
      //   (cantTravelWithImperial || canTravelWithAnniversary || canTravelWithIncentive) &&
      //   hasProvisionRoom,
      // canTravelWithElite: canTravelWithElite && hasEliteRoom
      canTravelWithProvition: false,
      canTravelWithElite: false
    }
  }

  // TODO : refactor this function
  get golfStartingPrice(): number {
    const {getExternalRooms} = new BookingBenefitStore()
    let golfProvisions = getExternalRooms.reduce((acc, current) => {
      const currentPrice = current.costoProvision || 0
      const accNot0 = acc > 0 ? acc : currentPrice

      return currentPrice < accNot0 ? currentPrice || 0 : accNot0
    }, 0)

    let golfElite = getExternalRooms.reduce((acc, current) => {
      const currentPrice = current.costoElite || 0
      const accNotZero: number = acc > 0 ? acc : currentPrice
      return currentPrice < accNotZero ? currentPrice || 0 : accNotZero
    }, 0)

    golfProvisions = golfProvisions > 0 ? golfProvisions : golfElite

    golfElite = golfElite > 0 ? golfElite : golfProvisions

    return golfProvisions < golfElite ? golfProvisions : golfElite

    /* provisiones */
  }

  getProductCount(productCode: string): number {
    const bookingStore = new BookingStore()
    const {productsCatalog} = new BookingBenefitStore()
    const usedProducts =
      bookingStore.reservation.reduce((acc = 0, room) => {
        if (room.eliteProduct === productCode) {
          return acc + 1
        }
        return acc
      }, 0) || 0

    const avaliableProd =
      productsCatalog.find(product => product.IDPRODUCTO === productCode)?.AVAILABLE || 0

    return avaliableProd - usedProducts
  }

  async fetchGolfAccess() {
    const auth = new UseAuth()
    const bookingStore = new BookingStore()
    const {getExternalRooms} = new BookingBenefitStore()

    const getRoomCodesFromBooking = getExternalRooms.map(room => room.categoryId)

    const payload: BookingBenefitGolfAccessRequestDto = {
      application: String(auth.applicationUserMember),
      company: String(auth.userCompany),
      request: {
        hotel: bookingStore.getbookingpropertyCode,
        arrivalDate: String(toEpochTimeStamp(bookingStore.getBooking.checkIn)),
        departureDate: String(toEpochTimeStamp(bookingStore.getBooking.checkOut)),
        categoryId: String(2),
        nights: selectedNights(bookingStore.getBooking.checkIn, bookingStore.getBooking.checkOut),
        roomCodes: getRoomCodesFromBooking,
        market: auth.userMarket ? String(auth.userMarket) : '',
        isNational: !!auth.isNational
      }
    }
    this.accesibleGolf = []
    this.accesibleGolf = await this.GetBookingBenefitGolfAccessUseCase.run(payload)
    persistence.save(this)
  }

  // TODO : refactor this function
  get mapGolfFromProductsCatalog(): BookingBenefitAccessEntity | null {
    return golfFromProvitionsFactory(GolfFromProvitionsVariants.FREE, this.golfStartingPrice)
  }

  golfType(provision: InfoMemberProvision | undefined): string {
    if (provision === undefined) {
      return GolfKinds.NO_GOLF
    }
    if (process.client) {
      // const provision = this.getSelectedProvision()
      const inluded = provision.ULG_INCLUDE === 'Y'
      const additionalPayment: boolean =
        provision.ULG_ADDITIONAL_PAYMENT === undefined ? false : provision.ULG_ADDITIONAL_PAYMENT
      const amount = provision.ULG_AMOUNT === undefined ? -1 : provision.ULG_AMOUNT
      const needPayment = amount > 0
      const isWithAdditionalPaymet = additionalPayment || needPayment

      // AINC
      if (!inluded) {
        return GolfKinds.NO_GOLF
      }
      // ULGW
      if (inluded && isWithAdditionalPaymet) {
        return GolfKinds.WITH_PAYMENT
      }
      // ULG
      if (inluded && !isWithAdditionalPaymet) {
        return GolfKinds.FREE
      }
    }

    return GolfKinds.NO_GOLF
  }

  roomHasProvision(room: ReservationInfo): boolean {
    const provisions = {
      imperial: room.roomSelected?.selectedProvition,
      anniversary: room.roomSelected?.provisions?.anniversary,
      incentive: room.roomSelected?.provisions?.incentive
    }

    for (const item in provisions) {
      // @ts-ignore
      if (provisions[item] !== undefined && provisions[item] !== null) {
        return true
      }
    }

    return false
  }

  productGolfType(room: ReservationInfo, roomIndex: number): string | null {
    try {
      // Un product no tiene provisiones
      // anniversary, incentive e imperial
      if (this.roomHasProvision(room) && !this.getAccesibleGolf[roomIndex]) {
        return null
      }

      let golfType = GolfKinds.NO_GOLF
      const mainGuest: MembershipTable = room.guests[0]
      const memberRole = mainGuest.memberUtils.role

      // TODO: Investigar cómo identificar si un guest es referido
      // TODO: Implementar la función de Kevin y extender las reglas restantes 1 y 3

      const hasReferal = (room: ReservationInfo): boolean => {
        // console.log('*-*-*-*- guest.memberUtils: ', room)
        // // console.log(guest.memberUtils)
        const findReferential = room.guests.find(guest => guest.memberUtils.InReferral)
        return !(findReferential === undefined)
      }

      // Titular Guest - Golf con pago
      if (memberRole === Roles.Guest) {
        golfType = GolfKinds.WITH_PAYMENT
      }

      // Owner or Beneficiary - Free Golf && has Weeks Golf Sin pago
      const isOwnerOrBeneficiary = memberRole === Roles.Owner || memberRole === Roles.Beneficiary

      const hasGolfAccesible = this.getAccesibleGolf[roomIndex]?.golfRateByProducts?.find(item => {
        return item.golfType === GolfKinds.FREE
      })
      // debugger
      const hasULG: boolean = !(hasGolfAccesible === undefined)
      if (isOwnerOrBeneficiary && hasULG) {
        golfType = GolfKinds.FREE
      }

      // Owner or Beneficiary pax + pax referido  - No GOlf // siempre y cuando exista un referido NO GOLF
      if (isOwnerOrBeneficiary && hasReferal(room)) {
        golfType = GolfKinds.NO_GOLF
      }

      return golfType
    } catch (error) {
      /* console.log(
        '🚀 ~ file: bookingGolfStore.ts ~ line 383 ~ BookingGolfStore ~ productGolfType ~ error',
        error
      )
       */
      return null
    }
  }

  public async evaluateGolfPolicy(
    reserveType: string,
    policies: Policies | Array<Policies> = paidGolfPolicyWeeks
  ) {
    const bookingStore = new BookingStore()
    const fact: EliteProductFact = {
      hotel: bookingStore.getbookingpropertyCode,
      reserveType,
      AIWK: this.allInclusiveWeeksAvailableCount,
      ULGAPWK: this.paidWeekGolfAvailableCount,
      ULGHFWK: this.freeWeekGolfAvailableCount,
      AING: this.allInclusiveNightAvailableCount,
      ULGAPNG: this.paidNightGolfAvailableCount,
      ULGHFNG: this.freeNightGolfAvailableCount,
      travelWithBeneficiary: this.travelWithBeneficiary,
      selectedGolfOption: false,
      nights: selectedNights(bookingStore.getBooking.checkIn, bookingStore.getBooking.checkOut)
    }
    const evaluatedPolicy = await this.GetEliteProductRuleUseCase.run({policies, fact})
    return evaluatedPolicy
  }

  async evaluateGolfPolicyArray(
    reservation: ReservationInfo[],
    policieToEvaluate: Policies | Array<Policies>
  ): Promise<Array<EliteProductRuleEntity>> {
    return Promise.all(
      reservation?.map(room => {
        return this.evaluateGolfPolicy(
          String(room.roomSelected?.selectedOption?.code),
          policieToEvaluate
        )
      })
    )
  }

  async evaluateExternalGolfPolicyArray(
    reservation: ExternalRooms[],
    policieToEvaluate: Policies | Array<Policies>
  ): Promise<Array<EliteProductRuleEntity>> {
    return Promise.all(
      reservation?.map(room => {
        if (room !== null && room !== undefined) {
          return this.evaluateGolfPolicy(String(room.reserveType), policieToEvaluate)
        }
        return {}
      })
    )
  }

  public async initStore(): Promise<void> {
    if (process.client) {
      // @ts-ignore
      persistence.hydrate(this)
    }
  }

  public async getReservationRate(
    roomCode: string,
    roomIndex: number,
    provision: ProvitionOption | null | undefined
  ) {
    if (provision === undefined || provision === null) {
      return null
    }

    const bookingStoreInstance = new BookingStore()
    const booking = bookingStoreInstance.getBooking
    const reservationInfo = bookingStoreInstance.reservation
    //const {infoUserMember, loggedUser} = bookingStoreInstance.infoUserMember

    const {checkIn, checkOut} = booking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

    const reservation = reservationInfo[roomIndex] // Iterar

    // const roomCode = category?.RealprovisionCode

    const refundableOption = true

    const country = this.$nuxt.$pinia.state.value.authStore.loggedUser.MemberExtension._clave_pais

    const golfType = this.golfType(provision.provision.raw)
    const promotionRate = await this.getReservationPromotionRate.run(
      roomCode as any,
      nights,
      bookingStoreInstance.infoUserMember._UserMember._application,
      bookingStoreInstance.infoUserMember._UserMember._company,
      booking.propertyCode,
      booking.checkIn,
      booking.checkOut,
      9,
      refundableOption,
      EliteProductCodes.paidGolfCodeWeeks,
      bookingStoreInstance.infoUserMember._UserMember._isnational,
      reservation.roomsPax.adults,
      reservation.roomsPax.children,
      bookingStoreInstance.infoUserMember._Market,
      country,
      golfType
    )

    return promotionRate
  }
}

// https://pe-api-legacy.palaceelite.com/EliteIntelligenceX/api/v1/benefit/golf-rates/rooms/application/6010841/company/5/hotel/LBC/check-in/1684281600000/check-out/1684886400000/nights/7/category/2?request.market=USA&request.roomCodes=undefined&request.isNational=false
