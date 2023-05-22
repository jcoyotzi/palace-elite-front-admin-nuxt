<template>
  <section class="pe-m-5 pe-w-[26rem]">
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
          :disabled="disabledSearch"
          @click="search"
          >{{ $t('search') }}</PEButton
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TravelRangeDate from './TravelRangeDate.vue'
import NextDays from './NextDays.vue'
import KeywordSearch from './KeywordSearch.vue'
import { NextDaysIDEnum } from '~/src/app/bookings/domain/enums/nextDaysEnum'
import { BookingsStore } from '~/src/ui/store/bookingsStore'
import i18n from '~/src/ui/i18n/common/advanceSearch.lang'

@Component({
  i18n,
  name: 'SearchAdvanced',
  components: {
    KeywordSearch,
    TravelRangeDate,
    NextDays
  }
})
export default class SearchAdvanced extends Vue {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get titleClass() {
    return 'pe-font-sans pe-text-[24px] pe-font-normal pe-text-white'
  }

  mounted() {
    this.bookingsStore.setStartDate('')
    this.bookingsStore.setEndDate('')
    this.bookingsStore.setSelectedNextDay(NextDaysIDEnum.EMPTY)

    if (this.$route.query.reservation) {
      this.search()
      return
    }

    this.bookingsStore.setKeywordSearch('')
  }

  search() {
    this.bookingsStore.activeFiltersAdvanceSearch()
    this.$emit('advance-search')
    this.bookingsStore.setShowSearchAdvance(false)
  }

  clear() {
    this.bookingsStore.clearAdvanceSearch()
    this.$emit('clear-advance-search')
  }

  get disabledSearch() {
    return this.bookingsStore.disableSearch
  }
}
</script>
