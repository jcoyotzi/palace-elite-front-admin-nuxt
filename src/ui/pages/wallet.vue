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
      <WalletCommonBreadcrumbs
        class="pe-my-10 pe-w-full"
        :items="breadcrumbs"
        @on-breadcrumb-index="setItemIndex"
        @on-breadcrumb-item="setBreadcrumbItems"
      />
      <div class="xl:pe-flex pe-gap-12">
        <WalletCommonMenu
          class="pe-mb-10"
          :position="itemIndex"
          @on-menu-index="setItemIndex"
          @on-menu-item="setBreadcrumbItems"
        />
        <NuxtChild
          class="pe-w-full"
          @on-menu-item="setBreadcrumbItems"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {WalletStore} from '../store/benefits/walletStore'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import FiltersChangeEvent, {
  FilterArray,
  Filter
} from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import i18n from '~/src/ui/i18n/weeks/weeks.lang'
// Interfaces
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'
import PreferentialWeeksAndNightsDto, {
  PreferentialWeeksAndNightsAssets
} from '~/src/app/benefits/domain/dto/preferentialWeeksAndNightsDto'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
import PayloadGetWeeksAndNightsPreferentials from '~/src/app/benefits/domain/entities/payloadGetWeeksAndNightsPreferentials'
import {UseAuth} from '~/src/ui/store/auth'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  layout: 'default',
  meta: {
    auth: true
  }
})
export default class Wallet extends Mixins(BookingWidgetMixin, BasePageStrapiMixin) {

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  mounted() {
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')
  }

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.UniversalCredits)
    this.$nuxt.setLayout('default')
    this.benefitStore.setActivatorMobile('Wallet Options')
    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-wallet'])
  }

  get itemIndex(): number {
    return this.walletStore.itemIndex
  }

  set itemIndex(value: number) {
    this.walletStore.itemIndex = value
  }

  get walletStore(): WalletStore {
    return new WalletStore()
  }

  get propertiesCardsProvitionsList() {
    return this.weekStore.propertiesCardsProvitionsList
  }

  get showLoading(): boolean {
    return this.weekStore.loadingPaginationProvitions
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

  get filterSelected(): FilterArray[] {
    return this.benefitStore.filterSelected
  }

  get showPreferentialWeeksAndNights(): boolean {
    if (this.benefitStore.filterSelected.length > 1)
      return this.benefitStore.filterSelected[1]?.filters.some(
        (item: Filter) => item.value === 'All'
      )
    return false
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

  get filtersWeeksDefault(): FilterArray[] {
    return this.benefitStore.filtersWeeksDefault.map(category => ({
      filters: category.filters.map(filter => ({
        ...filter,
        name: this.$t(filter.name) as string
      })),
      name: this.$t(category.name) as string
    }))
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

  public onChangeInputSearchFilters(search: FiltersChangeEvent['search']) {
    this.benefitStore.searchFilter = search
  }

  public setItemIndex(index: number) {
    this.itemIndex = index
  }

  public setBreadcrumbItems(items: BreadcrumbItem[]) {
    this.breadcrumbs = items
  }

  public onChangeFilters({ filters }: FiltersChangeEvent) {
    this.benefitStore.statusFilter = filters[0]?.filters[0]?.value
  }

  public onFilterItems(items: any): void {
    this.weekStore.propertiesCardsProvitionsFiltered = items
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
