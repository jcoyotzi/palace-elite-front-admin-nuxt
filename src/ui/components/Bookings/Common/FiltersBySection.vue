<template>
  <div class="pe-mt-[30px]">
    <span class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white">
      {{ item.name }}
    </span>
    <div
      v-for="(filter, filterIndex) in section.filters"
      :key="indexWithPrefix(filterIndex)"
      class="pe-mt-[30px] pe-flex pe-flex-col pe-gap-y-[30px]"
    >
      <PECheckbox
        :key="filterIndex"
        :label="filter.name"
      >
        {{ filter.name }}
      </PECheckbox>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Filter, FilterSection} from '~/src/app/benefits/domain/entities/FilterSection'
import i18n from '~/src/ui/i18n/common/filters.lang'

@Component({
  i18n
})
export default class BookingFiltersBySection extends Vue {
  @Prop() item!: FilterSection

  get section() {
    return {
      ...this.item,
      filters: [{name: 'All', value: 'All'}, ...this.item.filters]
    }
  }

  indexWithPrefix(index: number) {
    return `filter-${index}`
  }

  isFilterInArray(filter: Filter, index: number): boolean {
    return this.section.filters.some((item: Filter) => item.value === filter.value)
  }
}
</script>
