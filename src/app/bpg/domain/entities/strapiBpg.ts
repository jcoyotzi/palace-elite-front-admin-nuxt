import {MinimunStay} from '~/src/app/booking/domain/entities/minimunStay'
import ValidityAccessDTO from '../dto/validateAccess'
import {ExtraFeeGolfDto} from '../dto/extraFeeGolf'
import {EliteProductsGolf} from '../dto/eliteProductsGolf'
export interface IntervalDto {
  id: number
  code: string
  description: string
  image: ImageData
  urlImage: string
  note: string
  title: string
}

interface ImageData {
  data: ImageAttributes
}

interface ImageAttributes {
  id: number
  attributes: Attributes
}

interface Attributes {
  name: string
  width: number
  height: number
  url: string
  createdAt: string
  updatedAt: string
}

interface DataAttributes {
  url: string
}

interface MediaDataAttributes {
  attributes: DataAttributes
}

interface BlockMediaData {
  data: MediaDataAttributes
}

interface BlockMedia {
  media: BlockMediaData
}

export interface ZoneDto {
  title: string
  order: string
  properties: PropertieDto[]
}

export interface PropertieDto {
  title: string
  order: string
  bpgSuiteAccessYears: string
  media: any
  code: string
  url: string
}

export interface Consideration {
  code: string
  description: string
  id: number
  title: string
  content?: string
  component?: any
}

export interface Block {
  id: number
  content?: string
  title?: string
  promotions?: []
  collection?: CollectionPolicies
  reservations?: ReservationPolicies[]
  titleReservations: string
  preferentials?: []
  rewards?: []
  benefits?: Promotion[]
  considerations?: Consideration[]
  intervals?: any
  media?: BlockMedia
  __component: string
  description?: string
}

export enum TypeTabPolicies {
  COLLECTION,
  RESERVATIONS
}

export interface CollectionPolicies {
  id: number
  title: string
  content: string
}

export interface ReservationPolicies {
  id: number
  title: string
  content: string
}

export interface Promotion {
  caption: string
  code: string
  description: string
  id: number
  image: ImageData
  shortContent?: boolean
  label: string | null
  title: string
  content?: string
}

export interface Product {
  type: string
  idPromocion: string
  productId: string
  category: string
}

interface PageData {
  attributes: AttributesPage
}

export interface AttributesPage {
  blocks: Block[]
  locale: string
  title: string
  slug: string
}

export interface ProductsEliteTabs {
  code: string
  title: string
}

export interface Page {
  data: PageData[]
}

export enum TypeSchemaRewards {
  OLD_SCHEMA = 1,
  NEW_SCHEMA = 2
}

export enum DiscartedHotels {
  BALO = 'BALO',
  BAMA = 'BAMA',
  BAPU = 'BAPU',
  BASA = 'BASA',
  CABA = 'CABA',
  LUVE = 'LUVE',
  RERO = 'RERO',
  SAFI = 'SAFI',
  ZCVPC = 'ZCVPC'
}

export enum TypeConsiderations {
  ESTANCIA_MINIMA = 'EM',
  ESTANCIA_REGULAR = 'ER',
  SUITES_EXCLUSIVES = 'SE',
  MP_PUNTA_CANA = 'MPPC',
  WKSNG_BPG_GCC = 'SNBPG_GI', //SEMANAS Y NOCHES BPG GOLF CON CUOTA
  WKSNG_BPG_GSC = 'SN_BPG_GL' //SEMANAS Y NOCHES BPG GOLF SIN CUOTA
}

export enum EliteGolfProductsExtraCost {
  ULGAPWK = 'ULGAPWK',
  ULGAPNG = 'ULGAPNG'
}

export enum EliteGolfProductsFree {
  ULGHFWK = 'ULGHFWK',
  ULGHFNG = 'ULGHFNG',
  ULGWK = 'ULGWK'
}

export enum TypesIntervals {
  IPLATINUM = 'INTERVAL_PLATINUM',
  IPREVIOUS = 'INTERVAL_PREVIOUS'
}

export interface InfoMember {
  recnum: number
  name: string
  application: string
  lastContract: string
  sale: number
  interval: string
  intervalPlus: string
  intervalNumber: string
  intervalPrevious: string
  intervalPlatinum: string
  rewardsScheme: number
}

export interface Group {
  groupId: string
  totalAccess: number
  group: string
}

export interface InfoDataConsiderations {
  VIGENCY_VILLAS: string
  VIGENCY_RESIDENCE: string
  VIGENCY_DIAMOND: string
  rewardsScheme: number
  GROUPS: Group[]
  LOCALE: string
  BENEFITS: Product[]
  EM_NIGHTS: string //Estancia Minima Nights
  ER_NIGHTS: string //Estancia Regular Nights
  MPPC_SHOW: boolean //acceso a la propiedad Moon Palace Punta Cana
  GOLF_PRICES: ExtraFeeGolfDto[]
  ELITE_PRODUCTS_GOLF: EliteProductsGolf[]
  MPPC: any //room-access-hotel Moon Palace Punta Cana
  EM_MINIMUM_STAY: MinimunStay //Estancia Minima
  ROOM_HOTEL_ACCESS: any
  INFO_MEMBER: InfoMember //Estancia Minima
}

export interface GetAllZonesRequest {
  accessProperties: string[]
  locale: string
}

export interface GroupAccess {
  access: string
  accessYear: number
  items: ValidityAccessDTO[]
  suitesToChoose: string
}
export interface Propertie {
  code: string
  bpgOrder: string
}

export interface Zone {
  properties: Propertie[]
}
