import {Pinia, Store} from 'pinia-class-component'

import dayjs from 'dayjs'
import {Result} from 'postcss'
import {BookingEntity} from '../../app/booking/domain/entities/bookingEntity'
import {RoomBookingEntity} from '../../app/booking/domain/entities/roomBookingEntity'
import BookingFactory from '../../app/booking/domain/factories/bookingFactory'
import {lazyInject} from '../../container'
import BookNowUseCase from '../../app/booking/application/bookNowUseCase'
import bookingTypes from '../../app/common/types/bookingTypes'

import roomAccess from '../../app/common/types/roomAccessTypes'
import UseCase from '../../app/common/application/UseCase'

import {BookingBenefitStore} from './strapi/bookingBenefitsStore'
import {LayoutStore} from './layoutStore'
import {CategoryStore} from './strapi/categoryStore'
import {BookingGolfStore} from './booking/bookingGolfStore'
import {ProvisionStore} from './provisionStore'
import {ReservationInfo, RoomsPax} from 'app/booking/domain/entities/reservationInfo'
import {AccessibleCategories, SelectedCategory} from '~/interfaces/Booking/Category.interface'
import {GetRoomTypeAccessDto} from 'app/roomAccess/domain/dto/getRoomTypeAccessDto'
import {RoomAccess} from 'app/roomAccess/domain/entities/roomAccess'
import {PromotionRoom} from 'app/roomAccess/domain/entities/promotionRoom'
import PersistentStoreLocalStorageRepository from 'app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {MembershipTable} from 'app/common/domain/entities/membershipTable'
import {RoomBenefit} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import {ReferralProgram, ReferralPromotion} from 'app/booking/domain/dto/referralProgram'

import {GetReferralProgram} from 'app/booking/application/getReferralProgram'
import {GetReferralPromotionBenefits} from '~/src/app/booking/application/getReferralPromotionBenefits'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import {Combinations} from '~/src/app/reservation/domain/entities/combinationFactory'
import {PreferentialRatesFactory} from '~/src/app/reservation/domain/entities/preferentialRatesFactory'
import createRmFolio from '~/src/app/common/types/createRmFolio'
import {CreateReservation} from '~/src/app/reservation/application/CreateReservation'
import {Context} from '~/src/app/filldatareservation/legacyBin/fillDataReservations'
import {RefundableOptions} from '~/src/app/common/domain/enums/refundableOptions'
import {RoomAccessMapper} from '~/src/app/filldatareservation/domain/mappers/roomAccessMapper'
import {userMemberMapper} from '~/src/app/filldatareservation/domain/mappers/userMemberMapper'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import {GetWeekOfYear} from '~/src/app/filldatareservation/application/getWeek'
import PreferentialRatesMock from '~/src/app/filldatareservation/test/preferentialRates.mock'
import PaxIndexedReservationMock from '~/src/app/filldatareservation/test/paxIndexedReservation.mock'

import FamilyProvsMock from '~/src/app/filldatareservation/test/familyProvs.mock'
import marketAfiliationMock from '~/src/app/filldatareservation/test/marketAfiliation.mock'
import memberPromotionsEngineMock from '~/src/app/filldatareservation/test/memberPromotionsEngine.mock'

import ContractByPromotionServiceRepository from '~/src/app/contractByPromotion/domain/repositories/contractByPromotionServiceRepository'
import contractByPromotionTypes from '~/src/app/common/types/contractByPromotionTypes'
import {CreateReservationRateCodes} from '~/src/app/reservation/application/CreateReservationRateCodes'
import {GuestRelationship} from '~/src/app/filldatareservation/domain/data/GuestRelationship'
import {RoomFolio} from '~/src/app/filldatareservation/domain/roomFolio'
import {EnumRoomCategory, PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {
  especialSuites,
  estandarSuites,
  presidentialSuites,
  residenceSuites,
  villaSuites
} from '~/src/app/common/domain/enums/roomTypes'
// import {getStages} from '~/src/app/rules/domain/data/pipelines'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import {RuleEngineRequest, RuleEngineResponse} from '~/src/app/rules/application/runEngineUseCase'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'

import {CreateNewReservationDto} from 'app/reservation/domain/dto/createNewReservationDto'
import {ReservationRepository} from 'app/reservation/domain/repositories/reservationRepository'
import reservationTypes from 'app/common/types/reservationTypes'
import {ReferralProgramType} from 'app/filldatareservation/domain/referralProgramType'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'
import {GetNextReservationFolioByHotel} from '~/src/app/reservation/application/GetNextReservationFolioByHotel'
import {GetExistsContractMappedProvision} from '~/src/app/reservation/application/GetExistsContractMappedProvision'
import {GetAgency} from 'app/filldatareservation/legacyBin/getAgency'
import {
  ImperialProvitionRequest,
  ProvitionsRequest
} from '~/src/app/booking/domain/dto/provitionsRequest'
import {BookingProvotionStatus} from '~/src/app/bookings/domain/enums/bookingProvitionStatus'
import {ImperialProvitions} from '~/src/app/booking/domain/entities/imperialEntity'
import PayloadGetReservation from '~/src/app/booking/domain/dto/payloadGetReservation'
import {GetReservationUseCase} from '~/src/app/booking/application/getReservationUseCase'
import {RawProvisionFromLegacyDto} from 'app/reservation/domain/dto/rawProvisionFromLegacyDto'
import {ProvitionOptionType} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'
import {GetMinimumStay} from '~/src/app/booking/application/getMinimumStayUseCase'
import {MinimunStay} from '~/src/app/booking/domain/entities/minimunStay'

import {imperialRuleFact} from '~/src/app/rules/domain/entities/imperial/imperialRuleEntity'
import {ValidatePromotionDto} from '~/src/app/roomAccess/domain/dto/validatePromotionDto'
import {PromotionsList} from '~/src/app/roomAccess/domain/mapper/promotionsList'
import {ReservationFromBookings} from '~/src/app/booking/domain/entities/reservationFromBookings'
import {CreateNewReservationResponseDto} from '~/src/app/reservation/domain/dto/createNewReservationResponseDto'
import {PromiseAllSettled} from '~/src/app/booking/domain/enums/promiseAllSettled'
import {Combination} from '~/src/app/booking/domain/dto/imperialDto'
import {GetBookingDto} from '~/src/app/bookings/domain/dto/getBookingDto'
import {RCDetail, RmfolioRC} from 'app/contractByPromotion/domain/entities/ContractByPromotion'
import {GetReservationRate} from 'app/reservation/application/GetReservationRate'
import {Provition} from 'app/booking/domain/entities/provition'
import {ReservationReferral} from 'app/booking/domain/entities/reservationReferral'
import toEpochTimeStamp from '~/src/ui/utils/toEpochTimeStamp'
import {getAgency} from 'app/filldatareservation/domain/getAgency'
import {IsTransferableResponse} from '~/src/app/user/domain/entities/isTransferableBonus'
import {GetOwnersAdapter} from '~/src/app/owners/domain/adapters/getOwnersAdapter'
import GetContractByPromotionArrayStore from '~/src/ui/store/booking/getContractByPromotionArrayStore'
import {ENGLIS_DATE_FORMAT} from '~/src/app/calendar/domain/generator/CalendarRatesAdapter'

import {LockOffRoomAccessCode} from '~/src/app/roomAccess/domain/data/lockOffRoomAccessCode'
import {PresidentialRoomCode} from 'app/filldatareservation/domain/data/PresidentialRoomCode'
import {GetArrayToBookPayload} from 'app/roomAccess/domain/getArrayToBookPayload'
import {Response} from '~/src/app/network/common/domain/entity/response'
import {Reservation} from '../../app/bookings/domain/dto/getBookingDto'
import {calculateRoomImperialFee} from '../utils/arithmetic/Imperial'
import {calculateRoomRefferalFee} from '../utils/arithmetic/RefferalFee'
import {mapTransportationPromo} from '~/src/app/bookingBenefits/domain/mapper/transportationPromo'
import {generateRecnumPromotions} from '~/src/ui/utils/folioGenerator/recnumPromotions'
import {RuleGrouping} from 'app/booking/domain/mapper/infantGrouping'
import {PropertiesStore} from './propertiesStore'
import {formatBaglioniRoom} from '../utils/formatters/bagglioniRoom'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import RoomFactory from 'app/booking/domain/factories/roomFactory'
import { BookingStatus } from '~/src/app/bookings/domain/enums/bookingStatus'

export interface ImperialTotalRate {
  AmountWeek52: number
  AmountChargeUpgrade: number
  AmountOutOfSeason: number
  AmountPromotion: number
  AmountResortAccess: number
  AmountThanksGivingDay: number
  RateOpera?: number
  Rate: number
  imperialLeblancFee?: number
  imperialFee?: number
}
interface selectedRoomToReservate {
  room: SelectedCategory
  imperialFee: number
  imperialLeblancFee: number
  week52Fee: number
  extraFee: number
  isChris: boolean
  RmfolioRc: any
  imperialTotalRate: ImperialTotalRate | null
  savedXAmount?: number
}

const persistence = new PersistentStoreLocalStorageRepository([
  'rooms',
  'roomsCopy',
  'roomsToBook',
  'booking',
  'reservationInfo',
  'roomIndex',
  'maxStep',
  'currentRoom',
  'referralProgram',
  'referralPromotionsBenefits',
  'provitions',
  'imperialProvitions',
  'reservationResponse',
  'reservationFromBookings',
  'reservationByPay',
  'presidentialFlow'
])

@Store({
  name: 'bookingStore'
})
export class BookingStore extends Pinia {
  public reservationInfo: ReservationInfo[] = []

  public reservationFromBookings: ReservationFromBookings[] = []

  referralProgram: ReferralProgram | null = null
  referralPromotion: ReferralPromotion | null = null
  provitions: Provition | any = null

  imperialProvitions: ImperialProvitions = [] as any as ImperialProvitions

  isFirstLoad = true

  currentRoom = 0

  minStays: MinimunStay | null = null

  maxStep = 0
  roomIndex = 0
  public continueBookNow: boolean = false

  public reservationPayLoading: boolean = false

  @lazyInject(roomAccess.getRoomAvailableToBooking)
  private readonly getRoomAvailableToBooking!: UseCase<GetRoomTypeAccessDto, RoomAccess[]>

  @lazyInject(roomAccess.validatePromotion)
  private readonly validatePromotion!: UseCase<ValidatePromotionDto, PromotionRoom>

  @lazyInject(roomAccess.getRoomArrayToBook)
  private readonly getRoomArrayToBook!: UseCase<GetArrayToBookPayload, RoomAccess[]>

  @lazyInject(bookingTypes.bookNowUseCase)
  private readonly bookNowUseCase!: BookNowUseCase

  @lazyInject(bookingTypes.getReferralProgram)
  private readonly getReferralProgramUC!: GetReferralProgram

  @lazyInject(bookingTypes.getReferralPromotionBenefits)
  private readonly getReferralPromotionBenefits!: GetReferralPromotionBenefits

  @lazyInject(bookingTypes.getProvitions)
  private readonly getProvitionsUseCase!: UseCase<ProvitionsRequest, any>

  @lazyInject(bookingTypes.getImperialProvitions)
  private readonly getImperialProvitionsUseCase!: UseCase<ProvitionsRequest, any>

  @lazyInject(createRmFolio.createReservation)
  private readonly createReservation!: CreateReservation

  @lazyInject(rulesTypes.runEngineUseCase)
  private readonly runEngine!: UseCase<RuleEngineRequest, RuleEngineResponse>

  @lazyInject(createRmFolio.roomAccesMapper)
  private readonly roomAccessMapper!: RoomAccessMapper

  @lazyInject(createRmFolio.userMemberMapper)
  private readonly userMapper!: userMemberMapper

  @lazyInject(contractByPromotionTypes.ContractByPromotionRepository)
  private readonly contractByPromotionServiceRepository!: ContractByPromotionServiceRepository

  @lazyInject(createRmFolio.createReservationRateCodes)
  private readonly createReservationRateCodes!: CreateReservationRateCodes

  @lazyInject(createRmFolio.getReservationRate)
  private readonly getReservationPromotionRate!: GetReservationRate

  @lazyInject(reservationTypes.getNextReservationFolioByHotel)
  private readonly getNextReservationFolioByHotel!: GetNextReservationFolioByHotel

  @lazyInject(reservationTypes.GetExistsContractMappedProvision)
  private readonly getExistsContractMappedProvision!: GetExistsContractMappedProvision

  @lazyInject(reservationTypes.reservationRepository)
  private readonly reservationRepository!: ReservationRepository

  @lazyInject(bookingTypes.getReservationUseCase)
  private readonly getReservationUseCase!: GetReservationUseCase

  @lazyInject(bookingTypes.getMinimumStay)
  private readonly getMinimumStayUseCase!: GetMinimumStay

  private rooms: RoomAccess[] = []
  private roomsCopy: RoomAccess[] = []

  private roomsToBook: RoomAccess[] = []

  private referralPromotionsBenefits: any = []

  private booking: BookingEntity = BookingFactory()

  private loading = false

  private reservationResponse?: boolean = false

  private showPromotion = false

  private promotionList: any[] = []

  public specialRatesPromotions: any = []

  public resetWidget = false

  private accesRoomPromotions: PromotionRoom = {data: [], errors: null, warnings: null}

  private skeleton = false

  private skeletonArray: string[] = []

  public flowPlaceOnHolder: boolean = false

  public promiseAllReservationsResults: PromiseSettledResult<CreateNewReservationResponseDto>[] = []

  public reservationByPay: Reservation | null = null

  public reservationPresidentialPart2: Reservation | null = null

  private presidentialFlow: boolean = false

  private applicableReferrals: ReservationReferral[] = []
  private selectedReferrals: ReservationReferral[] = []

  public showCategorie: boolean = false

  public infoRmAccessByCompanyApplication: any

  setFolioForProvitional(folio: number) {
    this.reservationInfo[this.roomIndex].folio = folio
  }

  setShowCategories(value: boolean) {
    this.showCategorie = value
  }

  resetBooking(): void {
    const resetedRooms = RoomFactory()
    this.booking = BookingFactory()
    this.setRooms(resetedRooms)
    this.setRoom(resetedRooms[0], 0)
    this.resetWidget = true
  }

  widgetReseted(): void {
    this.resetWidget = false
  }

  public categoriesTwoDeleteOnPair: string[] = [
    'PS1',
    'SUPF1',
    'GP1',
    'S1',
    'D1K',
    'PG1',
    'N1',
    'PS2',
    'SUPF2',
    'GP2',
    'S2',
    'D2K',
    'PG2',
    'N2'
  ]

  get allRooms() {
    return this.rooms
  }

  get isPresidentialFlow() {
    return this.presidentialFlow
  }

  set isPresidentialFlow(value: boolean) {
    this.presidentialFlow = value
  }

  get showCategories() {
    return this.showCategorie
  }

  get reservation() {
    return this.reservationInfo
  }

  get isMultipleRoomFlow() {
    return this.reservation.length > 1 || this.reservationFromBookings.length > 1
  }

  // Bonus week
  get usedReferrals() {
    try {
      return this.reservationInfo[this.currentRoomIndex]?.selectedReferrals || []
    } catch (error) {
      return []
    }
  }

  get allUsedReferrals() {
    let allReferrals: ReservationReferral[] = []

    for (const reservation of this.reservationInfo) {
      if (reservation.selectedReferrals)
        allReferrals = allReferrals.concat(reservation.selectedReferrals)
    }

    return allReferrals
  }

  // Bonus week
  get activeReferrals() {
    return this.applicableReferrals
  }

  get allGuestsInReservation() {
    return this.reservationInfo.flatMap(room => room.guests)
  }

  get allBenefitsInReservation() {
    return this.reservationInfo.flatMap(room => room.benefits)
  }

  get referralPromotions() {
    return this.referralPromotionsBenefits
  }

  get bookingRooms() {
    return this.booking.rooms
  }

  get allProvisions() {
    return this.provitions
  }

  get infoUserMember() {
    return this.$nuxt.$pinia.state.value.authStore.user
  }

  ownersMembers!: any

  get reservationsResponse() {
    return this.reservationResponse
  }

  get getbookingpropertyCode() {
    return this.getBooking.propertyCode
  }

  get isSkeleton() {
    return this.skeleton
  }

  get referralPromo() {
    return this.referralPromotion
  }

  get accessRoom() {
    return this.roomsToBook
  }

  get minimunStay() {
    return this.minStays
  }

  get isCurrentRoomWithNullGuest() {
    return (
      this.reservationInfo.length === 0 ||
      this.reservationInfo[this.currentRoomIndex].guests.length === 0 ||
      // @ts-ignore
      this.reservation[this.currentRoomIndex].guests.includes(null)
    )
  }

  get currentRoomIndex() {
    return this.roomIndex
  }

  get isLoading() {
    return this.loading
  }

  get getTotalReferalFee() {
    return this.reservationInfo.reduce(
      (sum, room) =>
        sum +
        calculateRoomRefferalFee({
          room,
          referralScheme: this.referralScheme,
          referralProgram: this.referralProgram
        }),
      0
    )
  }

  get getTotalExtraFee() {
    return this.reservationInfo.reduce((acc, room) => {
      return acc + calculateRoomImperialFee(room)
    }, 0)
  }

  get getTotalReservationWithFee() {
    return (
      this.getTotalExtraFee +
      this.getTotalReservationPrice +
      this.getTotalSupplementFee +
      this.getTotalReferalFee
    )
  }

  get getTotalSupplementFee() {
    return this.reservationInfo.reduce((acc, room) => {
      let imperial = 0
      let imperialLeblancFee = 0
      if (room.imperialTotalRate) {
        imperial = room.imperialTotalRate?.imperialFee || 0
        imperialLeblancFee = room.imperialTotalRate?.imperialLeblancFee || 0
      }
      return imperial + imperialLeblancFee + acc
    }, 0)
  }

  get getTotalReservationPrice() {
    return this.reservationInfo.length > 0
      ? this.reservationInfo.reduce((acc, room) => {
          return acc + this.getTotalReservationPriceOnRoom(room.index) || 0
        }, 0)
      : this.reservationFromBookings.reduce((acc, room) => {
          return acc + Math.ceil(room.roomSelected?.selectedOption?.rate || 0)
        }, 0)
  }

  get getSubTotalReservationPrice() {
    return this.reservationInfo.reduce((acc, room) => {
      if (room.status === PaymentStatus.NotPaid) {
        return acc + this.getTotalReservationPriceOnRoom(room.index) || 0
      }
      return acc
    }, 0)
  }

  public get getBooking() {
    return this.booking
  }

  get reservationsReferrals() {
    return this.provitions != null ? this.provitions.ReservationsReferrals.RmfolioPromotion : []
  }

  get affiliationNumber() {
    return this.$nuxt.$pinia.state.value.authStore.user._UserMember._application
  }

  get referralScheme() {
    return this.$nuxt.$pinia.state.value.authStore.loggedUser?.MemberExtension._ReferralScheme
  }

  get userInfo() {
    return this.$nuxt.$pinia.state.value.authStore.user
  }

  get skeletonList() {
    return this.skeletonArray
  }

  removeRoom() {
    this.reservationInfo[this.roomIndex].roomSelected = null
    this.reservationInfo[this.roomIndex].guests = []
    this.reservationInfo[this.roomIndex].benefits = []
    this.reservationInfo[this.roomIndex].imperialTotalRate = null
    this.reservationInfo[this.roomIndex].selectedReferrals = []
    this.reservationInfo[this.roomIndex].savedXAmount = 0
  }

  public async getReservationRate(roomCode: any) {
    const {checkIn, checkOut} = this.booking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

    const reservation = this.reservationInfo[0]

    const refundableOption = true

    const country = this.$nuxt.$pinia.state.value.authStore.loggedUser.MemberExtension._clave_pais

    const promotionRate = await this.getReservationPromotionRate.run(
      roomCode as any,
      nights,
      this.infoUserMember._UserMember._application,
      this.infoUserMember._UserMember._company,
      this.booking.propertyCode,
      this.booking.checkIn,
      this.booking.checkOut,
      // @ts-ignore
      6,
      refundableOption,
      'AIWK',
      this.infoUserMember._UserMember._isnational,
      reservation.roomsPax.adults,
      reservation.roomsPax.children,
      this.infoUserMember._Market,
      country
    )
    return promotionRate
  }

  public async getReservationRateGeneric(roomCode: any, typeOfReservation: number, event: any) {
    const {checkIn, checkOut} = this.booking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    const reservation = this.reservationInfo[0]
    const refundableOption = true
    const reservationType = typeOfReservation //
    const promotionId = event.provision.raw
      ? event.provision.raw.TYPE
      : event.provision.nights[0].raw.TYPE // TBD type:
    const golfType = 'AINC' // TBD
    const reservationCostType = 'V' // V = Variable - F = Fija -
    const provisionGold = 'g' // S = Silver G = Gold
    const productId = ''
    const marketAll = typeOfReservation === ReservationTypes.INCENTIVA ? 'AllINC' : '' // "AllINC"
    const country = this.$nuxt.$pinia.state.value.authStore.loggedUser.MemberExtension._clave_pais
    const promotions = this.specialRatesPromotion
    const type = '' // Type es N o W (nights o weeksz

    const promotionRate = await this.getReservationPromotionRate.run(
      roomCode as any,
      nights,
      this.infoUserMember._UserMember._application,
      this.infoUserMember._UserMember._company,
      this.booking.propertyCode,
      this.booking.checkIn,
      this.booking.checkOut,
      reservationType,
      refundableOption,
      productId,
      this.infoUserMember._UserMember._isnational,
      reservation.roomsPax.adults,
      reservation.roomsPax.children,
      this.infoUserMember._Market,
      country,
      golfType,
      promotionId,
      reservationCostType,
      provisionGold,
      marketAll,
      type,
      promotions
    )
    return promotionRate
  }

  public async createNewReservation() {
    let reservations: RoomFolio[] | any = []

    try {
      reservations = await this.createReservationFolios()
    } catch (err: any) {
      throw new Error('Has an unexpected error during createReservationFolios!')
    }
    const notes = reservations.map((reservation: any) => {
      return {
        Hotel: reservation.Hotel,
        Folio: reservation.Folio,
        Code: 'RSV',
        Description: '@@NS', // @@NS => No smoking | @@SM => Smoking
        opr: 'SYS'
      }
    })

    const reservationPromises = []

    for (let index = 0; index < this.reservationInfo.length; index++) {
      const currentReservation = this.reservationInfo[index]

      if (
        index > 0 &&
        this.reservationInfo[index - 1].roomSelected?.selectedCategory.relRoomsCodes !== ''
      ) {
        continue
      }

      const reservationBonoValid = reservations[0].ReservationBonoValid

      /*if (reservations.find((reservation: RoomFolio) => reservation.Rm_type === "SUPF1")) {
        recNumPromotions.push(0);
      }*/

      const payload: CreateNewReservationDto = {
        application: this.infoUserMember._UserMember._application,
        company: this.infoUserMember._UserMember._company,
        isNational: this.infoUserMember._UserMember._isnational,
        useRateCodeProcess: true,
        infoRmFolio: {
          Reservations: [reservations[index]],
          IsOverride: false,
          Notes: [notes[index]],
          IsNational: this.infoUserMember._UserMember._isnational,
          KeyRestrictionForReservation: {
            requiredPasswordToValidateAvailForescast: true,
            passwordToValidateAvailForescast: '',
            requiredPasswordToValidatedAvail: true,
            passwordToValidateAvail: '',
            requiredPasswordToDuplicateReservation: true,
            passwordToDuplicateReservation: ''
          },
          ReservationBonoValid: reservationBonoValid,
          RecnumPromotions: generateRecnumPromotions({
            room: currentReservation,
            referralPromotionsBenefits: this.referralPromotionsBenefits[0]?.PromotionMemberId ?? 0
          })
        }
      }

      if (
        currentReservation.roomSelected?.selectedCategory.relRoomsCodes !== '' &&
        !currentReservation.isLockOff
      ) {
        payload.infoRmFolio.Reservations.push(reservations[index + 1])
        const familyCodes = ['SUPF1']
        if (
          familyCodes.includes(currentReservation.roomSelected?.selectedCategory.RealCode || '')
        ) {
          payload.infoRmFolio.RecnumPromotions.push(0)
        } else {
          payload.infoRmFolio.RecnumPromotions.push(
            ...generateRecnumPromotions({
              room: this.reservationInfo[index + 1],
              referralPromotionsBenefits: this.referralPromotionsBenefits[0]?.PromotionMemberId ?? 0
            })
          )
        }
      }

      const reservaResponse = this.reservationRepository.createNewReservation(payload)

      reservationPromises.push(reservaResponse)
    }

    this.promiseAllReservationsResults = await Promise.allSettled(reservationPromises)

    for (let index = 0; index < this.promiseAllReservationsResults.length; index++) {
      const resolvePromise = this.promiseAllReservationsResults[index]

      const actualRoomCode =
        this.reservationInfo[index].roomSelected?.selectedCategory.RealCode ?? ''

      if (
        this.reservationInfo[index].roomSelected?.selectedCategory.relRoomsCodes !== '' &&
        LockOffRoomAccessCode.includes(actualRoomCode) &&
        !this.reservationInfo[index].isLockOff
      ) {
        if (resolvePromise.status === PromiseAllSettled.FULFILLED) {
          this.reservationInfo[index + 1].folio = resolvePromise.value.Reservations[1].Folio
          persistence.save(this)
        }
      }

      if (resolvePromise.status === PromiseAllSettled.FULFILLED) {
        this.reservationInfo[index].folio = resolvePromise.value.Reservations[0].Folio
        // @ts-ignore
        this.reservationByPay = resolvePromise.value.Reservations[0]

        persistence.save(this)
      }
    }

    this.promiseAllReservationsResults.filter(responseResult => {
      return {
        rejecteds: responseResult.status === PromiseAllSettled.REJECTED,
        fulfilleds: responseResult.status === PromiseAllSettled.FULFILLED
      }
    })

    // this.promiseAllReservationsResults = await Promise.allSettled(
    //   this.reservationInfo.map(async (reservation1, index) => {
    //     const payload: CreateNewReservationDto = {
    //       application: this.infoUserMember._UserMember._application,
    //       company: this.infoUserMember._UserMember._company,
    //       isNational: this.infoUserMember._UserMember._isnational,
    //       useRateCodeProcess: true,
    //       infoRmFolio: {
    //         Reservations: [reservations[reservation1.index]],
    //         IsOverride: false,
    //         Notes: [notes[reservation1.index]],
    //         IsNational: this.infoUserMember._UserMember._isnational,
    //         KeyRestrictionForReservation: {
    //           requiredPasswordToValidateAvailForescast: true,
    //           passwordToValidateAvailForescast: '',
    //           requiredPasswordToValidatedAvail: true,
    //           passwordToValidateAvail: '',
    //           requiredPasswordToDuplicateReservation: true,
    //           passwordToDuplicateReservation: ''
    //         },
    //         RecnumPromotions: recNumPromotions
    //       }
    //     }

    //     const reservaResponse = await this.reservationRepository.createNewReservation(payload)

    //     if (reservaResponse) {
    //       this.reservationInfo[reservation1.index].folio = reservaResponse.Reservations[0].Folio
    //       this.reservationResponse = true
    //       persistence.save(this)
    //     }
    //     return reservaResponse
    //   })
    // ).then(results => {
    //   return results.filter(responseResult => {
    //     return {
    //       rejecteds: responseResult.status === PromiseAllSettled.REJECTED,
    //       fulfilleds: responseResult.status === PromiseAllSettled.FULFILLED
    //     }
    //   })
    // })

    // if (this.flowPlaceOnHolder) {
    //   // @ts-ignore
    //   if (reservationTotal === 0) {
    //     // @ts-ignore
    //     this.$router.push('/booking-confirmation')
    //     return true
    //   }
    //   // @ts-ignore
    //   this.$router.push(this.localePath('/bookings'))
    //   return true
    // }
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  public checkIfIsReferralPromotion(promotion: any) {
    if (promotion != null) {
      return (
        promotion.Benefit === ReferralProgramType.RESORT_CREDIT ||
        promotion.Benefit === ReferralProgramType.UNIVERSAL_CREDIT
      )
    } else return 0
  }

  public getReservation(payload: PayloadGetReservation): Promise<Response<GetBookingDto>> {
    return this.getReservationUseCase.run(payload)
  }

  setIdImperial(id: any) {
    this.reservationInfo[this.roomIndex].roomSelected!.selectedOption!.id = id
  }

  public async createReservationFolios() {
    try {
      const isMulticategoryEngine = false
      const {checkIn, checkOut} = this.booking
      const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())

      const roomCodes = this.reservationInfo.map(reservation => {
        return reservation.roomSelected?.selectedCategory.RealCode
      })

      const refundableOptions = this.reservationInfo.map(reservation => {
        return reservation.roomSelected?.selectedRefundRate === RefundableOptions.REFUNDABLE
      })

      const reservationFolios: RoomFolio[] = []

      for (const [index, element] of this.reservationInfo.entries()) {
        const {rmFolio, context, isProvisional, isImperial} = await this.createRoomFolio(
          element,
          roomCodes,
          refundableOptions,
          nights,
          isMulticategoryEngine,
          index
        )
        /*
        if (2 === 2) {
          return;
        } */

        if (element.roomSelected?.selectedOption?.id === ReservationTypes.BONO) {
          rmFolio!.ReferidosBonpel = element.selectedReferrals
          rmFolio!.ReservationBonoValid = {
            HotelResvUnlocked: element.transferableBonus?.hotel,
            FolioResvUnlocked: element.transferableBonus?.folio,
            Application: this.infoUserMember._UserMember._application,
            Company: this.infoUserMember._UserMember._company,
            HotelResvBono: element.transferableBonus?.hotel // TODO: verify
          }
        }

        reservationFolios.push(rmFolio!)
        // @ts-ignore
        element.reservationFolioData = rmFolio!

        if (isProvisional || isImperial) {
          let provition: any = {}

          // @ts-ignore
          if (element.roomSelected!.selectedOption.id === ReservationTypes.ANIVERSARIO) {
            if (
              this.reservationInfo[index].roomSelected?.provisions?.anniversary?.provision?.type ===
              ProvitionOptionType.Week
            ) {
              provition =
                this.reservationInfo[index].roomSelected?.provisions?.anniversary?.provision.raw
            } else {
              // @ts-ignore
              provition =
                // @ts-ignore
                this.reservationInfo[index].roomSelected?.provisions?.anniversary?.provision
                  ?.nights[0]?.raw
            }
            // provition = currentProvitionMock[0]
            // @ts-ignore
          } else if (element.roomSelected!.selectedOption?.id === ReservationTypes.INCENTIVA) {
            provition = element.roomSelected?.provisions?.incentive?.provision.raw

            /* debugger */
            // provition = currentIncentiveProvisionMock[0]
          } else {
            provition = element.roomSelected!.selectedProvition
          }

          provition.HOTEL = context.Hotel
          provition.RM_TYPE = context.rm_type
          provition.APPLICATION = context.Member
          provition.ARV_DATE = rmFolio!.Arv_date
          provition.HOTFOLIO = rmFolio!.Folio
          provition.STATUS = 'R'

          if (isProvisional && element.roomSelected?.provisions?.anniversary !== undefined) {
            if (
              element.roomSelected?.provisions?.anniversary?.provision?.type ===
              ProvitionOptionType.Night
            ) {
              const copyFromProvisions = structuredClone(
                element.roomSelected?.provisions?.anniversary?.provision.nights
              )

              // @ts-ignore
              for (const copyFromProvision of copyFromProvisions) {
                const rawProvision = copyFromProvision.raw

                rawProvision.HOTEL = context.Hotel
                rawProvision.RM_TYPE = context.rm_type
                rawProvision.APPLICATION = context.Member
                rawProvision.ARV_DATE = rmFolio!.Arv_date
                rawProvision.HOTFOLIO = rmFolio!.Folio
                rawProvision.STATUS = 'R'

                await this.preAssignProvisionToMember(rmFolio!, context, rawProvision)
              }
            } else {
              await this.preAssignProvisionToMember(rmFolio!, context, provition)
            }
          }

          if (isImperial && element.folio === 0) {
            let provitions: any = []

            provitions = element.roomSelected?.selectedCombination?.Provisions?.map(
              provitionNight => {
                provitionNight.HOTEL = context.Hotel
                provitionNight.RM_TYPE = context.rm_type
                provitionNight.APPLICATION = context.Member
                provitionNight.ARV_DATE = rmFolio!.Arv_date as any
                provitionNight.HOTFOLIO = rmFolio!.Folio
                provitionNight.STATUS = 'R'

                return provitionNight
              }
            )

            await this.preAssignCombinationToMember(
              rmFolio!,
              provitions,
              this.infoUserMember._UserMember._isnational,
              Number(context.ModeReservation),
              context.Member,
              context.Company
            )
          }
        }
        /* debugger */

        if (element.roomSelected?.selectedCategory.RealCode === 'SUPF1') {
          const result = await this.createRmFolioFamilyPartTwo(
            JSON.parse(JSON.stringify(rmFolio!)),
            element.eliteProduct
          )
          reservationFolios.push(result)
        }
      }

      return reservationFolios
    } catch (e) {
      //console.log('error',e)
    }
  }

  public async getPreferentialRatesForFamilyPartTwo(
    afilliation: string,
    isNational: boolean,
    productId: string,
    rmFolio: RoomFolio
  ) {
    const productIdResult = await this.evaluateDefaultGolfPolicy(BookingCategoryStatus.PREFERENCIAL)
    const response: any = await this.contractByPromotionServiceRepository.getContractByPromotion({
      adult: rmFolio.Adult,
      afilliation,
      // @ts-ignore
      checkInEpoch: toEpochTimeStamp(rmFolio.Arv_date),
      // @ts-ignore
      checkOutEpoch: toEpochTimeStamp(rmFolio.Depart_dt),
      child: rmFolio.Child,
      company: rmFolio.Co,
      hotelCode: rmFolio.Hotel,
      isNational,
      isRefundable: rmFolio.Refundable,
      nights: rmFolio.Nights,
      productId,
      promotions: this.specialRatesPromotions,
      reservationType: 2,
      roomCode: 'SUPF2'
    })

    return response.data.data.RCDetail[0].RmfolioRc
  }

  public async createRmFolioFamilyPartTwo(supRmFolio: RoomFolio, productId: string) {
    const rmFolio = new RoomFolio()
    const rates = await this.getPreferentialRatesForFamilyPartTwo(
      this.infoUserMember._UserMember._application,
      this.infoUserMember._UserMember._isNational,
      productId,
      supRmFolio
    )

    rmFolio.Agency_cd = getAgency(
      this.infoUserMember._UserMember._isnational,
      false,
      'SUPF1',
      1,
      [],
      'SUPF1',
      2,
      [],
      'SUPF1'
    )
    rmFolio.Hotel = supRmFolio.Hotel
    rmFolio.Arv_date = supRmFolio.Arv_date
    rmFolio.Bed = supRmFolio.Bed
    rmFolio.Co = supRmFolio.Co
    rmFolio.Company = supRmFolio.Company
    rmFolio.Contract = rates[0].RateCodeCLV
    rmFolio.ContractCategoryId = 2
    rmFolio.Depart_dt = supRmFolio.Depart_dt
    rmFolio.Deposit = supRmFolio.Deposit
    rmFolio.Country = supRmFolio.Country
    rmFolio.Deposit = 0

    rmFolio.Extension = supRmFolio.Extension
    rmFolio.Extension.AdditionalCost = 0
    rmFolio.Extension.AditionalCharges = 0
    rmFolio.Extension.AmountOutOfSeason = 0
    rmFolio.Extension.AmountThanksGiving = 0
    rmFolio.Extension.Folio = 0
    rmFolio.Extension.MarketExtra = ''
    rmFolio.Extension.RateTypeExtra = ''
    rmFolio.Extension.ProvisionToChange = ''
    rmFolio.Extension.TotalProvisToChange = 0
    rmFolio.Extension.TotalProvisToChangeComplement = 0
    rmFolio.Extension.TypeCombination = ''
    rmFolio.Extension.RsvCategory = 2
    rmFolio.First_name = supRmFolio.First_name
    rmFolio.Guest_cd = supRmFolio.Guest_cd
    rmFolio.Last_name = supRmFolio.Last_name
    rmFolio.Mail_name = supRmFolio.Mail_name
    // @ts-ignore
    rmFolio.Credit_lmt = 0
    rmFolio.Member = supRmFolio.Member
    rmFolio.Nights = supRmFolio.Nights
    rmFolio.RateCodeRsvPromotion = supRmFolio.RateCodeRsvPromotion
    rmFolio.Ref = supRmFolio.Ref
    rmFolio.Refundable = supRmFolio.Refundable
    rmFolio.Rel_folio = 0
    rmFolio.Rm_type = 'SUPF2'
    rmFolio.Status = 'R'
    rmFolio.Type = 'R'
    rmFolio.Week = supRmFolio.Week
    rmFolio.Year = supRmFolio.Year
    rmFolio.Rate1_from = supRmFolio.Rate1_from
    rmFolio.Rate1_to = supRmFolio.Rate1_to
    rmFolio.Lang = supRmFolio.Lang
    rmFolio.Club_stat = supRmFolio.Club_stat
    rmFolio.Phone = supRmFolio.Phone
    rmFolio.Zip = supRmFolio.Zip
    rmFolio.Rooms = 1
    rmFolio.Nationality = supRmFolio.Nationality
    rmFolio.Mkt_seg = supRmFolio.Mkt_seg
    rmFolio.ReferidosBonpel = null
    rmFolio.RateCodeDetails = rates
    return rmFolio
  }

  public desPreAssignProvisionMember(value: any) {
    return this.reservationRepository.desPreAssignProvision(value)
  }

  public preAssignProvisionToMember(rmFolio: any, context: Context, provition: any) {
    return this.reservationRepository.preAssignProvisionToMember(
      rmFolio!,
      context.Member,
      context.Company,
      Number(context.ModeReservation),
      this.infoUserMember._UserMember._isnational,
      provition,
      this.infoUserMember._Market
    )
  }

  public preAssignCombinationToMember(
    roomFolio: RoomFolio,
    provision: any,
    isNational: boolean,
    allot3: ReservationTypes,
    application: string,
    company: number,
    callWithNull: boolean = false
  ) {
    return this.reservationRepository.preAssignCombinationsMember(
      roomFolio,
      provision,
      isNational,
      allot3,
      application,
      company,
      this.infoUserMember._Market,
      callWithNull
    )
  }

  public getMemberAccess(memberLevel: string): string {
    const _IndividualLevel = ['BE', 'E', 'N', 'NE', 'JX', 'TR', '']

    const VALevels = ['BV', 'VV', 'VD', 'GD']
    const VCLevels = ['V', 'GV', 'PS']

    if (VALevels.includes(memberLevel)) {
      return 'VA'
    } else if (memberLevel === 'RE' || memberLevel === 'BR') {
      return 'VR'
    } else if (VCLevels.includes(memberLevel)) {
      return 'VC'
    } else if (memberLevel === 'VS' || memberLevel === 'VD') {
      return 'VD'
    } else if (_IndividualLevel.indexOf(memberLevel)) {
      return 'I'
    } else {
      return memberLevel
    }
  }

  public async createRoomFolio(
    element: any,
    roomCodes: any,
    refundableOptions: any,
    nights: number,
    isMulticategoryEngine: boolean,
    index: number
  ) {
    let folio = 0
    let multiSelectedProvision: any = ['', '', '', '']

    const country = this.$nuxt.$pinia.state.value.authStore.loggedUser.MemberExtension._clave_pais

    let ToProvisionId = ''

    let selectedGolf = ''
    try {
      selectedGolf = element.benefits.find((benefit: any) =>
        benefit.benefitName.toLowerCase.includes('golf')
      )
    } catch (error) {}

    if (element.roomSelected?.selectedOption.code === 'IMP_WEEKS') {
      ToProvisionId = element.roomSelected.selectedCombination.ToProvisionId
    }

    const getContractByPromotionStore = new GetContractByPromotionArrayStore()

    const payload = getContractByPromotionStore.getContractByPromotionArrayPayload({
      index
    })

    // @TODO - Promotion forced due to baglioni integration
    if (baglioniCodes.includes(this.getbookingpropertyCode)) {
      this.specialRatesPromotions.push({
        Recnum: 100000,
        PromotionConfiguration: {
          Recnum: 24,
          RecnumPromo: 27,
          ParamsClever: '{ "PromotionClb" : "EMPTY" }',
          ParamsOpera: '',
          Status: 'A'
        }
      })
    }

    const [reservationRateCodes, promotionCurrent, contract, promotionList] =
      await this.createReservationRateCodes.run(
        payload,
        roomCodes as any,
        nights,
        this.infoUserMember._UserMember._application,
        this.infoUserMember._UserMember._company,
        this.booking.propertyCode,
        this.booking.checkIn,
        this.booking.checkOut,
        // @ts-ignore
        element.roomSelected?.selectedOption.id,
        refundableOptions,
        // @ts-ignore
        this.getProvisionFromCurrentRoom(element) !== null
          ? this.getProvisionFromCurrentRoom(element)!.TYPE
          : '',
        // @ts-ignore
        // element.roomSelected!.selectedOption.id === ReservationTypes.ANIVERSARIO
        //   ? anniversaryProvisionMock.TYPE
        //   : this.reservationInfo[this.currentRoomIndex].roomSelected?.provisions?.incentive?.provision.raw.TYPE,
        element.eliteProduct,
        // 'AIWK', // Category de la provision raw, tentativamente
        this.infoUserMember._UserMember._isnational,
        element.roomsPax.adults,
        element.roomsPax.children,
        this.infoUserMember._Market,
        country,
        element.roomSelected!.selectedOption.code,
        ToProvisionId,
        this.specialRatesPromotions // aqui van las promociones
      )

    const isProvisional = // @ts-ignore
      element.roomSelected!.selectedOption.id === ReservationTypes.INCENTIVA ||
      // @ts-ignore
      element.roomSelected!.selectedOption.id === ReservationTypes.ANIVERSARIO

    const isImperial =
      // @ts-ignore
      element.roomSelected!.selectedOption!.id === ReservationTypes.IMP_NIGHT ||
      // @ts-ignore
      element.roomSelected!.selectedOption.id === ReservationTypes.IMP_WEEKS

    const isReferral = element.roomSelected!.selectedOption!.code === BookingCategoryStatus.REFERIDO

    const agency = GetAgency(
      1,
      element.roomSelected!.selectedCategory.RealCode,
      // @ts-ignore
      element.roomSelected?.selectedOption.id,
      isMulticategoryEngine,
      this.userMapper.map(this.infoUserMember),
      '',
      '',
      [this.getProvisionFromCurrentRoom(element), false, false, false],
      // currentProvitionMock,
      []
    )

    if (this.reservationInfo[this.roomIndex].folio !== 0) {
      folio = element.folio
    }

    if (isProvisional || (isImperial && this.reservationInfo[this.roomIndex].folio === 0)) {
      const responseFromNext = await this.getNextReservationFolioByHotel.run(
        element.roomSelected!.selectedCategory.hotel
      )

      folio = responseFromNext.folio
    }

    if (isProvisional) {
      // @ts-ignore
      multiSelectedProvision = [this.getProvisionFromCurrentRoom(element)]
      // if (element.roomSelected!.selectedOption.id === ReservationTypes.ANIVERSARIO) {
      //   multiSelectedProvision = anniversaryProvisionMock
      // } else {
      //   multiSelectedProvision = incentiveProvisionMock
      // }

      const d = await this.getExistsContractMappedProvision.run({
        contract,
        isNational: this.infoUserMember._UserMember._isnational,
        hotel: element.roomSelected!.selectedCategory.hotel,
        rmType: element.roomSelected!.selectedCategory.RealCode,
        agencyCd: agency
      })

      // console.log(d)
    }

    const isBenefitRef: any = []
    let selectedBenefit: any

    // reglas de Referido por estancias minimas
    const referralPromotion =
      nights >= (this.referralPromotion?.DaysByReferralMinimumStay || 0) &&
      nights < (this.referralPromotion?.DaysByReferralRegularStay || 0)
        ? this.referralPromotion?.DaysForAward || 0
        : this.referralPromotion?.Quantity || 0

    // @ts-ignore
    if (element.roomSelected!.selectedOption.id === ReservationTypes.REFERIDOS) {
      const isPromotionReferralBenefit = this.checkIfIsReferralPromotion(this.referralPromotion)

      isBenefitRef[element.roomSelected!.selectedCategory.RealCode] = isPromotionReferralBenefit

      selectedBenefit = isPromotionReferralBenefit ? referralPromotion : undefined
    }

    const extentions = [{}, {}, {}, {}]

    const {roomsPax, combinations, guests, roomSelected, imperialTotalRate} = element

    const mainGuest = guests[0]

    let totalRate = roomSelected!.selectedOption!.rate!

    if (isReferral) {
      totalRate += this.referralProgram!.fee
    }

    if (roomSelected!.selectedOption!.code === BookingCategoryStatus.BONO) {
      totalRate = roomSelected!.selectedOption!.bonusRate
    }

    const marketFee = calculateRoomRefferalFee({
      room: element,
      referralScheme: this.referralScheme,
      referralProgram: this.referralProgram
    })

    const Week52Fee =
      element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.week52Fee || 0

    const imperialLeblancFee =
      element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.imperialLeblancFee || 0

    const imperialFee =
      element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.imperialFee || 0

    const imperialRate =
      element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.Rate || 0

    const imperialDeposit = Week52Fee + imperialLeblancFee + imperialFee + imperialRate

    // debugger

    const bookingGolfStore = new BookingGolfStore()

    if (isImperial) {
      combinations[0] = {
        Idcombination: roomSelected.selectedCombination.CombinationId,
        ProvisionId: roomSelected.selectedCombination.ProvisionId,
        ProvisionToChange: roomSelected.selectedCombination.ToProvisionId,
        ProvisionToChangeComplement: '',
        TotalProvisToChange: roomSelected.selectedCombination.ToProvisionQuantity,
        TotalProvisToChangeComplement: '0',
        TypeCombination: roomSelected.selectedCombination.Type,
        AdditionalCost: imperialLeblancFee + imperialFee,
        GolfType: bookingGolfStore.golfType(roomSelected.selectedProvition),
        ULGAMOUNT: roomSelected.selectedProvition.ULG_AMOUNT,
        TypeProvision: roomSelected!.selectedOption!.id,
        PromotionId: 0
      }
    }

    const {
      Rate,
      AmountResortAccess,
      AmountWeek52,
      AmountChargeUpgrade,
      AmountPromotion,
      AmountThanksGivingDay,
      AmountOutOfSeason
    } = this.getTotalOnRcDetail(promotionList)

    const totalImperialDeposit =
      Rate +
      AmountResortAccess +
      AmountWeek52 +
      AmountPromotion +
      imperialLeblancFee +
      imperialFee +
      AmountChargeUpgrade +
      AmountThanksGivingDay +
      AmountOutOfSeason

    const totalBenefitsPrice =
      element?.benefits?.reduce(
        (acc: number, benefit: RoomBenefit) => acc + benefit?.totalPrice,
        0
      ) || 0

    // debugger

    const depositTotal = isImperial
      ? totalImperialDeposit
      : this.getTotalOnRcDetail(promotionList).Rate

    let AditionalCharges = 0

    // TODO si existe un cargo para actualizar habitación, modificar amountUpgrade
    let amountUpgrade = 0

    if (roomSelected!.selectedOption!.code === BookingCategoryStatus.BONO) {
      amountUpgrade = roomSelected.amountUpgrade
    } else if (isImperial)
      amountUpgrade = imperialTotalRate !== null ? imperialTotalRate.AmountChargeUpgrade : 0

    const context: Context = {
      selectBenefit: selectedBenefit,
      marketFee,
      adults: roomsPax.adults,
      childs: roomsPax.children,
      Hotel: roomSelected!.selectedCategory.hotel,
      Index: 1,
      RoomAccess: this.roomAccessMapper.map(this.rooms),
      rm_type: roomSelected!.selectedCategory.RealCode,
      Nights: nights,
      Refundable: roomSelected!.selectedRefundRate === RefundableOptions.REFUNDABLE,
      ArrivalDateStr: this.booking.checkIn,
      DepartureDateStr: this.booking.checkOut,
      Application: this.infoUserMember._UserMember._application,
      Lang: this.infoUserMember._UserMember._lang,
      IsVilla: false,
      IsLockOff: element.isLockOff,
      IsFamily: roomSelected.selectedCategory!.RealCode === 'SUPF1',
      // IsPresidential: ['GP1', 'PS1', 'GP2', 'PS2'].includes(roomSelected.selectedCategory!.RealCode),
      IsPresidential: false,
      // @ts-ignore
      ModeReservation: roomSelected!.selectedOption.id,
      MarketContractDefault: this.infoUserMember._Market,
      Nationality: this.infoUserMember._UserMember._culture,
      Company: this.infoUserMember._UserMember._company,
      DdlstGuestCd: this.getMemberAccess(this.infoUserMember._UserMember._membershiplevel),
      Folio: folio,
      Rate: this.getTotalOnRcDetail(promotionList).Rate,
      Deposit: depositTotal + totalBenefitsPrice,
      // Si eres invitado o socio | Titular es el que determina el tipo de perfil - relationship
      TxtReference:
        mainGuest !== undefined && mainGuest.memberUtils !== undefined
          ? mainGuest.memberUtils.relationship === 4
            ? GuestRelationship.Guest
            : GuestRelationship.Member
          : GuestRelationship.Guest,
      DdlstStatusReservation: 'R',
      DdlstTypeResevation: 'R',
      Lmt_date: undefined, // No sirven
      Credit_lmt: 0, // No sirven
      Share: '', // INFORMATIVO
      // @ts-ignore
      State: mainGuest !== undefined ? mainGuest.memberUtils.State : '',
      TxtFirstName: mainGuest !== undefined ? mainGuest.memberUtils.firstname : '',
      Country: mainGuest !== undefined ? mainGuest.memberUtils.Country : '',
      Zip: mainGuest !== undefined ? mainGuest.memberUtils.Zip : '',
      City: mainGuest !== undefined ? mainGuest.memberUtils.City : '',
      // @ts-ignore
      Address: mainGuest !== undefined ? mainGuest.memberUtils.Address : '',
      TxtEMail: mainGuest !== undefined ? mainGuest.memberUtils.email : '',
      Phone: mainGuest !== undefined ? mainGuest.memberUtils.mobilePhone : '',
      TxtLastName: mainGuest !== undefined ? mainGuest.memberUtils.lastname : '',

      /**
       * Se llenan con la info de get contract by promotion
       * Cargos adicionales
       * ok
       */
      Chg_amt1: element.imperialTotalRate?.AmountWeek52,
      Chg_amt2: 0,
      Chg_amt3: amountUpgrade,

      Chg_cd1: '',
      Chg_cd2: '',
      Chg_cd3: '',

      Pay_cd1: '',
      Pay_cd2: '',
      Pay_cd3: '',

      Pay_amt1: 0,
      Pay_amt2: 0,
      Pay_amt3: 0,

      co_id: '', // NO SIRVE
      Id: '', // NO SIRVE
      FolioOpera: 0,
      _Reservation: [],
      Week: GetWeekOfYear(this.booking.checkIn),
      Year: String(dayjs(this.booking.checkIn).get('year')),
      companions: guests, // Faltan datos, formato de company, id opera, etc
      Member: this.infoUserMember._UserMember._application,
      _reservationsSelected: 0,
      _SelectedProvisions: 0,
      _UseTemporalBenefit: false,
      AmountOutOfSeason:
        element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.AmountOutOfSeason || 0,
      OmitModeReservation: false,
      OmitCheckPaxFree: false,
      CustomReservation: roomSelected!.selectedOption.id,
      points: 0, // SIEMPRE ES 0
      __currentProvision: [this.getProvisionFromCurrentRoom(element), false, false, false],
      _CurrentSuiteMultiCategory: '',
      RmCompany: undefined, // NO SIRVE: EL LEGADO LE DA UN VALOR E IGNORA ESTE
      _RoomTypesRelated: [],
      AmountThanksGiving:
        element.imperialTotalRate == null ? 0 : element.imperialTotalRate?.AmountThanksGiving || 0,
      Rel_folio: 0,
      AditionalCharges,
      eliteProductType: element.eliteProductType
    }

    let promotions: any = mapTransportationPromo({
      room: element,
      provitionsPromotions: this.provitions.Promotions
    })
    // const promotionsX = this.provitions.Promotions.find(item => {})

    const promotionsFilters = promotions.filter((element: any) => {
      return element !== undefined
    })

    const promotionListMapped = this.specialRatesPromotions.map((promotionTemp: any) =>
      this.mapPromotions(promotionTemp, this.$nuxt.$pinia.state.value.authStore.isNational)
    )

    promotions = [...promotionListMapped, ...promotionsFilters]

    const rmFolio = this.createReservation.run(
      context,
      combinations,
      multiSelectedProvision, // array de provision [aniversario - incentivo]
      roomSelected!.selectedRefundRate !== RefundableOptions.REFUNDABLE,
      [{}, {}, {}, {}],
      {},
      PreferentialRatesMock, // Solo cambia en rewards y no sirve - Se queda asi
      isMulticategoryEngine,
      this.userMapper.map(this.infoUserMember),
      extentions,
      [false, false, false, false],
      PaxIndexedReservationMock, // Se inyectan con VB - NO TIENEN ENDPOINT - EL SCRIPT ES DINAMICO
      PaxIndexedReservationMock, // Se inyectan con VB - NO TIENEN ENDPOINT - EL SCRIPT ES DINAMICO
      false,
      reservationRateCodes,
      'exchange',
      promotionCurrent,
      [[], [], [], []],
      [null, null, null, null],
      false,
      [[], [], [], []],
      [[], [], [], []],
      FamilyProvsMock,
      {Origin: '', ToChange: ''},
      [],
      {
        IsNational: this.infoUserMember._UserMember._isnational,
        MemberExtension: () => {
          return {
            rate_Type: this.infoUserMember._MemberRateType,
            ReservationCostType: this.infoUserMember._ReservationCostType === 'N' ? 'V' : 'V'
          }
        }
      },
      marketAfiliationMock,
      isBenefitRef,
      this.infoUserMember._ReservationCostType === 'N' ? 'V' : 'V', // VARIABLE,
      null,
      [[], false, false, false],
      mainGuest !== undefined ? mainGuest.memberUtils : this.userMapper.map(this.infoUserMember),
      memberPromotionsEngineMock,
      [[], [], [], []],
      promotions
    )

    // console.log('Promociones 🧑‍🎄🧑‍🎄🧑‍🎄', promotionsFilters)

    rmFolio!.PromotionByRsv = promotions.filter((element: any) => {
      return element.RecnumPromo !== 100000
    })
    

    return {
      rmFolio,
      context,
      isProvisional,
      isImperial
    }
  }

  mapPromotions(promotion: any, isNational: boolean) {
    return {
      RecnumPromo: promotion.Recnum,
      CodePromo: promotion.Code,
      Status: 1,
      PromotionsPackage: this.FilterPackageRateByMember(promotion.PackageByPromotion, isNational),
      PromotionByRsvBloqued: promotion.ReservationUnlock
        ? {
            HotelBlocked: promotion.ReservationUnlock.Hotel,
            FolioBlocked: promotion.ReservationUnlock.Folio
          }
        : null
    }
  }

  FilterPackageRateByMember(PackageByPromotion: any, IsNational: any) {
    var Response = null
    if (PackageByPromotion != null && PackageByPromotion.length > 0) {
      Response = PackageByPromotion.filter(function (a: any) {
        return (
          (IsNational && a.TypeMember == 'N') ||
          (!IsNational && a.TypeMember == 'F') ||
          a.TypeMember == 'B'
        )
      })
    }
    return Response
  }

  async getReferralProgram() {
    const currentYear = dayjs().year()

    // if (!this.referralProgramAlreadyExists() || this.referralProgramIsOlder(currentYear)) {
    await this.fetchReferralProgramByYear(currentYear)

    await this.fetchReferralPromotionsBenefits()

    persistence.save(this)
    // }
  }

  async getProvitions() {
    const user = this.$nuxt.$pinia.state.value.authStore.user
    const request = {
      application: user._UserMember._application,
      company: user._UserMember._company,
      isNational: user._UserMember._isnational,
      hotel: this.booking.propertyCode,
      arrivalDate: this.booking.checkIn,
      departureDate: this.booking.checkOut
    }
    await this.fetchProvitions(request)
  }

  referralProgramIsOlder(currentYear: number) {
    return this.referralProgram!.year < currentYear
  }

  referralProgramAlreadyExists() {
    const existsInStorage = JSON.parse(localStorage.getItem('bookingStore')!)
    const referralProgram = JSON.parse(existsInStorage.referralProgram)
    return referralProgram !== null
  }

  async fetchReferralProgramByYear(year: number) {
    const user = this.$nuxt.$pinia.state.value.authStore.user

    this.referralProgram = await this.getReferralProgramUC.run({
      year: year.toString(),
      market: user._Market,
      company: user._UserMember._company,
      applicationId: user._UserMember._application
    })
  }

  async fetchProvitions(request: ProvitionsRequest) {
    this.provitions = await this.getProvitionsUseCase.run(request)
    // // console.log('Provition Request ☠️☠️', this.provitions)
    persistence.save(this)
  }

  selectedNights(from: string, to: string): number {
    const start = dayjs(from)
    const end = dayjs(to)
    return end.diff(start, 'day', true)
  }

  async fetchImperialProvitions(category: AccessibleCategories) {
    // check if the rates exist in imperialProvitions array
    // const exisingRate = this.imperialProvitions.find(rate => rate.roomCode === roomCode)

    const user = this.$nuxt.$pinia.state.value.authStore.user
    const request: ImperialProvitionRequest = {
      application: user._UserMember._application,
      company: user._UserMember._company,
      isNational: user._UserMember._isnational,
      hotel: this.booking.propertyCode,
      arrivalDate: this.booking.checkIn,
      departureDate: this.booking.checkOut,
      room: category.RealCode,
      nights: this.selectedNights(this.booking.checkIn, this.booking.checkOut)
    }
    // console.warn('Imperial Provition Request', request)

    try {
      this.imperialProvitions[category.RealCode] = await this.getImperialProvitionsUseCase.run(
        request
      )
    } catch (error) {
      throw error
    } finally {
      persistence.save(this)
    }
  }

  updateSelections(roomIndex: number, companions: MembershipTable[]) {
    this.reservationInfo[roomIndex].guests = companions
  }

  changeDailyRatesState(index: number) {
    this.reservationInfo.length > 0
      ? (this.reservationInfo[index].showDailyRates = !this.reservationInfo[index].showDailyRates)
      : (this.reservationFromBookings[index].showDailyRates =
          !this.reservationFromBookings[index].showDailyRates)
  }

  removeReservationByIndex(index: number, deleteCount: number = 1) {
    this.reservationInfo.splice(index, deleteCount)
  }

  removeRoomByIndex(index: number) {
    this.reservationInfo[index].guests = []
    this.reservationInfo[index].roomSelected = null
    this.reservationInfo[index].benefits = []
    this.reservationInfo[index].imperialTotalRate = null
  }

  setSelectedReferrals(reservation: any) {
    this.reservationInfo[this.currentRoomIndex].selectedReferrals = reservation
  }

  // Bonus week
  cleanReferrals() {
    this.reservationInfo[this.currentRoomIndex].selectedReferrals = []
  }

  // Bonus week
  setActiveReferrals(reservations: any) {
    this.applicableReferrals = reservations
  }

  setTransferableBonus({isTransferable, hotel, folio}: IsTransferableResponse) {
    this.reservationInfo[this.currentRoomIndex].transferableBonus = {
      isTransferable,
      hotel,
      folio
    }
  }

  setMaxStep(step: number) {
    this.maxStep = step
  }

  setCurrentRoom(index: number) {
    this.roomIndex = index
    this.currentRoom = index
  }

  setLoading(isLoading: boolean) {
    this.loading = isLoading
  }

  setSkeleton(isSkeleton: boolean) {
    this.skeleton = isSkeleton
  }

  setSkeletonArray(skeletonArray: string[]) {
    this.skeletonArray = skeletonArray
  }

  setReferralPromotion(promotion: ReferralPromotion) {
    this.referralPromotion = promotion
  }

  setSpecialRatesPromotions(index: number) {
    if (index === -1) {
      this.specialRatesPromotions = this.freeKidsAndTeen(this.specialRatesPromotions.data)
    } else this.specialRatesPromotions = this.specialRatesPromotions.data[index]
  }

  public freeKidsAndTeen(promotions: any): Array<any> {
    const kidsAndTeen: any[] = []
    promotions.forEach((promotion: any) => {
      const prom = promotion.find((p: any) => p.Recnum === 27)
      if (prom !== undefined) {
        kidsAndTeen.push(prom)
      }
    })
    return kidsAndTeen // .filter(item => item.visible === true)
  }

  async getMinStay(application: string) {
    const response = await this.getMinimumStayUseCase.run({application})

    this.minStays = response.data.data
  }

  async bookNow() {
    try {
      this.presidentialFlow = false
      const categoryStore = new CategoryStore()
      this.getReferralProgram()
      // this.fetchReferralPromotionsBenefits()
      this.getProvitions()
      this.imperialProvitions = [] as any // reset imperial provitions
      const application = this.infoUserMember._UserMember._application
      this.setShowCategories(true)
      this.getMinStay(application)
      const hotelCode = this.getBooking.propertyCode
      await this.getRoomAccess()
      await categoryStore.fetchCategories(hotelCode)
      await categoryStore.setMappedCategories()
      await categoryStore.setMappedPresidentialCategories()
    } catch (e) {
      // alert('error on book now')
      console.log(e)
    }
  }

  public saveRooms() {
    persistence.save(this)
  }

  public async verifyPromotionAvailability() {
    let isPromotionAvailable = false

    const promotionPromise = await Promise.all([
      this.validatePromotion.run(this.getPayloadValidatePromotion('SpecialRate')),
      this.validatePromotion.run(this.getPayloadValidatePromotion('AccesRoom'))
    ])

    this.specialRatesPromotions = promotionPromise[0]
    this.accesRoomPromotions = promotionPromise[1]
    if (this.specialRatesPromotions.data?.length === 0) {
      this.setSpecialRatesPromotions(-1)
    } else if (this.specialRatesPromotions.data?.length === 1) {
      this.promotionList = this.filterPromotions(this.specialRatesPromotions)
      this.setSpecialRatesPromotions(0)
    } else {
      this.promotionList = this.filterPromotions(this.specialRatesPromotions)
      isPromotionAvailable = true
      this.setShowPromotionModal(true)
    }

    return isPromotionAvailable
  }

  private async getInfoRmAccessByCompanyApplication() {
    const {data} = await this.reservationRepository.getInfoRmAccessByCompanyApplication({
      company: this.infoUserMember._UserMember._company,
      application: this.infoUserMember._UserMember._application
    })

    return data.data.HEADERACCESSROOM
  }

  public async fetchInfoRmAccessByCompanyApplication() {
    this.infoRmAccessByCompanyApplication = await this.getInfoRmAccessByCompanyApplication()
  }

  private async hasLockOffAccess(): Promise<boolean> {
    try {
      if (['CZ', 'MPS', 'PL'].includes(this.booking.propertyCode)) {
        return false
      }

      // TODO: PROCESO VALIDAR LOCK OFF
      const headersAccessRooms = this.infoRmAccessByCompanyApplication
      const lockOffRoomId = [
        14, 86, 87, 119, 120, 88, 89, 109, 44, 116, 117, 114, 35, 91, 34, 90, 115, 118, 82, 83, 122,
        85, 121, 84, 108, 129, 130
      ]
      // @ts-ignore
      return headersAccessRooms.some(
        ({IDTYPEROOM, HotelAccess}: any) =>
          lockOffRoomId.includes(IDTYPEROOM) && HotelAccess.includes(this.booking.propertyCode)
      )
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public async getRoomAccess() {
    this.isFirstLoad = false

    this.maxStep = 0
    this.roomIndex = 0
    this.currentRoom = 0

    this.rooms = await this.getRoomAvailableToBooking.run({
      hotel: this.booking.propertyCode,
      searchAvailability: true,
      departureDate: this.booking.checkOut,
      arrivalDate: this.booking.checkIn,
      affiliationNumber: this.$nuxt.$pinia.state.value.authStore.user._UserMember._application,
      allRoomsAccess: true,
      company: this.infoUserMember._UserMember._company,
      promotions: this.accesRoomPromotions.data
    })

    const hasLockOffAccess = await this.hasLockOffAccess()

    // console.log(hasLockOffAccess)

    this.roomsToBook = await this.getRoomArrayToBook.run({
      allRooms: JSON.parse(JSON.stringify(this.rooms)),
      hasLockOffAccess
    })

    this.setReservationRooms(
      this.booking.rooms.map(({adults, children, childrenages}) => ({
        adults,
        children,
        childrenages
      }))
    )

    persistence.save(this)
  }

  public filterPromotions(promotions: any): any[] {
    const prom: any[] = []
    promotions.data.forEach((promotion: any) => {
      //@ts-ignore
      prom.push(
        PromotionsList.map(
          this.compareDates(promotion),
          this.$nuxt.$pinia.state.value.authStore.isNational
        )
      )
    })
    return prom
  }

  public compareDates(promotions: Array<any>): object {
    if (promotions.length === 1) return promotions[0]
    else {
      let prom = promotions[0]
      let diff =
        promotions[0].PromotionBookingWindow.length > 0
          ? selectedNights(
              dayjs().toDate(),
              dayjs(promotions[0].PromotionBookingWindow[0].EndDate).toDate()
            )
          : 0
      for (const x in promotions) {
        if (promotions[x].PromotionBookingWindow.length > 0) {
          const newDiff = selectedNights(
            dayjs().toDate(),
            dayjs(promotions[x].PromotionBookingWindow[0].endDate).toDate()
          )
          if (newDiff < diff || (newDiff >= 0 && diff === 0)) {
            diff = newDiff
            prom = promotions[x]
          }
        }
      }
      return prom
    }
  }

  public getPayloadValidatePromotion(filter: string) {
    return {
      arvDate: Date.parse(this.booking.checkIn).toString(),
      departDate: Date.parse(this.booking.checkOut).toString(),
      bookingWindowDate: null,
      memberLevel: this.infoUserMember._UserMember._membershiplevel,
      hotelCurrent: this.booking.propertyCode,
      rmTypeCurrent: null,
      categoryRsv: null,
      memberRateType: this.infoUserMember._MemberRateType,
      memberCostType: this.infoUserMember._ReservationCostType,
      country: this.infoUserMember._Market,
      typePromotionFilter: filter,
      omitPromoCode: null,
      application: this.infoUserMember._UserMember._application,
      company: this.infoUserMember._UserMember._company,
      isNational: this.infoUserMember._UserMember._isnational,
      nights: selectedNights(
        dayjs(this.booking.checkIn).toDate(),
        dayjs(this.booking.checkOut).toDate()
      ),
      market: this.infoUserMember._Market,
      golfType: 'AINC', // TODO : ???????
      customPromotion: null
    }
  }

  emptyRooms() {
    this.reservationInfo = []
  }

  public increaseRoomIndex() {
    this.roomIndex = ++this.roomIndex
  }

  public decreaseRoomIndex() {
    this.roomIndex = --this.roomIndex
  }

  get countDownSpecialRate() {
    if (this.specialRatesPromotions.length > 0) {
      const prom: any = this.compareDates(this.specialRatesPromotions)
      if (prom.PromotionBookingWindow?.length > 0) {
        return new Date(prom.PromotionBookingWindow[0].EndDate)
      } else return null
    } else return null
  }

  get namePromotion() {
    const names: Array<string> = []
    if (this.specialRatesPromotions.length > 0) {
      this.specialRatesPromotions.forEach((promotion: any) => {
        names.push(promotion.Description)
      })
      return names
    } else return names
  }

  get showPromotionModal() {
    return this.showPromotion
  }

  setShowPromotionModal(value: boolean) {
    this.showPromotion = value
  }

  get getPromotionList() {
    return this.promotionList
  }

  get specialRatesPromotion() {
    return this.specialRatesPromotions
  }

  setRoomsFromPresidentialFlow() {
    this.booking.rooms = []

    this.booking.rooms.push({
      adults: 2,
      children: 0,
      childrenages: [],
      id: 0,
      name: ''
    })

    this.booking.roomsCopy.push({
      adults: 2,
      children: 0,
      childrenages: [],
      id: 0,
      name: ''
    })

    this.presidentialFlow = false

    this.emptyRooms()
    // @ts-ignore
    this.reservationInfo.push({
      folio: 0,
      benefits: [],
      roomsPax: {children: 0, adults: 2},
      roomSelected: null,
      guests: [],
      showDailyRates: false,
      status: PaymentStatus.NotPaid,
      index: 0,
      combinations: Combinations(),
      preferentialRates: PreferentialRatesFactory(),
      eliteProduct: '',
      eliteProductType: '',
      // @ts-ignore
      reservationFolioData: {},
      selectedProvition: null,
      imperialFee: 0,
      imperialLeblancFee: 0,
      week52Fee: 0,
      extraFee: 0,
      imperialTotalRate: null
    })
  }

  get getTotalBenefitsPrice() {
    function calcBenefits(benefits: RoomBenefit[]): number {
      return benefits.reduce((sum, benefit) => sum + benefit.totalPrice, 0)
    }
    return (
      this.reservationInfo.reduce(
        (sum, reservation) =>
          reservation.benefits ? sum + calcBenefits(reservation.benefits) : sum,
        0
      ) || 0
    )
  }

  get isBaglioniBooking() {
    return baglioniCodes.includes(this.getBooking.propertyCode)
    // return this.bookingStore.getBooking.propertyCode
  }

  findImperialOnReservation(combinationId: number): boolean {
    if (combinationId === undefined) return false

    const usedCombination = this.reservation.find(
      room => String(room.roomSelected?.selectedCombination?.CombinationId) == String(combinationId)
    )
    const returnable = !!usedCombination

    return !!usedCombination
  }

  public addGuest(roomIndex: number, type: 'adults' | 'children') {
    this.reservationInfo[roomIndex].roomsPax[type] += 1
  }

  public removeGuest(roomIndex: number, type: 'adults' | 'children') {
    this.reservationInfo[roomIndex].roomsPax[type] -= 1
  }

  // Inicializa el objeto de reservationInfo en el booking store
  public setReservationRooms(rooms: RoomsPax[]) {
    if (typeof localStorage !== 'undefined' && this.isFirstLoad) {
      const store = JSON.parse(localStorage.getItem('bookingStore')!)
      if (store) {
        this.reservationInfo = JSON.parse(store.reservationInfo)
      }
    } else {
      // @ts-ignore
      this.reservationInfo = rooms.map(({children, adults, childrenages}, index) => ({
        folio: 0,
        folioContent: null,
        benefits: [],
        roomsPax: {children, adults, childrenages},
        roomSelected: null,
        guests: [],
        showDailyRates: false,
        status: PaymentStatus.NotPaid,
        index,
        combinations: Combinations(),
        preferentialRates: PreferentialRatesFactory(),
        eliteProduct: '',
        eliteProductType: '',
        reservationFolioData: {},
        selectedProvition: null,
        imperialFee: 0,
        imperialLeblancFee: 0,
        week52Fee: 0,
        extraFee: 0,
        selectedReferrals: [],
        transferableBonus: {
          hotel: '',
          folio: 0,
          isTransferable: false
        },
        RmfolioRc: null,
        imperialTotalRate: null,
        savedXAmount: 0
      }))
    }
  }

  evaluateDefaultGolfPolicy(reservationType: string) {
    const bookingGolf = new BookingGolfStore()
    const golfPolicy = bookingGolf.evaluateGolfPolicy(
      reservationType,
      bookingGolf.defaultValuePolicies
    )
    return golfPolicy
  }

  public getTotalReservationPriceOnRoom(index: number): number {
    let roomPrice = this.reservation[index]?.roomSelected?.selectedOption?.rate || 0
    const benefitsPrice =
      this.reservation[index]?.benefits?.reduce((acc, benefit) => acc + benefit.totalPrice, 0) || 0
    const isReferral =
      this.reservation[index]?.roomSelected?.selectedOption?.code ===
      BookingProvotionStatus.REFERIDO

    const isBonus =
      this.reservation[index]?.roomSelected?.selectedOption?.code === BookingProvotionStatus.BONO

    /* const week52Fee = this.reservation[index].imperialTotalRate?.AmountWeek52 || 0 */

    let fee = 0
    if (isReferral) {
      fee += this.referralProgram?.fee || 0
    }

    if (isBonus) {
      // @ts-ignore
      roomPrice = this.reservation[index]?.roomSelected?.bonusRate || 0 /* + week52Fee */
    }
    return roomPrice + benefitsPrice
  }

  presidentialPaxesDistribution(
    firstRoom: SelectedCategory,
    adults: number,
    childs: number,
    babys: number
  ) {
    const firstRoomWithPaxes = {
      adult: 0,
      child: 0,
      baby: 0
    }

    const secondRoomWithPaxes = {
      adult: 0,
      child: 0,
      baby: 0
    }

    const totalPaxes = adults + childs + babys

    if (totalPaxes > firstRoom.selectedCategory.max_pers) {
      firstRoomWithPaxes.adult = firstRoom.selectedCategory.max_pers
    }

    if (totalPaxes === firstRoom.selectedCategory.max_pers) {
      firstRoomWithPaxes.adult = Math.floor(totalPaxes / 2)
    }

    secondRoomWithPaxes.adult = totalPaxes - firstRoomWithPaxes.adult

    return {
      firstRoomWithPaxes,
      secondRoomWithPaxes
    }
  }

  public async selectedRoomToReservate({
    room,
    imperialFee = 0,
    imperialLeblancFee = 0,
    week52Fee = 0,
    extraFee = 0,
    isChris = false,
    RmfolioRc = null,
    imperialTotalRate,
    savedXAmount = 0
  }: selectedRoomToReservate) {
    const bookingBenefit = new BookingBenefitStore()
    const propertyStoreInstance = new PropertiesStore()
    const data = await propertyStoreInstance.fetchGroupingData(this.getBooking.propertyCode)
    const rules = data.events as RuleGrouping
    await bookingBenefit.fetchProductsCatalog()

    const defaultEliteProduct = await this.evaluateDefaultGolfPolicy(
      String(room?.selectedOption?.code)
    )

    this.reservationInfo[this.roomIndex].isLockOff =
      room.selectedCategory.isLockOff !== undefined && room.selectedCategory.isLockOff
    this.reservationInfo[this.roomIndex].roomSelected = room
    this.reservationInfo[this.roomIndex].chris =
      (isChris && imperialFee === 0 && room.selectedOption!.id === ReservationTypes.IMP_WEEKS) ||
      (isChris && imperialFee === 0 && room.selectedOption!.id === ReservationTypes.IMP_NIGHT)
    this.reservationInfo[this.roomIndex].eliteProduct = defaultEliteProduct.events?.code || ''
    this.reservationInfo[this.roomIndex].eliteProductType = defaultEliteProduct.events?.type || ''
    this.reservationInfo[this.roomIndex].imperialFee = imperialFee

    this.reservationInfo[this.roomIndex].imperialFee = imperialFee

    this.reservationInfo[this.roomIndex].savedXAmount = savedXAmount

    if (imperialFee > 0 && !isChris) {
      this.reservationInfo[this.roomIndex].preAmountChrismas = imperialTotalRate
    }
    this.reservationInfo[this.roomIndex].imperialTotalRate = imperialTotalRate
    this.reservationInfo[this.roomIndex].extraFee = extraFee
    this.reservationInfo[this.roomIndex].imperialLeblancFee = imperialLeblancFee
    this.reservationInfo[this.roomIndex].week52Fee = week52Fee

    this.reservationInfo[this.roomIndex].roomSelected!.provisions = room.provisions

    // const realRoomsCodes =
    //   this.reservationInfo[this.roomIndex].roomSelected?.selectedCategory.relRoomsCodes || ''

    if (
      LockOffRoomAccessCode.includes(room.selectedCategory.RealCode) &&
      !room.selectedCategory.isLockOff &&
      this.roomIndex + 1 === this.reservationInfo.length
    ) {
      // debugger
      // Sí Realcode es PS2, y no hay rooms vacios, se agrega una habitación vacia LockOffRoomAccessCode

      const actualRoom = this.booking.rooms[this.roomIndex]

      this.presidentialFlow = true

      persistence.save(this)

      const {firstRoomWithPaxes, secondRoomWithPaxes} = this.presidentialPaxesDistribution(
        room,
        actualRoom.adults,
        actualRoom.children,
        0
      )

      // this.reservationInfo[this.roomIndex].guests = []
      this.reservationInfo[this.roomIndex].roomsPax = {
        adults: firstRoomWithPaxes.adult,
        children: firstRoomWithPaxes.child
      }
      this.booking.rooms[this.roomIndex].adults = firstRoomWithPaxes.adult
      this.booking.rooms[this.roomIndex].children = firstRoomWithPaxes.child

      const secondRoom = {
        adults: secondRoomWithPaxes.adult,
        children: secondRoomWithPaxes.child,
        childrenages: [],
        id: this.roomIndex + 1,
        name: ''
      }

      this.booking.rooms.push(secondRoom)

      this.booking.roomsCopy.push(formatBaglioniRoom(secondRoom, rules))
      // @ts-ignore
      this.reservationInfo.push({
        folio: 0,
        benefits: [],
        roomsPax: {
          children: secondRoomWithPaxes.child,
          adults: secondRoomWithPaxes.adult,
          childrenages: []
        },
        roomSelected: null,
        guests: [],
        showDailyRates: false,
        status: PaymentStatus.NotPaid,
        index: this.roomIndex + 1,
        combinations: Combinations(),
        preferentialRates: PreferentialRatesFactory(),
        eliteProduct: '',
        eliteProductType: '',
        // @ts-ignore
        reservationFolioData: {},
        selectedProvition: null,
        imperialFee: 0,
        imperialLeblancFee: 0,
        week52Fee: 0,
        extraFee: 0,
        imperialTotalRate: null
      })
    }

    this.reservationInfo[this.roomIndex].RmfolioRc = RmfolioRc
  }

  public setPropertyCode(propertyCode: string) {
    this.booking.propertyCode = propertyCode
    persistence.save(this)
  }

  public setOperaId(operaId: string) {
    this.booking.operaId = operaId
    persistence.save(this)
  }

  public setCheckIn(checkIn: string) {
    this.booking.checkIn = checkIn
    persistence.save(this)
  }

  public setCheckOut(checkOut: string) {
    this.booking.checkOut = checkOut
    persistence.save(this)
  }

  public setRooms(rooms: RoomBookingEntity[]) {
    this.booking.rooms = rooms
    persistence.save(this)
  }

  public async setRoomsCopy(rooms: RoomBookingEntity[]) {
    const propertyStoreInstance = new PropertiesStore()
    const data = await propertyStoreInstance.fetchGroupingData(this.getBooking.propertyCode)
    const rules = data.events as RuleGrouping
    rooms.forEach((room, index) => {
      this.setRoom(formatBaglioniRoom(room, rules), index)
    })
  }

  public setRoom(room: RoomBookingEntity, roomIndex: number) {
    this.booking.roomsCopy[roomIndex] = room
    persistence.save(this)
  }

  public initStore(): void {
    if (process.client) {
      persistence.hydrate(this)
    }
  }

  updateReservationStatus(roomIndex: ReservationInfo['index'], status: PaymentStatus) {
    this.reservationInfo[roomIndex].status = status
    persistence.save(this)
  }

  updateReservationFromBookingStatus(roomIndex: number, status: BookingStatus) {
    this.reservationFromBookings[roomIndex].status = status
    console.log(this.reservationFromBookings[roomIndex].status)
    persistence.save(this)
  }

  public bookingBenefitForRoom(
    roomIndex: number,
    benefits: RoomBenefit[],
    eliteProduct: string,
    eliteProductType?: string
  ) {
    try {
      this.reservationInfo[roomIndex].benefits = benefits
      this.setBookingEliteProduct(roomIndex, eliteProduct, eliteProductType)
    } catch (error) {}
  }

  public setBookingEliteProduct(
    roomIndex: number,
    eliteProduct: string,
    eliteProductType?: string
  ) {
    try {
      this.reservationInfo[roomIndex].eliteProduct = eliteProduct
      this.reservationInfo[roomIndex].eliteProductType = eliteProductType
    } catch (error) {}
  }

  public async fetchReferralPromotionsBenefits() {
    const application = this.$nuxt.$pinia.state.value.authStore.user._UserMember._application
    const arvDate = this.booking.checkOut
    const arvDateTruqueado = dayjs(this.booking.checkOut).add(1, 'day').format(ENGLIS_DATE_FORMAT)

    this.referralPromotionsBenefits = await this.getReferralPromotionBenefits.run({
      application,
      arvDate: arvDateTruqueado
    })

    // use case
  }

  public getRoomType(roomCode: string): EnumRoomCategory {
    const roomTypes = new Map<string, EnumRoomCategory>()

    especialSuites.forEach(item => {
      roomTypes.set(item, EnumRoomCategory.ESPECIAL)
    })

    estandarSuites.forEach(item => {
      roomTypes.set(item, EnumRoomCategory.ESTANDARD)
    })

    presidentialSuites.forEach(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    residenceSuites.forEach(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    villaSuites.forEach(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    return roomTypes.get(roomCode)!
  }

  public async validateRuleMinimalStay(
    pipeline: PipelinesEnum,
    roomCode: string,
    reservationType: string | undefined,
    productType: string
  ) {
    const booking = this.booking
    const roomType = this.getRoomType(roomCode)
    const market = this.userInfo._Market
    // console.log('MINUMUM STAYSSSS', this.minStays)

    const fact = {
      reservationType,
      roomType,
      market,
      stayMinimal: this.minStays?.MinimiumStay,
      stayMinimalPresidential: this.minStays?.PresidentialVariables,
      stayMinimalReferral: this.minStays?.Referrend,
      productType
    }

    console.log('fact minimalStay', fact)

    const response = await this.runEngine.run({fact, pipeline})
    let minimalStay = response.events.stayMinimal
    if (minimalStay === undefined) minimalStay = 0
    console.log('Estancia mínima: ', minimalStay)
    const {checkIn, checkOut} = booking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    return nights >= minimalStay
  }

  public async validateRuleMaximalStay(
    pipeline: string,
    roomCode: string,
    reservationType: string | undefined
  ) {
    const booking = this.booking
    const roomType = this.getRoomType(roomCode)
    const market = this.userInfo._Market

    if (roomType === 1 || roomType === 2) return true

    const fact = {
      reservationType,
      roomType,
      market
    }

    const response = await this.runEngine.run({fact, pipeline})
    let maximalStay = response.events.stayMaximal
    if (maximalStay === undefined) maximalStay = 0
    const {checkIn, checkOut} = booking
    const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
    return nights <= maximalStay
  }

  getProvisionFromCurrentRoom(element: ReservationInfo): RawProvisionFromLegacyDto | null {
    const elementClone = structuredClone(element)
    if (
      elementClone.roomSelected?.provisions === undefined &&
      elementClone.roomSelected?.provisions === null
    ) {
      return null
    }
    const posibleProvisions = elementClone.roomSelected?.provisions
    const theResult: RawProvisionFromLegacyDto | null = null
    const possibleProvision: {[index: string]: any} = posibleProvisions as {[index: string]: any}

    for (const someProvition in possibleProvision) {
      const theSomeProvition = possibleProvision[someProvition]

      if (
        theSomeProvition !== undefined &&
        theSomeProvition !== null &&
        Object.hasOwn(theSomeProvition, 'provision')
      ) {
        if (theSomeProvition.provision.type === ProvitionOptionType.Night) {
          return theSomeProvition.provision.nights[0].raw
        }
        return theSomeProvition.provision.raw
      }
    }

    if (theResult === null) {
      return theResult
    }
    // TheResult puede contener o no
    // En caso de no haber, entonces puede ser Imperialx
    const someImperial = elementClone!.roomSelected!.selectedProvition
    return someImperial === undefined ? null : someImperial
  }

  public async validateImperial(expirationDate: string) {
    const pipeline = PipelinesEnum.IMPERIAL_POLICY
    const booking = this.booking

    const {checkIn} = booking
    const fact = {
      checkInDate: this.toEpochTimestamp(checkIn),
      expirationDate: this.toEpochTimestamp(expirationDate.substring(0, 10))
    }
    const data = await this.runEngine.run({fact, pipeline})
    return data.events?.compliance
  }

  toEpochTimestamp(date: string): number {
    return toEpochTimeStamp(date)
  }

  getTotalOnRcDetail(rcDetail: RmfolioRC[]) {
    return rcDetail.reduce(
      (previousValue, currentValue) => {
        return {
          AmountWeek52: previousValue.AmountWeek52 + currentValue.AmountWeek52,
          AmountChargeUpgrade: previousValue.AmountChargeUpgrade + currentValue.AmountChargeUpgrade,
          AmountOutOfSeason: previousValue.AmountOutOfSeason + currentValue.AmountOutOfSeason,
          AmountPromotion: previousValue.AmountPromotion + currentValue.AmountPromotion,
          RateOpera: previousValue.RateOpera + currentValue.RateOpera,
          AmountResortAccess: previousValue.AmountResortAccess + currentValue.AmountResortAccess,
          AmountThanksGivingDay:
            previousValue.AmountThanksGivingDay + currentValue.AmountThanksGivingDay,
          Rate: previousValue.Rate + currentValue.Rate
        }
      },
      {
        AmountWeek52: 0,
        AmountChargeUpgrade: 0,
        AmountOutOfSeason: 0,
        AmountPromotion: 0,
        AmountResortAccess: 0,
        AmountThanksGivingDay: 0,
        RateOpera: 0,
        Rate: 0
      }
    )
  }

  public async validateRuleSemana52(pipeline: PipelinesEnum, reservationType: string) {
    const booking = this.booking
    const {checkIn, checkOut} = booking

    const lastNight = new Date(checkOut).setDate(new Date(checkOut).getDate() - 1)

    const fact = {
      reservationType,
      arrivalDate: checkIn,
      departureDate: new Date(lastNight).toISOString().split('T')[0]
    }

    const response = await this.runEngine.run({fact, pipeline})
    const semana52Restrict = response.events.semana52
    // console.log('semana52Restrict:', semana52Restrict)

    return semana52Restrict
  }

  public async validateReferralCompaions(pipeline: PipelinesEnum) {
    const fact = {
      // @ts-ignore
      reservationId: this.reservationInfo[this.currentRoomIndex].roomSelected?.selectedOption?.id,
      adults: this.reservationInfo[this.currentRoomIndex].roomsPax.adults
    }

    const response = await this.runEngine.run({fact, pipeline})

    return response.events?.canTravel ?? false
  }

  public async validateWholesalerRestricted(pipeline: PipelinesEnum) {
    const wholesaler = localStorage.getItem('MemberPropertyAccess')
      ? JSON.parse(localStorage.getItem('MemberPropertyAccess')!).memberExtension._Wholesaler
      : false

    const fact = {
      reservationId: this.reservationInfo[this.currentRoomIndex].roomSelected?.selectedOption?.id,
      isWholeSaler: wholesaler
    }

    const response = await this.runEngine.run({fact, pipeline})

    return response.events?.blockReserve ?? false
  }

  public showXmasModal: boolean = false

  toggleXmasModal() {
    this.showXmasModal = !this.showXmasModal
  }
}
