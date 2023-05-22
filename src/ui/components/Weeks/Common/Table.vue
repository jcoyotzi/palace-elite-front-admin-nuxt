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
          v-if="showPagination"
          :value="String(perPage)"
          v-bind="propertiesTable.perPageProps"
          @change="onChangePerPage"
        />
      </div>
      <PELoadingData
        v-if="showLoading"
        class="pe-my-[50px]"
      />
      <slot v-else />

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
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {CategoryFilters} from '~/src/app/benefits/domain/enum/categoryFilters'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
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

  @Prop({type: Boolean, default: true})
  usePagination!: boolean

  public perPageValue: number = 5

  public page: number = 1

  public pages: number = 0

  private itemsFilter: any[] = []

  private loading: boolean = true

  private pageDefault: boolean = false

  get weekStore(): WeekStore {
    return new WeekStore()
  }

  get perPage(): number {
    return this.perPageValue
  }

  get perPageString(): string {
    return String(this.perPage)
  }

  set perPage(value: number) {
    this.perPageValue = value
  }

  get searchValue(): string {
    return this.weekStore.filters.search
  }

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
      prevText: this.$t('prev') as string,
      nextText: this.$t('next') as string,
      pageDefault: this.pageDefault,
      totalVisible: 4,
      length: this.pages
    }
  }

  get sortValue(): string {
    return this.weekStore.filters.sort.id
  }

  calculateSortBy(): any[] {
    const items = [...this.itemsFiltered]
    if (this.sortValue === CategoryFilters.SORT_DESC)
      return items.sort(
        (a: any, b: any) =>
          Number(new Date(b.expirationDate.substr(0, 10))) -
          Number(new Date(a.expirationDate.substr(0, 10)))
      )
    return items.sort(
      (a: any, b: any) =>
        Number(new Date(a.expirationDate.substr(0, 10))) -
        Number(new Date(b.expirationDate.substr(0, 10)))
    )
  }

  get showPagination(): boolean {
    return this.pages > 1 && this.usePagination
  }

  get showNotFound(): boolean {
    return this.itemsFiltered.length > 0 || this.showLoading || !this.usePagination
  }

  calculateSearch() {
    const {itemsFiltered, columnSearch, searchValue} = this
    if (searchValue !== '') {
      // validamos que no este search vacio
      return itemsFiltered
        .map((objectValue: any) => {
          // recorremos los itemsFiltered
          let resultNivel: any = []

          const result = Object.entries(objectValue).map(([key, value]) => {
            const val = String(value)

            if (objectValue.confirmation) {
              resultNivel = Object.entries(objectValue.confirmation).map(([keyConf, valueConf]) => {
                const valueC = String(valueConf)

                if (
                  valueC.includes(searchValue) ||
                  valueC.toLowerCase().includes(searchValue) ||
                  valueC.toUpperCase().includes(searchValue)
                )
                  return true
              })
            }
            // recorremos el objeto por key y value
            // validamos si traemos columnas especiales para busqueda
            // // console.log(columnSearch, key, val)
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
          if (result.includes(true) || resultNivel.includes(true)) return objectValue
        })
        .filter((objectValue: any) => objectValue !== undefined) // filtramos que no traiga undefineds el Object.entries
    }
    return itemsFiltered
  }

  onChangePagination(value: number): void {
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

  get filterStatus() {
    return this.weekStore.filters?.filters[0]?.filters
  }

  get filterWeeks() {
    return this.weekStore.filters?.filters[1]?.filters
  }

  calculatePagination(): void {
    this.pages = Math.ceil((this.itemsFiltered.length || 1) / this.perPage)
  }

  filterByCategory(items: any[], categoryStatus: number, column: string) {
    const filtersValue = this.weekStore.filters.filters
    let itemsByStatus: any[] = []
    if (filtersValue[categoryStatus]?.filters.length > 0) {
      // hacemos validacion que si viene el filtro all omita el proceso de filtrado por status
      const allFilters = filtersValue[categoryStatus].filters.some(
        (filter: any) => filter.value === CategoryFilters.ALL
      )
      if (!allFilters) {
        filtersValue.map((category: any, indexCategory: any) => {
          category.filters.map((filter: any) => {
            if (indexCategory === categoryStatus) {
              itemsByStatus = [
                ...itemsByStatus,
                ...items.filter(item => item[column] === filter.value)
              ]
            }
          })
        })
        items = itemsByStatus
      }
    }
    return items
  }

  @Watch('items', {immediate: true})
  onChangeItems(newvalue: any[]) {
    this.showLoading = false
    this.itemsFilter = [...newvalue]
    if (newvalue.length > 0) this.onChangeProperties()
  }

  calculateItems(): void {
    this.showLoading = true
    this.itemsFiltered = [...this.items]
    this.itemsFiltered = this.filterByCategory(this.itemsFiltered, CategoryFilters.STATUS, 'status')
    this.itemsFiltered = this.filterByCategory(
      this.itemsFiltered,
      CategoryFilters.WEEKS,
      'category'
    )
    this.itemsFiltered = this.calculateSortBy()
    this.itemsFiltered = this.calculateSearch()

    this.calculatePagination()
    this.calculatePerPage()
    this.$emit('update-items', {items: [...this.itemsFiltered]})

    setTimeout(() => {
      this.showLoading = false
    }, 300)
  }

  @Watch('filterStatus', {deep: true})
  @Watch('filterWeeks', {deep: true})
  @Watch('searchValue', {deep: true})
  async onChangeByPage() {
    this.onChangePerPage('5')
    this.calculateItems()
  }

  @Watch('perPage')
  @Watch('sortValue')
  @Watch('page')
  async onChangeProperties() {
    this.calculateItems()
  }
}
</script>
