<template>
  <div>
    <div class="mt-[40px] carousel w-full md:!ms-hidden">
      <div
        v-for="(tab, index) in tabsComputed"
        class="carousel-item cursor-pointer"
        @click.prevent="clickTab(index)"
      >
        <span
          class="font-sans pb-4 text-[16px] px-[34px] text-[#938F99]"
          :class="getClassTabMobile(index)"
        >
          {{ tab?.title }}
        </span>
      </div>
    </div>

    <div class="gap-6 mt-[40px] w-full rounded-box carousel md:!ms-hidden">
      <div
        class="ms-px-6 ms-py-4 carousel-item cursor-pointer rounded-full ms-bg-white ms-font-sans ms-text-[14px] ms-text-[#938F99]"
        :class="getStylesPropertieTabMobile(propertieIndex)"
        @click.prevent="clickTabPropertie(propertieIndex, 'mobile')"
        v-for="(propertie, propertieIndex) in tabMobile?.properties"
      >
        {{ propertie?.title }}
      </div>
    </div>

    <div
      class="ms-mt-[36px] md:!ms-hidden"
      v-if="propertie"
    >
      <img
        :src="propertie?.url"
        class="h-[180px] w-full rounded-t-[12px] object-cover"
      />
      <div class="w-full ms-bg-black-light rounded-b-[12px] ms-p-[24px]">
        <div class="ms-text-blue-light ms-font-sans ms-font-bold ms-text-[22px]">
          {{ propertie?.title }}
        </div>
        <div class="flex gap-6 mt-[24px]">
          <table class="w-full">
            <thead>
              <tr>
                <td
                  class="ms-pb-2 ms-font-sans ms-font-bold ms-text-normal ms-text-blue-light"
                  v-for="(header, index) in headersTableComputed"
                  v-if="!header.hidden"
                  :class="constructClassHeader(header)"
                >
                  {{ header.title }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in accessByProperty"
                :key="index"
              >
                <td
                  class="!ms-w-[80%] ms-pb-2 ms-font-sans ms-text-[14px] ms-text-white ms-font-normal"
                >
                  {{ row.title }}
                </td>
                <td
                  class="ms-w-[20%] ms-pb-2 text-center ms-font-sans ms-text-[14px] ms-text-white ms-font-normal"
                  >{{ row.bpg }}</td
                >
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ms-mt-[24px] ms-justify-end ms-flex">
          <div class="ms-justify-end ms-flex">
            <div class="font-sans text-white">
              {{ headerHiddenFirst }}
            </div>
            <PEIcon
              size="24"
              class="ms-pt-2 text-white"
              >chevron-right</PEIcon
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full rounded-[12px] p-[32px] ms-hidden md:!ms-flow-root"
      :class="backgroundClasses"
    >
      <div class="flex justify-center">
        <div class="content-center">
          <ul class="relative flex text-center text-[16px] font-normal text-white">
            <li
              v-for="(tab, index) in tabsComputed"
              :key="index"
              class="cursor-pointer"
              @click.prevent="clickTab(index)"
            >
              <span
                aria-current="page"
                class="tab-blur inline-block w-full rounded-t-[10px] py-4 px-8"
                :class="getClassTab(index)"
                :style="getStylesTab(index, tab)"
              >
                {{ tab.title }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="showPropertiesTabs"
        class="flex w-full justify-center rounded-t-[12px] py-4"
        :class="tabClasses"
      >
        <div>
          <ul
            class="flex flex-wrap text-center font-sans text-[14px] font-normal"
            :class="tabColorClasses"
          >
            <li
              v-for="(propertie, propertieIndex) in tab?.properties"
              :key="propertieIndex"
              class="mr-2"
              @click.prevent="clickTabPropertie(propertieIndex)"
            >
              <a
                class="ms-group ms-inline-flex ms-cursor-pointer ms-rounded-t-lg hover:ms-border-b-2 ms-px-4 ms-py-2 hover:ms-border-blue-light hover:ms-text-blue-light"
                :class="getStylesPropertieTab(propertieIndex)"
                @click.prevent="onClickProperty(propertie)"
              >
                {{ propertie.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-else
        class="animation-pulse flex w-full justify-center rounded-t-[12px] py-12"
        :class="tabClasses"
      ></div>

      <div
        v-if="showPropertiesSecondsTabs"
        class="flex w-full justify-center py-4"
        :class="tabClasses"
      >
        <div>
          <ul
            class="flex flex-wrap text-center font-sans text-[14px] font-normal"
            :class="tabColorClasses"
          >
            <li
              v-for="(propertie, propertieIndex) in tab?.propertiesSecond"
              :key="propertieIndex"
              class="mr-2"
              @click.prevent="clickTabPropertie(propertieIndex, 'second')"
            >
              <a
                class="ms-group ms-inline-flex ms-cursor-pointer ms-rounded-t-lg hover:ms-border-b-2 ms-px-4 ms-py-2 hover:ms-border-blue-light hover:ms-text-blue-light"
                :class="getStylesPropertieTab(propertieIndex, 'second')"
                @click.prevent="onClickProperty(propertie)"
              >
                {{ propertie.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <PELoadingData
        v-if="loadingDataPropertie"
        :text="textLoadingCategories"
        :class="{'!ms-text-gray-500': !dark}"
        :dark="dark"
      />
      <div
        v-else
        class="mt-8 flex gap-6"
      >
        <img
          v-if="propertie"
          :src="propertie?.url"
          class="h-[480px] w-[439px] rounded-[10px] object-cover"
        />
        <div
          v-else
          class="animation-pulse h-[480px] w-[500px] rounded-[10px] ms-bg-gray-500 object-cover"
        ></div>
        <div class="grid w-full grid-cols-1 content-between items-center">
          <div>
            <div
              v-if="propertie"
              class="mt-[20px] text-[24px] font-semibold uppercase text-blue-light"
            >
              {{ propertie?.title }}
            </div>
            <div
              v-else
              class="mt-[20px] w-[50%]"
            >
              <SkeletonLine :dark="dark" />
            </div>
            <div class="mt-6">
              <table class="w-full">
                <thead
                  v-if="!showNotFoundAccess"
                  class="w-full text-blue-light"
                >
                  <tr class="w-full">
                    <th
                      v-for="(header, index) in headersTableComputed"
                      :key="index"
                      :class="constructClassHeader(header)"
                    >
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-if="showTableAccess"
                  class="font-sans text-[16px] font-normal"
                  :class="textColorClasses"
                >
                  <tr
                    v-for="(row, index) in accessByProperty"
                    :key="index"
                  >
                    <td class="flex w-full">
                      {{ row.title }}
                    </td>
                    <td class="w-[20%] pb-2 text-center">{{ row.bpg }}</td>
                    <td class="w-[20%] pb-2 text-center">
                      {{ row.ocupacion_max }}
                    </td>
                    <td
                      v-if="showMinStays"
                      class="w-[20%] pb-2 text-center"
                    >
                      {{ row.estancias_min }}
                    </td>
                  </tr>
                </tbody>
                <div
                  v-if="showNotFoundAccess"
                  class="font-sans text-[20px] font-normal"
                  :class="textColorClasses"
                >
                  {{ texts.notFound }}
                  <div class="text-[16px]">
                    {{ texts.notFoundMessage }}
                  </div>
                </div>
                <tbody
                  v-if="showSkeletonAccess"
                  class="font-sans text-[16px] font-normal"
                  :class="textColorClasses"
                >
                  <tr
                    v-for="(number, index) in 4"
                    :key="index"
                  >
                    <td class="pr-4">
                      <SkeletonLine :dark="dark" />
                    </td>
                    <td class="px-0">
                      <SkeletonLine :dark="dark" />
                    </td>
                    <td class="px-12">
                      <SkeletonLine :dark="dark" />
                    </td>
                    <td class="px-12">
                      <SkeletonLine :dark="dark" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <span
            v-if="!showMinStays"
            class="font-sans text-[16px]"
            :class="textColorClasses"
            >{{ texts.minStaysBaglioni }}</span
          >
        </div>
      </div>

      <div
        v-if="!loadingDataPropertie"
        class="mt-6 font-sans"
        :class="textColorClasses"
        v-html="bpgSuiteAccessYears"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
// import PELoadingData from './PELoadingData.vue'
import SkeletonLine from '~/src/ui/components/skeletonLine.vue'

interface CategoryBPG {
  title: string
  bpg: string
  ocupacion_max: string
  estancias_min: string
  tooltip: string
}

interface PropertiesTab {
  title: string
  description: string
  url: string
  code?: string
  bpgSuiteAccessYears: string
}

interface MainTab {
  title: string
  properties: PropertiesTab[]
  propertiesSecond?: PropertiesTab[]
}

interface HeaderTable {
  title: string
  name: string
  width: string
  align: string
  hidden?: boolean
}

@Component({
  name: 'CardCategoryTabs',
  components: {
    SkeletonLine,
    // PELoadingData
  }
})
export default class CardCategoryTabs extends Vue {
  @Prop({default: true, type: Boolean}) shortContent!: boolean

  @Prop({default: true, type: Boolean}) loadingCategories!: boolean

  @Prop({default: false, type: Boolean}) showZones!: boolean

  @Prop() mppc!: any

  @Prop({default: () => [], type: Array}) accessByProperty!: CategoryBPG[]

  @Prop({default: () => [], type: Array}) roomHotelAccess!: any[]

  @Prop({default: () => [], type: Array}) mainTabs!: MainTab[]

  @Prop({default: () => [], type: Array}) headersTable!: HeaderTable[]

  @Prop({default: 'en', type: String}) locale!: string

  @Prop({default: () => []}) baglioniCodes!: string[]

  @Prop({default: '', type: String}) textNoResultsFound!: string

  @Prop({default: '', type: String}) textLoadingCategories!: string

  @Prop({default: ''}) texts!: any

  @Prop({default: true, type: Boolean}) dark!: boolean

  public indexTab = 0

  public propertieIndexTab = 0

  public propertieTabType = ''

  public loadingDataPropertie = false

  public indexesImagesProperties: number[] = [0, 1, 2]

  public get bpgSuiteAccessYears(): string {
    if (this.propertie?.bpgSuiteAccessYears && this.mppc?.validity >= 25)
      return this.texts.bpgSuiteAccessYears
    return this.propertie?.bpgSuiteAccessYears?.replace('{YEARS}', this.mppc?.validity) || ''
  }

  public get headerHiddenFirst() {
    return this.headersTableComputed.find(header => header.hidden)?.title
  }

  public get indexesImagesPropertiesComputed(): number[] {
    return this.indexesImagesProperties
  }

  public set indexesImagesPropertiesComputed(value: number[]) {
    this.indexesImagesProperties = value
  }

  public get headersTableComputed(): HeaderTable[] {
    return this.headersTable.filter(header => this.showHeaderTable(header))
  }

  public get showMinStays() {
    return !['RERO', 'CABA', 'SAFI', 'LUVE', 'BALO'].includes(this.propertie?.code || '')
  }

  public get showPropertiesTabs() {
    return this.tab?.properties && this.tab?.properties.length > 0
  }

  public get showPropertiesSecondsTabs() {
    return this.tab?.propertiesSecond && this.tab?.propertiesSecond.length > 0
  }

  public get tabsComputed(): MainTab[] {
    let right = 0
    const array = this.mainTabs
      .slice()
      .reverse()
      .map((item, index) => ({
        ...item,
        zIndex: index
      }))

    return array
      .slice()
      .reverse()
      .map(item => {
        right += 10
        return {
          ...item,
          right
        }
      })
  }

  public get isBaglioniProperties(): boolean {
    return this.mainTabs[this.indexTab]?.properties.some((propertie: any) =>
      this.baglioniCodes.includes(propertie.code)
    )
  }

  public get propertiesTab() {
    return this.mainTabs[this.indexTab]?.properties || []
  }

  public get firstProperties() {
    let numberFilter = 5

    if (this.isBaglioniProperties) numberFilter = 4

    return this.propertiesTab.filter((propertie, index) => index < numberFilter)
  }

  public get secondProperties() {
    let numberFilter = 5

    if (this.isBaglioniProperties) numberFilter = 4

    return this.propertiesTab.filter((propertie, index) => index >= numberFilter)
  }

  public get tab(): MainTab {
    return {
      ...this.mainTabs[this.indexTab],
      properties: this.firstProperties,
      propertiesSecond: this.secondProperties
    }
  }

  public get tabMobile(): MainTab {
    return {
      ...this.mainTabs[this.indexTab],
      properties: [...this.firstProperties, ...this.secondProperties]
    }
  }

  public get propertie(): PropertiesTab | undefined {
    if (this.propertieTabType === 'mobile')
      return this.tabMobile?.properties?.[this.propertieIndexTab]
    if (this.propertieTabType === '') return this.tab?.properties?.[this.propertieIndexTab]
    return this.tab?.propertiesSecond?.[this.propertieIndexTab]
  }

  public get showTableAccess(): boolean {
    return this.accessByProperty.length > 0 && !this.showSkeletonAccess
  }

  public get showNotFoundAccess() {
    return !this.showTableAccess && !this.showSkeletonAccess
  }

  public get showSkeletonAccess() {
    return this.roomHotelAccess.length < 1
  }

  get tabClasses() {
    return {
      '!bg-[#272527]': this.dark,
      'bg-gray-500': !this.dark
    }
  }

  get tabColorClasses() {
    return {
      'text-gray': this.dark,
      'text-white': !this.dark
    }
  }

  get textColorClasses() {
    return {
      'text-white': this.dark,
      'text-gray': !this.dark
    }
  }

  public constructClassHeader(header: HeaderTable): string {
    return `text-${header.align} font-sans font-bold text-[16px]`
  }

  public getClassTabMobile(index: number) {
    return {
      '!text-blue-light !border-b-2 !border-blue-light': this.indexTab === index
    }
  }

  public getClassTab(index: number) {
    return {
      '!ms-bg-blue-light !ms-text-black': this.indexTab === index,
      '!ms-bg-[#272527]': this.indexTab !== index && this.dark,
      '!ms-bg-gray-500': this.indexTab !== index && !this.dark
    }
  }

  public getStylesTab(index: number, tab: any): string {
    return `z-index:${tab.zIndex};  position: relative; ${index > 0 ? `right: ${tab.right}px` : ''}`
  }

  public getStylesPropertieTabMobile(index: number) {
    return {
      'ms-text-black ms-bg-blue-light': this.propertieIndexTab === index
    }
  }

  public getStylesPropertieTab(index: number, second = '') {
    const isActive: boolean = this.propertieIndexTab === index && this.propertieTabType === second
    return {
      'ms-text-blue-light ms-border-blue-light ms-active ms-border-b-2': isActive,
      'ms-border-transparent': !isActive
    }
  }

  public clickTab(index: number): void {
    this.loadingDataPropertie = true
    this.indexTab = index

    if (this.tab?.properties.length > 0) {
      this.clickTabPropertie(0)
      this.onClickProperty(this.tab.properties[0])
    }

    setTimeout(() => {
      this.loadingDataPropertie = false
    }, 1500)
  }

  public clickTabPropertie(index: number, second = ''): void {
    this.loadingDataPropertie = true

    this.propertieTabType = second

    this.propertieIndexTab = index
    setTimeout(() => {
      this.loadingDataPropertie = false
    }, 1500)
  }

  public get lastIndexProperties() {
    return (this.tab?.properties?.length || 0) - 1
  }

  public showHeaderTable(header: HeaderTable): boolean {
    return header.name !== 'estancias_min' || this.showMinStays
  }

  get backgroundClasses() {
    return {
      'bg-black-light': this.dark,
      'bg-[#F0F0F0]': !this.dark
    }
  }

  @Emit('on-click-property')
  onClickProperty(propertie: any) {
    return propertie
  }
}
</script>
<style>
.tab-blur {
  box-shadow: -4px 0px 5px rgba(0, 0, 0, 0.25), 2px 0px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.text-image {
  position: relative;
  top: -40px;
}

::v-deep .content-image img {
  border-radius: 10px !important;
}

.content-image span {
  text-shadow: 1px 1px 7px rgba(0, 0, 0, 0.91);
}

.content-image {
  position: relative;
  display: inline-block;
  text-align: center;
}

.content-image img {
  height: 250px;
  object-fit: cover;
  border-radius: 10px !important;
}

.tooltip {
  visibility: hidden;
  position: absolute;
}
.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 100;
}

.animation-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>