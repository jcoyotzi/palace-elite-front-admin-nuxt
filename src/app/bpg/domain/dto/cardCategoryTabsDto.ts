import {Category} from '../entities/categorys'
import {Zone} from '../entities/strapiBpg'
import ValidityAccessDTO from './validateAccess'

export default interface CardCategoryTabsDto {
  headersTable: HeaderTable[]
  isMobile: boolean
  showZones: boolean
  mainTabs: Zone[]
  texts: any
  mppc: any
  baglioniCodes: string[]
  accessByProperty: Category[]
  roomHotelAccess: any[]
  loadingCategories?: boolean
  textNoResultsFound: string
  textLoadingCategories: string
}

export interface MainTabs {
  title: string
  properties?: Properties[]
}

export interface Properties {
  title: string
  code?: string
  description?: string
}

export interface Tabs {
  tabs: string[]
}

export interface HeaderTable {
  title: string
  titleMobile?: string
  hidden?: boolean
  name: string
  width: string
  align: string
}

export interface PropertieImage {
  title: string
  src: string
}
