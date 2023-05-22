<template>
  <MembershipCommonPagination
    :visible-search="visibleSearch"
    :visible-sort="visibleSort"
    :visible-pagination="visiblePagination"
    :search-props="searchProps"
    :sort-props="sortProps"
    :paginator-props="paginatorProps"
    :per-page-props="perPageProps"
    @input-search="onChangeSearch"
    @on-change-sort="onChangeSort"
    @on-change-pagination="onChangePagination"
    @on-change-per-page="onChangePerPage"
  >
    <PELoadingData
      v-if="isLoading"
      class="pe-mt-[50px] pe-mb-8"
    />
    <MembershipCommonExpansion
      v-for="(membership, index) in membershipPageItems"
      :key="index"
      class="pe-my-5"
      v-bind="membership"
      :show-pin-buttons="membership.isOwnerAuthenticated"
      :show-edit-button="
        (showEditButton && !membership.memberUtils.isGuest) ||
        (membership.memberUtils.InReferral !== 1 && membership.memberUtils.isGuest)
      "
      :show-delete-button="showDeleteButton"
      @pin-click="pinClick($event, membership)"
      @edit-button-click="editButtonClick(membership)"
      @delete-button-click="deleteButtonClick(membership)"
    />
  </MembershipCommonPagination>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

// #region Interfaces
import {PinActions} from '~/src/app/owners/domain/enum/pinActions'
import {PinModal} from '~/src/app/owners/domain/entities/pinModal'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'

interface IPESearch {
  color?: string
  label?: string
}

interface IPerpage {
  label?: string
  items?: number[]
  color?: string
  value?: number
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

interface IMembershipTable
  extends Omit<
    ITablePagination,
    'search' | 'searchProps' | 'sortProps' | 'perPageProps' | 'paginatorProps'
  > {
  memberships: MembershipTable[]
  paginatorPrevText?: string
  paginatorNextText?: string
  sortItems?: ISort['items']
  sortLabel?: string
  labelRowsPerPage?: string
  rowsPerPageItems?: IPerpage['items']
  searchLabel?: string
}
// #endregion Interfaces

@Component
class Table extends Vue implements IMembershipTable {
  // #region Props
  @Prop({type: Array, required: true})
  readonly memberships!: IMembershipTable['memberships']

  @Prop({type: Boolean, default: true})
  readonly visibleSearch!: boolean

  @Prop({type: Boolean, default: true})
  readonly visibleSort!: boolean

  @Prop({type: Boolean, default: true})
  readonly visiblePagination!: boolean

  @Prop({type: String, default: 'Previous'})
  readonly paginatorPrevText!: string

  @Prop({type: String, default: 'Next'})
  readonly paginatorNextText!: string

  @Prop({
    type: Array,
    default: () => [
      {
        value: 'asc',
        text: 'Ascending'
      },
      {
        value: 'desc',
        text: 'Descendant'
      }
    ]
  })
    sortItems!: IMembershipTable['sortItems']

  @Prop({type: String, default: 'SortBy'})
    sortLabel!: string

  @Prop({type: String, default: 'Rows per page:'})
    labelRowsPerPage!: string

  @Prop({type: Array, default: () => ['5', '10', '15']})
    rowsPerPageItems!: IMembershipTable['rowsPerPageItems']

  @Prop({type: String, default: 'Search'})
    searchLabel!: string

  @Prop({
    type: Boolean,
    default: false
  })
  readonly showPinButtons!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly showEditButton!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly showDeleteButton!: boolean
  
  @Prop({
    type: Boolean,
    default: true
  })
  readonly isLoading!: boolean

  // #endregion Props

  // #region Data
  public searchQuery: string = ''
  public perPage: string = '5'
  public page: number = 1
  public order: string = 'asc'
  // #endregion Data

  // #region Computed
  public get paginatorProps() {
    return {
      totalVisible: parseInt(this.perPage),
      length: this.paginationLenghtPerpage,
      prevText: this.paginatorPrevText,
      nextText: this.paginatorNextText
    }
  }

  public get paginationLenghtPerpage() {
    return Math.ceil((this.memberships.length || 1) / parseInt(this.perPage))
  }

  public get sortProps() {
    return {
      items: this.sortItems,
      label: this.sortLabel
    }
  }

  public get perPageProps() {
    return {
      label: this.labelRowsPerPage,
      items: this.rowsPerPageItems
    }
  }

  public get searchProps() {
    return {
      label: this.searchLabel
    }
  }

  public normalizeString(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
  }

  public get computedMemberships() {
    return this.searchQuery
      ? this.membershipsOrdered.filter(item =>
        this.normalizeString(item.name).includes(this.normalizeString(this.searchQuery))
      )
      : this.membershipsOrdered
  }

  public get membershipPageItems() {
    const perPage = parseInt(this.perPage)
    const start = perPage * (this.page - 1)
    const end = perPage * this.page

    return this.computedMemberships.slice(start, end)
  }

  public get membershipsOrdered() {
    const array = [...this.memberships]
    array.sort((a, b) => {
      let name1
      let name2

      if (this.order === 'asc') {
        name1 = a.name.toLowerCase()
        name2 = b.name.toLowerCase()
      } else {
        name1 = b.name.toLowerCase()
        name2 = a.name.toLowerCase()
      }

      if (name1 < name2) return -1
      if (name1 > name2) return 1
      return 0
    })
    return array
  }
  // #endregion Computed

  // #region Methods

  public onChangeSort(order: ISortItems) {
    this.order = order.value
  }

  public onChangeSearch(search: string): void {
    this.searchQuery = search
  }

  public onChangePerPage(perPage: string) {
    this.perPage = perPage
  }

  public onChangePagination(page: number) {
    this.page = page
  }

  public pinClick(action: PinActions, owner: MembershipTable) {
    const modalData = {
      action,
      owner
    }
    this.showPinModal(modalData)
  }

  // #endregion Methods

  // #region Emits
  @Emit()
  showPinModal(pinModal: PinModal) {
    return pinModal
  }

  @Emit()
  editButtonClick(membership: MembershipTable) {
    return membership
  }

  @Emit()
  deleteButtonClick(membership: MembershipTable) {
    return membership
  }
  // #endregion Emits
}

export default Table
</script>
