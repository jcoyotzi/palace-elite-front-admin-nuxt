<template>
  <div>
    <div
      v-if="!showNotFound"
      class="pe-text-white pe-mt-[50px] lg:pe-mt-[0px]"
    >
      <div class="pe-font-serif pe-text-[24px] uppercase">
        {{ $t('notFound') }}
      </div>
      <div class="pe-text-[16px] pe-font-sans">
        {{ $t('text') }}
      </div>
    </div>
    <div v-else>
      <div class="justify-end pe-flex">
        <MembershipCommonPerPage
          :disabled="disabledPerPage"
          :value="String(perPage)"
          v-bind="propertiesTable.perPageProps"
          @change="onChangePerPage"
        />
      </div>
      <PELoadingData
        class="pe-my-[50px]"
        v-if="showLoading"
      />
      <slot v-else />

      <div class="pe-items-center pe-justify-center pe-text-center">
        <div class="md:pe-w-[35%] md:pe-m-auto">
          <BookingsCommonTablePaginator
            v-if="showPagination"
            v-bind="paginatorProps"
            @changedPage="onChangePagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/common/table.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component({
  i18n
})
export default class BookingsCommonTable extends Vue {
  @Prop({default: () => [], type: Array})
  readonly items!: any[]

  @Prop({}) readonly perPage!: number

  @Prop() propertiesTable!: any

  pageDefault: boolean = false

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get showLoading(): boolean {
    return this.bookingsStore.loadingTable
  }

  get disabledPerPage() {
    return !this.bookingsStore.disablePerPage && this.totalReservationsToValidate <= this.perPage
  }

  get pages(): number {
    return this.bookingsStore.paginationReservations.lastPage
  }

  get totalReservationsToValidate() {
    return this.bookingsStore.paginationReservations.totalToValidate
  }

  get paginatorProps() {
    return {
      prevText: this.$t('prev') as string,
      nextText: this.$t('next') as string,
      pageDefault: this.pageDefault,
      totalVisible: 4,
      value: this.page,
      length: this.pages
    }
  }

  get showPagination(): boolean {
    return this.bookingsStore.paginationReservations.total > 1
  }

  get showNotFound(): boolean {
    return this.items.length > 0 || this.showLoading
  }

  get page(): number {
    return this.bookingsStore.page
  }

  set page(value: number) {
    this.bookingsStore.page = value
  }

  onChangePagination(value: number): void {
    this.page = value
  }

  @Emit('change-per-page')
  onChangePerPage(value: string) {
    this.pageDefault = true
    this.$nextTick(() => {
      this.pageDefault = !this.pageDefault
    })
    return parseInt(value)
  }
}
</script>
