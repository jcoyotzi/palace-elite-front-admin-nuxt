import {Pinia, Store} from 'pinia-class-component'
import dayjs, {extend} from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import bookingsTypes from '~/src/app/common/types/bookingsTypes'
import PayloadGetReservations from '~/src/app/bookings/domain/entities/payloadGetReservations'
import {lazyInject} from '~/src/container'
import UseCase from '~/src/app/common/application/UseCase'
import {FilterArray} from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import {Resort, Provition} from '~/src/app/bookings/domain/dto/getFiltersDto'
import {Response} from '~/src/app/common/domain/entities/response'
import PayloadGetFilters from '~/src/app/bookings/domain/entities/payloadGetFilters'
import PayloadRejectReservation from '~/src/app/bookings/domain/entities/payloadRejectReservation'
import PayloadPaymentLinkReservation from '~/src/app/bookings/domain/entities/payloadPaymentLinkReservation'
import PayloadValidateReservation from '~/src/app/bookings/domain/entities/payloadValidateReservation'
import {PaginationReservations} from '~/src/app/bookings/domain/dto/paginationBookings'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import {NextDaysIDEnum, NextDaysEnum} from '~/src/app/bookings/domain/enums/nextDaysEnum'
import {
  DrawerSteps,
  DrawerStepsInSendConfirmation,
  DrawerStepsInCancelReservation
} from '~/src/app/bookings/domain/enums/drawerStep'
import {
  GetTermsAndConditionsDto,
  TermsAndConditions
} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import {
  GetCategoriesDto,
  CategorieAttributesDTO
} from '~/src/app/bookings/domain/dto/getCategoriesDto'
import Categorie from '~/src/app/bookings/domain/entities/categorie'
import Companions from '~/src/app/bookings/domain/entities/companions'
import {CompanionsDto} from '~/src/app/bookings/domain/dto/getCompanionsDto'
import ProductsAndPayments from '~/src/app/bookings/domain/entities/productsAndPayments'
import {GetProductsAndPaymentsDto} from '~/src/app/bookings/domain/dto/getProductsAndPaymentsDto'
import Exception from '~/src/app/network/common/domain/entity/Exception'
import {RequestSendConfirmationLetter} from '~/src/app/bookings/domain/entities/requestSendConfirmationLetter'
import {ResponseSendConfirmationLetter} from '~/src/app/bookings/domain/entities/responseSendConfirmationLetter'
import {EnumRoomCategory, PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import {RuleEngineRequest, RuleEngineResponse} from '~/src/app/rules/application/runEngineUseCase'
import {
  especialSuites,
  estandarSuites,
  presidentialSuites,
  residenceSuites,
  villaSuites
} from '~/src/app/common/domain/enums/roomTypes'
import {daysToCheckIn} from '~/src/ui/utils/dateHelpers'
import cancelationsTypes from '~/src/app/common/types/cancelationsTypes'
import ReservationDtoFactory from '~/src/app/bookings/domain/factories/reservationDtoFactory'
extend(isBetween)
@Store({
  name: 'bookingsStore'
})
export class BookingsStore extends Pinia {
  @lazyInject(bookingsTypes.getReservationsUseCase)
  private readonly getReservationsUseCase!: UseCase<
    PayloadGetReservations,
    PaginationReservations<ReservationsDto>
  >

  @lazyInject(bookingsTypes.getReservationsToValidateUseCase)
  private readonly getReservationsToValidateUseCase!: UseCase<
    PayloadGetFilters,
    Response<ReservationsDto>
  >

  @lazyInject(bookingsTypes.getFiltersUseCase)
  private readonly getFiltersUseCase!: UseCase<PayloadGetFilters, Response<any>>

  @lazyInject(bookingsTypes.validateReservationUseCase)
  private readonly validateReservationUseCase!: UseCase<PayloadValidateReservation, Response<any>>

  @lazyInject(bookingsTypes.sendPaymentLinkReservationUseCase)
  private readonly sendPaymentLinkReservationUseCase!: UseCase<
    PayloadPaymentLinkReservation,
    Response<any>
  >

  @lazyInject(bookingsTypes.rejectReservationUseCase)
  private readonly rejectReservationUseCase!: UseCase<PayloadRejectReservation, Response<any>>

  @lazyInject(bookingsTypes.getTermsAndConditionsUseCase)
  private readonly getTermsAndConditionsUseCase!: UseCase<null, Response<GetTermsAndConditionsDto>>

  @lazyInject(bookingsTypes.getCategoriesUseCase)
  private readonly getCategoriesUseCase!: UseCase<Categorie, Response<GetCategoriesDto>>

  @lazyInject(bookingsTypes.getCompanionsUseCase)
  private readonly getCompanionsUseCase!: UseCase<Companions, Response<CompanionsDto[]>>

  @lazyInject(cancelationsTypes.getWeeksUseCase)
  private readonly getWeeksUseCase!: UseCase<null, any>

  @lazyInject(bookingsTypes.getProductsAndPaymentUseCase)
  private readonly getProductsAndPaymentUseCase!: UseCase<
    ProductsAndPayments,
    Response<GetProductsAndPaymentsDto>
  >

  @lazyInject(bookingsTypes.sendConfirmationLetterUseCase)
  private readonly sendConfirmationLetterUseCase!: UseCase<
    RequestSendConfirmationLetter,
    Response<ResponseSendConfirmationLetter>
  >

  @lazyInject(rulesTypes.runEngineUseCase)
  private readonly runEngine!: UseCase<RuleEngineRequest, RuleEngineResponse>

  public itemsFiltersDefault: FilterArray[] = [
    {
      name: 'Filter by Status',
      filters: [
        {name: 'On Hold', value: 'ON HOLD'},
        {name: 'Payment Pending', value: 'PAYMENT PENDING'},
        {name: 'To Validate', value: 'TO VALIDATE'},
        {name: 'Paid', value: 'PAID'},
        {name: 'Cancelled', value: 'CANCELLED'}
      ]
    },
    {
      name: 'Filter by Resort',
      filters: []
    },
    {
      name: 'Filter by Provition',
      filters: []
    }
  ]

  public reservationsToValidate: ReservationsDto[] = []

  public paginationReservations: PaginationReservations<ReservationsDto> = {
    currentPage: 0,
    from: 0,
    items: [],
    lastPage: 0,
    perPage: 0,
    to: 0,
    total: 0,
    totalToValidate: 0
  }

  public sortBy: string = 'desc'

  public page: number = 1

  public loadFilters: boolean = true

  public loadReservations: boolean = true

  public loadingTable: boolean = true

  public loadingDrawer: boolean = true

  public sortValue: string = '1'

  public showDrawerDetails: boolean = false

  public showModalRejectReservation = false

  public showLoadingRejectReservation = false

  public rejectReservationSuccessful = false

  public validateReservationSuccessful = false

  public rejectReservationError = false

  public validateReservationError = false

  public detailSelected: any = ReservationDtoFactory()

  public termsAndConditions: TermsAndConditions[] = []

  public categories: CategorieAttributesDTO | null = null

  public filterSelected: FilterArray[] = []

  public companions: CompanionsDto[] = []

  public productsAndPayments: GetProductsAndPaymentsDto = {
    supplementFee: 0,
    promotionsAndProducts: [],
    paymentMethods: []
  }

  public showListReservationsToValidate: boolean = false

  public pendingReservations: number | null = null

  public totalReservations: number = 0

  public getFilterSelected(selects: string[], indexAll: number[]): void {
    this.filterSelected = this.itemsFiltersDefault.map((category, index) => {
      return {
        name: category.name,
        filters: [
          ...(selects.includes('All') && indexAll.includes(index)
            ? [{name: 'All', value: 'All'}]
            : []),
          ...(selects.includes('All') && indexAll.includes(index)
            ? category.filters
            : category.filters.filter(filter => selects.includes(filter.name)))
        ]
      }
    })
  }

  public getFilterSelectedAll(): void {
    this.filterSelected = this.itemsFiltersDefault.map(category => {
      return {
        name: category.name,
        filters: [...[{name: 'All', value: 'All'}], ...category.filters]
      }
    })
  }

  public async getReservations(payload: PayloadGetReservations) {
    try {
      this.loadingTable = true
      const data = await this.getReservationsUseCase.run(payload)
      this.paginationReservations = data
      this.totalReservations = data.total
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
    } finally {
      this.loadingTable = false
    }
  }

  public async getPresidentialRoom2(payload: PayloadGetReservations) {
    try {
      const data = await this.getReservationsUseCase.run(payload)
      if (data) return data.items[0]
      else return null
    } catch (e) {
      // console.log(e)
    }
    return null
  }

  public async getPendingReservations(payload: PayloadGetReservations) {
    try {
      payload.status = `["ON HOLD", "PENDING"]`
      const data = await this.getReservationsUseCase.run(payload)
      this.pendingReservations = data.total
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async getFilters(payload: PayloadGetFilters) {
    const {data} = await this.getFiltersUseCase.run(payload)

    this.setFiltersResortsAndProvisions(data.data.hotels, data.data.provisions)

    this.getFilterSelectedAll()
    this.loadFilters = false
  }

  public setFiltersResortsAndProvisions(resorts: Resort[], provisions: Provition[]): void {
    this.itemsFiltersDefault = this.itemsFiltersDefault.map((category: any, indexCategory) => {
      if (indexCategory === 1)
        return {
          ...category,
          filters: resorts.map((resort: Resort) => ({
            value: resort.hotel,
            name: resort.name
          }))
        }

      if (indexCategory === 2)
        return {
          ...category,
          filters: provisions.map((provision: Provition) => ({
            value: String(provision.id),
            name: provision.name
          }))
        }

      return category
    })
  }

  public async rejectReservation(payload: PayloadRejectReservation) {
    try {
      await this.rejectReservationUseCase.run(payload)
      this.rejectReservationSuccessful = true
    } catch (error: any) {
      this.rejectReservationError = true
    }

    this.showLoadingRejectReservation = false
  }

  public async validateReservation(payload: PayloadValidateReservation) {
    return await this.validateReservationUseCase.run(payload)
  }

  public async getReservationsToValidate(payload: PayloadGetFilters) {
    const {data} = await this.getReservationsToValidateUseCase.run(payload)
    // @ts-ignore
    this.reservationsToValidate = data?.data!
  }

  public async sendPaymentLink(payload: PayloadPaymentLinkReservation) {
    return await this.sendPaymentLinkReservationUseCase.run(payload)
  }

  get showReservationsToValidate() {
    return (
      ((this.filterSelected[0].filters.some(filter => filter.value === BookingStatus.TO_VALIDATE) &&
        this.filterSelected[0].filters.length > 1) ||
        this.filterSelected[0].filters.length === 0) &&
      this.paginationReservations.totalToValidate > 0
    )
  }

  get disablePerPage() {
    return (
      (this.filterSelected[0].filters.some(filter => filter.value === BookingStatus.TO_VALIDATE) &&
        this.filterSelected[0].filters.length > 1) ||
      this.filterSelected[0].filters.length === 0
    )
  }

  /* Advance Search Start */

  private showSearchAdvanceValue: boolean = false

  private keywordSearchValue = ''

  private startDateValue = ''

  private endDateValue = ''

  private selectedNextDayValue: string = NextDaysIDEnum.EMPTY

  get showSearchAdvance() {
    return this.showSearchAdvanceValue
  }

  setShowSearchAdvance(value: boolean) {
    this.showSearchAdvanceValue = value
  }

  setIsLoadingDrawer(value: boolean) {
    this.loadingDrawer = value
  }

  get keywordSearch() {
    return this.keywordSearchValue
  }

  setKeywordSearch(value: string) {
    this.keywordSearchValue = value
  }

  get startDate() {
    return this.startDateValue
  }

  setStartDate(value: string) {
    this.startDateValue = value
  }

  get endDate() {
    return this.endDateValue
  }

  setEndDate(value: string) {
    this.endDateValue = value
  }

  get selectedNextDay() {
    return this.selectedNextDayValue
  }

  setSelectedNextDay(value: string) {
    this.selectedNextDayValue = value
  }

  private filtersAdvanceSearch = {
    keywordSearchValue: '',
    startDateValue: '',
    endDateValue: '',
    selectedNextDayValue: NextDaysIDEnum.EMPTY,
    tempStartDateValue: '',
    tempEndDateValue: '',
  }

  get ASKeywordSearch(): string {
    return this.filtersAdvanceSearch.keywordSearchValue
  }

  setASKeywordSearch(value: string) {
    this.filtersAdvanceSearch.keywordSearchValue = value
  }

  get ASStartDate(): string {
    return this.filtersAdvanceSearch.startDateValue
  }

  setASStartDate(value: string) {
    this.filtersAdvanceSearch.startDateValue = value
  }

  get ASEndDate(): string {
    return this.filtersAdvanceSearch.endDateValue
  }

  setASEndDate(value: string) {
    this.filtersAdvanceSearch.endDateValue = value
  }

  get ASSelectedNextDay(): NextDaysIDEnum {
    return this.filtersAdvanceSearch.selectedNextDayValue
  }

  setASSelectedNextDay(value: NextDaysIDEnum) {
    this.filtersAdvanceSearch.selectedNextDayValue = value
  }

  get ASTempStartDate(): string {
    return this.filtersAdvanceSearch.tempStartDateValue
  }

  setASTempStartDate(value: string) {
    this.filtersAdvanceSearch.tempStartDateValue = value
  }

  get ASTempEndDate(): string {
    return this.filtersAdvanceSearch.tempEndDateValue
  }

  setASTempEndDate(value: string) {
    this.filtersAdvanceSearch.tempEndDateValue = value
  }

  get nextDays() {
    return {
      options: [
        {
          ratePrice: 'Today',
          value: String(NextDaysIDEnum.TODAY),
          daysToAdd: NextDaysEnum.TODAY
        },
        {
          ratePrice: 'Next 7 Days',
          value: String(NextDaysIDEnum.NEXT_7_DAYS),
          daysToAdd: NextDaysEnum.NEXT_7_DAYS
        },
        {
          ratePrice: 'Next 15 Days',
          value: String(NextDaysIDEnum.NEXT_15_DAYS),
          daysToAdd: NextDaysEnum.NEXT_15_DAYS
        },
        {
          ratePrice: 'Next 30 Days',
          value: String(NextDaysIDEnum.NEXT_30_DAYS),
          daysToAdd: NextDaysEnum.NEXT_30_DAYS
        },
        {
          ratePrice: 'Next 90 Days',
          value: String(NextDaysIDEnum.NEXT_90_DAYS),
          daysToAdd: NextDaysEnum.NEXT_90_DAYS
        },
        {
          ratePrice: 'Next 180 Days',
          value: String(NextDaysIDEnum.NEXT_180_MONTHS),
          daysToAdd: NextDaysEnum.NEXT_180_MONTHS
        }
      ]
    }
  }

  activeFiltersAdvanceSearch() {
    this.setKeywordSearch(this.ASKeywordSearch.trim())
    this.setStartDate(this.ASStartDate)
    this.setEndDate(this.ASEndDate)
    this.setSelectedNextDay(this.ASSelectedNextDay)
  }

  clearAdvanceSearch() {
    this.setKeywordSearch('')
    this.setStartDate('')
    this.setEndDate('')
    this.setSelectedNextDay(NextDaysIDEnum.EMPTY)

    this.setASKeywordSearch('')
    this.setASStartDate('')
    this.setASEndDate('')
    this.setASSelectedNextDay(NextDaysIDEnum.EMPTY)
    this.setASTempStartDate('')
    this.setASTempEndDate('')
  }

  get disableSearch() {
    const disableByEmptyField =
      this.ASKeywordSearch.trim() === '' && this.ASStartDate === '' && this.ASEndDate === ''

    if (disableByEmptyField) return true

    if (this.ASStartDate !== '' && this.ASEndDate !== '') {
      const start = dayjs(this.ASStartDate)
      const end = dayjs(this.ASEndDate)
      const disableByDateInvalids = !start.isValid() || !end.isValid()

      if (disableByDateInvalids) return true

      const disableByInvertedDates = !(end.diff(start, 'day') >= 0)

      if (disableByInvertedDates) return true
    }

    return false
  }

  /* Advance Search End */

  /* Booking Detail Start */
  public drawerStepNow = DrawerSteps.DETAIL

  public drawerStepSendConfirmartionNow = DrawerStepsInSendConfirmation.FORM

  public drawerStepCancelReservationNow = DrawerStepsInCancelReservation.CANCEL_RESERVATION

  public showLoading = false

  public async getTermsAndConditions() {
    const {data} = (await this.getTermsAndConditionsUseCase.run(null)) || {}

    this.termsAndConditions =
      data?.data.map(data => {
        return {
          ...data.attributes
        }
      }) || []
  }

  public async getCategorie(filters: Categorie) {
    const {data} = await this.getCategoriesUseCase.run(filters)

    this.categories = data?.data[0]?.attributes!
  }

  public async getCompanions(filters: Companions) {
    const {data} = await this.getCompanionsUseCase.run(filters)
    this.companions = data || []
  }

  public async getProductsAndPayments(filters: ProductsAndPayments) {
    const {data} = await this.getProductsAndPaymentUseCase.run(filters)
    this.productsAndPayments = data!
  }

  public getTermsAndConditionByCode(code: string) {
    return this.termsAndConditions.find(policy => policy.code === code)
  }

  public async sendConfirmationLetter(payload: RequestSendConfirmationLetter) {
    return this.sendConfirmationLetterUseCase.run(payload)
  }

  public getRoomType(roomCode: string): EnumRoomCategory {
    const roomTypes = new Map<string, EnumRoomCategory>()

    // eslint-disable-next-line array-callback-return
    especialSuites.map(item => {
      roomTypes.set(item, EnumRoomCategory.ESPECIAL)
    })

    // eslint-disable-next-line array-callback-return
    estandarSuites.map(item => {
      roomTypes.set(item, EnumRoomCategory.ESTANDARD)
    })

    // eslint-disable-next-line array-callback-return
    presidentialSuites.map(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    // eslint-disable-next-line array-callback-return
    residenceSuites.map(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    // eslint-disable-next-line array-callback-return
    villaSuites.map(item => {
      roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
    })

    return roomTypes.get(roomCode)!
  }

  public highDemanWeeks: any | null = null

  public async getHightWeeks() {
    try {
      const response = await this.getWeeksUseCase.run(null)
      this.highDemanWeeks = response
      return response
    } catch (error) {}
  }

  public arrivalInHightWeek(checkInDate: string): boolean {
    checkInDate = dayjs(checkInDate).format('YYYY-MM-DD')

    return this.highDemanWeeks.some((week: { start: string; end: string }) => {
      return week.start <= checkInDate && checkInDate <= week.end
    })
  }

  public async validateCancelation(pipeline: PipelinesEnum) {
    const fact = {
      reservationId: this.detailSelected.categoryId,
      refundable: Number(this.detailSelected.Refundable),
      roomType: this.getRoomType(this.detailSelected.rm_type), // rm_type
      daysToCheckIn: daysToCheckIn(this.detailSelected.arv_date),
      hotel: this.detailSelected.hotel,
      arrivalInHightWeek: this.arrivalInHightWeek(this.detailSelected.arv_date)
    }

    const response = await this.runEngine.run({fact, pipeline})
    return response.events?.applyCancelationPenalty ?? false
  }

  /* Booking Detail End */
}
