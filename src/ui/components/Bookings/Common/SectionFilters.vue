<template>
  <div class="pe-mt-[30px]">
    <div
      v-for="(item, index) of filters"
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
        <PECheckbox
          :key="filterIndex"
          :label="filter.name"
          :value="isFilterInArray(filter, index)"
          @click="changeItemState(filter, index)"
        >
          {{ filter.name }}
        </PECheckbox>
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
        class="pe-mt-[30px]"
        :items="ORDER_TYPES"
        position="vertical"
      />
    </div>
    <div class="pe-mt-[70px] lg:pe-hidden">
      <PEButton
        solid
        class="pe-w-full pe-h-[60px]"
      >
        {{ $t('applyFilters') }}
      </PEButton>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import {Filter, FilterSection} from '~/src/app/benefits/domain/entities/FilterSection'
import {ItemRadioGroup} from '~/src/app/benefits/domain/entities/ItemRadioGroup'
import i18n from '~/src/ui/i18n/common/filters.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {SortBy} from '~/src/app/bookings/domain/enums/sortBy'
@Component({
  i18n,
  name: 'BookingSectionFilters'
})
export default class BookingSectionFilters extends Vue {
  @Prop({default: () => []}) public filtersItems!: FilterSection[]
  @Prop({default: ''}) public sorteable?: boolean
  @Prop({default: ''}) public sortTitle?: string
  @Prop({default: 'Search', type: String}) labelSearch!: string

  created() {
    const data = this.filtersItems.map(({name}: FilterSection, index) => {
      return {
        name,
        filters: this.filtersSelected.length > 0 ? this.filtersSelected[index]?.filters : []
      }
    })
    this.filtersSelected = data
  }

  get sortValue() {
    return this.bookingsStore.sortValue
  }

  set sortValue(value: string) {
    this.bookingsStore.sortValue = value
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

  changeItemState(filter: Filter, index: number) {
    if (this.isFilterAllCheck(filter.value)) {
      this.setAllFilterSection(filter, index)
    } else if (this.isFilterInArray(filter, index)) {
      this.addFilterToSelectedWithAllState(filter, index)
    } else {
      this.addFilterToSelectedFilters(filter, index)
    }
  }

  get filters(): FilterSection[] {
    const filters = this.filtersItems.map(item => ({
      name: item.name,
      filters: this.addAllCheckToFilterArray(item)
    }))
    return filters
  }

  indexWithPrefix(index: number) {
    return `filter-${index}`
  }

  isFilterAllCheck(value: any) {
    return value === this.ALL_CHECK.value
  }

  setAllFilterSection(filter: Filter, index: number) {
    if (!this.isFilterInArray(filter, index)) {
      this.filtersSelected[index].filters = this.filtersItems[index].filters.map(item => item)
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

  @Watch('bindingSortValue')
  @Watch('filtersSelected')
  onFiltersChange() {
    //@ts-ignore
    this.bookingsStore.sortBy = SortBy[this.sortOrderValue.name]
    this.$emit('filters-change', {
      filters: this.filtersSelected,
      sort: this.isSorteable ? this.sortOrderValue : null
    })
  }
}
</script>
