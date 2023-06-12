<template>
  <div
    v-if="showContentMicroSite"
    class="ms-relative ms-text-center ms-container ms-pb-20 md:ms-mt-24"
  >
    <span class="ms-text-white ms-font-sans">
      {{ $t('bpgSecurity') }}
    </span>
  </div>
  <div
    v-else
    class="ms-mt-4 lg:ms-mt-12"
  >
    <!-- Resume -->
    <div>
      <BPGResumeMicroSiteSkeleton v-if="loadingAffiliationInformation" />
      <BPGResumeMicroSite
        v-else
        :items="itemsResumeMicroSite"
        :dark="false"
      />
    </div>

    <!-- category tabs -->
    <p class="ms-mt-6 ms-mb-4 ms-text-2xl lg:ms-text-4xl lg:ms-mt-20 lg:ms-mb-8 ms-text-center ms-uppercase ms-text-blue-light ms-font-semibold">
      {{ titlesPage.title }}
    </p>
    <CardCategoryTabs
      v-bind="bindCardCategoryTabs"
      class="card-category-tabs !ms-pa-0"
      :dark="false"
      @on-click-property="onClickProperty"
    />

    <!-- Importante a considerar -->
    <p
      class="ms-mt-6 ms-mb-4 ms-text-2xl lg:ms-text-4xl lg:ms-mt-20 lg:ms-mb-8 ms-text-center ms-uppercase ms-text-blue-light ms-font-semibold"
    >
      {{ titlesPage?.considerationsTitle }}
    </p>

    <ExpansionPanelMicroSite
      :showConsiderationsList="showConsiderationsList"
      class="expansion-panel-micro-site ms-mb-6"
      :key="index"
      v-for="(consideration, index) in considerationsList"
      v-bind="consideration"
      :dark="false"
    />

    <!-- section tabs promotions and benefits -->
    <a name="promotions"></a>
    <a name="benefits"></a>

    <!-- tabs -->
    <PETabsMicroSite
      class="ms-mt-[80px]"
      :textSkeleton="$t('loading')"
      :tabs="productsEliteTabsComputed"
      v-model="bindingTab"
      :dark="false"
    />
    <div
      class="ms-grid ms-grid-cols-[repeat(auto-fit,_32%)] ms-m-auto ms-gap-6 ms-mt-4 ms-justify-center"
      v-if="showProductsElite"
    >
      <BPGCardPromotions
        v-for="(product, index) in productsList"
        :key="index"
        :termsAndConditionsProvisions="termsAndConditionsProvisions"
        :texts="textsProvitions"
        :seeMore="$t('seeMore')"
        :seeLess="$t('seeLess')"
        v-bind="product"
        :dark="false"
        @show-more="showMorePromotion(product.code, index)"
      >
        <template
          #button
          v-if="product?.label"
        >
          <PEButton
            flat
            rounded
            class="ms-h-[32px] ms-px-5"
          >
            {{ product?.label }}
          </PEButton>
        </template>
      </BPGCardPromotions>
    </div>
    <PESkeletonCardProvition v-else-if="loadingProductsElite" :dark="false" />
    <div
      v-else
      class="ms-text-white ms-font-sans ms-font-normal mb-6"
    >
      {{ $t('noResultsFound') }}
    </div>

    <div
      class="ms-flex gap-12 ms-my-[200px] ms-items-center ms-justify-center"
      v-if="interval"
    >
      <img
        class="rounded-[8px] !ms-max-h-[390px] w-[477px] ms-object-cover"
        :src="interval.urlImage"
      />
      <div class="ms-max-w-[800px] ms-p-12">
        <div class="ms-font-sans ms-uppercase ms-font-semibold ms-text-[24px] ms-text-blue-light">
          {{ interval.title }}
        </div>
        <div
          class="ms-mt-[24px] ms-font-sans ms-font-normal ms-text-[16px] ms-text-gray-500"
          v-html="interval.description"
        />
      </div>
    </div>

    <div class="ms-flex lg:ms-mt-8 ms-justify-end ms-divide-x ms-divide-gray-500 ms-text-blue-dark lg:ms-p-2">
      <nuxt-link class="ms-px-4" :to="localePath('/affiliate/bpg/policies')">Policies</nuxt-link>
      <nuxt-link class="ms-px-4" :to="localePath('/affiliate/bpg/privacy-policy')">Privacy Policy</nuxt-link>
    </div> 
  </div>
</template>

<script lang="ts">
import { Component, Mixins, /* Watch */ } from 'vue-property-decorator';
import i18nDayjsMixin from '~/src/ui/mixins/i18nDayjsMixin'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import i18n from '~/src/ui/i18n/messages/bpg.lang'

// import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
// import {StrapiComponent} from '~/strapi/strapi-blocks.service'
// import HeroDto from '~/src/app/layout/domain/dto/heroDto'
import {BPGStore} from '~/src/ui/store/bpgStore'
import {Category} from '~/src/app/bpg/domain/entities/categorys'
import CardCategoryTabsDto, {HeaderTable} from '~/src/app/bpg/domain/dto/cardCategoryTabsDto'
// import {UseAuth as AuthStore} from '../store/auth'
import {ContentDataPageMapper} from '~/src/app/bpg/domain/mapper/contentDataPageMapper'
// import PELoadingData from '../components/PELoadingData.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {TypesProductsElite} from '~/src/app/bpg/domain/enum/typesProductsElite'
import {TabsProductsElite} from '~/src/app/bpg/domain/dto/productsEliteDto'
import {ItemsResume} from '~/src/app/bpg/domain/dto/resumeDto'
import {LocalePageBPG} from '~/src/app/bpg/domain/enum/localePageBPG'
import {SequentSuitesBPGEspecial} from '~/src/app/bpg/domain/enum/sequentSuitesBPGEspecial'
import {
  IntervalDto,
  Product,
  ProductsEliteTabs,
  Zone,
  Propertie,
  Page,
  Block,
  Consideration,
  EliteGolfProductsExtraCost,
  EliteGolfProductsFree,
  TypeConsiderations,
  TypesIntervals,
  TypeSchemaRewards,
  Promotion,
  DiscartedHotels
} from '~/src/app/bpg/domain/entities/strapiBpg'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import {BasePageSlugs} from '~/src/app/Strapi/StrapiConfiguration'
import {lazyInject} from '~/src/container'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import UseCase from '~/src/app/common/application/UseCase'
import {RuleEngineRequest, RuleEngineResponse} from '~/src/app/rules/application/runEngineUseCase'
import {
  EnumReservationCategory,
  PipelinesEnum
} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {MinimunStay} from '~/src/app/booking/domain/entities/minimunStay'
import {getRoomType} from '~/src/ui/utils/evaluate/roomType'
import {
  CatalogAnniversary,
  CatalogGroupsIds,
  CatalogImperials,
  CatalogIncentivo,
  Provisions,
  allCatalogsValues,
  Promotions,
  BaglioniVillas
} from '~/src/app/bpg/domain/enum/catalogProvitions'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import BenefitsAdditionalsDto from '~/src/app/bpg/domain/dto/getBenefitsAdditionalsDto'
import {
  MembershipLevelsAccessDiamante,
  MembershipLevelsAccessVIP
} from '~/src/app/bpg/domain/enum/membershipLevels'
import {PeriodType} from '~/src/app/bpg/domain/enum/periodType'

@Component({
  name: 'BPGPage',
  layout: 'authenticated',
  meta: {
    auth: true,
    breadcrumb: ['home', 'affiliateSearch', 'bpg']
  },
  i18n,
})
export default class BPGPage extends Mixins(
  // BookingWidgetMixin,
  BasePageStrapiMixin,
  CurrencyFormatDivisa,
  i18nDayjsMixin
) {
  @lazyInject(rulesTypes.runEngineUseCase)
  private readonly runEngine!: UseCase<RuleEngineRequest, RuleEngineResponse>

  // public components: StrapiComponent[] = []

  public roomAccess: Category[] = []

  public benefitsAdditionals: any = []

  public strapiPage: Page = {
    data: []
  }

  public bindingTab: string = 'promotions'

  public get productsEliteTabs(): ProductsEliteTabs[] {
    return [
      {code: 'benefits', title: this.$t('benefits') as string},
      {code: 'promotions', title: this.$t('promotions') as string}
    ]
  }

  public promotions: Product[] = []

  public benefitsList: Product[] = []

  public gPrices: any = []

  public propertySelectedTab: any = {}

  public loadingCategories: boolean = true

  public infoMembership: any = {}

  public minStay: any = {}

  public stayRegularNights: string = ''

  public stayMinimumNights: string = ''

  public loadingAffiliationInformation: boolean = true

  public productsGolf: any = {}

  public loadingProductsElite: boolean = true

  public codeShowPromotion: string = ''

  // public get heroAttrs(): HeroDto {
  //   return this.contentStore.heroDefault
  // }

  public get showProductsElite(): boolean {
    return this.productsList.length > 0
  }

  public get productsEliteTabsComputed(): TabsProductsElite[] {
    return this.productsEliteTabs.filter(
      (tab: {title: string; code: string}) =>
        //@ts-ignore
        this.titlesPage?.productsEliteTabs?.includes(tab.code) && this[tab.code].length > 0
    )
  }

  public get textsProvitions() {
    return {
      withoutDescription: this.$t('withoutDescription') as string,
      termsAndConditions: this.$t('termsAndConditions') as string
    }
  }

  public get termsAndConditionsProvisions() {
    return this.bpgStore.termsAndConditionsProvisions
  }

  public get showContentMicroSite(): boolean {
    // return this.infoMember?.stayByMarket
    return false
  }

  // public get authStore(): AuthStore {
  //   return new AuthStore()
  // }

  public get bpgStore(): BPGStore {
    return new BPGStore()
  }

  // public get userFullnameMember(): string {
  //   return this.authStore.userFullname
  // }

  public get headersTable(): HeaderTable[] {
    return this.bpgStore.headersTableCategory.map((header: HeaderTable) => ({
      ...header,
      title: this.$t(header.title) as string
    }))
  }

  public get bindCardCategoryTabs(): CardCategoryTabsDto {
    const accessBaglioni = this.accessProperties.some(propertie =>
      baglioniCodes.includes(propertie as string)
    )

    return {
      headersTable: this.headersTable,
      texts: {
        minStaysBaglioni: this.$t('minStaysBaglioni') as string,
        bpgSuiteAccessYears: this.$t('bpgSuiteAccessYears') as string,
        notFoundMessage: this.$t('notFoundMessage') as string,
        notFound: this.$t('notFound') as string
      },
      showZones: this.zones.length > 0,
      mppc: this.mppc,
      baglioniCodes,
      mainTabs: accessBaglioni
        ? this.zones.map(zone => ({
          ...zone,
          properties: zone.properties
            .filter(propertie =>
              this.roomHotelAccess.some(access => access.hotel === propertie.code)
            )
            .map(propertie => {
              if (propertie.code === 'LBC') return {...propertie, title: 'Le Blanc Cancun'}
              if (propertie.code === 'ZPLB') return {...propertie, title: 'Le Blanc Cabos'}
              if (propertie.code === 'MPS') return {...propertie, title: 'Moon Palace Sunrise'}
              if (propertie.code === 'MPG') return {...propertie, title: 'Moon Palace The Grand'}
              return propertie
            })
        }))
        : this.zones.filter(
          zone => !zone.properties.some(propertie => baglioniCodes.includes(propertie.code))
        ),
      roomHotelAccess: this.roomHotelAccess,
      accessByProperty: this.roomHotelAccessFormatted,
      loadingCategories: this.loadingCategories,
      textNoResultsFound: this.$t('noResultsFound') as string,
      textLoadingCategories: this.$t('textLoadingCategories') as string
    }
  }

  public createStringElements(
    elements: string[],
    caracterEnd: string,
    caracterJoin: string = ', '
  ): string {
    let str = elements.filter(element => element).join(caracterJoin)

    const positions = []

    let index = str.indexOf(',')

    while (index !== -1) {
      positions.push(index)
      index = str.indexOf(',', index + 1)
    }

    const position = positions.pop()

    if (position) return str.substring(0, position) + caracterEnd + str.substring(position + 1)
    return str
  }

  // public get userIsAuthenticated() {
  //   return this.authStore.isAuthenticated
  // }

  public itemsResumeMicroSite: ItemsResume[] = []

  // methods
  // async mounted() {
  //   if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
  //   else this.$nuxt.setLayout('auth')
  // }

  // @Watch('$route.hash')
  // onRouteHashChanged(_newHash: string) {
  //   this.scrollIntoView()
  // }

  public get attributesPage() {
    return this.strapiPage.data[0]?.attributes
  }

  public get blocks(): Block[] {
    return this.attributesPage?.blocks
  }

  public set blocks(value: any) {
    this.attributesPage.blocks = value
  }

  public get blockConsiderations(): Block | undefined {
    return this.blocks?.find((block: Block) => block.__component === 'blocks.bpg-considerations')
  }

  public get blockIntervals(): Block | undefined {
    return this.blocks?.find((block: Block) => block.__component === 'blocks.bpg-intervals')
  }

  public get sectionInterval() {
    return this.blockIntervals?.intervals || []
  }

  public get considerations(): any {
    return this.blockConsiderations?.considerations || []
  }

  public get eliteProductsGolf() {
    return this.productsGolf?.data?.data || []
  }

  public get roomHotelAccess() {
    return this.roomAccess
  }

  public get propertiesOrder() {
    const properties: any[] = []
    this.zones.map((zone: Zone) => {
      zone.properties.map(propertie => {
        properties.push({
          code: propertie.code,
          order: propertie.bpgOrder
        })
      })
    })
    return properties
  }

  // verificamos si existen elite products con costo extra
  public get eliteProductsExtraCost() {
    return this.eliteProductsGolf?.find((product: any) =>
      Object.keys(EliteGolfProductsExtraCost).includes(product.productId)
    )
  }

  // verificamos si existen elite products sin costo (free)
  public get eliteProductsFree() {
    return this.eliteProductsGolf?.find((product: any) =>
      Object.keys(EliteGolfProductsFree).includes(product.productId)
    )
  }

  public get accessMembership() {
    return this.roomHotelAccess?.filter(
      (access: any) =>
        [
          CatalogGroupsIds.VILLAS,
          CatalogGroupsIds.RESIDENCE,
          CatalogGroupsIds.BABY_VILLAS,
          CatalogGroupsIds.BABY_RESIDENCE,
          CatalogGroupsIds.PRESIDENTIAL_DIAMOND
        ].includes(access.groupId as CatalogGroupsIds) ||
        String(access.roomTypeDescription).search('Diamond') > -1 ||
        String(access.roomTypeDescription).search('Diamante') > -1
    )
  }

  public get groups() {
    const accessShow: any = {}
    return this.roomHotelAccess
      .map(({groupId, group}: any) => ({groupId, group}))
      .filter((access: any) => {
        if (!accessShow[access.groupId]) {
          accessShow[access.groupId] = true
          return true
        }
        return false
      })
      .filter(({groupId}: any) => groupId)
  }

  public get hotelsTableAccess() {
    return [...new Set(this.roomHotelAccess.map((property: any) => property.hotel))]
      .filter(hotel => !Object.keys(DiscartedHotels).includes(hotel as DiscartedHotels))
      .map(hotel => this.roomHotelAccess.find((access: any) => access.hotel === hotel))
      .map(hotel => ({
        title: hotel?.commercialCode,
        name: hotel?.hotel,
        width: '15%',
        align: 'center',
        order: this.propertiesOrder.find(propertie => propertie.code === hotel?.hotel)?.order || 1
      }))
      .sort((a: any, b: any) => {
        return a.order - b.order
      })
  }

  public get accessVillas(): any {
    const villa = this.roomHotelAccess.find((access: any) =>
      [CatalogGroupsIds.VILLAS, CatalogGroupsIds.BABY_VILLAS].includes(
        access.groupId as CatalogGroupsIds
      ) && ![BaglioniVillas.VILLA_REGINA, BaglioniVillas.VILLA_MALDIVAS, BaglioniVillas.GRAND_VILLA_MALDIVAS_].includes(
        access.idTypeRoom
      )
    )

    return villa ? this.insertDateText(villa) : villa
  }

  public get accessResidence(): any {
    const residence = this.roomHotelAccess.find((access: any) =>
      [CatalogGroupsIds.RESIDENCE, CatalogGroupsIds.BABY_RESIDENCE].includes(
        access.groupId as CatalogGroupsIds
      )
    )

    return residence ? this.insertDateText(residence) : residence
  }

  public get accessSuiteFamily() {
    const family = this.roomHotelAccess.find(
      (access: any) => access.groupId === CatalogGroupsIds.FAMILY_SUITE
    )

    return family ? this.insertDateText(family) : family
  }

  public get accessDiamond(): any {
    const diamond = this.roomHotelAccess.find(
      (access: any) =>
        access.groupId === CatalogGroupsIds.PRESIDENTIAL_DIAMOND ||
        String(access.roomTypeDescription).search('Diamond') > -1 ||
        String(access.roomTypeDescription).search('Diamante') > -1
    )

    return diamond ? this.insertDateText(diamond) : diamond
  }

  public insertDateText(access: any) {
    return {
      ...access,
      dateToText: this.i18nDayjs('MMMM DD, YYYY', access?.dateTo?.substr(0, 10))
    }
  }

  public get considerationsList() {
    return this.considerations
      ?.filter((consideration: any) => !this.removesConsiderations.includes(consideration.code))
      .map((consideration: Consideration) => {
        let {description, code} = consideration

        switch (code) {
        case 'MPPC':
          return {
            ...consideration,
            description: description!
              .replace('{VIGENGY}', String(this.mppc?.dateToText))
              .replace('{NUM_ACCESS}', String(this.mppc?.totalAccess))
          }

        case 'ACCESS_SUITES':
          const standard = this.groups.find((group: any) => group.groupId === 'S')
          const presidential = this.groups.find((group: any) => group.groupId === 'P')

          if (standard && presidential)
            description = description.replace(
              '{LEVELS}',
              this.$t('standardOrPresidential') as string
            )
          if (standard)
            description = description.replace('{LEVELS}', this.$t('standardLevel') as string)
          if (presidential)
            description = description.replace('{LEVELS}', this.$t('presidentialLevel') as string)

          description = this.constructWeeksAndNightsString(description)

          description = this.validatePresidentialDiamondAccessSuites(description)

          return {
            ...consideration,
            description,
            component: {
              component: () => import('~/src/ui/components/TableAccessSuites.vue'),
              headers: [
                {
                  title: this.$t('accessLang') as string,
                  name: 'access',
                  width: '',
                  align: 'left'
                },
                {
                  title: this.$t('suitesToChoose') as string,
                  name: 'suitesToChoose',
                  width: '20%',
                  align: 'left'
                },
                ...this.hotelsTableAccess
              ],
              hotels: this.hotelsTableAccess,
              groups: this.groups,
              accessGroup: ContentDataPageMapper.getTableGroupAccess(this.roomHotelAccess)
            }
          }
        case 'ER':
          const minimumStay = this.minimumStay.find(stay => stay.discountRate === 'D20')

          return {
            ...consideration,
            description: description!.replace('{NIGHTS}', String(minimumStay?.applicableStay))
          }
        case 'SN_BPG_GL':
        case 'SNBPG_GI':
          const ULGAPWK = this.golfPrices?.find((product: any) => product.productId === 'ULGAPWK')
          const ULGAPNG = this.golfPrices?.find((product: any) => product.productId === 'ULGAPNG')

          //@ts-ignore
          if (this.mppc?.validity > 5 || !this.mppc)
            description = this.removeMarksSuitesExclusives({
              markStart: '{MARK_YEARS_MPPC_START}',
              markEnd: '{MARK_YEARS_MPPC_END}',
              description: consideration.description
            })

          return {
            ...consideration,
            description: description!
              .replace('{YEARS}', this.mppc?.validity)
              .replace('{ULGAPWK_PRICE}', String(`$${ULGAPWK?.costo}`))
              .replace('{ULGAPWK_YEAR}', String(ULGAPWK?.year))
              .replace('{ULGAPNG_PRICE}', String(`$${ULGAPNG?.costo}`))
              .replace('{ULGAPNG_YEAR}', String(ULGAPNG?.year))
              .replace('{MARK_YEARS_MPPC_START}', '')
              .replace('{MARK_YEARS_MPPC_END}', '')
          }
          // case 'EM':
          //   const groups = this.groups.map(({group}: any) => group)

          //   const strGroups = `Suite Presidenciales (incluye las Aquas) y Suites Exclusivas: ${this.createStringElements(
          //     groups,
          //     ` ${this.$t('or') as string} `
          //   )}`

          //   return {
          //     ...consideration,
          //     description: description!
          //       .replace('{NIGHTS}', this.stayMinimumNights)
          //       .replace('{SUITES}', strGroups)
          //       .replace('{MINIMUM_STAY}', this.convertMinimumStayText())
          //   }
        case 'SE':
          description = this.constructWeeksAndNightsString(description)

          description = this.validateSuitesExclusives(description)

          description = this.validateResidenceSuitesExclusives(description)

          description = this.validateVillasSuitesExclusives(description)

          description = this.validatePresidentialDiamondSuitesExclusives(description)

          description = this.validateMinimumStaysSuitesExclusives(description)

          return {
            ...consideration,
            description: description
              .replace('{MARK_LEVELS_START}', '')
              .replace('{MARK_LEVELS_END}', '')
              .replace('{MARK_RESIDENCE_START}', '')
              .replace('{MARK_RESIDENCE_END}', '')
              .replace('{MARK_RESIDENCE_SECTION_START}', '')
              .replace('{MARK_RESIDENCE_SECTION_END}', '')
              .replace('{MARK_VILLAS_SECTION_START}', '')
              .replace('{MARK_VILLAS_SECTION_END}', '')
              .replace('{MARK_ACCESS_TOTAL_VILLAS_START}', '')
              .replace('{MARK_ACCESS_TOTAL_VILLAS_END}', '')
              .replace('{MARK_ACCESS_TOTAL_RESIDENCE_START}', '')
              .replace('{MARK_ACCESS_TOTAL_RESIDENCE_END}', '')
              // .replace('{MARK_ACCESS_VIGENCY_DIAMOND}', '')
              // .replace('{MARK_ACCESS_TOTAL_DIAMOND_START}', '')
              // .replace('{MARK_ACCESS_TOTAL_DIAMOND_END}', '')
              .replace('{MARK_DIAMOND_SECTION_END}', '')
              .replace('{MARK_DIAMOND_SECTION_START}', '')
          }
        default:
          return consideration
        }
      })
  }

  public get removesConsiderations() {
    return (
      this.considerations
        .map((consideration: any) => {
          // if (
          //   String(consideration.code) === TypeConsiderations.ESTANCIA_MINIMA &&
          //   !this.minStay.MinimiumStay
          // )
          //   return consideration.code

          if (
            String(consideration.code) === TypeConsiderations.SUITES_EXCLUSIVES &&
            this.accessMembership.length < 1
          )
            return consideration.code

          if (
            String(consideration.code) === TypeConsiderations.WKSNG_BPG_GCC &&
            !this.eliteProductsExtraCost
          )
            return consideration.code

          if (
            String(consideration.code) === TypeConsiderations.WKSNG_BPG_GSC &&
            !this.eliteProductsFree
          )
            return consideration.code
        })
        .filter((consideration: any) => consideration) || []
    )
  }

  public get showConsiderationsList(): boolean {
    return this.considerations.length > 0
  }

  public get blockProductsElite() {
    const elite = this.blocks?.find(
      (block: Block) => block.__component === 'blocks.bpg-elite-products'
    )

    const promotions = elite?.promotions || []
    const rewards = elite?.rewards || []

    this.benefitsPage = this.extractDataProducts(elite?.benefits || [], 'benefits')
    this.promotionsPage = this.extractDataProducts([...promotions, ...rewards], 'promotions')

    return elite
  }

  public set blockProductsElite(value: any) {
    const othersBlocks = this.blocks?.find(
      (block: Block) => block.__component !== 'blocks.bpg-elite-products'
    )
    this.blocks = {
      ...value,
      ...othersBlocks
    }
  }

  public get titlesPage() {
    return {
      title: this.attributesPage?.title || '',
      considerationsTitle: this.blockConsiderations?.title || '',
      productsEliteTitle: this.blockProductsElite?.title || '',
      productsEliteTabs: ['benefits', 'promotions']
    }
  }

  public get locale() {
    return this.$i18n.locale
  }

  public get infoMember() {
    return this.infoMembership
  }

  public get golfPrices() {
    return this.gPrices
  }

  public get mppc(): any {
    const mppcAccess = this.roomHotelAccess.filter(categorie => categorie.hotel === 'ZCMP')
    .sort((a: any, b: any) => {
        return b.validity - a.validity
      })

    if (mppcAccess.length > 0) { 
      return {...mppcAccess[0], dateToText: this.i18nDayjs('MMMM DD, YYYY', mppcAccess[0]?.dateTo?.substr(0, 10))}
    }
    return undefined
  }

  public get minimumStay() {
    return this.bpgStore.minimumStay
  }

  public redirectToLocalePage() {
    switch (this.infoMembership?.lang) {
      case LocalePageBPG.SPANISH:
        this.$router.push({path: '/es/bpg'})
        break
      case LocalePageBPG.PORTUGUESE:
        this.$router.push({path: '/pt/bpg'})
        break
      case LocalePageBPG.ENGLISH:
      default:
        this.$router.push({path: '/bpg'})
        break
    }
  }

  async validateInfoAffiliation() {
    if (!this.bpgStore.affiliateInfo.application) {
      const application = this.$route.query.application as string

      if (application) {
        await this.bpgStore.getAffiliateInfo(application)
      }
    }
  }

  async beforeMount() {

    try {
      await this.validateInfoAffiliation()

      if (!this.bpgStore.affiliateInfo.application) {
        this.$router.push(this.localePath('/affiliate-search'))
        return
      }

      await this.getInfoAffiliation()
      // this.redirectToLocalePage()

      this.strapiPage = await this.loadStrapiPageData(BasePageSlugs.BPG)
      await this.bpgStore.getMimimumStay()
      // if (this.infoMember?.stayByMarket) return

      await this.getAccessProperties()
      await this.getAllZones()
      this.loadingCategories = false

      await this.getMinStay()
      await this.getRoomAccessHotel()

      const extraFeeGolf = await this.bpgStore.getExtraFeeGolf()
      this.gPrices = extraFeeGolf.data?.data || []

      await this.onSelectedProperty()
      this.loadingCategories = false

      await this.getStays()

      this.productsGolf = await this.bpgStore.getEliteProductsGolf()

      await this.getPromotionsElite()
      await this.getBenefitsElite()

      this.loadingProductsElite = false

      await this.getBenefitsAdditionals()

      await this.bpgStore.getTermsAndConditions()

      // this.scrollIntoView()
    } catch (error) {
      console.log(error)
    }
  }

  public async getMinStay() {
    try {
      this.minStay = await this.bookingStore.getMinStay(this.applicationUserMember ?? '')
    } catch (error) {
      console.log(error)
    }
  }

  public validateResidenceSuitesExclusives(description: string) {
    if (!this.accessResidence) {
      description = this.removeMarksSuitesExclusives({
        markStart: '{MARK_RESIDENCE_SECTION_START}',
        markEnd: '{MARK_RESIDENCE_SECTION_END}',
        description
      })

      return this.removeMarksSuitesExclusives({
        markStart: '{MARK_RESIDENCE_START}',
        markEnd: '{MARK_RESIDENCE_END}',
        description
      })
    }

    switch (this.accessResidence?.periodType) {
    case PeriodType.YEAR:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_RESIDENCE}',
        this.$t('yearsAndVigencyYear', {
          VIGENCY: String(this.accessResidence?.dateToText),
          ACCESS_YEAR: String(this.accessResidence?.accessYear)
        }) as string
      )
    case PeriodType.TOTAL:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_RESIDENCE}',
        this.$t('yearsAndVigencyTotal', {
          level: this.$t('residence') as string,
          VIGENCY: String(this.accessResidence?.dateToText),
          ACCESS_YEAR: String(this.accessResidence?.accessYear)
        }) as string
      )
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_RESIDENCE}', '')
    }
  }

  public validateSuitesExclusives(description: string) {
    const separatorEnd = ` ${this.$t('or') as string} `

    if (!this.accessVillas && !this.accessResidence && !this.accessDiamond)
      return this.removeMarksSuitesExclusives({
        markStart: '{MARK_LEVELS_START}',
        markEnd: '{MARK_LEVELS_END}',
        description
      })

    const levels: any = [
      this.accessDiamond ? (this.$t('diamondPresidential') as string) : undefined,
      this.accessVillas ? (this.$t('villa') as string) : undefined,
      this.accessResidence ? (this.$t('residence') as string) : undefined
    ].map(access => access)

    return description.replace('{LEVELS}', this.createStringElements(levels, separatorEnd))
  }

  public constructWeeksAndNightsString(description: string) {
    const separatorEnd = ` ${this.$t('or') as string} `

    let benefits = this.benefits
      .filter(benefit =>
        [
          CatalogImperials.IMPWKS,
          CatalogImperials.IMPNIG,
          CatalogAnniversary.ANVNIG,
          CatalogAnniversary.ANVWKS,
          CatalogIncentivo.INCWKS
        ].includes(benefit.category as any)
      )
      .map(({category}) => category)

    benefits = [...new Set(benefits)]

    let imperials: string[] | string = []
    let anniversarys: string[] | string = []
    const allProvitions: string[] = []

    if (benefits.includes(CatalogImperials.IMPWKS))
      imperials.push(this.$t('imperialWeeks') as string)

    if (benefits.includes(CatalogImperials.IMPNIG))
      imperials.push(this.$t('imperialNights') as string)

    imperials = this.createStringElements(imperials, separatorEnd)

    if (imperials) allProvitions.push(imperials)

    if (benefits.includes(CatalogIncentivo.INCWKS))
      allProvitions.push(this.$t('incentiveWeek') as string)

    if (benefits.includes(CatalogAnniversary.ANVWKS))
      anniversarys.push(this.$t('anniversaryWeeks') as string)

    if (benefits.includes(CatalogAnniversary.ANVNIG))
      anniversarys.push(this.$t('anniversaryNights') as string)

    anniversarys = this.createStringElements(anniversarys, separatorEnd)

    if (anniversarys) allProvitions.push(anniversarys)

    return description.replace(
      '{STRING_WEEKS_NIGHTS}',
      this.createStringElements(allProvitions, separatorEnd)
    )
  }

  public validateVillasSuitesExclusives(description: string) {
    if (!this.accessVillas) {
      return this.removeMarksSuitesExclusives({
        markStart: '{MARK_VILLAS_SECTION_START}',
        markEnd: '{MARK_VILLAS_SECTION_END}',
        description
      })
    }

    switch (this.accessVillas?.periodType) {
    case PeriodType.YEAR:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_VILLAS}',
        this.$t('yearsAndVigencyYear', {
          VIGENCY: String(this.accessVillas?.dateToText),
          ACCESS_YEAR: String(this.accessVillas?.accessYear)
        }) as string
      )
    case PeriodType.TOTAL:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_VILLAS}',
        this.$t('yearsAndVigencyTotal', {
          level: this.$t('villa') as string,
          VIGENCY: String(this.accessVillas?.dateToText),
          ACCESS_YEAR: String(this.accessVillas?.accessYear)
        }) as string
      )
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_VILLAS}', '')
    }
  }

  public validatePresidentialDiamondAccessSuites(description: string) {
    if (!this.accessDiamond) {
      description = this.removeMarksSuitesExclusives({
        markStart: '{MARK_DIAMOND_START}',
        markEnd: '{MARK_DIAMOND_END}',
        description
      })
    }

    return description.replace('{MARK_DIAMOND_START}', '').replace('{MARK_DIAMOND_END}', '')
  }

  public validateMinimumStaysSuitesExclusives(description: string) {
    const minimumStay = this.minimumStay.find(stay => stay.discountRate === 'E')

    return description
      .replace('{MARK_MINIMUM_STAYS_START}', '')
      .replace('{MARK_MINIMUM_STAYS_END}', '')
      .replace('{NIGHTS}', String(minimumStay?.applicableStay))
  }

  public validatePresidentialDiamondSuitesExclusives(description: string) {
    if (!this.accessDiamond) {
      description = this.removeMarksSuitesExclusives({
        markStart: '{MARK_DIAMOND_SECTION_START}',
        markEnd: '{MARK_DIAMOND_SECTION_END}',
        description
      })
    }

    switch (this.accessDiamond?.periodType) {
    case PeriodType.YEAR:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_DIAMOND}',
        this.$t('yearsAndVigencyYear', {
          VIGENCY: String(this.accessDiamond?.dateToText),
          ACCESS_YEAR: String(this.accessDiamond?.accessYear)
        }) as string
      )
    case PeriodType.TOTAL:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_DIAMOND}',
        this.$t('yearsAndVigencyTotal', {
          level: this.$t('villa') as string,
          VIGENCY: String(this.accessDiamond?.dateToText),
          ACCESS_YEAR: String(this.accessDiamond?.accessYear)
        }) as string
      )
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_DIAMOND}', '')
    }
  }

  public get interval() {
    const notInterval = ['N', '']
    let interval = null

    if (
      !notInterval.includes(this.infoMember.interval) ||
      !notInterval.includes(this.infoMember.intervalPlatinum)
    ) {
      interval = this.sectionInterval.find(
        (interval: IntervalDto) => interval.code === TypesIntervals.IPLATINUM
      )
    }

    if (!notInterval.includes(this.infoMember.intervalPrevious)) {
      interval = this.sectionInterval.find(
        (interval: IntervalDto) => interval.code === TypesIntervals.IPREVIOUS || []
      )
    }

    if (interval !== null) return {...interval, urlImage: interval?.image?.data?.attributes?.url}

    // return
  }

  public convertMinimumStayText() {
    const minStay: string[] = [this.$t('Affiliates') as string]

    for (const property in this.minStay) {
      if (this.minStay[property] && ['Guest', 'Referrend', 'Beneficiaries'].includes(property))
        minStay.push(this.$t(property) as string)
    }

    return this.createStringElements(minStay, ` ${this.$t('or') as string} `)
  }

  public removeMarksSuitesExclusives({
    markStart,
    markEnd,
    description
  }: {
    markStart: string
    markEnd: string
    description: string
  }) {
    const lengthMarkEnd = markEnd.length
    if (description.search(markStart) < 0) return description

    const start = description.indexOf(markStart)
    const end = description.indexOf(markEnd) + lengthMarkEnd

    return description.replace(description.substring(start, end), '')
  }

  public extractDataProducts(data: any, category: string) {
    return (
      data.map((product: any, index: number) => ({
        ...product,
        description: product.description || '',
        name: product?.caption,
        image: product?.image?.data?.attributes?.url,
        showButton: false,
        textNewOldSchema:
          this.infoMember?.rewardsScheme === TypeSchemaRewards.NEW_SCHEMA
            ? product?.textNewOldSchema || ''
            : '',
        category: 'benefits',
        shortContent: true,
        indexOrigin: index
      })) || []
    )
  }

  public benefitsPage: any = []
  public promotionsPage: any = []

  // public get benefitsPage() {
  //   return this.blockProductsElite?.benefits
  // }

  // public set benefitsPage(value: any) {
  //   this.blockProductsElite.benefits = value
  // }

  public get accessProperties(): string[] {
    return this.bpgStore.accessProperties
  }

  public get zones(): Zone[] {
    return this.bpgStore.zones
      .map((zone: Zone) => {
        zone.properties = zone.properties.filter((propertie: Propertie) =>
          this.accessProperties.includes(propertie.code)
        )
        if (zone.properties.length > 0) return zone
        return
      })
      .filter((zone: Zone) => zone)
  }

  public get applicationUserMember(): string {
    // return this.authStore.applicationUserMember as string
    return this.bpgStore.affiliateInfo.application
  }

  public get bookingStore(): BookingStore {
    return new BookingStore()
  }

  // public get user() {
  //   return this.authStore.user
  // }

  public get productsList() {
    if (this.benefits.length > 0 || this.promotions.length > 0) {
      // validamos que el tab, sea de los productos de beneficios y le asignamos en que parametro buscará
      if (this.bindingTab === TypesProductsElite.BENEFITS && this.benefitsPage.length > 0) {
        return this.extractBenefitsAndPreferentials(
          this.benefits,
          this.benefitsPage,
          'category',
          [],
          this.infoMember.program,
          this.benefitsAdditionals
        )
      }

      // validamos que el tab, sea de los productos de promociones y le asignamos en que parametro buscará
      if (this.bindingTab === TypesProductsElite.PROMOTIONS && this.promotionsPage.length > 0) {
        return this.extractPromotions(this.promotions, this.promotionsPage, this.infoMember)
      }
    }

    return []
  }

  public extractBenefitsAndPreferentials(
    products: Product[],
    benefits: Promotion[],
    type: string,
    catalogSearch: any[] = [],
    membershipLevelCode: string,
    benefitsAdditionals: BenefitsAdditionalsDto[]
  ) {
    const membershipLevelsAccess: string[] = Object.values({
      ...MembershipLevelsAccessDiamante,
      ...MembershipLevelsAccessVIP
    })
    const concert = benefitsAdditionals.find(
      benefit => benefit.additionalBenefit === Provisions.CONCERT
    )
    return (
      benefits
        ?.map((promotion: Promotion) => {
          // //buscamos hacer match con back end del producto recorrido
          const codes = promotion.code.replaceAll(' ', '').split('&')

          switch (promotion.code) {
          case Provisions.CONCIERGE:
            if (membershipLevelsAccess.includes(membershipLevelCode)) {
              let strLevel: string = ''
              let imperialsReplace: string[] = []
              let imperialsReplaceLong: string[] = []

              const imperials = [
                ...new Set(
                  products
                    .filter(benefit => Object.keys(CatalogImperials).includes(benefit.category))
                    .map(benefit => benefit.category)
                )
              ]

              if (imperials.length < 1)
                promotion.description = this.removeMarksSuitesExclusives({
                  markStart: '{MARK_WEEKS_AND_NIGHTS_START}',
                  markEnd: '{MARK_WEEKS_AND_NIGHTS_END}',
                  description: promotion.description
                })

              if (imperials.includes(CatalogImperials.IMPWKS)) {
                imperialsReplace.push(this.$t('weeks') as string)
                imperialsReplaceLong.push(this.$t('weeksImperials') as string)
              }

              if (imperials.includes(CatalogImperials.IMPNIG)) {
                imperialsReplace.push(this.$t('nights') as string)
                imperialsReplaceLong.push(this.$t('nightsImperials') as string)
              }

              if (imperials)
                if (
                  Object.values(MembershipLevelsAccessDiamante).includes(
                    membershipLevelCode as MembershipLevelsAccessDiamante
                  )
                )
                  strLevel = this.$t('affiliatesDiamond') as string

              if (
                Object.values(MembershipLevelsAccessVIP).includes(
                  membershipLevelCode as MembershipLevelsAccessVIP
                )
              )
                strLevel = this.$t('affiliatesVIP') as string

              return {
                ...promotion,
                description: promotion.description
                  .replace('{AFFILIATE_LEVEL}', `${strLevel}`)
                  .replace(
                    '{WEEKS_AND_NIGHTS}',
                    this.createStringElements(imperialsReplace, '/', ',')
                  )
                  .replace(
                    '{WEEKS_AND_NIGHTS_IMPERIALS}',
                    this.createStringElements(imperialsReplaceLong, ` ${this.$t('andOr')} `)
                  )
                  .replace('{MARK_WEEKS_AND_NIGHTS_START}', '')
                  .replace('{MARK_WEEKS_AND_NIGHTS_END}', '')
              }
            }
            break
          }

          if (promotion.code === Provisions.CONCERT && concert) return promotion

          let prod: any = products.find(
            (prod: any) => codes.includes(prod[type]) || codes.includes('ALL')
          )

          if (prod) {
            const catalogImperials = Object.values(CatalogImperials)
            const catalogAnniversary = Object.values(CatalogAnniversary)
            const catalogIncentivo = Object.values(CatalogIncentivo)

            // validamos si ese producto, es de categoria golf y remplazamos la key, por el valor de back de accesos de golf
            if (
              promotion.code === Provisions.GOLFRND ||
              promotion.code === Provisions.UGBWEEK ||
              promotion.code === Provisions.UGBNIG
            )
              promotion.description = promotion
                ?.description!.replace('{GOLF_ACCESS}', String(this.infoMember.grAccess))
                .replace('{MPPC_YEARS}', String(this.mppc?.validity))

            if (allCatalogsValues.includes(prod[type])) {
              if (catalogImperials.includes(prod[type])) catalogSearch = catalogImperials

              if (catalogAnniversary.includes(prod[type])) catalogSearch = catalogAnniversary

              if (catalogIncentivo.includes(prod[type])) catalogSearch = catalogIncentivo

              return {
                ...prod,
                ...promotion,
                mapper:
                  products.filter((provition: any) => catalogSearch.includes(provition[type])) || []
              }
            }

            return {...prod, ...promotion, mapper: []}
          }

          return prod
        })
        .filter((product: Promotion | undefined) => product !== undefined) || []
    )
  }

  public extractPromotions(products: Product[], promotions: Promotion[], infoMember: any) {
    return (
      promotions
        ?.map((promotion: Promotion) => {
          const codes = promotion.code.replaceAll(' ', '').split('&')

          if (codes.includes('ALL')) return promotion

          if (promotion.code === Provisions.YATE) {
            return {
              ...promotion,
              description: promotion.description.replace(
                '{DISCOUNT_YATE}',
                `${infoMember?.yachtDiscount}%`
              )
            }
          }

          if (promotion.code === Promotions.KIDS_AND_TEENS && !this.accessSuiteFamily)
            return {
              ...promotion,
              description: this.removeMarksSuitesExclusives({
                markStart: '{MARK_DINAMIC_START}',
                markEnd: '{MARK_DINAMIC_END}',
                description: promotion.description
              })
            }
          // //buscamos hacer match con back end del producto recorrido
          let prod = products.find(
            (prod: Product) => String(promotion.code) === String(prod.idPromocion)
          )

          // si hizo match el producto entre Strapi y back, retornamos ambas infos
          if (prod) {
            return {
              ...prod,
              ...promotion,
              description: promotion.description
                .replace('{MARK_DINAMIC_START}', '')
                .replace('{MARK_DINAMIC_END}', '')
            }
          }

          return prod
        })
        .filter(product => product) || []
    )
  }

  // public async scrollIntoView() {
  //   const fullPath = this.$route.fullPath
  //   const hashtag = fullPath.slice(fullPath.indexOf('#'))

  //   if (['#promotions', '#benefits'].includes(hashtag)) {
  //     //@ts-ignore
  //     this.$refs.promotions.scrollIntoView({behavior: 'smooth'})

  //     if (hashtag.search('promotions') > -1) this.bindingTab = 'promotions'

  //     if (hashtag.search('benefits') > -1) this.bindingTab = 'benefits'
  //   }
  // }

  // public async getInfoAffiliation() {
  public getInfoAffiliation() {
    try {
      // let {data} = await this.bpgStore.getInfoAffiliation()

      // let info: any = data?.data

      // info = info.find((info: any, index: number) => index === 0)

      const info = this.bpgStore.affiliateInfo

      this.itemsResumeMicroSite = [
        {title: this.$t('affiliationNumber') as string, value: info?.application},
        {title: this.$t('lastContract') as string, value: info?.lastContract},
        {title: this.$t('owner') as string, value: info?.name},
        {
          title: this.$t('totalInvestment') as string,
          value: this.currencyFormatDivisa({
            value: String(Math.ceil(info?.sale)),
            prefix: '',
            currencyText: '',
            divisa: ''
          })
        }
      ]

      this.loadingAffiliationInformation = false
      this.infoMembership = info
    } catch (error) {
      console.log(error)
    }
  }

  public async getPromotionsElite(): Promise<void> {
    try {
      const promotions = await this.bpgStore.getProductsElitePromotions()
      this.promotions = promotions.data.data
    } catch (error: any) {
      console.log(error)
    }
  }

  public get benefits() {
    return this.benefitsList
  }

  public async getBenefitsElite(): Promise<void> {
    try {
      const benefits = await this.bpgStore.getProductsEliteBenefits()
      this.benefitsList = benefits.data.data || []
    } catch (error: any) {
      console.log(error)
    }
  }

  public async getRoomAccessHotel(): Promise<void> {
    try {
      this.roomAccess = await this.bpgStore.getCategorysByProperty()
    } catch (error) {
      console.log(error)
    }
  }

  public async getBenefitsAdditionals() {
    try {
      this.benefitsAdditionals = await this.bpgStore.getBenefitsAdditionals()
    } catch (error) {
      console.log(error)
    }
  }

  public get roomHotelAccessFormatted() {
    const accessShow: any = {}

    return (
      this.roomHotelAccess
        .filter(
          (access: any) =>
            !this.validatePartRoom(access?.roomTypeId) &&
            access?.discountRate > 0 &&
            access.hotel === this.propertySelectedTab?.code
        )
        .map((access: any) => ({
          ...access,
          title: access?.roomTypeDescription || '-',
          //title: `${access?.roomTypeDescription} / ${access.roomTypeId}` || '-',
          code: access?.roomTypeId || '-',
          property: this.propertySelectedTab?.code,
          bpg: `${access?.discountRate}%` || '-',
          ocupacion_max: access.maxOccupancy,
          tooltip: ''
        }))
        .filter((access: any) => {
          if (!accessShow[access.roomTypeDescription]) {
            accessShow[access.roomTypeDescription] = true
            return true
          }
          return false
        })
        .sort((a: any, b: any) => {
          if (b.bpg < a.bpg) return 1
          if (b.bpg > a.bpg) return -1
          return 0
        }) || []
        //.sort((a: any, b: any) => {
        //if (a.discountRate === 30) {
        //console.log(a, b)
        //
        //}
        //return 0
        //var indiceA = SequentSuitesBPGEspecial[a.hotel].indexOf(a.)
        //var indiceA = SequentSuitesBPGEspecial[b.hotel].indexOf(b.)
        //return indiceA - indiceB;
        //}) || []
    )
  }

  public validatePartRoom(rmType: string, numbers: string = '456789') {
    for (let i = 0; i < rmType.length; i++) {
      if (numbers.indexOf(rmType.charAt(i), 0) !== -1) return true
    }
  }

  // public async goToPolicys(): Promise<void> {
  public goToPolicys(): void {
    this.$nuxt.$router.push(this.localePath({path: '/policys'}))
  }

  // public async onClickProperty(property: any): Promise<void> {
  public onClickProperty(property: any): void {
    this.propertySelectedTab = property
  }

  public async getAllZones() {
    try {
      await this.bpgStore.getAllZones({
        accessProperties: this.accessProperties,
        locale: this.$i18n.locale
      })
    } catch (error) {
      console.log(error)
    }
  }

  // public async showMorePromotion(code: string, index: number): Promise<void> {
  public showMorePromotion(code: string, _index: number): void {
    this.codeShowPromotion = code

    switch (this.bindingTab) {
    case 'benefits':
      this.benefitsPage = this.benefitsPage.map((benefit: any) => ({
        ...benefit,
        shortContent: benefit.code === code ? !benefit.shortContent : benefit.shortContent
      }))
      break
    case 'promotions':
      this.promotionsPage = this.promotionsPage.map((promotion: any) => ({
        ...promotion,
        shortContent: promotion.code === code ? !promotion.shortContent : promotion.shortContent
      }))
      break
    }
  }

  public async onSelectedProperty(): Promise<void> {
    if (this.zones.length > 0) {
      const tab = this.zones.find((tab: Zone, index: number) => index === 0)

      this.propertySelectedTab = tab?.properties.find(
        (property: Propertie, index: number) => index === 0
      )
    }
  }

  public async getStays() {
    const minStays = Object.assign({}, this.bookingStore.minStays)

    let stayMinimum = 0

    if (minStays.MinimiumStay)
      stayMinimum = await this.validateBPGMinimalStay(
        PipelinesEnum.STAY_MINIMAL,
        'CNG',
        EnumReservationCategory.PREFERENCIAL,
        'N',
        'BP',
        minStays
      )

    minStays.MinimiumStay = false

    const stayRegular = await this.validateBPGMinimalStay(
      PipelinesEnum.STAY_MINIMAL,
      'CNG',
      EnumReservationCategory.PREFERENCIAL,
      'N',
      'BP',
      minStays
    )

    this.stayRegularNights = String(stayRegular)
    this.stayMinimumNights = String(stayMinimum)
  }

  public async getAccessProperties() {
    try {
      return await this.bpgStore.getAccessProperties()
    } catch (error) {
      console.log(error)
    }
  }

  public async getValidateAccessGroup() {
    return await this.bpgStore.getValidateAccessGroup()
  }

  public async validateBPGMinimalStay(
    pipeline: PipelinesEnum,
    roomCode: string,
    reservationType: string | undefined,
    productType: string,
    propertyCodeCode: string,
    minimunProperties: MinimunStay | null
  ) {
    const roomType = getRoomType({
      hotelCode: propertyCodeCode,
      roomCode,
    })
    const market = this.bpgStore.affiliateInfo?.market

    const fact = {
      reservationType,
      roomType,
      market,
      stayMinimal: minimunProperties?.MinimiumStay,
      stayMinimalPresidential: minimunProperties?.PresidentialVariables,
      stayMinimalReferral: minimunProperties?.Referrend,
      productType
    }

    const response = await this.runEngine.run({fact, pipeline})
    let minimalStay = response.events.stayMinimal
    if (minimalStay === undefined) minimalStay = 0

    return minimalStay
  }
}
</script>
