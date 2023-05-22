<template>
  <div class="pe-bg-black">
    <div class="pe-relative">
      <CommonHeroWidget
        v-if="components"
        :calendar-data="calendarData"
        :hero-attrs="heroAttrs"
        :booking-attrs="bookingAttrs"
      />
    </div>
    <div class="pe-relative pe-container pe-px-4 pe-mx-auto pe-pb-20 md:pe-mt-24">
      <div class="xl:pe-flex pe-gap-12">
        <div class="xl:!pe-w-[25%]">
          <BookingsCommonFilters
            class="pe-mt-[50px] md:pe-mt-[0px]"
            :items="reservations"
            :filters="itemsFiltersDefault"
            sorteable
            :sort-title="$t('SortByDate')"
            :label-search="$t('search')"
            @filters-change="onChangeTable"
            @change-search-filters="onChangeInputSearchFilters"
            @advance-search="advanceSearch"
            @clear-advance-search="clearAdvanceSearch"
          >
            <template #search-advanced="{show}">
              <AdvanceSearch
                v-if="show"
                @advance-search="advanceSearch"
                @clear-advance-search="clearAdvanceSearch"
              />
            </template>
          </BookingsCommonFilters>
        </div>
        <div class="xl:pe-w-[70%]">
          <BookingsCommonReservationsToValidate />
          <PELoadingData v-if="showLoading" />
          <BookingsCommonTable
            v-if="showTable"
            :per-page="perPage"
            class="pe-w-full"
            :properties-table="bindTablePagination"
            :items="reservations"
            @change-per-page="onChangePerPage"
          >
            <div class="pe-mt-[50px] pe-mb-[35px]">
              <div
                v-for="(reservation, index) in reservations"
                :key="index"
              >
                <BookingsCommonTableItems
                  class="pe-mb-[40px] md:pe-mb-[30px]"
                  :reservation="reservation"
                >
                  <div class="pe-w-full pe-grid pe-place-items-center pe-mt-[10px]">
                    <BookingsCommonTableExpansionHeader
                      :index="index"
                      :reservation="reservation"
                      class="cursor-pointer"
                      :text="$t('sendPaymentLink')"
                    />
                  </div>
                </BookingsCommonTableItems>
              </div>
            </div>
          </BookingsCommonTable>
        </div>
      </div>
      <BookingsCommonDrawer
        v-if="showDrawerDetails"
        @reloadTable="onReloadTable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator'
import {ToastOptions} from 'vue-toasted'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {ToastDuration} from '../utils/toastHelpers'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import FiltersChangeEvent, {
  FilterArray
} from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import i18n from '~/src/ui/i18n/bookings.lang'
import {UseAuth} from '~/src/ui/store/auth'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import AdvanceSearch from '~/src/ui/components/Weeks/Common/AdvanceSearch/AdvanceSearch.vue'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import PayloadGetReservations from '~/src/app/bookings/domain/entities/payloadGetReservations'
import {BookingStatus} from '~/src/app/bookings/domain/enums/bookingStatus'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {BookingStore} from '~/src/ui/store/bookingStore'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  meta: {
    auth: true
  },
  components: {
    AdvanceSearch
  }
})
export default class BookingsPage extends Mixins(BookingWidgetMixin, BasePageStrapiMixin) {

  public slugPage: BasePageSlugs = BasePageSlugs.Bookings;

  public perPage: number = 5

  public searchValue: string = ''

  public filtersChange: boolean = false

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  public get toastOptions(): ToastOptions {
    return {
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'success'
    }
  }

  public bookingStore = new BookingStore()

  beforeCreate() {
    this.$nuxt.setLayout('default')
  }

  async beforeMount() {
    if (!this.userIsAuthenticated) {
      this.$nuxt.setLayout('auth')
      return
    }

    try {
      const persistence = new PersistentStoreLocalStorageRepository([])
      persistence.clean(this.bookingStore)
      this.bookingStore.$reset()
      this.bookingStore.resetBooking()
      this.bookingsStore.loadingTable = true
      await this.loadStrapiPageData()
      await this.bookingsStore.getFilters(this.payloadFilters)

      const showPendingBookings = this.$route.query.showPendingBookings

      if (showPendingBookings) {
        // Only select filters with status On Hold and Pending Payment
        this.bookingsStore.filterSelected[0].filters = []
        this.bookingsStore.filterSelected[0].filters.push(
          this.bookingsStore.itemsFiltersDefault[0].filters[0]
        )
        this.bookingsStore.filterSelected[0].filters.push(
          this.bookingsStore.itemsFiltersDefault[0].filters[1]
        )
      }

      if (!this.$route.query.reservation)
        await this.bookingsStore.getReservations(this.payloadReservations())

      await this.bookingsStore.getReservationsToValidate(this.payloadReservationsToValidate())
      await this.bookingsStore.getHightWeeks()
    } catch (error) {
      this.$toasted.error(this.$t('loadDataFailed') as string, this.toastOptions)
    } finally {
      this.bookingsStore.loadingTable = false
      this.$nuxt.setLayout('default')
    }
  }

  get rejectReservationSuccessful() {
    return this.bookingsStore.rejectReservationSuccessful
  }

  set rejectReservationSuccessful(value: boolean) {
    this.bookingsStore.rejectReservationSuccessful = value
  }

  get page(): number {
    return this.bookingsStore.page
  }

  set page(value: number) {
    this.bookingsStore.page = value
  }

  get showTable(): boolean {
    return !this.showLoading && !this.bookingsStore.showListReservationsToValidate
  }

  public payloadReservationsToValidate() {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      isNational: this.isNational!
    }
  }

  get payloadFilters() {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      isNational: this.isNational!
    }
  }

  get sortBy() {
    return this.bookingsStore.sortBy
  }

  public payloadReservations(): PayloadGetReservations {
    const payload: PayloadGetReservations = {
      pageNumber: this.page,
      size: this.perPage,
      application: this.applicationUserMember!,
      company: this.userCompany!,
      isNational: this.isNational!,
      sort: this.sortBy
    }

    if (this.bookingsStore.keywordSearch !== '') {
      payload.searchItem = this.bookingsStore.keywordSearch
    }

    if (this.bookingsStore.startDate !== '')
      payload.startDate = `${this.bookingsStore.startDate}T00:00:00.000Z`

    if (this.bookingsStore.endDate !== '')
      payload.endDate = `${this.bookingsStore.endDate}T00:00:00.000Z`

    if (this.filterSelected.length > 0) {
      const status = JSON.stringify(
        this.filterSelected[0].filters.map(status => {
          return status.value === BookingStatus.PAYMENT_PENDING
            ? BookingStatus.PENDING
            : status.value
        })
      )

      if (!status.includes('All') && this.filterSelected[0].filters.length > 0)
        payload.status = status

      const resort = JSON.stringify(this.filterSelected[1].filters.map(resort => resort.value))
      if (!resort.includes('All') && this.filterSelected[1].filters.length > 0)
        payload.resort = resort

      const provision = JSON.stringify(
        this.filterSelected[2].filters.map(provision => {
          if (provision.value === 'All') return provision.value
          return Number(provision.value)
        })
      )
      if (!provision.includes('All') && this.filterSelected[2].filters.length > 0)
        payload.provision = provision
    }

    return payload
  }

  get isNational() {
    return this.authStore.isNational
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get showDrawerDetails() {
    return this.bookingsStore.showDrawerDetails
  }

  get reservations(): ReservationsDto[] {
    const hash: any = {}
    return this.bookingsStore.paginationReservations.items.filter(current => {
      const exists = !hash[current.folioClub]
      hash[current.folioClub] = true
      return exists
    })
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get filterSelected(): FilterArray[] {
    return this.bookingsStore.filterSelected
  }

  get itemsFiltersDefault() {
    return this.bookingsStore.itemsFiltersDefault.map(category => ({
      filters: category.filters.map(filter => ({
        ...filter,
        name: this.$t(filter.name) as string
      })),
      name: this.$t(category.name) as string
    }))
  }

  get bindTablePagination() {
    return {
      searchProps: {
        label: this.$t('search') as string,
        color: 'medium'
      },
      perPageProps: {
        label: this.$t('rowsPerPage') as string,
        color: 'medium',
        items: ['5', '10', '15', '20', '25']
      },
      sortProps: {
        label: this.$t('sortBy') as string,
        color: 'medium',
        items: [
          {
            value: '0',
            text: this.$t('ascending') as string
          },
          {
            value: '1',
            text: this.$t('descending') as string
          }
        ]
      }
    }
  }

  get showLoading(): boolean {
    return this.bookingsStore.loadingTable
  }

  get showModalRejectReservation() {
    return this.bookingsStore.showModalRejectReservation
  }

  get rejectReservationError(): boolean {
    return this.bookingsStore.rejectReservationError
  }

  set rejectReservationError(value: boolean) {
    this.bookingsStore.rejectReservationError = value
  }

  public onChangePerPage(value: number): void {
    this.perPage = value
    this.page = 1
  }

  public onChangeInputSearchFilters(search: FiltersChangeEvent['search']) {
    this.searchValue = search
  }

  onLoadTable() {
    if (!this.bookingsStore.loadingTable) {
      this.bookingsStore.getReservations(this.payloadReservations())
      this.bookingsStore.loadingTable = true
    }
  }

  @Watch('showModalRejectReservation')
  onReloadTable() {
    if (this.rejectReservationSuccessful) {
      this.bookingsStore.showDrawerDetails = false
      this.bookingsStore.getReservations(this.payloadReservations())
      this.bookingsStore.getReservationsToValidate(this.payloadReservationsToValidate())
      this.bookingsStore.rejectReservationSuccessful = false
    }
  }

  @Watch('page')
  onChangePage() {
    this.onLoadTable()
  }

  @Watch('showDrawerDetails')
  enableDisableScroll() {
    const body = document.getElementsByTagName(`body`)
    if (this.showDrawerDetails) {
      body[0].style.maxHeight = '100vh'
      body[0].style.overflow = 'hidden'
    } else {
      body[0].style.maxHeight = 'auto'
      body[0].style.overflow = 'visible'
    }
  }

  @Watch('searchValue')
  @Watch('perPage')
  onChangeTable() {
    this.page = 1
    this.onLoadTable()
  }

  advanceSearch() {
    this.perPage = 5
    this.bookingsStore.getReservations(this.payloadReservations())
  }

  clearAdvanceSearch() {
    this.bookingsStore.getReservations(this.payloadReservations())
  }
}
</script>
<style lang="scss" scoped>
.pe-container-paddings {
  padding: 20px;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }
}
</style>
