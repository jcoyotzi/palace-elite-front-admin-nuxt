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
    <div class="pe-relative pe-container pe-px-4 pe-mx-auto md:pe-pb-20 md:pe-mt-24">
      <WalletCommonBreadcrumbs
        class="pe-my-10 pe-w-full"
        :items="breadcrumbs"
        @on-breadcrumb-index="setItemIndex"
        @on-breadcrumb-item="setBreadcrumbItems"
      />
      <div class="lg:pe-flex pe-gap-12">
        <div class="lg:!pe-w-[25%]">
          <WeeksCommonFilters
            :items="provitions"
            :filters="filtersWeeksDefault"
            sorteable
            :step-filters="['status', 'weeks']"
            :filters-selected="filterSelected"
            :sort-title="$t('SortByDate')"
            :label-search="$t('search')"
            @filters-change="onChangeFilters"
            @change-search-filters="onChangeInputSearchFilters"
            @items-filter="onFilterItems"
          />
        </div>
        <div class="lg:pe-w-[70%]">
          <PEPreferencialWeeksAndNights
            v-if="showPreferentialWeeksAndNights"
            :locale="locale"
            v-bind="preferentialWeeksAndNights"
            class="!pe-mb-10 pe-mt-[60px] lg:!pe-mt-[0px] pe-hidden md:pe-flow-root"
            @use-button="onButtonUse"
            @more-button="onButtonMore"
          />
          <PEPreferencialWeeksAndNights
            v-if="showPreferentialWeeksAndNights"
            :locale="locale"
            v-bind="preferentialWeeksAndNightsMobile"
            class="!pe-mb-10 pe-mt-[60px] lg:!pe-mt-[0px] md:hidden"
            @use-button="onButtonUse"
            @more-button="onButtonMore"
          />
          <PELoadingData v-if="showLoading" />
          <NuxtChild
            v-else
            class="pe-w-full"
            @on-menu-item="setBreadcrumbItems"
          />
        </div>
      </div>
      <WeeksCommonDrawer />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Watch, Mixins} from 'vue-property-decorator'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import FiltersChangeEvent, {
  FilterArray,
  Filter
} from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import i18n from '~/src/ui/i18n/weeks/weeks.lang'
// Interfaces
import PEBookingWidget from '~/src/ui/components/BookingWidget/PEBookingWidget.vue'
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'
import PreferentialWeeksAndNightsDto, {
  PreferentialWeeksAndNightsAssets
} from '~/src/app/benefits/domain/dto/preferentialWeeksAndNightsDto'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
import PayloadGetWeeksAndNightsPreferentials from '~/src/app/benefits/domain/entities/payloadGetWeeksAndNightsPreferentials'
import {UseAuth} from '~/src/ui/store/auth'
import PayloadGetWeeksProvitions from '~/src/app/benefits/domain/entities/payloadGetWeeksProvitions'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  layout: '',
  meta: {
    auth: true
  },
  components: {
    PEBookingWidget
  }
})
export default class Weeks extends Mixins(BookingWidgetMixin, BasePageStrapiMixin) {
  public itemIndex: number = 0

  public provitionsFiltered: any[] = []

  public columnSearch: string[] = []

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.AllWeeks);
    this.weekStore.fetchWeeksProvitions(this.payloadWeeksProvitions)
    this.weekStore.fetchWeeksAndNightsPreferentials(this.payloadWeeksAndNightsPreferentials)
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  mounted() {
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')
    this.benefitStore.setActivatorMobile('Weeks Options')
    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-weeks'])
  }

  get provitions() {
    return this.weekStore.propertiesCardsProvitionsList
  }

  get payloadWeeksAndNightsPreferentials(): PayloadGetWeeksAndNightsPreferentials {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!
    }
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get locale(): string {
    return this.$i18n.locale
  }

  get preferentialWeeksAndNights(): PreferentialWeeksAndNightsDto {
    return {
      title: this.$t('preferentialWeeksAndNights') as string,
      assets: this.weekStore.weeksAndNightsPreferentials?.assets.map(
        (asset: PreferentialWeeksAndNightsAssets) => ({
          ...asset,
          labelStart: this.$t(asset.labelStart) as string,
          labelEnd: this.$t(asset.labelEnd) as string
        })
      )
    }
  }

  get preferentialWeeksAndNightsMobile(): PreferentialWeeksAndNightsDto {
    return {
      title: this.$t('preferentialWeeksAndNightsMobile') as string,
      assets: this.weekStore.weeksAndNightsPreferentials?.assets.map(
        (asset: PreferentialWeeksAndNightsAssets) => ({
          ...asset,
          labelStart: this.$t(asset.labelStart) as string,
          labelEnd: this.$t(asset.labelEnd) as string
        })
      )
    }
  }

  get weekStore(): WeekStore {
    return new WeekStore()
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }

  get breadcrumbs() {
    return this.benefitStore.breadcrumbs.map(bread => ({
      ...bread,
      title: this.$t(bread.title) as string
    }))
  }

  set breadcrumbs(value) {
    this.benefitStore.setBreadcrumbsItems(value)
  }

  public setItemIndex(index: number) {
    if (index >= 0) this.itemIndex = index
  }

  public setBreadcrumbItems(items: BreadcrumbItem[]) {
    this.breadcrumbs = items
  }

  get showPreferentialWeeksAndNights(): boolean {
    if (this.benefitStore.filterSelected.length > 1)
      return this.benefitStore.filterSelected[1]?.filters.some(
        (item: Filter) => item.value === 'All'
      )
    return false
  }

  get payloadWeeksProvitions(): PayloadGetWeeksProvitions {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      isNational: this.authStore.isNational
    }
  }

  get filtersWeeksDefault(): FilterArray[] {
    return this.benefitStore.filtersWeeksDefault.map(category => ({
      filters: category.filters.map(filter => ({
        ...filter,
        name: this.$t(filter.name) as string
      })),
      name: this.$t(category.name) as string
    }))
  }
  // ========================================

  get showLoading(): boolean {
    return this.weekStore.loadingPaginationProvitions
  }

  get filterSelected(): FilterArray[] {
    return this.benefitStore.filterSelected
  }

  get filterSearch() {
    // terminado
    return this.weekStore.filters?.search
  }

  get filterSortBy() {
    // terminado
    return this.weekStore.filters?.sort
  }

  get filterSelecteds() {
    // terminado
    return this.weekStore.filters?.filters
  }

  calculateSearch() {
    // terminado
    const searchValue: string = this.filterSearch
    const {provitionsFiltered, columnSearch} = this
    if (searchValue !== '') {
      // validamos que no este search vacio
      return provitionsFiltered
        .map((objectValue: any) => {
          // recorremos los provitionsFiltered
          const result = Object.entries(objectValue).map(([key, value]) => {
            // recorremos el objeto por key y value
            const val = String(value)
            // validamos si traemos columnas especiales para busqueda
            if (columnSearch.length > 0) {
              // validamos que coincidan columnas y el valor con el de la busqueda
              if (columnSearch.includes(key) && val === searchValue) return true
            } else if (
              val.includes(searchValue) ||
              val.toUpperCase().includes(searchValue) ||
              val.toLowerCase().includes(searchValue)
            )
              return true
          })
          // validamos que exista al menos una coincidencia
          if (result.includes(true)) return objectValue
        })
        .filter((objectValue: any) => objectValue !== undefined) // filtramos que no traiga undefineds el Object.entries
    }
    return provitionsFiltered
  }

  public onChangeInputSearchFilters(search: FiltersChangeEvent['search']) {
    // terminado
    this.weekStore.setFilterSearch(search)
  }

  public onChangeFilters({filters, sort}: FiltersChangeEvent) {
    // terminado
    this.weekStore.setFilterSortBy(sort)
    this.weekStore.setFilterSelecteds(filters)
  }

  onButtonUse(): void {
    this.$nuxt.$router.push(this.localePath('/build-your-search'))
  }

  onButtonMore(): void {
    this.$nuxt.$router.push(this.localePath('/preferential-weeks'))
  }

  public onFilterItems(items: any): void {
    this.weekStore.propertiesCardsProvitionsFiltered = items
  }

  @Watch('filterSearch')
  @Watch('filterSortBy')
  @Watch('filterSelecteds')
  onChangeprovitionsFiltered() {
    this.provitionsFiltered = this.provitions
    this.provitionsFiltered = this.calculateSearch()
    this.weekStore.setProvitions(this.provitionsFiltered)
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
::v-deep div.justify-between > div.items-baseline > p {
  color: white;
}
</style>
