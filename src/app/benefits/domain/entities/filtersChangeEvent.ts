export interface FilterSort {
  name: string
  id: string
}

export interface Filter {
  name: string
  value: string
}

export interface FilterArray {
  name: string
  filters: Filter[]
}

export default interface FiltersChangeEvent {
  search: string
  sort?: FilterSort
  filters: FilterArray[]
}
