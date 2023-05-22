import {Pinia, Store} from 'pinia-class-component'
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'
import {FilterArray} from '~/src/app/benefits/domain/entities/filtersChangeEvent'
@Store({
  name: 'benefitStore'
})
export class BenefitStore extends Pinia {
  private itemsBreadcrumbs: BreadcrumbItem[] = []

  private breadcrumbsList: BreadcrumbItem[] = [
    {page: '', title: 'benefits', key: 'benefits'},
    {page: '/wallet', title: 'wallet', key: 'benefits-wallet'},
    {page: '/wallet/summary', title: 'summary', key: 'wallet-summary'},
    {page: '/wallet/universal-credit', title: 'universalCredit', key: 'wallet-universal'},
    {page: '/weeks', title: 'weeks', key: 'benefits-weeks'},
    {page: '/weeks/all', title: 'all', key: 'weeks-all'},
    {page: '/weeks/imperial', title: 'Imperial Week', key: 'weeks-imperial'},
    {page: '/weeks/incentive', title: 'Incentive Week', key: 'weeks-incentive'},
    {page: '/weeks/anniversary', title: 'Anniversary Week', key: 'weeks-anniversary'},
    {page: '/weeks/bonus', title: 'Bonus Week', key: 'weeks-bonus'}
  ]

  private itemsFiltersWeeksDefault: FilterArray[] = [
    {
      name: 'Filter by Status',
      filters: [
        {name: 'Available', value: 'AVAILABLE'},
        {name: 'Expired', value: 'EXPIRED'},
        {name: 'Used', value: 'USED'},
        {name: 'To Release', value: 'TO RELEASE'},
        {name: 'Reserved', value: 'RESERVED'}
      ]
    },
    {
      name: 'Filter by Week Type',
      filters: [
        {name: 'Imperial Week', value: 'IMPERIAL WEEK'},
        {name: 'Imperial Night', value: 'IMPERIAL NIGHT'},
        {name: 'Anniversary Week', value: 'ANNIVERSARY WEEK'},
        {name: 'Anniversary Night', value: 'ANNIVERSARY NIGHT'},
        {name: 'Incentive Week', value: 'INCENTIVE WEEK'},
        {name: 'Bonus Week', value: 'BONUS WEEK'}
      ]
    }
  ]

  public filterSelected: FilterArray[] = []

  public searchFilter: string = ''

  public statusFilter: string = ''

  public textActivatorMobile: string = ''

  get filtersWeeksDefault() {
    return this.itemsFiltersWeeksDefault
  }

  get breadcrumbs() {
    return this.itemsBreadcrumbs
  }

  public setBreadcrumbsItems(value: BreadcrumbItem[]): void {
    this.itemsBreadcrumbs = value
  }

  public getFilterSelected(selects: string[], indexAll: number[]): void {
    this.filterSelected = this.filtersWeeksDefault.map((category, index) => {
      const selecteds: FilterArray = {
        name: category.name,
        filters: [
          ...(selects.includes('All') && indexAll.includes(index)
            ? [{name: 'All', value: 'All'}]
            : []),
          ...category.filters.filter(filter => selects.includes(filter.name))
        ]
      }
      return selecteds
    })
  }

  public setBreadcrumbsKeys(value: string[]): void {
    const items = this.breadcrumbsList.filter(bread => value.includes(bread.key!))

    this.itemsBreadcrumbs = items
  }

  public setActivatorMobile(text: string) {
    this.textActivatorMobile = text
  }
}
