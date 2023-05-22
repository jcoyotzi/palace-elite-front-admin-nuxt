<template>
  <div
    class="pe-rounded-[10px] pe-bg-black-light pe-px-[30px] pe-py-[30px] pe-mb-[40px]"
    style="z-index: 99999"
  >
    <PEDialog
      v-model="showSearchAdvance"
      @input="showSearchAdvance = $event"
      @show="$emit('show-search-advanced')"
      @hide="$emit('hide-search-advanced')"
      class="pe-hidden lg:flex"
    >
      <template #activator="{on}">
        <div @click="showSearchAdvance = true">
          <PEInput
            :label="labelSearch"
            :value="bookingsStore?.keywordSearch"
            type="text"
            :cursor="'pe-cursor-pointer'"
            readonly
            v-on="on"
          >
            <template #append-inner>
              <PEIcon
                class="pe-mr-3 pe-fill-transparent pe-text-white"
                color="medium"
                >search</PEIcon
              >
            </template>
          </PEInput>
        </div>
      </template>

      <slot
        name="search-advanced"
        :show="true"
      />
    </PEDialog>

    <PEInput
      :label="labelSearch"
      :value="bookingsStore?.keywordSearch"
      type="text"
      :cursor="'pe-cursor-pointer'"
      readonly
      class="lg:hidden"
      @click.native="showModal = true"
    >
      <template #append-inner>
        <PEIcon
          class="pe-mr-3 pe-fill-transparent pe-text-white"
          color="medium"
          >search</PEIcon
        >
      </template>
    </PEInput>

    <FiltersAppliedAdvanceSearch />

    <div class="lg:pe-hidden pe-text-center pe-mt-6">
      <div
        class="pe-text-blue-light pe-font-sans pe-text-[16px] pe-underline cursor-pointer"
        @click.prevent="openModalFullMobile(true)"
      >
        {{ $t('moreFilters') }}
      </div>
    </div>

    <div class="pe-mt-[30px] pe-hidden xl:pe-flow-root">
      <div
        v-for="(item, index) of filtersComputed"
        :key="index"
        class="md:pe-mb-[30px] pe-mb-[70px]"
      >
        <span class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white">
          {{ item.name }}
        </span>

        <div
          v-for="(filter, filterIndex) of item.filters"
          :key="indexWithPrefix(filterIndex)"
          class="pe-mt-[30px] pe-flex pe-flex-col pe-gap-y-[30px]"
        >
          <BookingsCommonCheckbox
            :key="filterIndex"
            :label="filter.name"
            :disabled="loadingTable"
            :value="isFilterInArray(filter, index)"
            @click="changeItemState(filter, index)"
          >
            {{ filter.name }}
          </BookingsCommonCheckbox>
        </div>
      </div>
      <div
        v-if="isSorteable"
        class="pe-mt-[70px] md:pe-mt-[30px]"
      >
        <span class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white">
          {{ sortTitle }}
        </span>
        <PERadioGroup
          color="bg-black"
          v-model="sortValue"
          name="web"
          :disabled="loadingTable"
          class="pe-mt-[30px]"
          :items="ORDER_TYPES"
          position="vertical"
        />
      </div>
    </div>

    <PEModalFullMobile
      v-model="showModal"
    >
      <div class="pe-justify-end pe-text-right pe-mb-[30px]">
        <PEButton
          class="!pe-h-[40px] pe-w-auto pe-p-0"
          text
          @click.prevent="openModalFullMobile(false)"
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3402_71566)">
              <path
                d="M19 0.59375C8.83203 0.59375 0.59375 8.83203 0.59375 19C0.59375 29.168 8.83203 37.4062 19 37.4062C29.168 37.4062 37.4062 29.168 37.4062 19C37.4062 8.83203 29.168 0.59375 19 0.59375ZM19 35.0312C10.1902 35.0312 2.96875 27.8988 2.96875 19C2.96875 10.1902 10.1012 2.96875 19 2.96875C27.8098 2.96875 35.0312 10.1012 35.0312 19C35.0312 27.8098 27.8988 35.0312 19 35.0312ZM26.0359 13.8566L20.8926 19L26.0359 24.1434C26.3848 24.4922 26.3848 25.0562 26.0359 25.4051L25.4051 26.0359C25.0562 26.3848 24.4922 26.3848 24.1434 26.0359L19 20.8926L13.8566 26.0359C13.5078 26.3848 12.9437 26.3848 12.5949 26.0359L11.9641 25.4051C11.6152 25.0562 11.6152 24.4922 11.9641 24.1434L17.1074 19L11.9641 13.8566C11.6152 13.5078 11.6152 12.9437 11.9641 12.5949L12.5949 11.9641C12.9437 11.6152 13.5078 11.6152 13.8566 11.9641L19 17.1074L24.1434 11.9641C24.4922 11.6152 25.0562 11.6152 25.4051 11.9641L26.0359 12.5949C26.3773 12.9437 26.3773 13.5078 26.0359 13.8566Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3402_71566">
                <rect
                  width="38"
                  height="38"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </PEButton>
      </div>
      <label :class="titleClass">{{ $t('advanceSearch') }}</label>
      <KeywordSearch />
      <label :class="titleClass">{{ $t('searchByTravelDate') }}</label>
      <TravelRangeDate />
      <NextDays />
      <div class="pe-flex pe-flex-col pe-items-center pe-justify-end sm:pe-flex-row pe-mt-10">
        <div class="pe-mb-5 sm:pe-mb-0 sm:pe-mr-[60px]">
          <PEButton
            text
            uppercase
            class="!pe-no-underline"
            @click="clear"
            >{{ $t('clearAll') }}</PEButton
          >
        </div>
        <div>
          <PEButton
            uppercase
            solid
            flat
            block
            class="pe-bg-blue-dark pe-rounded-none"
            @click="search"
            :disabled="disabledSearch"
            >{{ $t('search') }}</PEButton
          >
        </div>
      </div>

      <div class="pe-mt-[30px]">
        <div
          v-for="(item, index) of filtersComputed"
          :key="index"
          class="md:pe-mb-[30px] pe-mb-[70px]"
        >
          <span
            :key="index"
            class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white"
          >
            {{ item.name }}
          </span>

          <div
            v-for="(filter, filterIndex) of item.filters"
            :key="indexWithPrefix(filterIndex)"
            class="pe-mt-[30px] pe-flex pe-flex-col pe-gap-y-[30px]"
          >
            <BookingsCommonCheckbox
              :key="filterIndex"
              :label="filter.name"
              :value="isFilterInArray(filter, index)"
              @click="changeItemState(filter, index)"
            >
              {{ filter.name }}
            </BookingsCommonCheckbox>
          </div>
        </div>
        <div
          v-if="isSorteable"
          class="pe-mt-[70px] md:pe-mt-[30px]"
        >
          <span class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white">
            {{ sortTitle }}
          </span>
          <PERadioGroup
            color="bg-black"
            name="mobile"
            v-model="sortValue"
            class="pe-mt-[30px]"
            :items="ORDER_TYPES"
            position="vertical"
          />
        </div>

        <div class="pe-mt-[70px]">
          <PEButton
            solid
            uppercase
            class="pe-w-full pe-h-[60px]"
            @click.prevent="onApplyChanges()"
          >
            {{ $t('applyFilters') }}
          </PEButton>
        </div>
      </div>
    </PEModalFullMobile>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Filter, FilterSection} from '~/src/app/benefits/domain/entities/FilterSection'
import i18n from '~/src/ui/i18n/common/filters.lang'
import PEModalFullMobile from '~/src/ui/components/Layout/PEModalFullMobile.vue'
import FiltersChangeEvent from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {ItemRadioGroup} from '~/src/app/benefits/domain/entities/ItemRadioGroup'
import {SortBy} from '~/src/app/bookings/domain/enums/sortBy'
import PEDialog from '~/src/ui/components/Nav/PEDialog.vue'
import TravelRangeDate from '~/src/ui/components/Weeks/Common/AdvanceSearch/TravelRangeDate.vue'
import NextDays from '~/src/ui/components/Weeks/Common/AdvanceSearch/NextDays.vue'
import KeywordSearch from '~/src/ui/components/Weeks/Common/AdvanceSearch/KeywordSearch.vue'
import FiltersAppliedAdvanceSearch from './FiltersAppliedAdvanceSearch.vue'

@Component({
  i18n,
  name: 'Filters',
  components: {
    PEModalFullMobile,
    PEDialog,
    KeywordSearch,
    TravelRangeDate,
    NextDays,
    FiltersAppliedAdvanceSearch,
  }
})
export default class Filters extends Vue {
  public showModal: boolean = false

  public searchValue: string = ''

  public isMobile: boolean = false

  @Prop() filters!: FilterSection[]

  @Prop() sorteable?: boolean

  @Prop() sortTitle?: string

  @Prop({default: 'Search', type: String})
  labelSearch!: string

  created() {
    this.filtersSelected = this.filters.map(({name}: FilterSection, index) => {
      return {
        name,
        filters: this.filtersSelected.length > 0 ? this.filtersSelected[index]?.filters : []
      }
    })
  }

  mounted() {
    this.isMobile = window.innerWidth < 1019
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get filtersSelected(): FilterSection[] {
    return this.bookingsStore.filterSelected
  }

  set filtersSelected(value) {
    this.bookingsStore.filterSelected = value
  }

  get sortValue() {
    return this.bookingsStore.sortValue
  }

  set sortValue(value: string) {
    this.bookingsStore.sortValue = value
  }

  get bindingSortValue() {
    return this.sortValue
  }

  get ALL_CHECK(): Filter {
    return {
      value: 'All',
      name: this.$t('all') as string
    }
  }

  get ORDER_TYPES(): ItemRadioGroup[] {
    return [
      {id: '0', name: this.$t('ascending') as string},
      {id: '1', name: this.$t('descending') as string}
    ]
  }

  get isSorteable() {
    return this.sorteable !== undefined || this.sorteable
  }

  get sortOrderValue() {
    return this.ORDER_TYPES[Number(this.bindingSortValue)]
  }

  get filtersComputed(): FilterSection[] {
    const filters = this.filters.map(item => ({
      name: item.name,
      filters: this.addAllCheckToFilterArray(item)
    }))
    return filters
  }

  get loadingTable() {
    return this.bookingsStore.loadingTable
  }

  get disabledSearch() {
    return this.bookingsStore.disableSearch
  }

  changeItemState(filter: Filter, index: number) {
    if (this.isFilterAllCheck(filter.value)) {
      this.setAllFilterSection(filter, index)
    } else if (this.isFilterInArray(filter, index)) {
      this.addFilterToSelectedWithAllState(filter, index)
    } else {
      this.addFilterToSelectedFilters(filter, index)
    }
  }

  openModalFullMobile(value: boolean) {
    this.showModal = value
  }

  onChangeFilters({filters, sort}: FiltersChangeEvent) {
    this.$emit('filters-change', {filters, sort})
  }

  onChangeSearch(event: any) {
    this.$emit('change-search-filters', (<HTMLInputElement>event.srcElement).value)
  }

  indexWithPrefix(index: number) {
    return `filter-${index}`
  }

  isFilterAllCheck(value: any) {
    return value === this.ALL_CHECK.value
  }

  setAllFilterSection(filter: Filter, index: number) {
    if (!this.isFilterInArray(filter, index)) {
      this.filtersSelected[index].filters = this.filters[index].filters.map(item => item)
      this.filtersSelected[index].filters = this.addAllCheckToFilterArray(
        this.filtersSelected[index]
      )
    } else {
      this.filtersSelected[index].filters = []
    }
  }

  addFilterToSelectedWithAllState(filter: Filter, index: number) {
    if (this.isFilterInArray(this.ALL_CHECK, index)) {
      this.filtersSelected[index].filters = this.filtersSelected[index].filters.filter(
        item => item.value !== this.ALL_CHECK.value
      )
    }
    this.removeFilterFromSelectedItems(filter, index)

    if (this.checkForFilters(index)) this.setAllFilterSection(filter, index)
  }

  checkForFilters(index: number) {
    return this.filtersSelected[index].filters.length === 0
  }

  isFilterInArray(filter: Filter, index: number): boolean {
    return this.filtersSelected[index].filters.some((item: Filter) => item.value === filter.value)
  }

  addAllCheckToFilterArray(item: FilterSection) {
    return [this.ALL_CHECK].concat(item.filters)
  }

  removeFilterFromSelectedItems(filter: Filter, index: number) {
    const currentFilters = this.filtersSelected[index].filters
    this.filtersSelected[index].filters = currentFilters.filter(item => item.value !== filter.value)
  }

  addFilterToSelectedFilters(filter: Filter, index: number) {
    this.filtersSelected[index].filters.push(filter)
  }

  onApplyChanges() {
    this.onWatchFilters()
    this.openModalFullMobile(false)
  }

  onWatchFilters() {
    if (!this.bookingsStore.loadFilters && !this.loadingTable) {
      //@ts-ignore
      this.bookingsStore.sortBy = SortBy[this.sortOrderValue.name]
      this.$emit('filters-change', {
        filters: this.filtersSelected,
        sort: this.isSorteable ? this.sortOrderValue : null
      })
    }
  }

  get showSearchAdvance() {
    return this.bookingsStore.showSearchAdvance
  }

  set showSearchAdvance(value: boolean) {
    this.bookingsStore.setShowSearchAdvance(value)
  }

  get buttonAdvanceSearchProps() {
    return {
      label: '',
      type: 'button',
      solid: true,
      uppercase: true,
      block: true,
      flat: true,
      class: ['!pe-bg-black-medium text-white py-2 px-4 rounded border-transparent']
    }
  }

  get titleClass() {
    return 'pe-font-sans pe-text-[24px] pe-font-normal pe-text-white'
  }

  search() {
    this.bookingsStore.activeFiltersAdvanceSearch()
    this.$emit('advance-search')
    this.openModalFullMobile(false)
    this.bookingsStore.setShowSearchAdvance(false)
  }

  clear() {
    this.bookingsStore.clearAdvanceSearch()
    this.$emit('clear-advance-search')
  }

  @Watch('bindingSortValue')
  @Watch('filtersSelected', {deep: true})
  onFiltersChange() {
    if (!this.isMobile) {
      this.onWatchFilters()
    }
  }
}
</script>
