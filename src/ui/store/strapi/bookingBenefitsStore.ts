import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '../../../container'
import bookingBenefitTypes from '~/src/app/common/types/bookingBenefitTypes'
import productAccessTypes from '~/src/app/common/types/productAccessTypes'
import GetBookingBenefitUseCase from '~/src/app/bookingBenefits/application/getbookingBenefitUseCase'
import {
  BookingBenefitEntity,
  SelectedBookingBenefits,
  StrapiBenefitEntity,
  RoomBenefit,
  ExternalRooms
} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {UseAuth} from '~/src/ui/store/auth'
import {BookingStore} from '../bookingStore'
import {BookingBenefitAccessRequestDto} from '~/src/app/bookingBenefits/domain/dto/bookingBenefitAccessRequestDto'
import GetBookingBenefitAccessUseCase from '~/src/app/bookingBenefits/application/getBookingBenefitAccessUseCase'
import {BookingBenefitAccessEntity} from '~/src/app/bookingBenefits/domain/entities/bookingBenefitAccess'
import GetProductAccessUseCase from '~/src/app/productAccess/application/getAccessProductsUseCase'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {ProductAccessRequestDto} from '~/src/app/productAccess/domain/dto/productAccessRequestDto'
import {ProductAccessEntity} from '~/src/app/productAccess/domain/entities/productAccess'
import {Roles} from '~/src/app/common/domain/entities/membershipTable'
import dayjs from 'dayjs'
import {
  Policies,
  EliteProductFact,
  EliteProductCodes
} from '~/src/app/bookingBenefits/domain/entities/rules/EliteProductRuleEntity'
import {GolfKinds} from 'app/provisions/shared/GolfKinds'
import provisionTypes from 'app/common/types/provisionTypes'
import GetGolfWithPaymentULGWUseCase from 'app/provisions/golfWithPaymentULGW/getGolfWithPaymentULGWUseCase'
import {BookingGolfStore} from '../booking/bookingGolfStore'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'

const persistence = new PersistentStoreLocalStorageRepository([
  'accesibleTransportation',
  'BenefitsCatalog',
  'BenefitsPrices',
  'productsCatalog',
  'selectedBenefits',
  'externalRooms'
])

@Store({
  name: 'bookingBenefitStore'
})
export class BookingBenefitStore extends Pinia {
  @lazyInject(bookingBenefitTypes.GetBookingBenefitUseCase)
  private readonly GetBookingBenefitUseCase!: GetBookingBenefitUseCase

  @lazyInject(bookingBenefitTypes.GetBookingBenefitAccessUseCase)
  private readonly GetBookingBenefitAccessUseCase!: GetBookingBenefitAccessUseCase

  @lazyInject(productAccessTypes.GetProductAccessUseCase)
  private readonly GetProductAccessUseCase!: GetProductAccessUseCase

  @lazyInject(provisionTypes.GetGolfWithPaymentULGWUseCase)
  private readonly getGolfWithPaymentULGWUseCase!: GetGolfWithPaymentULGWUseCase

  accesibleTransportation: Array<BookingBenefitAccessEntity> = []

  productsCatalog: Array<ProductAccessEntity> = []

  BenefitsCatalog: BookingBenefitEntity[] | null = null

  selectedBenefits: SelectedBookingBenefits[] = []

  externalRooms: ExternalRooms[] = []

  loading = false

  provisionReservationTypes = [
    BookingCategoryStatus.IMP_WEEKS,
    BookingCategoryStatus.ANIVERSARIO,
    BookingCategoryStatus.INCENTIVA
  ]

  emptySelectedBenefits() {
    this.selectedBenefits = []
  }

  getSelectedProvision() {
    const isNotEmpty = (obj: any): boolean => {
      return obj !== undefined && obj !== null
    }

    const bookingStore = new BookingStore()

    const room = bookingStore.currentRoomIndex
    const info = bookingStore.reservationInfo
    const provisions: {[index: string]: any} = {
      anniversary: info[room].provisions?.anniversary,
      imperial: info[room].roomSelected?.selectedProvition,
      incentive: info[room].provisions?.incentive,
      other: info[room].selectedProvition
    }
    for (const key in provisions) {
      if (isNotEmpty(provisions[key])) {
        return provisions[key]
      }
    }
  }

  toEpochTimestamp(date: string): number {
    return dayjs(date).toDate().valueOf()
  }

  async fetchBookingBenefits() {
    this.BenefitsCatalog = await this.GetBookingBenefitUseCase.run()
    this.fetchBookingPrices()
    persistence.save(this)
  }

  async fetchExternalRooms() {
    const {reservation, getBooking} = new BookingStore()
    const bookingGolfStoreInstance = new BookingGolfStore()
    const {
      evaluateExternalGolfPolicyArray,
      evaluateGolfPolicyArray,
      paidGolfPolicies,
      freeGolfPolicies,
      allInclusivePolicies,
      defaultValuePolicies,
      golfPolicies,
      accesibleGolf
    } = bookingGolfStoreInstance

    this.externalRooms = []

    const paidPolicy = await evaluateGolfPolicyArray(reservation, paidGolfPolicies)

    const freePolicy = await evaluateGolfPolicyArray(reservation, freeGolfPolicies)

    const inclusivePolicy = await evaluateGolfPolicyArray(reservation, allInclusivePolicies)

    const defaultValue = await evaluateGolfPolicyArray(reservation, defaultValuePolicies)

    const {checkIn, checkOut} = getBooking
    const {golfType: golfTypeFromStore} = new BookingGolfStore()

    const imperialGolfPayment = await Promise.allSettled(
      reservation?.map(async room => {
        const golfType = golfTypeFromStore(room.roomSelected?.selectedProvition)
        const provisionType = room.roomSelected?.selectedProvition?.Category.includes('WKS')
          ? 'W'
          : 'N'

        let price = 0
        if (golfType === GolfKinds.WITH_PAYMENT) {
          price = await this.getGolfWithPaymentULGWUseCase.run({
            checkOut,
            checkIn,
            type: provisionType
          })
        }

        return {
          golfType,
          provisionType,
          price
        }
      })
    )

    const ratesGolAnniversary = await Promise.allSettled(
      reservation.map( async (room, index) => {
        const roomCode: string = room.roomSelected?.selectedCategory.RealCode || ''
        const code = room.roomSelected?.selectedOption?.code
        if (code === BookingCategoryStatus.ANIVERSARIO) {
          const rate = await bookingGolfStoreInstance.getReservationRate(roomCode, index, room.roomSelected?.provisions?.anniversary)
          const rateReduced = rate.data.RCDetail[0].RmfolioRc.reduce(
            (accum: number, rate: any) => accum + rate.GolfRate,
            0
          )
          return {rate, rateReduced}
        }
        return { rate: 0, rateReduced: 0}
      } )
    )

    const ratesGolfIncentive = await Promise.allSettled(
      reservation.map( async (room, index) => {
        const roomCode = room.roomSelected?.selectedCategory.RealCode || ''
        const code = room.roomSelected?.selectedOption?.code
        if (code === BookingCategoryStatus.INCENTIVA) {
          const rate = await bookingGolfStoreInstance.getReservationRate(roomCode, index, room.roomSelected?.provisions?.incentive)
          const rateReduced = rate.data.RCDetail[0].RmfolioRc.reduce(
            (accum: number, rate: any) => accum + rate.GolfRate,
            0
          )

          return {rate, rateReduced}
        }
        return { rate: 0, rateReduced: 0}
      } )
    )
    // Flujo de golf para Preferential.
    // const productGolfTypes = reservation.map( (room, index) => {
    //   return bookingGolfStoreInstance.productGolfType(room, index)
    // })
    // // console.log('Product Golf types........', productGolfTypes)


    // hacer peticiones para cada elemento obtener precio.
    // in
    // out
    // type: W o N
    // @ts-ignore
    const evaluatedRooms: Array<ExternalRooms> = reservation.map((room, index) => {


      const {roomSelected} = room
      let costoProvision = 0
      const costoElite = 0

      // if (roomSelected && roomSelected.selectedOption?.code === BookingCategoryStatus.IMP_WEEKS) {
      //   costoProvision = roomSelected.selectedProvition?.ULG_AMOUNT || 0
      // } else if (
      //   roomSelected &&
      //   roomSelected.selectedOption?.code === BookingCategoryStatus.ANIVERSARIO
      // ) {

      //   // costoProvision = roomSelected.provisions?.anniversary?.provision.raw?.ULG_AMOUNT || 0
      //   if(ratesGolAnniversary[index].status === 'fulfilled') {
      //     // @ts-ignore
      //     costoProvision = ratesGolAnniversary[index].value.rateReduced || 0
      //   }
      // } else if (
      //   roomSelected &&
      //   roomSelected.selectedOption?.code === BookingCategoryStatus.INCENTIVA
      // ) {
      //   //
      //   // costoProvision = roomSelected.provisions?.incentive?.provision.raw?.ULG_AMOUNT || 0

      //   if(ratesGolfIncentive[index].status === 'fulfilled') {
      //     // @ts-ignore
      //     costoProvision = ratesGolfIncentive[index].value.rateReduced || 0
      //   }

      // } else {
      // Flujo de golf para Preferential
      //   try {
      //     const selectedGolfRoom = accesibleGolf[index] /* accesibleGolf.find(golfRoom => golfRoom.roomCode === roomSelected?.selectedCategory?.RealCode) */

      //   if(productGolfTypes[index] === GolfKinds.FREE) {
      //     console.group("productGolfTypes[index] === GolfKinds.FREE")
      //     // console.log("selectedGolfRoom",selectedGolfRoom)
      //     const selectedGolfRoomRate =  selectedGolfRoom?.golfRateByProducts.find(
      //       golfRate => {
      //          // console.log("golfRate",golfRate)
      //          // console.log("golfRate.golfType === GolfKinds.FREE",golfRate.golfType === GolfKinds.FREE)
      //         return golfRate.golfType === GolfKinds.FREE
      //       }
      //     )
      //     console.groupEnd()

      //     if(selectedGolfRoomRate?.rate)
      //       costoElite = selectedGolfRoomRate?.rate  || 0
      //   } else if(productGolfTypes[index] === GolfKinds.WITH_PAYMENT) {
      //     console.group("productGolfTypes[index] === GolfKinds.WITH_PAYMENT")

      //     const selectedGolfRoomRate =  selectedGolfRoom.golfRateByProducts.find(
      //       golfRate => {
      //         const result = golfRate.golfType === GolfKinds.WITH_PAYMENT
      //         // console.log("golfRate",golfRate)
      //         // console.log( "golfRate.golfType == GolfKinds.WITH_PAYMENT",golfRate.golfType === GolfKinds.WITH_PAYMENT)

      //         return result
      //       }
      //     )

      //     console.groupEnd()
      //       costoElite = selectedGolfRoomRate?.rate  || 0

      //   }
      //   } catch (error) {
      //     // console.log("🚀 ~ file: bookingBenefitsStore.ts ~ line 279 ~ BookingBenefitStore ~ constevaluatedRooms:Array<ExternalRooms>=reservation.map ~ error", error)

      //   }
      // }

      return {
        ...room,
        id: reservation?.indexOf(room),
        pax: room.roomsPax.adults + room.roomsPax.children,
        namePax: room.guests[0]?.name,
        categoryId: room.roomSelected?.selectedCategory.RealCode!,
        reserveType: room.roomSelected?.selectedOption?.code,
        imperialGolfType: imperialGolfPayment[index],
        benefits: [],
        hasGolfCompliance:
          paidPolicy[index].events?.compliance || freePolicy[index].events?.compliance || false,
        freeGolfPolicyWeeksCompliance: freePolicy[index].events?.compliance || false,
        paidGolfPolicyWeeksCompliance: paidPolicy[index].events?.compliance || false,
        allInclusivePolicyWeeksCompliance: inclusivePolicy[index].events?.compliance || false,
        eliteProduct: defaultValue[index].events?.code || 'N/A',
        eliteProductType: defaultValue[index].events?.type || 'N/A',
        costoProvision,
        costoElite
      }
    })
    this.externalRooms = evaluatedRooms

    persistence.save(this)
  }

  getProductCount(productCode: string): number {
    const bookingStore = new BookingStore()
    const usedProducts =
      bookingStore.reservation.reduce((acc = 0, room) => {
        if (room.eliteProduct === productCode) {
          return acc + 1
        }
        return acc
      }, 0) || 0

    const avaliableProd =
      this.productsCatalog.find(product => product.IDPRODUCTO === productCode)?.AVAILABLE || 0

    return avaliableProd - usedProducts
  }

  get allInclusiveWeeksAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.allInclusiveCodeWeeks)
  }

  get allInclusiveNightAvailableCount(): number {
    return this.getProductCount(EliteProductCodes.allInclusiveCodeNights)
  }

  async fetchAccesibleTransportation() {
    const auth = new UseAuth()
    const bookingStore = new BookingStore()

    const payload: BookingBenefitAccessRequestDto = {
      application: String(auth.applicationUserMember),
      company: String(auth.userCompany),
      request: {
        isNational: !!auth.isNational,
        hotel: bookingStore.getbookingpropertyCode,
        arrivalDate: bookingStore.getBooking.checkIn,
        departureDate: bookingStore.getBooking.checkOut
      }
    }
    this.accesibleTransportation = []
    this.accesibleTransportation = await this.GetBookingBenefitAccessUseCase.run(payload)

    persistence.save(this)
  }

  async fetchProductsCatalog() {
    const auth = new UseAuth()
    const bookingStore = new BookingStore()

    const productsPayload: ProductAccessRequestDto = {
      application: String(auth.applicationUserMember),
      company: String(auth.userCompany),
      arrivalDate: bookingStore.getBooking.checkIn
    }
    this.productsCatalog = []
    try {
      this.productsCatalog = await this.GetProductAccessUseCase.run(productsPayload)
    } catch (error) {
      // console.log('error on products catalog', error)
    }

    persistence.save(this)
  }

  async fetchBookingPrices() {
    const {fetchGolfAccess} = new BookingGolfStore()

    this.loading = true

    try {
      await this.fetchExternalRooms()
    } catch (error) {}

    try {
      await fetchGolfAccess()
    } catch (error) {}

    try {
      await this.fetchProductsCatalog()
    } catch (error) {}
    try {
      await this.fetchAccesibleTransportation()
    } catch (error) {}

    this.loading = false
    persistence.save(this)
  }

  get BenefitsPrices(): Array<BookingBenefitAccessEntity> {
    const {mapGolfFromProductsCatalog} = new BookingGolfStore()
    // @ts-ignore
    return [
      // @ts-ignore
      ...this.accesibleTransportation,
      mapGolfFromProductsCatalog || {} as BookingBenefitAccessEntity
    ]
  }

  mapGolfFormSelectedProvision() {
    //
  }

  get getExternalRooms(): Array<ExternalRooms> {
    return this.externalRooms
  }

  get accesibleBenefits() {
    return this.getBenefitsWithPrices?.filter(BookingBenefitEntity => {
      return BookingBenefitEntity.benefits.some(benefit => {
        return this.BenefitsPrices?.some(price => {
          return price?.id === benefit?.benefitId
        })
      })
    })
  }

  get getBenefitsWithPrices(): BookingBenefitEntity[] | null {
    if (!this.getBenefitsCatalog) return null
    return this.getBenefitsCatalog?.flatMap((bookingBenefit: BookingBenefitEntity) => {
      return {
        ...bookingBenefit,
        benefits: bookingBenefit.benefits.map((benefit: StrapiBenefitEntity) => {
          return {
            ...benefit,
            externalRooms: this.getExternalRooms,
            price: this.getBookingBenefitPrice(benefit.benefitId)
          }
        })
      }
    })
  }

  get getGolfproductIds(): string[] {
    return [
      EliteProductCodes.paidGolfCodeWeeks, // UNLIMITED GOLF WITH ADDITIONAL PAYMENT WEEKS
      EliteProductCodes.freeGolfCodeWeeks, //UNLIMITED GOLF MEMBERS AND BENEFICIARIES WEEKS
      EliteProductCodes.paidGolfCodeNights, // UNLIMITED GOLF WITH ADDITIONAL PAYMENT NIGHTS
      EliteProductCodes.freeGolfCodeNights //UNLIMITED GOLF MEMBERS AND BENEFICIARIES NIGHTS
    ]
  }

  get getBenefitsCatalog(): BookingBenefitEntity[] | null {
    if (!this.BenefitsCatalog) this.fetchBookingBenefits()
    return this.BenefitsCatalog
  }

  get getSelectedBenefits(): SelectedBookingBenefits[] {
    return this.selectedBenefits
  }

  get getSelectedBenefitsWithOutGolf(): SelectedBookingBenefits[] {
    return this.selectedBenefits.filter(benefit => {
      return !this.getGolfproductIds.includes(benefit.benefitId)
    })
  }

  getBookingBenefitPrice(benefitId: string): BookingBenefitAccessEntity | undefined {
    try {
      return (
        this.BenefitsPrices?.find(item => {
          return String(item?.id) === benefitId
        }) ?? undefined
      )
    } catch (error) {
      // console.log('error', error)
      return undefined
    }
  }

  async addSelectedBenefit(BenefitInformation: SelectedBookingBenefits) {
    const bookingStore = new BookingStore()
    const {evaluateExternalGolfPolicyArray, defaultValuePolicies} = new BookingGolfStore()

    this.selectedBenefits.push(BenefitInformation)

    const defaultEliteProduct = await evaluateExternalGolfPolicyArray(
      BenefitInformation.roomsData,
      defaultValuePolicies
    )

    BenefitInformation.roomsData?.forEach((room: ExternalRooms, index) => {
      if (room?.id !== undefined || room !== undefined || room !== null) {
        const eliteProductCode = defaultEliteProduct[index].events?.code ?? 'N/A'

        const eliteProductType = defaultEliteProduct[index].events?.type ?? 'N/A'

        const roomBenefits: Array<RoomBenefit> =
          this.selectedRoomBenefits(room?.id)?.map(benefit => {
            // Tiene una imperial week seleccionada
            // ES con pago
            // traer el costo
            return {
              benefitId: benefit.benefitId,
              benefitName: benefit.benefitName,
              recNumPromo: this.getBookingBenefitPrice(benefit.benefitId)?.recNumPromo ?? '',
              roomData: benefit?.roomsData
                ? benefit.roomsData[room.id] ?? []
                : ([] as any as RoomBenefit['roomData']),
              unitPrice: this.getBookingBenefitPrice(benefit.benefitId)?.price ?? (0 as number),
              totalPrice: benefit?.price * (benefit.roomsData[room.id].units || 0)
            }
          }, []) ?? []

        bookingStore.bookingBenefitForRoom(
          room?.id,
          roomBenefits,
          eliteProductCode,
          eliteProductType
        )
      } else {
        // console.log('Error: room id is undefined')
      }
    })
    persistence.save(this)
  }

  setSelectedBenefit(BenefitInformation: SelectedBookingBenefits) {
    if (BenefitInformation?.units === undefined || BenefitInformation?.units > 0)
      this.getSelectedBenefitByIndex(BenefitInformation.benefitId) === -1
        ? this.addSelectedBenefit(BenefitInformation)
        : this.setSelectedBenefitCount(BenefitInformation)

    if (BenefitInformation.units === 0) this.removeSelectedBenefit(BenefitInformation.benefitId)
  }

  async removeSelectedBenefit(benefitId: string): Promise<void> {
    this.selectedBenefits.splice(this.getSelectedBenefitByIndex(benefitId), 1)

    const bookingStore = new BookingStore()

    const {evaluateGolfPolicyArray, defaultValuePolicies} = new BookingGolfStore()

    const defaultEliteProduct = await evaluateGolfPolicyArray(
      bookingStore.reservationInfo,
      defaultValuePolicies
    )

    bookingStore.reservationInfo.forEach((room, index) => {
      room.benefits = room.benefits?.filter(benefit => {
        bookingStore.setBookingEliteProduct(
          room.index,
          defaultEliteProduct[index].events?.code ?? 'N/A',
          defaultEliteProduct[index].events?.type ?? 'N/A'
        )
        return benefit.benefitId !== benefitId
      })
    })

    persistence.save(this)
  }

  getSelectedBenefitByIndex(benefitId: string): number {
    return this.getSelectedBenefits.findIndex(item => item.benefitId === benefitId)
  }

  getSelectedBenefitCount(benefitId: string): number {
    return this.getSelectedBenefitByIndex(benefitId) === -1
      ? 0
      : this.selectedBenefits[this.getSelectedBenefitByIndex(benefitId)].units ?? 0
  }

  setSelectedBenefitCount(BenefitInformation: SelectedBookingBenefits) {
    this.removeSelectedBenefit(BenefitInformation.benefitId)
    this.addSelectedBenefit(BenefitInformation)
  }

  selectedRoomBenefits(roomId: number): SelectedBookingBenefits[] {
    return this.selectedBenefits.filter(benefit =>
      benefit.roomsData?.find(room => room?.id === roomId)
    )
  }

  removeRoomFromSelectedBenefits(roomId: number) {
    //remove undefined values from RoomsData array
    this.selectedBenefits = this.selectedBenefits.map(benefit => {
      return {
        ...benefit,
        roomsData: benefit.roomsData?.filter(room => room?.id !== roomId)
      }
    })
    //remove benefits without roomsData

    this.selectedBenefits = this.selectedBenefits.filter(benefit => benefit.roomsData?.length)

    //map roomData to have isSelected if benefit has a count
    this.selectedBenefits = this.selectedBenefits.map(benefit => {
      return {
        ...benefit,
        roomsData: benefit.roomsData?.map(room => {
          return {
            ...room
          }
        })
      }
    })

    persistence.save(this)
  }

  public async initStore(): Promise<void> {
    if (process.client) {
      // @ts-ignore
      persistence.hydrate(this)
    }
  }

  clearBenefits() {
    this.selectedBenefits = []

    persistence.save(this)
  }
}
