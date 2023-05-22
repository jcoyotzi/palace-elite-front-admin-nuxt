<template>
  <div>
    <div
      v-if="hasAnyOptions"
      class="pe-flex pe-flex-col pe-items-center xl:!pe-flex-row xl:pe-justify-between"
    >
      <div class="pe-w-full xl:pe-w-auto 2xl:pe-min-w-[375px] xl:pe-mr-5">
        <MembershipCommonSearch
          v-if="visibleSearch"
          v-bind="searchProps"
          @value="search"
          @input="inputSearch"
        />
      </div>

      <div
        class="pe-my-10 flex pe-min-w-[224px] pe-flex-col pe-items-end pe-gap-y-5 pe-self-end md:pe-flex-row md:pe-items-center lg:pe-gap-y-0"
      >
        <MembershipCommonPerPage
          v-if="visiblePagination"
          v-bind="perPageProps"
          class="pe-w-auto pe-min-w-[105px] md:pe-mr-7"
          @change="onChangePerPage"
        />

        <MembershipCommonSorter
          v-if="visibleSort"
          v-bind="sortProps"
          class="pe-w-auto pe-min-w-[240px]"
          @change="onChangeSort"
        />
      </div>
    </div>

    <slot></slot>

    <div
      v-if="visiblePagination"
      class="pe-mt-5"
    >
      <MembershipCommonPaginator
        v-bind="paginatorProps"
        class="pe-mx-auto pe-w-min pb-5"
        @changedPage="onChangePagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Emit, Prop} from 'vue-property-decorator'

// Interfaces
interface IPESearch {
  color?: string
  label?: string
}

interface IPerpage {
  label?: string
  items?: string[]
  color?: string
  value?: string
}

interface ISortItems {
  value: string
  text: string
}

interface ISort {
  label?: string
  items?: ISortItems[]
  color?: string
  value?: string
}

interface IPaginator {
  length: number
  nextIcon?: string
  prevIcon?: string
  totalVisible?: number
  value?: number
  showFirst?: boolean
  showLast?: boolean
  prevText?: string
  nextText?: string
}

interface ITablePagination {
  search: string
  visibleSearch?: boolean
  visibleSort?: boolean
  visiblePagination?: boolean
  searchProps?: IPESearch
  sortProps?: ISort
  perPageProps?: IPerpage
  paginatorProps?: IPaginator
}

@Component
class Pagination extends Vue implements ITablePagination {
  // #region Props
  @Prop({type: String, default: ''})
  search!: string

  @Prop({type: Boolean, default: true})
  visibleSearch!: boolean

  @Prop({type: Boolean, default: true})
  visibleSort!: boolean

  @Prop({type: Boolean, default: true})
  visiblePagination!: boolean

  @Prop({type: Object})
  searchProps?: ITablePagination['searchProps']

  @Prop({type: Object})
  sortProps?: ITablePagination['sortProps']

  @Prop({type: Object})
  perPageProps?: ITablePagination['perPageProps']

  @Prop({type: Object})
  paginatorProps?: ITablePagination['paginatorProps']
  // #endregion Props

  public get hasAnyOptions() {
    return this.visibleSearch || this.visibleSort || this.visiblePagination
  }

  // #region Emits
  @Emit()
  inputSearch(value: string) {
    return value
  }

  @Emit()
  onChangePagination(value: string) {
    return value
  }

  @Emit()
  onChangeSort(value: ISortItems) {
    return value
  }

  @Emit()
  onChangePerPage(value: any) {
    return value
  }
  // #endregion Emits
}

export default Pagination
</script>
