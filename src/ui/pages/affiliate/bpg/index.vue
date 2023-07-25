<template>
  <div
    class="ms-mt-4 lg:ms-mt-12"
  >
    <!-- Resume -->
    <div class="ms-hidden md:ms-flow-root">
      <BPGResumeMicroSiteSkeleton v-if="loadingAffiliationInformation" />
      <BPGResumeMicroSite
        v-else
        :items="itemsResumeMicroSite"
        :dark="false"
      />
    </div>

    <!-- category tabs -->
    <p
      class="ms-mt-[32px] md:ms-mt-[100px] ms-mb-[32px] ms-text-center ms-uppercase ms-text-blue-light ms-font-semibold ms-text-[18px] md:ms-text-[40px]"
    >
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
      class="ms-text-center md:!ms-text-left ms-mt-[32px] md:!ms-mt-[100px] ms-mb-[16px] ms-uppercase ms-text-blue-light ms-font-semibold ms-text-[18px] md:!ms-text-[24px]"
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
      v-model="considerationsValues[index]"
      @input="onClickExpansionPanel($event, index)"
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
      :class="isMobile ? 'carousel' : ''"
      class="ms-w-full md:!ms-grid md:!ms-grid-cols-[repeat(auto-fit,_32%)] md:!ms-m-auto ms-gap-6 ms-mt-4 md:!ms-justify-center"
      v-if="showProductsElite"
    >
      <BPGCardPromotions
        :class="isMobile ? 'carousel-item' : ''"
        :isMobile="isMobile"
        v-for="(product, index) in productsListMobile"
        :key="index"
        :termsAndConditionsProvisions="termsAndConditionsProvisions"
        :texts="textsProvitions"
        :seeMore="$t('seeMore')"
        :seeLess="$t('seeLess')"
        v-bind="product"
        :dark="false"
        @open-modal-terms="openModalTermsMobile"
        @show-more="showMorePromotion(product.code, index)"
      >
        <template
          v-if="product?.label"
          #button
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
      <div
        class="ms-bg-black-light md:ms-hidden ms-w-[280px] ms-rounded-[12px] ms-justify-center ms-items-center"
        :class="isMobile ? 'carousel-item' : ''"
        :isMobile="isMobile"
        @click.prevent="displayMorePromotions"
      >
        <div
          :class="getClassDisplayMorePromotions()"
          class="ms-grid ms-place-items-center ms-rounded-full ms-border-2 ms-border-blue-light ms-py-[32px] ms-px-[24px]"
        >
          <span class="ms-text-[14px] ms-text-blue-light ms-font-sans ms-uppercase ms-font-bold">
            {{ $t('seeMore') }}
          </span>
          <svg
            width="18"
            height="15"
            class="text-blue-light mt-4"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4444 7.07959L17.4443 7.07969L17.4528 7.08778C17.5064 7.13886 17.5196 7.18139 17.5196 7.22729C17.5196 7.27025 17.5085 7.31248 17.4491 7.37044L17.449 7.37041L17.4445 7.37492L17.1658 7.65389L17.1309 7.56481L16.9999 7.2302L17.1319 6.88719L17.1654 6.80018L17.4444 7.07959ZM16.2807 8.24004L16.595 8.22501L10.9192 13.905C10.8514 13.9686 10.8143 13.9741 10.7775 13.9741C10.7176 13.9741 10.6805 13.9531 10.6592 13.9321C10.6383 13.9114 10.6189 13.8773 10.6189 13.8222C10.6189 13.7845 10.6254 13.7506 10.6345 13.7255C10.6403 13.7094 10.6454 13.7015 10.6469 13.6994L10.6521 13.694L13.5494 10.773L16.2807 8.24004ZM16.5955 6.2296L16.2744 6.21424L13.5496 3.68182L10.6543 0.762754C10.6422 0.749997 10.6189 0.715375 10.6189 0.632446C10.6189 0.575028 10.6388 0.54145 10.6587 0.521906C10.6791 0.501777 10.7161 0.480531 10.7775 0.480531C10.8095 0.480531 10.8253 0.485051 10.8397 0.491587C10.8576 0.499667 10.8964 0.521784 10.9587 0.58613L10.9587 0.586169L10.9639 0.591364L16.5955 6.2296ZM15.9565 7.23039L15.8845 7.29717L13.8123 7.39627H0.64265C0.574781 7.39627 0.539918 7.37368 0.522349 7.35591C0.5044 7.33776 0.480363 7.29999 0.480363 7.22729C0.480363 7.15234 0.504869 7.11517 0.521798 7.09811C0.538562 7.08121 0.57324 7.05832 0.64265 7.05832H13.8123L15.8777 7.15709L15.9565 7.23039Z"
              stroke="currentColor"
              stroke-width="0.960727"
            />
          </svg>
        </div>
      </div>
    </div>
    <PESkeletonCardProvition v-else-if="loadingProductsElite" :dark="false" />
    <div
      v-else
      class="ms-text-white ms-font-sans ms-font-normal mb-6"
    >
      {{ $t('noResultsFound') }}
    </div>

    <div
      class="md:!ms-flex md:!gap-12 md:ms-my-[200px] ms-mt-[32px] ms-items-center ms-justify-center"
      v-if="interval"
    >
      <img
        class="rounded-[8px] md:!ms-max-h-[390px] w-full md:w-[477px] ms-object-cover"
        :src="interval.urlImage"
      />
      <div class="ms-w-full md:ms-max-w-[800px] mt-[24px] md:ms-p-12">
        <div
          class="ms-font-sans ms-text-center md:ms-text-left ms-uppercase ms-font-semibold ms-text-[18px] md:ms-text-[24px] ms-text-blue-light"
        >
          {{ interval.title }}
        </div>
        <div
          :class="getClassDescriptionInterval()"
          class="ms-mt-[24px] ms-font-sans ms-font-normal ms-text-[14px] md:ms-text-[16px] !ms-text-gray-500"
          v-html="interval.description"
        />
      </div>
    </div>

    <div
      class="md:ms-hidden ms-p-[24px] ms-bg-black-medium ms-z-[31] ms-w-full ms-rounded-t-[20px] ms-mx-auto ms-h-[80%] ms-fixed ms-bottom-0"
      v-if="showModalAccessSuitesMobile"
    >
      <div class="flex justify-end">
        <div
          @click.prevent="closeModalExpansionPanel"
          class="p-2"
        >
          <PEIcon
            size="24"
            class="text-white"
            >close-circle</PEIcon
          >
        </div>
      </div>
      <div
        class="ms-mt[24px] ms-text-white ms-text-center ms-uppercase ms-font-bold ms-text-[18px]"
      >
        {{ accessSuitesConsideration?.title }}
      </div>
      <div class="ms-mt-[24px]">
        <PESelect
          :items="hotelsTableAccess"
          item-value="name"
          item-text="titleMobile"
          class="w-full mb-4"
          v-model="propertieSelectedMobile"
        />
      </div>
      <div class="content-mobile-access ms-overflow-y-auto ms-my-4 ms-h-[100%]">
        <div class="ms-mt-[24px] ms-text-white ms-font-sans"> Aplica en: </div>
        <div
          v-for="access in accessGroupMapperMobile"
          class="ms-text-white"
        >
          <div
            v-html="access.title"
            class="my-4"
          />
          <div class="ms-gap-y-4 ms-w-full">
            <div
              class="ms-px-4 ms-mb-2 ms-py-2 ms-text-white ms-font-sans ms-text-[14px] ms-bg-blue-light ms-rounded-[12px]"
              style="width: fit-content; height: fit-content"
              v-for="acc in access.access"
            >
              {{ acc.roomTypeDescription }}
            </div>
          </div>
        </div>
        <div
          class="ms-my-6 ms-text-white"
          v-html="accessSuitesConsideration?.description"
        />
      </div>
    </div>

    <aside
      class="fixed px-6 py-6 top-0 right-0 h-full ms-w-[100%] transform overflow-auto bg-black-light transition-all duration-300 ease-in-out justify-between xl:hidden"
      style="z-index: 99999"
      v-if="showModalTermsMobile"
    >
      <div class="flex justify-end">
        <div
          @click.prevent="closeModalTermsMobile"
          class="p-2"
        >
          <PEIcon
            size="24"
            class="text-white"
            >close-circle</PEIcon
          >
        </div>
      </div>
      <h2 class="ms-text-white ms-text-center ms-text-[24px] ms-font-sans ms-mb-5 ms-uppercase">
        {{ textsProvitions.termsAndConditions }}
      </h2>
      <div
        v-for="(term, index) in termsAndConditionsMobile"
        :key="index"
        class="ms-text-white ms-mb-6 ms-font-sans"
        v-html="term.htmlBody"
      />
    </aside>

    <div class="ms-flex lg:ms-mt-8 ms-justify-end ms-divide-x ms-divide-gray-500 ms-text-blue-dark lg:ms-p-2">
      <nuxt-link class="ms-px-4" :to="localePath('/affiliate/bpg/policies')">Policies</nuxt-link>
      <nuxt-link class="ms-px-4" :to="localePath('/affiliate/bpg/privacy-policy')">Privacy Policy</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import 'tailwindcss/tailwind.css'
import { Component, Mixins, Watch } from 'vue-property-decorator';
import i18nDayjsMixin from '~/src/ui/mixins/i18nDayjsMixin'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import i18n from '~/src/ui/i18n/messages/bpg.lang'

// import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
// import {StrapiComponent} from '~/strapi/strapi-blocks.service'
// import HeroDto from '~/src/app/layout/domain/dto/heroDto'
import {BPGStore} from '~/src/ui/store/bpgStore'
import {Category} from '~/src/app/bpg/domain/entities/categorys'
import CardCategoryTabsDto, {HeaderTable} from '~/src/app/bpg/domain/dto/cardCategoryTabsDto'
import {ContentDataPageMapper} from '~/src/app/bpg/domain/mapper/contentDataPageMapper'
// import PELoadingData from '../components/PELoadingData.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {TypesProductsElite} from '~/src/app/bpg/domain/enum/typesProductsElite'
import {TabsProductsElite} from '~/src/app/bpg/domain/dto/productsEliteDto'
import {ItemsResume} from '~/src/app/bpg/domain/dto/resumeDto'
import {LocalePageBPG} from '~/src/app/bpg/domain/enum/localePageBPG'
import PESkeletonCardProvition from '~/src/ui/components/PESkeletonCardProvition.vue'
import BPGCardPromotions from '~/src/ui/components/BPGCardPromotions.vue'
import ExpansionPanelMicroSite from '~/src/ui/components/ExpansionPanelMicroSite.vue'

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
  Additionals,
  allCatalogsValues,
  Promotions,
  BaglioniVillas
} from '~/src/app/bpg/domain/enum/catalogProvitions'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import BenefitsAdditionalsDto from '~/src/app/bpg/domain/dto/getBenefitsAdditionalsDto'
import {LockOffTypes} from '~/src/app/bpg/domain/enum/lockOffTypes'
import {
  MembershipLevelsAccessDiamante,
  MembershipLevelsAccessVIP
} from '~/src/app/bpg/domain/enum/membershipLevels'
import {PeriodType} from '~/src/app/bpg/domain/enum/periodType'
import {ConsiderationTypes} from '~/src/app/bpg/domain/enum/considerationsTypes'
import CardCategoryTabs from '~/src/ui/components/CardCategoryTabs.vue'
import { MaxOccupancyByHotelAndRoomType } from '~/src/app/bpg/domain/entities/maxOccupancyByHotel';
import SisturPromotion from '~/src/app/bpg/domain/dto/sisturPromotionDto';
import { getAffiliationLangToLocale } from '~/src/ui/utils/affiliationLangToLocale';

@Component({
  name: 'BPGPage',
  meta: {
    auth: true,
    breadcrumb: ['home', 'affiliateSearch', 'bpg']
  },
  i18n,
  components: {
    CardCategoryTabs,
    BPGCardPromotions,
    ExpansionPanelMicroSite,
    PESkeletonCardProvition
  }
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

  public isMobile: boolean = false

  public stayRegularNights: string = ''

  public stayMinimumNights: string = ''

  public loadingAffiliationInformation: boolean = true

  public productsGolf: any = {}

  public loadingProductsElite: boolean = true

  public codeShowPromotion: string = ''

  public currentHotelMaxOccupancy: MaxOccupancyByHotelAndRoomType[] = []
  
  public sisturPromotions: SisturPromotion[] = []

  // public get heroAttrs(): HeroDto {
  //   return this.contentStore.heroDefault
  // }

  public get isNational() {
    return this.bpgStore.affiliateInfo.isNational
  }

  public get showProductsElite(): boolean {
    return this.productsList!.length > 0
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

  public get accessBaglioni(): boolean {
    return this.accessProperties.some(propertie => baglioniCodes.includes(propertie as string))
  }

  public get bindCardCategoryTabs(): CardCategoryTabsDto {
    return {
      headersTable: this.headersTable,
      isMobile: this.isMobile,
      texts: {
        minStaysBaglioni: this.$t('minStaysBaglioni') as string,
        bpgSuiteAccessYears: this.$t('bpgSuiteAccessYears') as string,
        notFoundMessage: this.$t('notFoundMessage') as string,
        notFound: this.$t('notFound') as string
      },
      showZones: this.zones.length > 0,
      mppc: this.mppc,
      baglioniCodes,
      mainTabs: this.accessBaglioni
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

    let index = str.indexOf(caracterJoin)

    while (index !== -1) {
      positions.push(index)
      index = str.indexOf(caracterJoin, index + 1)
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
        ([
          CatalogGroupsIds.VILLAS,
          CatalogGroupsIds.RESIDENCE,
          CatalogGroupsIds.BABY_VILLAS,
          CatalogGroupsIds.BABY_RESIDENCE,
          CatalogGroupsIds.PRESIDENTIAL_DIAMOND
        ].includes(access.groupId as CatalogGroupsIds) &&
          ![
            BaglioniVillas.VILLA_REGINA,
            BaglioniVillas.VILLA_MALDIVAS,
            BaglioniVillas.GRAND_VILLA_MALDIVAS_
          ].includes(access.idTypeRoom)) ||
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
    const hotelsAccess = [...new Set(this.roomHotelAccess.map((property: any) => property.hotel))]
      .filter(hotel => !Object.keys(DiscartedHotels).includes(hotel as DiscartedHotels))
      .map(hotel => this.roomHotelAccess.find((access: any) => access.hotel === hotel))
      .map(hotel => ({
        title: hotel?.commercialCode,
        titleMobile: hotel?.hotelDescription,
        name: hotel?.hotel,
        width: '15%',
        align: 'center',
        order: this.propertiesOrder.find(propertie => propertie.code === hotel?.hotel)?.order || 1
      }))
      .sort((a: any, b: any) => {
        return a.order - b.order
      })

    return this.accessBaglioni
      ? [
        ...hotelsAccess,
        {
          title: 'BH',
          titleMobile: 'Baglioni Hotels',
          name: 'BH',
          width: '15%',
          align: 'center',
          order: 99
        }
      ]
      : hotelsAccess
  }

  public get accessVillas(): any {
    const villa = this.roomHotelAccess.find(
      (access: any) => CatalogGroupsIds.VILLAS === access.groupId
    )

    return villa ? this.insertDateText(villa) : villa
  }

  public get accessBabyVillas(): any {
    const villa = this.roomHotelAccess.find(
      (access: any) => CatalogGroupsIds.BABY_VILLAS === access.groupId
    )

    return villa ? this.insertDateText(villa) : villa
  }

  public get accessResidence(): any {
    const residence = this.roomHotelAccess.find(
      (access: any) => CatalogGroupsIds.RESIDENCE === access.groupId
    )

    return residence ? this.insertDateText(residence) : residence
  }

  public get accessBabyResidence(): any {
    const residence = this.roomHotelAccess.find(
      (access: any) => CatalogGroupsIds.BABY_RESIDENCE === access.groupId
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
    const considerations = this.considerations
      ?.filter((consideration: any) => !this.removesConsiderations.includes(consideration.code))
      .map((consideration: Consideration) => {
        let {description, code} = consideration

        switch (code) {
        case ConsiderationTypes.MPPC:
          return {
            ...consideration,
            description: description!
              .replace('{VIGENGY}', String(this.mppc?.dateToText))
              .replace('{NUM_ACCESS}', String(this.mppc?.totalAccess))
          }

        case ConsiderationTypes.ACCESS_SUITES:
          const standard = this.groups.find((group: any) => group.groupId === 'S')
          const presidential = this.groups.find(
            (group: any) => group.groupId === 'P' || group.groupId === 'PS'
          )

          if (!this.accessBaglioni)
            description = this.removeMarksSuitesExclusives({
              markStart: '{MARK_BAGLIONI_HOTELS_START}',
              markEnd: '{MARK_BAGLIONI_HOTELS_END}',
              description
            })

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
            description: description
              .replace('{MARK_BAGLIONI_HOTELS_START}', '')
              .replace('{MARK_BAGLIONI_HOTELS_END}', ''),
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
              accessGroupMapper: this.accessGroupMapper
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

          const accessGolfHotelCourseHotels = this.getAccessGolfHotelCourseHotels()

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
              .replace('{HOTEL_ACCESS}', accessGolfHotelCourseHotels)
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

          description = this.validateBabyResidenceSuitesExclusives(description)

          description = this.validateVillasSuitesExclusives(description)

          description = this.validateBabyVillasSuitesExclusives(description)

          description = this.validatePresidentialDiamondSuitesExclusives(description)

          description = this.validateMinimumStaysSuitesExclusives(description)

          return {
            ...consideration,
            description: description
              .replace('{IN_TOTAL_VILLAS}', '')
              .replace('{IN_TOTAL_BABY_VILLAS}', '')
              .replace('{IN_TOTAL_BABY_RESIDENCE}', '')
              .replace('{IN_TOTAL_RESIDENCE}', '')
              .replace('{MARK_LEVELS_START}', '')
              .replace('{MARK_LEVELS_END}', '')
              .replace('{MARK_RESIDENCE_START}', '')
              .replace('{MARK_RESIDENCE_END}', '')
              .replace('{MARK_RESIDENCE_SECTION_START}', '')
              .replace('{MARK_BABY_RESIDENCE_SECTION_START}', '')
              .replace('{MARK_BABY_RESIDENCE_SECTION_END}', '')
              .replace('{MARK_RESIDENCE_SECTION_END}', '')
              .replace('{MARK_VILLAS_SECTION_START}', '')
              .replace('{MARK_VILLAS_SECTION_END}', '')
              .replace('{MARK_BABY_VILLAS_SECTION_START}', '')
              .replace('{MARK_BABY_VILLAS_SECTION_END}', '')
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

    this.considerationsValues = considerations.map(
      (consideration: any) => consideration?.value || false
    )

    return considerations
  }

  public get accessGroup() {
    return ContentDataPageMapper.getTableGroupAccess(this.roomHotelAccess)
  }

  public considerationsValues: any[] = []

  public get removesConsiderations() {
    return (
      this.considerations
        .map((consideration: any) => {
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
    this.$router.push(
      this.localePath(
        {
          path: '/affiliate/bpg',
          query: { application: this.infoMember.application }
        },
        getAffiliationLangToLocale(this.infoMember.lang, this.$i18n.locale)
      )
    );
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

      this.isMobile = window.innerWidth < 768

      await this.getInfoAffiliation()

      // if (this.infoMember?.stayByMarket) return this.$router.push({path: '/preferential-weeks'})

      this.redirectToLocalePage()

      this.strapiPage = await this.loadStrapiPageData(BasePageSlugs.BPG)
      await this.bpgStore.getMimimumStay()

      await this.getAccessProperties()
      await this.getAllZones()
      this.loadingCategories = false

      await this.onSelectedProperty()
      this.bpgStore.maxOccupanciesByHotel = {}
      await this.getMaxOccupanciesByHotel()

      await this.getMinStay()
      await this.getRoomAccessHotel()
      this.loadingCategories = false

      const extraFeeGolf = await this.bpgStore.getExtraFeeGolf()
      this.gPrices = extraFeeGolf.data?.data || []

      await this.getStays()

      this.productsGolf = await this.bpgStore.getEliteProductsGolf()

      await this.getPromotionsElite()
      await this.getBenefitsElite()
      this.getResortCredit()

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

      if (!this.accessBabyResidence && !this.accessResidence)
        return this.removeMarksSuitesExclusives({
          markStart: '{MARK_RESIDENCE_START}',
          markEnd: '{MARK_RESIDENCE_END}',
          description
        })
    }

    const lockOff = this.roomHotelAccess.find((access: any) =>
      Object.keys(LockOffTypes).includes(access.roomTypeId)
    )

    if (lockOff) description = description.replace('{RESIDENCE_NAME}', 'Residence Suite / Lock Off')
    else description = description.replace('{RESIDENCE_NAME}', 'Residence Suite')

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
      return description
        .replace(
          '{MARK_ACCESS_VIGENCY_RESIDENCE}',
          this.$t('yearsAndVigencyTotal', {
            level: this.$t('residence') as string,
            VIGENCY: String(this.accessResidence?.dateToText),
            ACCESS_YEAR: String(this.accessResidence?.accessYear)
          }) as string
        )
        .replace('{IN_TOTAL_RESIDENCE}', ` ${this.$t('inTotal')}`)
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_RESIDENCE}', '')
    }
  }

  public validateBabyResidenceSuitesExclusives(description: string) {
    if (!this.accessBabyResidence) {
      description = this.removeMarksSuitesExclusives({
        markStart: '{MARK_BABY_RESIDENCE_SECTION_START}',
        markEnd: '{MARK_BABY_RESIDENCE_SECTION_END}',
        description
      })
      if (!this.accessBabyResidence && !this.accessResidence)
        return this.removeMarksSuitesExclusives({
          markStart: '{MARK_RESIDENCE_START}',
          markEnd: '{MARK_RESIDENCE_END}',
          description
        })
    }

    const lockOff = this.roomHotelAccess.find((access: any) =>
      Object.keys(LockOffTypes).includes(access.roomTypeId)
    )
    if (lockOff)
      description = description.replace('{BABY_RESIDENCE_NAME}', 'Residence Suite / Lock Off')
    else description = description.replace('{BABY_RESIDENCE_NAME}', 'Residence Suite')

    switch (this.accessBabyResidence?.periodType) {
    case PeriodType.YEAR:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_BABY_RESIDENCE}',
        this.$t('yearsAndVigencyYear', {
          VIGENCY: String(this.accessBabyResidence?.dateToText),
          ACCESS_YEAR: String(this.accessBabyResidence?.accessYear)
        }) as string
      )
    case PeriodType.TOTAL:
      return description
        .replace(
          '{MARK_ACCESS_VIGENCY_BABY_RESIDENCE}',
          this.$t('yearsAndVigencyTotal', {
            level: this.$t('residence') as string,
            VIGENCY: String(this.accessBabyResidence?.dateToText),
            ACCESS_YEAR: String(this.accessBabyResidence?.accessYear)
          }) as string
        )
        .replace('{IN_TOTAL_BABY_RESIDENCE}', ` ${this.$t('inTotal')}`)
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_BABY_RESIDENCE}', '')
    }
  }

  public validateSuitesExclusives(description: string) {
    const separatorEnd = ` ${this.$t('or') as string} `

    if (
      !this.accessVillas &&
      !this.accessResidence &&
      !this.accessDiamond &&
      !this.accessBabyResidence &&
      !this.accessBabyVillas
    )
      return this.removeMarksSuitesExclusives({
        markStart: '{MARK_LEVELS_START}',
        markEnd: '{MARK_LEVELS_END}',
        description
      })

    const levels: any = [
      this.accessDiamond ? (this.$t('diamondPresidential') as string) : undefined,
      this.accessVillas || this.accessBabyVillas ? (this.$t('villa') as string) : undefined,
      this.accessResidence || this.accessBabyResidence
        ? (this.$t('residence') as string)
        : undefined
    ].map(access => access)

    return description.replace('{LEVELS}', this.createStringElements(levels, separatorEnd))
  }

  public constructWeeksAndNightsString(description: string, withoutNumber: boolean = false) {
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

    if (benefits.includes(CatalogImperials.IMPWKS)) {
      let imperialStr: string = withoutNumber ? 'imperialWeeksWithoutNumber' : 'imperialWeeks'
      imperials.push(this.$t(imperialStr) as string)
    }

    if (benefits.includes(CatalogImperials.IMPNIG)) {
      let imperialStr: string = withoutNumber ? 'imperialNightsWithoutNumber' : 'imperialNights'
      imperials.push(this.$t(imperialStr) as string)
    }

    imperials = this.createStringElements(imperials, separatorEnd)

    if (imperials) allProvitions.push(imperials)

    if (benefits.includes(CatalogIncentivo.INCWKS))
      allProvitions.push(this.$t('incentiveWeek') as string)

    if (benefits.includes(CatalogAnniversary.ANVWKS)) {
      let anniversaryStr: string = withoutNumber
        ? 'anniversaryWeeksWithoutNumber'
        : 'anniversaryWeeks'
      anniversarys.push(this.$t(anniversaryStr) as string)
    }

    if (benefits.includes(CatalogAnniversary.ANVNIG)) {
      let anniversaryStr: string = withoutNumber
        ? 'anniversaryNightsWithoutNumber'
        : 'anniversaryNights'
      anniversarys.push(this.$t(anniversaryStr) as string)
    }

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
      return description
        .replace(
          '{MARK_ACCESS_VIGENCY_VILLAS}',
          this.$t('yearsAndVigencyTotal', {
            level: this.$t('villa') as string,
            VIGENCY: String(this.accessVillas?.dateToText),
            ACCESS_YEAR: String(this.accessVillas?.accessYear)
          }) as string
        )
        .replace('{IN_TOTAL_VILLAS}', ` ${this.$t('inTotal')}`)
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_VILLAS}', '')
    }
  }

  public validateBabyVillasSuitesExclusives(description: string) {
    if (!this.accessBabyVillas || this.accessBabyVillas?.dateTo === this.accessVillas?.dateTo) {
      return this.removeMarksSuitesExclusives({
        markStart: '{MARK_BABY_VILLAS_SECTION_START}',
        markEnd: '{MARK_BABY_VILLAS_SECTION_END}',
        description
      })
    }
    switch (this.accessBabyVillas?.periodType) {
    case PeriodType.YEAR:
      return description.replace(
        '{MARK_ACCESS_VIGENCY_BABY_VILLAS}',
        this.$t('yearsAndVigencyYear', {
          VIGENCY: String(this.accessBabyVillas?.dateToText),
          ACCESS_YEAR: String(this.accessBabyVillas?.accessYear)
        }) as string
      )
    case PeriodType.TOTAL:
      return description
        .replace(
          '{MARK_ACCESS_VIGENCY_BABY_VILLAS}',
          this.$t('yearsAndVigencyTotal', {
            level: this.$t('villa') as string,
            VIGENCY: String(this.accessBabyVillas?.dateToText),
            ACCESS_YEAR: String(this.accessBabyVillas?.accessYear)
          }) as string
        )
        .replace('{IN_TOTAL_BABY_VILLAS}', ` ${this.$t('inTotal')}`)
    default:
      return description.replace('{MARK_ACCESS_VIGENCY_BABY_VILLAS}', '')
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
        (inter: IntervalDto) => inter.code === TypesIntervals.IPLATINUM
      )
    }

    if (!notInterval.includes(this.infoMember.intervalPrevious)) {
      interval = this.sectionInterval.find(
        (inter: IntervalDto) => inter.code === TypesIntervals.IPREVIOUS
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

  public get productsListMobile() {
    if (this.isMobile)
      return this.productsList.filter((promotion, index) => index < this.numberMorePromotions)
    return this.productsList
  }

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

  public getAccessGolfHotelCourseHotels() {
    return this.infoMember.accessGolfCourse.map((access: any) => {
      if (access.hotel === 'MPS') return 'Moon Palace Cancún'
      if (access.hotel === 'ZCMP') return 'Moon Palace Punta Cana'
      return ''
    })
      .filter((access: any) => access)
      .join(` ${this.$t('and')} `)
  }

  public replaceDataGolf(description: string): string {
    const accessGolfHotelCourseHotels = this.getAccessGolfHotelCourseHotels()

    return description
      .replace('{HOTEL_ACCESS}', accessGolfHotelCourseHotels)
      .replace('{GOLF_ACCESS}', String(this.infoMember.grAccess))
      .replace('{MPPC_YEARS}', String(this.mppc?.validity))
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

          if (
            promotion.code === Provisions.CONCIERGE &&
            membershipLevelsAccess.includes(membershipLevelCode)
          ) {
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

          if (promotion.code === Provisions.CONCERT && concert) return promotion

          const golf50 = this.benefitsAdditionals.find(
            (additional: any) => additional.additionalBenefit === Additionals.GOLF50
          )

          if (promotion.code === Provisions.GOLFRND50 && golf50) {
            return {
              ...promotion,
              description: this.replaceDataGolf(promotion?.description)
            }
          }

          let prod: any = products.find(
            (prod: any) => codes.includes(prod[type]) || codes.includes('ALL')
          )

          if (prod) {
            const catalogImperials = Object.values(CatalogImperials)
            const catalogAnniversary = Object.values(CatalogAnniversary)
            const catalogIncentivo = Object.values(CatalogIncentivo)

            //validamos si ese producto, es de categoria golf y remplazamos la key, por el valor de back de accesos de golf
            if (
              promotion.code === Provisions.GOLFRND ||
              promotion.code === Provisions.UGBWEEK ||
              promotion.code === Provisions.UGBNIG
            )
              promotion.description = this.replaceDataGolf(promotion?.description)

            if (allCatalogsValues.includes(prod[type])) {

              if (catalogIncentivo.includes(prod[type]))

                return {
                  ...prod,
                  ...promotion,
                  mapper: []
                }

              if (catalogImperials.includes(prod[type])) catalogSearch = catalogImperials

              if (catalogAnniversary.includes(prod[type])) catalogSearch = catalogAnniversary


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

    const bpg20 = this.minimumStay.find(minStay => minStay.discountRate === 'D20')
    if (bpg20?.applicableStay! < 7 && this.isNational) bpg20!.applicableStay = 4
    if (bpg20?.applicableStay! < 7 && !this.isNational) bpg20!.applicableStay = 5

    return (
      promotions
        ?.map((promotion: Promotion) => {

          let description = promotion.description

          const codes = promotion.code.replaceAll(' ', '').split('&')

          if (codes.includes('ALL')) return promotion

          if (codes.includes(Provisions.YATE)) {
            return {
              ...promotion,
              description: description.replace('{DISCOUNT_YATE}', `${infoMember?.yachtDiscount}%`)
            }
          }

          if (codes.includes(Promotions.KIDS_AND_TEENS) && !this.accessSuiteFamily)
            return {
              ...promotion,
              description: this.removeMarksSuitesExclusives({
                markStart: '{MARK_DINAMIC_START}',
                markEnd: '{MARK_DINAMIC_END}',
                description
              })
            }
          // //buscamos hacer match con back end del producto recorrido
          let prod = products.find(
            (prod: Product) => codes.includes(String(prod.idPromocion)) || codes.includes('ALL')
          )

          // si hizo match el producto entre Strapi y back, retornamos ambas infos
          if (prod) {
            if (
              [
                Promotions.PLUS_PLAN,
                Promotions.PLUS_PLAN_AND_TOURS1,
                Promotions.PLUS_PLAN_AND_TOURS2
              ].includes(String(prod.idPromocion) as Promotions)
            ) {
              description = description.replace('{NIGHTS}', String(bpg20?.applicableStay))
              description = this.constructWeeksAndNightsString(description, true)
            }

            if (
              codes.includes(Promotions.REWARDS) ||
              codes.includes(Promotions.REWARDS_PLUS) ||
              codes.includes(Promotions.REWARDS_UK)
            ) {
              const rewards = products.filter(product =>
                codes.includes(String(product.idPromocion))
              )
              return {
                ...prod,
                ...promotion,
                description: this.createTextRewards({
                  mark: '{MARK_TYPES_REWARDS}',
                  rewards,
                  description
                })
              }
            }

            const insentive = this.benefits.find(
              benefit => benefit.category === CatalogIncentivo.INCWKS
            )

            if (String(prod.idPromocion) === Promotions.RESORT_CREDIT && !insentive) {
              description = this.removeMarksSuitesExclusives({
                markStart: '{MARK_INCENTIVE_RESORTS_START}',
                markEnd: '{MARK_INCENTIVE_RESORTS_END}',
                description
              })
            }

            return {
              ...prod,
              ...promotion,
              description: description
                .replace('{MARK_DINAMIC_START}', '')
                .replace('{MARK_DINAMIC_END}', '')
                .replace('{MARK_INCENTIVE_RESORTS_START}', '')
                .replace('{MARK_INCENTIVE_RESORTS_END}', '')
            }
          }

          return prod
        })
        .filter(product => product) || []
    )
  }

  public createTextRewards({
    mark,
    description,
    rewards
  }: {
    mark: string
    description: string
    rewards: any
  }) {
    let rewardsValues: any = [
      {idPromotion: Number(Promotions.REWARDS_UK), stay: 10, nights: 4},
      {idPromotion: Number(Promotions.REWARDS), stay: 7, nights: 3}
    ]

    rewardsValues = rewardsValues.filter(({idPromotion}: {idPromotion: number}, index: number) =>
      rewards.find((reward: any) => reward.idPromocion === idPromotion)
    )

    const tempRewardsLong = rewards.find(
      (reward: any) => reward.idPromocion === Number(Promotions.REWARDS_PLUS)
    )
      ? [...rewardsValues, {idPromotion: Number(Promotions.REWARDS_PLUS), stay: 5, nights: 1}]
      : [...rewardsValues]

    const tempRewardsShort = rewards.find(
      (reward: any) => reward.idPromocion === Number(Promotions.REWARDS_PLUS)
    )
      ? [...rewardsValues, {idPromotion: Number(Promotions.REWARDS_PLUS), stay: 4, nights: 1}]
      : [...rewardsValues]

    const rewardsValuesLong = tempRewardsLong.map(
      ({stay, nights}: any) =>
        this.$t('rewardTextPromotion', {
          stay: String(stay),
          nights: String(nights)
        }) as string
    )

    const rewardsValuesShort = tempRewardsShort.map(
      ({stay, nights}: any) =>
        this.$t('rewardTextPromotionShort', {
          stay: String(stay),
          nights: String(nights)
        }) as string
    )

    const rewardsValuesNumbers = tempRewardsLong.map(({nights}: any) => nights)

    return description
      .replace(
        '{MARK_REWARDS_DYNAMIC}',
        this.createStringElements(rewardsValuesLong, ` ${this.$t('or')} `)
      )
      .replace(
        '{MARK_NIGHTS_DYNAMIC}',
        this.createStringElements(rewardsValuesNumbers, ` ${this.$t('or')} `)
      )
      .replace('{MARK_REWARDS_TOTAL}', rewards[0]?.Total)
      .replace(
        '{MARK_REWARDS_DYNAMIC_SHORT}',
        this.createStringElements(rewardsValuesShort, ` ${this.$t('or')} `)
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

  public async getMaxOccupanciesByHotel(): Promise<void> {
    try {
      const hotel = this.propertySelectedTab?.code || ''

      if (hotel) {
        this.currentHotelMaxOccupancy = await this.bpgStore.getMaxOccupanciesByHotel(hotel)
      }
    } catch (error) {
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

    const access = this.roomHotelAccess
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
        if (!accessShow[access['roomTypeDescription']]) {
          accessShow[access['roomTypeDescription']] = true
          return true
        }
        return false
      })
      .sort((a: any, b: any) => {
        if (a.discountRate === 20 && (a.code === 'RL' || a.code === 'RLCB')) {
          return -1;
        }
        return 1
      })

    return (
      access.sort((a: any, b: any) => {
        if (b.bpg < a.bpg) return 1
        if (b.bpg > a.bpg) return -1
        return 0
      }) || []
    )
  }

  public getMaxOccupanciesByHotelAndRoomType(access: any): number {
    const item = this.currentHotelMaxOccupancy.find(
      (maxOccupancy: MaxOccupancyByHotelAndRoomType) =>
        maxOccupancy.hotel === access.hotel && maxOccupancy.roomType === access.roomTypeId
    )

    return item?.maxOccupancy || 0
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
  public async onClickProperty(property: any): Promise<void> {
    this.propertySelectedTab = property
    await this.getMaxOccupanciesByHotel()
  }

  public async getAllZones() {
    try {
      await this.bpgStore.getAllZones({
        accessProperties: this.accessProperties,
        locale: this.$i18n.locale,
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

  @Watch('bindingTab')
  onChangeNumberDisplayMorePromotions(newVal: string) {
    this.numberMorePromotions = 3
  }

  public numberMorePromotions: number = 3

  public displayMorePromotions() {
    if (this.numberMorePromotions < this.productsList.length)
      this.numberMorePromotions = this.numberMorePromotions + 3
  }

  public getClassDisplayMorePromotions() {
    return {
      'ms-opacity-50': this.numberMorePromotions > this.productsList.length
    }
  }

  public getClassDescriptionInterval() {
    return {
      'interval-description-mobile': this.isMobile,
      'interval-description': !this.isMobile
    }
  }

  public async getResortCredit() {
    try {
      const {data} = await this.bpgStore.getResortCredit()
      this.sisturPromotions = data!
      //@ts-ignore
      this.promotions = [
        ...this.promotions,
        ...this.sisturPromotions.map(promotion => ({
          ...promotion,
          idPromocion: promotion.promotion
        }))
      ]
    } catch (error) {
      this.sisturPromotions = []
    }
  }

  public showModalAccessSuitesMobile: boolean = false

  public get accessSuitesConsideration(): Consideration {
    return this.considerationsList.find(
      (consideration: Consideration) => consideration.code === ConsiderationTypes.ACCESS_SUITES
    )
  }

  public onClickExpansionPanel(value: boolean, index: number) {
    if (
      this.considerationsList[index]?.code === ConsiderationTypes.ACCESS_SUITES &&
      this.isMobile
    ) {
      this.considerationsValues[index] = false
      this.propertieSelectedMobile = {
        name: this.hotelsTableAccess[0]?.name!,
        titleMobile: this.hotelsTableAccess[0]?.titleMobile!
      }
      console.log(this.accessGroupMapper)
      this.showModalAccessSuitesMobile = !this.showModalAccessSuitesMobile
    }
  }

  public get accessGroupMapperMobile() {
    return this.accessGroupMapper
      .filter(({accessNumber, hotel}: any) => accessNumber !== '')
      .map((access: any) => ({
        ...access,
        hotel: this.accessGroupMapper
          .filter(
            (acc: any) =>
              acc.keyQuantityGroup === access.keyQuantityGroup &&
              acc.hotel.includes(this.propertieSelectedMobile?.name)
          )
          ?.map((acc: any) => acc.hotel),
        title: `${access.accessNumber.replaceAll('<br>', '')}:`,
        access: this.accessGroupMapper.filter(
          (acc: any) =>
            acc.keyQuantityGroup === access.keyQuantityGroup &&
            acc.hotel.includes(this.propertieSelectedMobile?.name)
        )
      }))
      .filter((access: any) => access.hotel.length > 0)
  }

  public get accessGroupMapper() {
    let accessGroup: any = []
    let accessPerYear: any[] = []

    for (const [keyGroup, group] of this.accessGroup) {
      let tempGroups = new Map()

      for (const [keyQuantityGroup, QuantityGroup] of group) {
        const groupIdRandom = Math.floor(Math.random() * 1000 + 1)
        const keyQuantityGroupAccess: number = keyQuantityGroup

        accessPerYear.push({
          keyQuantityGroup: keyQuantityGroupAccess,
          groupIdRandom
        })

        const tempKeys = Array.from(group.keys())

        const keyIndex = tempKeys.indexOf(keyQuantityGroup)

        let quantityToPrint = keyQuantityGroup

        if (tempKeys.length !== keyIndex + 1) quantityToPrint -= tempKeys[keyIndex + 1] as any

        tempGroups = this.mergeAccessMaps(QuantityGroup, tempGroups)

        for (const [keyRoomGroup, RoomsGroup] of tempGroups) {
          let accessNumber = ''

          if (RoomsGroup.periodType.includes('Y'))
            accessNumber = this.$t('accessPerYear', {access: quantityToPrint}) as string

          if (RoomsGroup.periodType.includes('T'))
            accessNumber = this.$t('accessValidTo', {
              quantityToPrint: quantityToPrint,
              date: this.i18nDayjs('MMMM DD, YYYY', RoomsGroup.dateTo[0].substr(0, 10)),
              access: RoomsGroup.accessYear[0]
            }) as string

          accessGroup.push({
            ...RoomsGroup,
            groupId: keyGroup,
            accessNumber,
            groupIdRandom,
            keyQuantityGroup: keyQuantityGroupAccess
          })
        }
      }
    }

    accessPerYear = accessPerYear.map((access, index) => ({
      ...access,
      color: Boolean((index + 1) % 2)
    }))

    let accGroup: any = []
    accessPerYear = accessPerYear.map((accessNumber: any) => {
      //busca las categorias "Standar" excepto la "Standar Suite"
      let accessStandar = accessGroup.filter(
        (access: any) =>
          access.groupIdRandom === accessNumber.groupIdRandom &&
          access.group === 'Standard' &&
          access.roomTypeId !== 'J'
      )

      //busca solo la categoria "Standar Suite"
      let accessStandarSuite = accessGroup.find(
        (access: any) =>
          access.roomTypeId === 'J' &&
          access.groupIdRandom === accessNumber.groupIdRandom &&
          access.group === 'Standard'
      )

      if (accessStandar.length > 0 && accessStandarSuite) {
        accessStandar.map((access: any) => {
          accessStandarSuite = {
            ...accessStandarSuite,
            hotel: [...accessStandarSuite.hotel, ...access.hotel]
          }
        })

        accessGroup = [
          accessStandarSuite,
          ...accessGroup.filter(
            (accessG: any) =>
              accessG.groupIdRandom !== accessNumber.groupIdRandom && accessG.group !== 'Standard'
          )
        ]
      }

      accGroup = [
        ...accGroup,
        ...accessGroup
          .filter((access: any) => access.groupIdRandom === accessNumber.groupIdRandom)
          .map((access: any, index: number) => ({
            ...access,
            accessNumber: index > 0 ? '' : access.accessNumber,
            color: accessNumber.color,
            roomTypeDescription:
              access.roomTypeId === 'DP' ||
              access.roomTypeDescription.indexOf('iamond') >= 0 ||
              access.roomTypeDescription.indexOf('iamante') > 0
                ? `${access.roomTypeDescription} *`
                : access.roomTypeDescription
          }))
      ].map(access => {
        if (access.roomTypeId === 'J' && access.groupId === 'S') access.hotel.push('BH')
        return access
      })
    })
    return accGroup
  }

  mergeAccessMaps(map1: any, map2: any) {
    const mergedMap = new Map()

    for (const [key, value] of map1.entries()) {
      mergedMap.set(key, value)
    }

    for (const [key, value] of map2.entries()) {
      if (mergedMap.has(key)) {
        const existingValue = mergedMap.get(key)
        mergedMap.set(key, {
          roomTypeId: existingValue.roomTypeId,
          roomTypeDescription: existingValue.roomTypeDescription,
          hotel: [...existingValue.hotel, ...value.hotel],
          roomTypeGroupId: [...existingValue.roomTypeGroupId, ...value.roomTypeGroupId],
          roomTypeGroupDescription: existingValue.roomTypeGroupDescription,
          roomTypeCategory: [...existingValue.roomTypeCategory, ...value.roomTypeCategory],
          group: existingValue.group,
          validity: [...existingValue.validity, ...value.validity],
          periodType: [...existingValue.periodType, ...value.periodType],
          accessYear: [...existingValue.accessYear, ...value.accessYear],
          dateFrom: [...existingValue.dateFrom, ...value.dateFrom],
          dateTo: [...existingValue.dateTo, ...value.dateTo]
        })
      } else {
        mergedMap.set(key, value)
      }
    }

    return mergedMap
  }

  public propertieSelectedMobile = {name: '', titleMobile: ''}

  public closeModalExpansionPanel() {
    this.showModalAccessSuitesMobile = false
  }

  public showModalTermsMobile: boolean = false

  public termsAndConditionsMobile: any = []

  public openModalTermsMobile(event: any) {
    this.termsAndConditionsMobile = event.termsAndConditions
    this.showModalTermsMobile = true
  }

  public closeModalTermsMobile(event: any) {
    this.showModalTermsMobile = false
  }
}
</script>
<style>
.interval-description-mobile p {
  text-align: center !important;
}

.interval-description p {
  text-align: justify !important;
}

.content-mobile-access::-webkit-scrollbar:vertical {
  width: 10px;
}
</style>