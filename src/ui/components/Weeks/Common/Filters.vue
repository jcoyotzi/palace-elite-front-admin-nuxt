<template>
  <div class="pe-rounded-[10px] pe-bg-black-light pe-px-[30px] pe-py-[30px] pe-mb-[40px]">
    <PEModalFullMobile v-model="showModal">
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

      <PEInput
        :value="searchValue"
        :label="labelSearch"
        @input="onChangeSearch"
      >
        <template #append-inner>
          <PEIcon
            class="pe-mr-3 pe-fill-transparent pe-text-white"
            color="medium"
            >search</PEIcon
          >
        </template>
      </PEInput>
      <SectionChecksFiltersMobile
        v-bind="bindChecksFilters"
        @filters-change="onChangeFilters"
        @on-close="openModalFullMobile(false)"
      />
    </PEModalFullMobile>

    <!-- DESKTOP -->
    <section>
      <PEInput
        :value="searchValue"
        :label="labelSearch"
        @input="onChangeSearch"
        class="!pe-cursor-pointer pe-mb-[30px]"
      >
        <template #append-inner>
          <PEIcon
            class="pe-mr-3 pe-fill-transparent pe-text-white"
            color="medium"
            >search</PEIcon
          >
        </template>
      </PEInput>
    </section>

    <SectionChecksFilters
      v-bind="bindChecksFilters"
      class="lg:pe-flow-root pe-hidden"
      @filters-change="onChangeFilters"
    />
    <div class="lg:pe-hidden pe-mt-[30px] pe-text-center">
      <div
        class="pe-text-blue-light pe-font-sans pe-text-[16px] pe-underline"
        @click.prevent="openModalFullMobile(true)"
      >
        {{ $t('moreFilters') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SectionChecksFilters from './SectionChecksFilters.vue'
import SectionChecksFiltersMobile from './SectionChecksFiltersMobile.vue'
import {FilterSection} from '~/src/app/benefits/domain/entities/FilterSection'
import i18n from '~/src/ui/i18n/common/filters.lang'
import PEModalFullMobile from '~/src/ui/components/Layout/PEModalFullMobile.vue'
import FiltersChangeEvent from '~/src/app/benefits/domain/entities/filtersChangeEvent'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  i18n,
  name: 'Filters',
  components: {
    SectionChecksFilters,
    SectionChecksFiltersMobile,
    PEModalFullMobile
  }
})
export default class Filters extends Vue {
  public showModal: boolean = false

  @Prop() filters!: FilterSection[]

  @Prop() sorteable?: boolean

  @Prop() sortTitle?: string

  public searchValue: string = ''

  @Prop({default: 'Search', type: String})
  labelSearch!: string

  @Prop({default: () => [], type: Array})
  filtersSelected!: FilterSection[]

  openModalFullMobile(value: boolean) {
    this.showModal = value
  }

  onChangeFilters({filters, sort}: FiltersChangeEvent) {
    this.$emit('filters-change', {filters, sort})
  }

  onChangeSearch(value: string) {
    this.searchValue = value
    this.$emit('change-search-filters', value)
  }

  get bindChecksFilters() {
    const {filters, sorteable, filtersSelected, sortTitle, labelSearch} = this

    return {
      value: this.showModal,
      filtersItems: filters,
      sorteable,
      filtersSelected,
      sortTitle,
      labelSearch
    }
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }
}
</script>
