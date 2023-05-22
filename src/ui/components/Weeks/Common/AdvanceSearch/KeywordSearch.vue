<template>
  <div>
    <div class="pe-mt-4 pe-mb-10">
      <PEInput
        v-model="keywordSearch"
        placeholder="Search by keyword"
        label="Keyword Search"
    /></div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  name: 'KeywordSearch'
})
export default class KeywordSearch extends Vue {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  beforeMount() {
    if (this.isPrefilterRequired) this.keywordSearch = String(this.$route.query.reservation)
  }

  get isPrefilterRequired() {
    return this.$route.query.reservation !== undefined && this.$route.query.reservation !== ''
  }

  get keywordSearch() {
    return this.bookingsStore.ASKeywordSearch
  }

  set keywordSearch(value: string) {
    this.bookingsStore.setASKeywordSearch(value)
  }
}
</script>
