<template>
  <div>
    <div class="pe-justify-between md:pe-flex">
      <div class="pe-justify-start pe-mb-[30px] md:pe-mb-[0px]">
        <MembershipCommonSearch
          v-bind="propertiesTable.searchProps"
          @input="onChangeSearch"
        />
      </div>
      <div class="md:pe-justify-end md:pe-flex pe-gap-6">
        <div class="justify-between">
          <MembershipCommonPerPage
            class="pe-mb-[30px] justify-end md:pe-mb-[0px]"
            :disabled="!showPagination"
            v-bind="propertiesTable.perPageProps"
            @change="onChangePerPage"
          />
        </div>
        <div class="pe-items-right pe-flex">
          <div class="pe-w-[30%] md:hidden">&nbsp</div>
          <MembershipCommonSorter
            class="pe-justify-end pe-w-[70%]"
            :disabled="!showPagination"
            v-bind="propertiesTable.sortProps"
            @change="onChangeSorter"
          />
        </div>
      </div>
    </div>

    <PELoadingData
      v-if="showLoading"
      class="pe-my-[50px]"
    />
    <slot v-else />

    <div
      v-if="!showPagination"
      class="pe-mt-[50px] pe-text-white"
    >
      <div class="pe-font-serif pe-text-[24px] uppercase">
        {{ $t('notFound') }}
      </div>
      <div class="pe-text-[16px] pe-font-sans">
        {{ $t('text') }}
      </div>
    </div>

    <div class="pe-items-center pe-justify-center pe-text-center">
      <div class="md:pe-w-[35%] md:pe-m-auto">
        <MembershipCommonPaginator
          v-if="showPagination"
          v-bind="paginatorProps"
          @changedPage="onChangePagination"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {CategoryFilters} from '~/src/app/benefits/domain/enum/categoryFilters'
import i18n from '~/src/ui/i18n/common/table.lang'
@Component({
  i18n
})
export default class WalletCommonTable extends Vue {
  @Prop({default: () => [], type: Array})
  readonly items!: any[]

  @Prop() propertiesTable!: any

  @Prop({default: () => [], type: Array})
  columnSearch!: string[]

  public perPage: number = 5

  public page: number = 1

  public searchValue: string = ''

  public sortValue: string = '0'

  public pages: number = 0

  public valuePage: number = 1

  private itemsFilter: any[] = []

  private loading: boolean = true

  private pageDefault: boolean = false

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(value: boolean) {
    this.loading = value
  }

  get itemsFiltered() {
    return this.itemsFilter
  }

  set itemsFiltered(value: any[]) {
    this.itemsFilter = [...value]
  }

  get paginatorProps() {
    return {
      length: this.pages,
      prevText: this.$t('prev') as string,
      nextText: this.$t('next') as string,
      pageDefault: this.pageDefault,
      totalVisible: 4
    }
  }

  onChangeSorter({value}: {value: string}): void {
    this.sortValue = value
  }

  calculateSortBy(): any[] {
    const items = [...this.itemsFiltered]
    if (this.sortValue === CategoryFilters.SORT_DESC)
      return items.sort(
        (a: any, b: any) =>
          Number(new Date(b.expiration.substr(0, 10))) -
          Number(new Date(a.expiration.substr(0, 10)))
      )
    return items.sort(
      (a: any, b: any) =>
        Number(new Date(a.expiration.substr(0, 10))) - Number(new Date(b.expiration.substr(0, 10)))
    )
  }

  get showPagination(): boolean {
    return this.itemsFiltered.length > 0 || this.showLoading
  }

  onChangeSearch(value: string): void {
    this.searchValue = value
  }

  calculateSearch() {
    const {itemsFiltered, columnSearch, searchValue} = this
    if (searchValue !== '') {
      // validamos que no este search vacio
      return itemsFiltered
        .map((objectValue: any) => {
          // recorremos los itemsFiltered
          const result = Object.entries(objectValue).map(([key, value]) => {
            // recorremos el objeto por key y value
            const val = String(value)
            // validamos si traemos columnas especiales para busqueda
            if (columnSearch.length > 0) {
              // validamos que coincidan columnas y el valor con el de la busqueda
              if (columnSearch.includes(key) && val === searchValue) return true
            } else if (
              val.includes(searchValue) ||
              val.toLowerCase().includes(searchValue) ||
              val.toUpperCase().includes(searchValue)
            )
              return true
          })
          // validamos que exista al menos una coincidencia
          if (result.includes(true)) return objectValue
        })
        .filter((objectValue: any) => objectValue !== undefined) // filtramos que no traiga undefineds el Object.entries
    }
    return itemsFiltered
  }

  onChangePagination(value: number) {
    this.page = value
  }

  onChangePerPage(value: string): void {
    this.perPage = parseInt(value)
    this.pageDefault = true
    this.$nextTick(() => {
      this.pageDefault = !this.pageDefault
    })
  }

  calculatePerPage(): void {
    const perPage = this.perPage
    const start = perPage * (this.page - 1)
    const end = perPage * this.page
    this.itemsFiltered = [...this.itemsFiltered.slice(start, end)]
  }

  calculatePagination() {
    // esto el numero de paginas te los items
    this.pages = Math.ceil((this.items.length || 1) / this.perPage)
  }

  @Watch('items')
  async onChangeItems(newvalue: any[]) {
    this.showLoading = false
    this.itemsFilter = [...newvalue]
    if (newvalue.length > 0) this.onChangeProperties()
  }

  @Watch('sortValue')
  @Watch('searchValue')
  @Watch('perPage')
  @Watch('page')
  async onChangeProperties() {
    this.showLoading = true
    this.itemsFiltered = [...this.items]
    this.itemsFiltered = this.calculateSortBy()
    this.itemsFiltered = this.calculateSearch()
    this.calculatePagination()
    this.calculatePerPage()

    this.$emit('update-items', {items: [...this.itemsFiltered]})

    setTimeout(() => {
      this.showLoading = false
    }, 300)
  }
}
</script>
