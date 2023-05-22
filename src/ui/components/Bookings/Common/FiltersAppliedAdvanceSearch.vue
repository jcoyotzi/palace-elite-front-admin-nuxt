<template>
    <div
      v-if="bookingsStore?.keywordSearch || bookingsStore?.startDate || bookingsStore?.endDate"
      class="pe-mt-[10px]"
    >
      <PEChip
        v-if="bookingsStore?.keywordSearch"
        class="bg-blue-light text-black"
      >
        <strong>Search:</strong>&nbsp; {{ bookingsStore?.keywordSearch }}
      </PEChip>
      <PEChip
        v-if="bookingsStore?.startDate"
        class="bg-blue-light text-black"
      >
        <strong>Start Date:</strong>&nbsp; {{ bookingsStore?.startDate }}
      </PEChip>
      <PEChip
        v-if="bookingsStore?.endDate"
        class="bg-blue-light text-black"
      >
        <strong>End Date:</strong>&nbsp; {{ bookingsStore?.endDate }}
      </PEChip>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  name: 'FiltersAppliedAdvanceSearch',
})

export default class FiltersAppliedAdvanceSearch extends Vue {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }
}
</script>